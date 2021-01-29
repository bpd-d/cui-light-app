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
var _root, _moveHandler, _onDragStart, _onDragOver, _onDragEnd, _timeout, _isTracking, _timeoutId;
import { CuiMoveEventListener } from "../../listeners/move";
export class CuiDragHandler {
    constructor(root) {
        _root.set(this, void 0);
        _moveHandler.set(this, void 0);
        _onDragStart.set(this, void 0);
        _onDragOver.set(this, void 0);
        _onDragEnd.set(this, void 0);
        _timeout.set(this, void 0);
        _isTracking.set(this, void 0);
        _timeoutId.set(this, void 0);
        __classPrivateFieldSet(this, _root, root);
        __classPrivateFieldSet(this, _moveHandler, new CuiMoveEventListener());
        __classPrivateFieldSet(this, _timeout, 150);
        __classPrivateFieldSet(this, _isTracking, false);
        __classPrivateFieldSet(this, _timeoutId, undefined);
        __classPrivateFieldGet(this, _moveHandler).setTarget(__classPrivateFieldGet(this, _root));
        __classPrivateFieldGet(this, _moveHandler).preventDefault(false);
        __classPrivateFieldGet(this, _moveHandler).setCallback(this.onMove.bind(this));
        __classPrivateFieldSet(this, _onDragStart, undefined);
        __classPrivateFieldSet(this, _onDragOver, undefined);
        __classPrivateFieldSet(this, _onDragEnd, undefined);
    }
    setLongPressTimeout(timeout) {
        __classPrivateFieldSet(this, _timeout, timeout);
    }
    onDragStart(callback) {
        __classPrivateFieldSet(this, _onDragStart, callback);
    }
    onDragOver(callback) {
        __classPrivateFieldSet(this, _onDragOver, callback);
    }
    onDragEnd(callback) {
        __classPrivateFieldSet(this, _onDragEnd, callback);
    }
    attach() {
        __classPrivateFieldGet(this, _moveHandler).attach();
    }
    detach() {
        __classPrivateFieldGet(this, _moveHandler).detach();
    }
    onMove(data) {
        switch (data.type) {
            case "down":
                if (__classPrivateFieldGet(this, _isTracking)) {
                    return;
                }
                __classPrivateFieldSet(this, _timeoutId, setTimeout(() => {
                    if (__classPrivateFieldGet(this, _onDragStart) && __classPrivateFieldGet(this, _onDragStart).call(this, data)) {
                        __classPrivateFieldSet(this, _isTracking, true);
                    }
                }, __classPrivateFieldGet(this, _timeout)));
                break;
            case "move":
                this.cancelTimeout();
                if (!__classPrivateFieldGet(this, _isTracking)) {
                    return;
                }
                if (__classPrivateFieldGet(this, _onDragOver)) {
                    __classPrivateFieldGet(this, _onDragOver).call(this, data);
                }
                break;
            case "up":
                this.cancelTimeout();
                if (!__classPrivateFieldGet(this, _isTracking)) {
                    return;
                }
                if (__classPrivateFieldGet(this, _onDragEnd)) {
                    __classPrivateFieldGet(this, _onDragEnd).call(this, data);
                }
                __classPrivateFieldSet(this, _isTracking, false);
                break;
        }
    }
    cancelTimeout() {
        if (__classPrivateFieldGet(this, _timeoutId)) {
            clearTimeout(__classPrivateFieldGet(this, _timeoutId));
            __classPrivateFieldSet(this, _timeoutId, undefined);
        }
    }
}
_root = new WeakMap(), _moveHandler = new WeakMap(), _onDragStart = new WeakMap(), _onDragOver = new WeakMap(), _onDragEnd = new WeakMap(), _timeout = new WeakMap(), _isTracking = new WeakMap(), _timeoutId = new WeakMap();
