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
import { is, are, getParentCuiElement } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { clickExtension } from "../extensions/click/click";
import { eventExtension } from "../extensions/event/event";
import { getEventBusFacade } from "../../core/handlers/extensions/facades";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiComponentBaseHook } from "../base";
import { callbackPerformer } from "../extensions/performers";
export class CuiOpenArgs extends CuiAutoParseArgs {
    constructor(timeout) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";
    }
}
export function CuiOpenComponent(prefix) {
    return CuiComponentBaseHook({
        name: 'open',
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new CuiOpenHandler(element, utils, attribute);
        }
    });
}
export class CuiOpenHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiOpenHandler", element, attribute, new CuiOpenArgs(utils.setup.animationTime), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._actionsHelper = new CuiActionsHelper(utils.interactions);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onOpen.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            type: "open",
            performer: callbackPerformer(this.onOpen.bind(this))
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
    onOpen(ev) {
        if (!this.lock()) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this.log.warning(`Target ${this.args.target} not found`, 'onClick');
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
        });
    }
    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    run(target) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(target);
            let cuiId = target.$cuid;
            if (is(cuiId)) {
                this.handleClickCui(cuiId);
                return false;
            }
            else {
                this.log.debug("Open html component");
                if (are(this.args.timeout, this.args.action)) {
                    this.log.debug("Perfrom an action");
                    let actions = CuiActionsListFactory.get(this.args.action);
                    return this._actionsHelper.performActions(target, actions, this.args.timeout, () => {
                        this.classes.setClass(this.activeClassName, target);
                    });
                }
                this.asyncClasses.setClasses(target, this.activeClassName);
                return true;
            }
        });
    }
    handleClickCui(cuid) {
        this.log.debug("Open cUI component");
        this.core.bus.emit(EVENTS.OPEN, cuid, this.args.state);
        return false;
    }
    emitOpen(ev) {
        this._busFacade.emit(EVENTS.OPENED, {
            event: ev,
            state: this.args.state
        });
    }
    getTarget() {
        var _a;
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : getParentCuiElement(this.element);
    }
}
