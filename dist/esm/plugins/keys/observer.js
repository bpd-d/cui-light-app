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
var _listener, _bus;
import { CuiKeyPressListener } from "../../core/listeners/keys";
import { EVENTS } from "../../core/utils/statics";
export class CuiKeysObserver {
    constructor(bus) {
        _listener.set(this, void 0);
        _bus.set(this, void 0);
        __classPrivateFieldSet(this, _bus, bus);
        __classPrivateFieldSet(this, _listener, new CuiKeyPressListener(true));
        __classPrivateFieldGet(this, _listener).setCallback(this.onKeyDown.bind(this));
    }
    connect() {
        __classPrivateFieldGet(this, _listener).attach();
    }
    disconnect() {
        __classPrivateFieldGet(this, _listener).detach();
    }
    onKeyDown(ev) {
        __classPrivateFieldGet(this, _bus).emit(EVENTS.KEYDOWN, null, {
            timestamp: Date.now(),
            event: ev
        });
    }
}
_listener = new WeakMap(), _bus = new WeakMap();
