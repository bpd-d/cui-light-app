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
var _bus, _boundClick;
import { EVENTS } from "../../core/utils/statics";
export class CuiWindowClickPlugin {
    constructor() {
        this.name = 'click-plugin';
        _bus.set(this, void 0);
        _boundClick.set(this, void 0);
        this.description = "CuiWindowClickPlugin";
        __classPrivateFieldSet(this, _bus, undefined);
        __classPrivateFieldSet(this, _boundClick, this.onWindowClick.bind(this));
    }
    init(utils) {
        __classPrivateFieldSet(this, _bus, utils.bus);
        window.addEventListener('click', __classPrivateFieldGet(this, _boundClick));
    }
    destroy() {
        window.removeEventListener('click', __classPrivateFieldGet(this, _boundClick));
    }
    onWindowClick(ev) {
        if (__classPrivateFieldGet(this, _bus))
            __classPrivateFieldGet(this, _bus).emit(EVENTS.WINDOW_CLICK, null, ev);
    }
}
_bus = new WeakMap(), _boundClick = new WeakMap();
