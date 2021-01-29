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
import { CuiHandler } from "../../core/handlers/base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { is, isString, getStringOrDefault } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
export class CuiToggleArgs {
    constructor() {
        this.action = "";
        this.target = "";
    }
    parse(args) {
        if (is(args) && isString(args)) {
            this.action = args;
        }
        else {
            this.target = getStringOrDefault(args.target, "");
            this.action = args.action;
        }
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
export class CuiToggleHandler extends CuiHandler {
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
        this.onClick = this.onClick.bind(this);
    }
    onInit() {
        __classPrivateFieldSet(this, _target, this.getTarget());
        __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
        this.element.addEventListener('click', this.onClick);
        __classPrivateFieldSet(this, _toggleEventId, this.onEvent(EVENTS.TOGGLE, this.toggle.bind(this)));
    }
    onUpdate() {
        __classPrivateFieldSet(this, _target, this.getTarget());
        __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
    }
    onDestroy() {
        this.element.removeEventListener('click', this.onClick);
        this.detachEvent(EVENTS.TOGGLE, __classPrivateFieldGet(this, _toggleEventId));
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
        ev.preventDefault();
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
