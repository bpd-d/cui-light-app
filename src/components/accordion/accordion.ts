import { ICuiComponent, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { replacePrefix, joinWithScopeSelector, getChildSelectorFromScoped, calculateNextIndex, queryAll } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiAccordionEvent } from "../../core/models/events";
import { clickExtension } from "../extensions/click/click";
import { CuiClickableArgs } from "../../core/models/arguments";
import { getCuiHandlerInteractions, getEventBusFacade, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { CuiComponentBaseHook } from "../base";
import { callbackPerformer } from "../extensions/performers";
import { eventExtension } from "../extensions/event/event";

const ACCORDION_TITLE_CLS = '> * > .{prefix}-accordion-title';
const ACCORDION_ITEMS_CLS = '> *';


export class CuiAccordionArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    single: boolean;
    selector: string;
    items: string;
    timeout: number;
    animation: boolean;
    prevent: boolean;
    stopPropagation: boolean;

    constructor(prefix: string, timeout?: number) {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "items": { corrector: joinWithScopeSelector },
            }
        });
        this.animation = false;
        this.single = false;
        this.selector = joinWithScopeSelector(replacePrefix(ACCORDION_TITLE_CLS, prefix));
        this.items = joinWithScopeSelector(replacePrefix(ACCORDION_ITEMS_CLS, prefix));
        this.timeout = timeout ?? 300;
        this.prevent = false;
        this.stopPropagation = false;
    }
}

export function CuiAccordionComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "accordion",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiAccordionHandler(element, utils, attribute, prefix);
        }
    })
}

export class CuiAccordionHandler extends CuiHandlerBase<CuiAccordionArgs> implements ICuiSwitchable {


    private _currentIndex: number;
    private _busFacade: ICuiEventBusFacade;
    private _interactions: ICuiInteractionsFacade;

    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string) {
        super("CuiAccordionHandler", element, attribute, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        //   this._items = [];

        this._currentIndex = -1;
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, this.element);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onElementClick.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.SWITCH,
            performer: callbackPerformer(this.switch.bind(this), { ignoreEmpty: true })
        }));
    }

    async onHandle(): Promise<boolean> {
        this._currentIndex = this.getOpenedIndex(this.queryItems());
        return true;
    }

    async onRefresh(): Promise<boolean> {
        return true;
    }

    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
    }

    async switch(index: any): Promise<boolean> {
        if (!this.lock()) {
            return false;
        }
        this.log.debug("Switch to: " + index);

        const items = this.queryItems();
        const nextIdx = calculateNextIndex(index, this._currentIndex, items.length)
        if (nextIdx < 0) {
            return false;
        }
        const current = items[nextIdx];
        this._interactions.mutate(this.updateTargets, nextIdx, current, items);
        this._currentIndex = nextIdx;
        this._busFacade.emit<CuiAccordionEvent>(EVENTS.SWITCHED, {
            index: index,
            currentTarget: current,
            previousTarget: null,
            previous: -1
        })
        this.unlock();
        return true;
    }

    /**
     * Toggles target and closes not needed is setup allows for that
     * @param index - current index to remain opened
     * @param target - target to toggle
     * @param targets - all targets
     */
    private updateTargets(index: number, target: Element, targets: Element[]) {
        if (this.toggleTarget(target) && this.args.single) {
            this.closeAllExcept(index, targets)
        }
    }

    /**
     * Sets or remove active class on target
     * @param target target to toggle
     * @returns Whethet target was opened or not
     */
    private toggleTarget(target: Element) {
        if (this.classes.hasClass(this.activeClassName, target)) {
            this.classes.removeClass(this.activeClassName, target)
            return false;
        }
        this.classes.setClass(this.activeClassName, target)
        return true
    }

    /**
     * Closes all targets except the one that should remain opened
     * @param currentIndex index of current target - to remain opened
     * @param targets - list of targets to operate on
     */
    private closeAllExcept(currentIndex: number, targets: Element[]) {
        targets.forEach((item: Element, index: number) => {
            if (currentIndex !== index && this.classes.hasClass(this.activeClassName, item)) {
                item.classList.remove(this.activeClassName)
            }
        })
    }

    /**
     * Handles element click
     * @param ev 
     */
    private onElementClick(ev: MouseEvent) {
        const target = ev.target as HTMLElement;
        const selector = getChildSelectorFromScoped(this.args.selector);
        if (target.matches(selector)) {
            this._interactions.fetch(() => {
                const foundIdx = this.findMatchingTrigger(target);
                if (foundIdx > -1) {
                    this.switch(foundIdx)
                }
            })
        }
    }

    /**
     * Finds match
     * @param target 
     * @returns index of matching element or -1
     */
    private findMatchingTrigger(target: HTMLElement): number {
        let triggers = queryAll(this.element, this.args.selector);
        return triggers.findIndex(trigger => trigger === target);
    }

    private queryItems(): Element[] {
        return queryAll(this.element, this.args.items)
    }

    private getOpenedIndex(items: Element[]): number {
        return items.findIndex(item => { this.classes.hasClass(this.activeClassName, item) })

    }
}