import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, are, getParentCuiElement } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "../../core/models/arguments";
import { clickExtension } from "../extensions/click/click";
import { InteractionEvent } from "../../core/models/events";
import { eventExtension } from "../extensions/event/event";
import { getEventBusFacade, ICuiEventBusFacade } from "../../core/handlers/extensions/facades";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiComponentBaseHook } from "../base";
import { callbackPerformer } from "../extensions/performers";

export class CuiOpenArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    stopPropagation: boolean;

    constructor(timeout?: number) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.timeout = timeout ?? 300;
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";

    }

}


export function CuiOpenComponent(prefix?: string) {
    return CuiComponentBaseHook({
        name: 'open',
        prefix: prefix,
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiOpenHandler(element, utils, attribute);
        }
    })
}

export class CuiOpenHandler extends CuiHandlerBase<CuiOpenArgs> {
    private _busFacade: ICuiEventBusFacade;
    private _actionsHelper: CuiActionsHelper;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiOpenHandler", element, attribute, new CuiOpenArgs(utils.setup.animationTime), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._actionsHelper = new CuiActionsHelper(utils.interactions);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onOpen.bind(this))
        }))
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            type: "open",
            performer: callbackPerformer(this.onOpen.bind(this))
        }))
    }

    async onHandle(): Promise<boolean> {
        return true;
    }
    async onRefresh(): Promise<boolean> {
        return true;
    }
    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
    }

    private onOpen(ev: MouseEvent) {
        if (!this.lock()) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this.log.warning(`Target ${this.args.target} not found`, 'onClick')
            return;
        }
        //@ts-ignore - target checked
        this.run(target).then((result) => {
            //@ts-ignore - target checked
            if (result)
                this.emitOpen(ev);
        }).catch((e) => {
            this.log.exception(e);
        }).finally(() => {
            this.unlock();
        })
    }

    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    private async run(target: Element): Promise<boolean> {
        console.log(target)
        let cuiId = (target as any).$cuid;
        if (is(cuiId)) {
            this.handleClickCui(cuiId);
            return false;
        } else {
            this.log.debug("Open html component")
            if (are(this.args.timeout, this.args.action)) {
                this.log.debug("Perfrom an action")
                let actions = CuiActionsListFactory.get(this.args.action)
                return this._actionsHelper.performActions(target, actions, this.args.timeout, () => {
                    this.classes.setClass(this.activeClassName, target);
                });
            }
            this.asyncClasses.setClasses(target, this.activeClassName);
            return true;
        }
    }

    handleClickCui(cuid: string) {
        this.log.debug("Open cUI component")
        this.core.bus.emit(EVENTS.OPEN, cuid, this.args.state);
        return false;
    }


    private emitOpen(ev: MouseEvent) {
        this._busFacade.emit<InteractionEvent<string>>(EVENTS.OPENED, {
            event: ev,
            state: this.args.state
        })
    }

    private getTarget(): Element | undefined {
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return document.querySelector(this.args.target) ?? getParentCuiElement(this.element);
    }
}