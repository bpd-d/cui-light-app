var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { clickExtension } from "../extensions/click/click";
import { CuiComponentBaseHook } from "../base";
import { eventExtension } from "../extensions/event/event";
import { getCuiHandlerInteractions, getEventBusFacade } from "../../core/handlers/extensions/facades";
import { callbackPerformer } from "../extensions/performers";
export class CuiToggleArgs extends CuiAutoParseArgs {
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
export function CuiToggleComponent(prefix) {
    return CuiComponentBaseHook({
        name: 'toggle',
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new CuiToggleHandler(element, utils, attribute);
        }
    });
}
/**
 * Events: toggle
 * Emits: Toggled
 */
export class CuiToggleHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
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
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
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
            });
        });
    }
    getTarget() {
        var _a;
        if (!this.args.target) {
            return this.element;
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : this.element;
    }
}
