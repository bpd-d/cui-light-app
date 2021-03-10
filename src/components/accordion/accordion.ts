import { ICuiComponent, ICuiComponentHandler, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { getIntOrDefault, replacePrefix, joinWithScopeSelector, is, getChildSelectorFromScoped } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiAccordionEvent } from "src/core/models/events";
import { CuiClickModule } from "../modules/click/click";
import { CuiClickableArgs } from "../../core/models/arguments";

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

export class CuiAccordionComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-accordion`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiAccordionHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiAccordionHandler extends CuiHandlerBase<CuiAccordionArgs> implements ICuiSwitchable {

    #items: Element[];
    #switchEventId: string | null;
    #targetSelector: string;

    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiAccordionHandler", element, attribute, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        this.#switchEventId = null;
        this.#items = [];
        this.#switchEventId = null;
        this.#targetSelector = "";
        this.addModule(new CuiClickModule(element, this.args, this.onElementClick.bind(this)))
    }

    async onHandle(): Promise<boolean> {
        this.#switchEventId = this.onEvent(EVENTS.SWITCH, this.onSwitch.bind(this));
        this.#targetSelector = getChildSelectorFromScoped(this.args.selector);
        return true;
    }

    async onRefresh(): Promise<boolean> {
        this.#targetSelector = getChildSelectorFromScoped(this.args.selector);
        return true;
    }

    async onRemove(): Promise<boolean> {
        this.detachEvent(EVENTS.SWITCH, this.#switchEventId);
        return true;
    }

    async switch(index: number): Promise<boolean> {
        this._log.debug("Switch to: " + index);
        if (index < 0 || this.isLocked || !this.isInitialized) {
            return false;
        }

        this.#items = this.queryItems();
        if (this.#items.length <= index) {
            return false;
        }
        this.isLocked = true;
        const current = this.#items[index]
        this.openCloseTarget(index, current);
        this.emitEvent<CuiAccordionEvent>(EVENTS.SWITCHED, {
            index: index,
            currentTarget: current,
            previousTarget: null,
            previous: -1
        })
        this.isLocked = false;
        return true;
    }

    private openCloseTarget(index: number, target: Element) {
        if (this.helper.hasClass(this.activeClassName, target)) {
            this.helper.removeClassesAs(target, this.activeClassName)
        } else {
            this.mutate(() => {
                if (this.args.single) {
                    this.closeAllExcept(index)
                }
                this.helper.setClass(this.activeClassName, target)
            })
        }
    }

    private onSwitch(index: any): void {
        this.switch(getIntOrDefault(index, -1)).then(() => {
            this._log.debug("Switch from event to " + index);
        });
    }

    private closeAllExcept(current: number) {
        this.#items.forEach((item: Element, index: number) => {
            if (current !== index && this.helper.hasClass(this.activeClassName, item)) {
                item.classList.remove(this.activeClassName)
            }
        })
    }

    private onElementClick(ev: MouseEvent) {
        let target = ev.target as HTMLElement;
        if (target.matches(this.#targetSelector)) {
            this.fetch(() => {
                let triggers = [...this.element.querySelectorAll(this.args.selector)];
                if (!is(triggers)) {
                    return;
                }
                let foundIndex = triggers.findIndex(trigger => trigger === target);
                if (foundIndex >= 0) {
                    this.switch(foundIndex);
                }
            })
        }
    }

    private queryItems(): Element[] {
        return [...this.element.querySelectorAll(this.args.items)]
    }
}