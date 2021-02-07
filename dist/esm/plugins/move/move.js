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
var _moveObserver, _gesturesEnabled;
import { CuiMoveObserver } from "./observer";
export class CuiMoveObserverPlugin {
    constructor(gestures) {
        this.name = 'move-observer-plugin';
        _moveObserver.set(this, void 0);
        _gesturesEnabled.set(this, void 0);
        this.description = "CuiMoveObserverPlugin";
        __classPrivateFieldSet(this, _moveObserver, undefined);
        __classPrivateFieldSet(this, _gesturesEnabled, gestures === false ? false : true);
    }
    init(utils) {
        __classPrivateFieldSet(this, _moveObserver, new CuiMoveObserver(utils.bus, __classPrivateFieldGet(this, _gesturesEnabled)));
        __classPrivateFieldGet(this, _moveObserver).attach();
    }
    destroy() {
        if (__classPrivateFieldGet(this, _moveObserver) && __classPrivateFieldGet(this, _moveObserver).isAttached())
            __classPrivateFieldGet(this, _moveObserver).detach();
    }
}
_moveObserver = new WeakMap(), _gesturesEnabled = new WeakMap();
