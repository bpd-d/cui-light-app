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
var _targetId, _isList, _listeners;
import { CuiHandler } from "../../core/handlers/base";
import { is } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
const SWITCHER_LIST_ITEM_SELECTOR = "li > a";
export class CuiSwitcherArgs {
    constructor() {
        this.index = "";
        this.target = "";
    }
    parse(args) {
        if (!is(args)) {
            return;
        }
        this.target = args.target;
        this.index = args.index;
    }
}
export class CuiSwitcherComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-switcher`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiSwitcherHandler(element, utils, this.attribute);
    }
}
export class CuiSwitcherHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiSwitcherHandler", element, attribute, new CuiSwitcherArgs(), utils);
        _targetId.set(this, void 0);
        _isList.set(this, void 0);
        _listeners.set(this, void 0);
        __classPrivateFieldSet(this, _targetId, null);
        __classPrivateFieldSet(this, _isList, element.tagName === 'UL');
        this.onClickEvent = this.onClickEvent.bind(this);
        __classPrivateFieldSet(this, _listeners, []);
    }
    onInit() {
        this.setEvents();
        this.getTarget();
    }
    onUpdate() {
        this.getTarget();
    }
    onDestroy() {
        this.removeEvents();
    }
    getTarget() {
        if (!is(this.args.target)) {
            __classPrivateFieldSet(this, _targetId, null);
        }
        let target = document.querySelector(this.args.target);
        if (is(target)) {
            __classPrivateFieldSet(this, _targetId, target.$cuid);
        }
    }
    setEvents() {
        if (__classPrivateFieldGet(this, _isList)) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el, index) => {
                let list = this.onListItemClick.bind(this, index);
                __classPrivateFieldGet(this, _listeners).push(list);
                //@ts-ignore
                el.addEventListener('click', list);
            });
        }
        else {
            this.element.addEventListener('click', this.onClickEvent);
        }
    }
    removeEvents() {
        if (__classPrivateFieldGet(this, _isList)) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el, index) => {
                if (__classPrivateFieldGet(this, _listeners).length > index)
                    //@ts-ignore
                    el.removeEventListener('click', __classPrivateFieldGet(this, _listeners)[index]);
            });
            __classPrivateFieldSet(this, _listeners, []);
        }
        else {
            this.element.removeEventListener('click', this.onClickEvent);
        }
    }
    onClickEvent(ev) {
        this.getTarget();
        if (!is(this.args.index)) {
            return;
        }
        this.onClick(this.args.index.trim());
    }
    onListItemClick(index, ev) {
        this.getTarget();
        this.onClick(index);
    }
    onClick(index) {
        if (!is(__classPrivateFieldGet(this, _targetId))) {
            return;
        }
        //@ts-ignore  targetId checked already
        this.utils.bus.emit(EVENTS.SWITCH, __classPrivateFieldGet(this, _targetId), index);
    }
}
_targetId = new WeakMap(), _isList = new WeakMap(), _listeners = new WeakMap();
