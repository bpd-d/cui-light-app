var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prefix, _eventId;
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, getParentCuiElement, are } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickModule } from "../modules/click/click";
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
export class CuiCloseComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix)}-close`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiCloseHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiCloseHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiCloseHandler", element, attribute, new CuiCloseArgs(utils.setup.animationTime), utils);
        _eventId.set(this, void 0);
        __classPrivateFieldSet(this, _eventId, null);
        this.addModule(new CuiClickModule(this.element, this.args, this.onClose.bind(this)));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _eventId, this.onEvent(EVENTS.CLOSE, this.onClose.bind(this)));
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
            this.detachEvent(EVENTS.CLOSE, __classPrivateFieldGet(this, _eventId));
            return true;
        });
    }
    onClose(ev) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick');
            return;
        }
        this.isLocked = true;
        //@ts-ignore target is checked
        this.run(target).then((result) => {
            if (result)
                this.emitClose(ev);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        });
    }
    run(target) {
        return __awaiter(this, void 0, void 0, function* () {
            let cuiId = target.$cuid;
            if (is(cuiId)) {
                yield this.utils.bus.emit(EVENTS.CLOSE, cuiId, this.args.state);
                return false;
            }
            else if (are(this.args.action, this.args.timeout)) {
                let actions = CuiActionsListFactory.get(this.args.action);
                return this.actionsHelper.performActions(target, actions, this.args.timeout, () => {
                    this.helper.removeClass(this.activeClassName, target);
                });
            }
            else {
                this.helper.removeClassesAs(target, this.activeClassName);
                return true;
            }
        });
    }
    // private removeActiveClass(target: Element) {
    //     if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
    //         this.helper.removeClass(this.activeClassName, target);
    //     }
    // }
    // private removeActiveClassAsync(target: Element) {
    //     this.fetch(() => {
    //         if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
    //             this.helper.removeClassesAs(target, this.activeClassName);
    //         }
    //     })
    // }
    // private onActionFinish(ev: MouseEvent, shouldEmit: boolean) {
    //     if (shouldEmit)
    //         this.emitClose(ev);
    // }
    getTarget() {
        var _a;
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : getParentCuiElement(this.element);
    }
    emitClose(ev) {
        this.emitEvent(EVENTS.CLOSED, {
            state: this.args.state,
            event: ev
        });
    }
}
_eventId = new WeakMap();
