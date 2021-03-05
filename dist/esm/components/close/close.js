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
export class CuiCloseArgs extends CuiAutoParseArgs {
    constructor(timeout) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.prevent = false;
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
        this.onClick = this.onClick.bind(this);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.addEventListener('click', this.onClick);
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
            this.element.removeEventListener('click', this.onClick);
            this.detachEvent(EVENTS.CLOSE, __classPrivateFieldGet(this, _eventId));
            return true;
        });
    }
    onClick(ev) {
        this.onClose(ev);
        if (this.args.prevent)
            ev.preventDefault();
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
            this.onActionFinish(ev, result);
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
                    this.removeActiveClass(target);
                });
            }
            else {
                this.removeActiveClassAsync(target);
                return true;
            }
        });
    }
    removeActiveClass(target) {
        if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
            this.helper.removeClass(this.activeClassName, target);
        }
    }
    removeActiveClassAsync(target) {
        this.fetch(() => {
            if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
                this.helper.removeClassesAs(target, this.activeClassName);
            }
        });
    }
    onActionFinish(ev, shouldEmit) {
        if (shouldEmit)
            this.emitClose(ev);
    }
    getTarget() {
        var _a;
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : getParentCuiElement(this.element);
    }
    emitClose(ev) {
        this.emitEvent(EVENTS.CLOSED, {
            timestamp: Date.now(),
            state: this.args.state,
            event: ev
        });
    }
}
_eventId = new WeakMap();
