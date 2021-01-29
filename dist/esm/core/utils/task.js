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
var _taskId, _autoRenew, _timeout, _callback;
import { is } from "./functions";
export class CuiTaskRunner {
    constructor(timeout, autoRenew, callback) {
        _taskId.set(this, void 0);
        _autoRenew.set(this, void 0);
        _timeout.set(this, void 0);
        _callback.set(this, void 0);
        __classPrivateFieldSet(this, _autoRenew, autoRenew);
        __classPrivateFieldSet(this, _timeout, timeout);
        __classPrivateFieldSet(this, _callback, callback);
    }
    start() {
        if (!this.canRun()) {
            return;
        }
        this.stop();
        __classPrivateFieldSet(this, _taskId, setTimeout(() => {
            //@ts-ignore - already checked in canRun
            __classPrivateFieldGet(this, _callback).call(this);
            __classPrivateFieldSet(this, _taskId, null);
            if (__classPrivateFieldGet(this, _autoRenew)) {
                this.start();
            }
        }, __classPrivateFieldGet(this, _timeout)));
    }
    stop() {
        if (__classPrivateFieldGet(this, _taskId)) {
            clearTimeout(__classPrivateFieldGet(this, _taskId));
            __classPrivateFieldSet(this, _taskId, null);
        }
    }
    getId() {
        return __classPrivateFieldGet(this, _taskId);
    }
    canRun() {
        return is(__classPrivateFieldGet(this, _callback)) && __classPrivateFieldGet(this, _timeout) > 0;
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _callback, callback);
    }
    setTimeout(timeout) {
        __classPrivateFieldSet(this, _timeout, timeout);
    }
}
_taskId = new WeakMap(), _autoRenew = new WeakMap(), _timeout = new WeakMap(), _callback = new WeakMap();
