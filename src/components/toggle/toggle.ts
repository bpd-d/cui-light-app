import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { clickExtension } from "../extensions/click/click";
import { CuiClickableArgs } from "../../core/models/arguments";
import { CuiComponentBaseHook } from "../base";
import { eventExtension } from "../extensions/event/event";
import { getCuiHandlerInteractions, getEventBusFacade, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { callbackPerformer } from "../extensions/performers";

export class CuiToggleArgs extends CuiAutoParseArgs implements CuiClickableArgs {

    target: string;
    action: string;
    prevent: boolean;
    stopPropagation: boolean;

    constructor() {
        super({
            main: "action"
        });
        this.action = "";
        this.target = "";
        this.prevent = false;
        this.stopPropagation = false;
    }

}

export function CuiToggleComponent(prefix?: string) {
    return CuiComponentBaseHook({
        name: 'toggle',
        prefix: prefix,
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiToggleHandler(element, utils, attribute);
        }
    })
}

/**
 * Events: toggle
 * Emits: Toggled
 */

export class CuiToggleHandler extends CuiHandlerBase<CuiToggleArgs> {

    private _busFacade: ICuiEventBusFacade;
    private _interactions: ICuiInteractionsFacade;

    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiToggleHandler", element, attribute, new CuiToggleArgs(), utils);

        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.toggle.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.TOGGLE,
            performer: callbackPerformer(this.toggle.bind(this))
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

    toggle() {
        const target = this.getTarget();
        if (!target) {
            this.logError("Target in not provided", "toggle");
            return;
        }
        const actions = CuiActionsListFactory.get(this.args.action);
        this._interactions.mutate(() => {
            actions.forEach(action => action.toggle(target, this.core));
            this._busFacade.emit(EVENTS.TOGGLED, {
                action: this.args.action,
                target: target,
                timestamp: Date.now()
            })
        })

    }

    getTarget(): Element | null {
        if (!this.args.target) {
            return this.element;
        }
        return document.querySelector(this.args.target) ?? this.element;
    }
}