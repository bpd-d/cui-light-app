import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, getParentCuiElement, are } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "../../core/models/arguments";
import { clickExtension } from "../extensions/click/click";
import { InteractionEvent } from "../../core/models/events";
import { getEventBusFacade, ICuiEventBusFacade } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiComponentBaseHook } from "../base";
import { callbackPerformer } from "../extensions/performers";

export class CuiCloseArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    action: string;
    timeout: number;
    state: string;
    prevent: boolean;
    stopPropagation: boolean;

    constructor(timeout?: number) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";
        this.timeout = timeout ?? 300;
    }

}

export function CuiCloseComponent(prefix?: string) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "close",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiCloseHandler(element, utils, attribute);
        }
    })
}

export class CuiCloseHandler extends CuiHandlerBase<CuiCloseArgs> {
    private _busFacade: ICuiEventBusFacade;
    private _actionsHelper: CuiActionsHelper;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiCloseHandler", element, attribute, new CuiCloseArgs(utils.setup.animationTime), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._actionsHelper = new CuiActionsHelper(utils.interactions);

        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onClose.bind(this))
        }))
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: callbackPerformer(() => this.onClose(null))
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

    onClose(ev: MouseEvent | null) {
        if (!this.lock()) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this.log.warning(`Target ${this.args.target} not found`, 'onClick')
            return;
        }

        //@ts-ignore target is checked
        this.run(target).then((result) => {
            if (result)
                this.emitClose(ev);
        }).catch((e) => {
            this.log.exception(e);
        }).finally(() => {
            this.unlock();
        })
    }

    private async run(target: Element): Promise<boolean> {
        let cuiId = (target as any).$cuid;
        if (is(cuiId)) {
            await this.core.bus.emit(EVENTS.CLOSE, cuiId, this.args.state);
            return false;
        } else if (are(this.args.action, this.args.timeout)) {
            let actions = CuiActionsListFactory.get(this.args.action);
            return this._actionsHelper.performActions(target, actions, this.args.timeout, () => {
                this.classes.removeClass(this.activeClassName, target)
            });
        } else {
            this.asyncClasses.removeClasses(target, this.activeClassName);
            return true;
        }
    }

    private getTarget(): Element | undefined {
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return document.querySelector(this.args.target) ?? getParentCuiElement(this.element);
    }

    private emitClose(ev: MouseEvent | null) {
        this._busFacade.emit<InteractionEvent<string>>(EVENTS.CLOSED, {
            state: this.args.state,
            event: ev
        })
    }
}