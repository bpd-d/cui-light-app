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
var _target, _utils, _toggleEventId, _actions;
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickModule } from "../modules/click/click";
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
export class CuiToggleComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : "cui"}-toggle`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiToggleHandler(element, utils, this.attribute);
    }
}
export class CuiToggleHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiToggleHandler", element, attribute, new CuiToggleArgs(), utils);
        _target.set(this, void 0);
        _utils.set(this, void 0);
        _toggleEventId.set(this, void 0);
        _actions.set(this, void 0);
        __classPrivateFieldSet(this, _target, this.element);
        __classPrivateFieldSet(this, _utils, utils);
        __classPrivateFieldSet(this, _toggleEventId, null);
        __classPrivateFieldSet(this, _actions, []);
        this.addModule(new CuiClickModule(element, this.args, this.onClick.bind(this)));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _target, this.getTarget());
            __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
            __classPrivateFieldSet(this, _toggleEventId, this.onEvent(EVENTS.TOGGLE, this.toggle.bind(this)));
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _target, this.getTarget());
            __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.detachEvent(EVENTS.TOGGLE, __classPrivateFieldGet(this, _toggleEventId));
            return true;
        });
    }
    toggle() {
        if (!__classPrivateFieldGet(this, _target)) {
            this.logError("Target in not provided", "toggle");
            return;
        }
        __classPrivateFieldGet(this, _actions).forEach(action => action.toggle(__classPrivateFieldGet(this, _target), __classPrivateFieldGet(this, _utils)));
        this.emitEvent(EVENTS.TOGGLED, {
            action: this.args.action,
            target: __classPrivateFieldGet(this, _target),
            timestamp: Date.now()
        });
    }
    onClick(ev) {
        this.toggle();
    }
    getTarget() {
        var _a;
        if (!this.args.target) {
            return this.element;
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : this.element;
    }
}
_target = new WeakMap(), _utils = new WeakMap(), _toggleEventId = new WeakMap(), _actions = new WeakMap();
