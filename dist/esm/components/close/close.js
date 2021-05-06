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
import { is, getParentCuiElement, are } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { clickExtension } from "../extensions/click/click";
import { getEventBusFacade } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiComponentBaseHook } from "../base";
import { callbackPerformer } from "../extensions/performers";
export class CuiCloseArgs extends CuiAutoParseArgs {
    constructor(timeout) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
    }
}
export function CuiCloseComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "close",
        create: (element, utils, prefix, attribute) => {
            return new CuiCloseHandler(element, utils, attribute);
        }
    });
}
export class CuiCloseHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiCloseHandler", element, attribute, new CuiCloseArgs(utils.setup.animationTime), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._actionsHelper = new CuiActionsHelper(utils.interactions);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onClose.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: callbackPerformer(() => this.onClose(null))
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
    onClose(ev) {
        if (!this.lock()) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this.log.warning(`Target ${this.args.target} not found`, 'onClick');
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
        });
    }
    run(target) {
        return __awaiter(this, void 0, void 0, function* () {
            let cuiId = target.$cuid;
            if (is(cuiId)) {
                yield this.core.bus.emit(EVENTS.CLOSE, cuiId, this.args.state);
                return false;
            }
            else if (are(this.args.action, this.args.timeout)) {
                let actions = CuiActionsListFactory.get(this.args.action);
                return this._actionsHelper.performActions(target, actions, this.args.timeout, () => {
                    this.classes.removeClass(this.activeClassName, target);
                });
            }
            else {
                this.asyncClasses.removeClasses(target, this.activeClassName);
                return true;
            }
        });
    }
    getTarget() {
        var _a;
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : getParentCuiElement(this.element);
    }
    emitClose(ev) {
        this._busFacade.emit(EVENTS.CLOSED, {
            state: this.args.state,
            event: ev
        });
    }
}
