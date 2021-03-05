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
var _targetId, _isList, _listeners;
import { CuiHandlerBase } from "../../core/handlers/base";
import { is } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
const SWITCHER_LIST_ITEM_SELECTOR = "li > a";
export class CuiSwitcherArgs extends CuiAutoParseArgs {
    constructor() {
        super();
        this.index = "";
        this.target = "";
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
export class CuiSwitcherHandler extends CuiHandlerBase {
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
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setEvents();
            this.getTarget();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getTarget();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.removeEvents();
            return true;
        });
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
