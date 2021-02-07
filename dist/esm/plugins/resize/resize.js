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
var _resizeObserver;
import { CuiResizeObserver } from "./observer";
export class CuiResizeObserverPlugin {
    constructor(setup) {
        this.name = 'resize-observer-plugin';
        _resizeObserver.set(this, void 0);
        this.description = "CuiResizeObserverPlugin";
        __classPrivateFieldSet(this, _resizeObserver, undefined);
        this.setup = setup;
    }
    init(utils) {
        var _a;
        __classPrivateFieldSet(this, _resizeObserver, new CuiResizeObserver(utils.bus, (_a = this.setup.resizeThreshold) !== null && _a !== void 0 ? _a : 20));
        __classPrivateFieldGet(this, _resizeObserver).connect();
    }
    destroy() {
        if (__classPrivateFieldGet(this, _resizeObserver))
            __classPrivateFieldGet(this, _resizeObserver).disconnect();
    }
}
_resizeObserver = new WeakMap();
