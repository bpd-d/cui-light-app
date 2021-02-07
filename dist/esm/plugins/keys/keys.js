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
var _keysObserver;
import { CuiKeysObserver } from "./observer";
export class CuiKeysObserverPlugin {
    constructor(keySetup) {
        this.name = 'keys-plugin';
        _keysObserver.set(this, void 0);
        this.description = "CuiKeysObserverPlugin";
        this.setup = keySetup;
        __classPrivateFieldSet(this, _keysObserver, undefined);
    }
    init(utils) {
        __classPrivateFieldSet(this, _keysObserver, new CuiKeysObserver(utils.bus));
        __classPrivateFieldGet(this, _keysObserver).connect();
    }
    destroy() {
        if (__classPrivateFieldGet(this, _keysObserver))
            __classPrivateFieldGet(this, _keysObserver).disconnect();
    }
}
_keysObserver = new WeakMap();
