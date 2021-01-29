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
var _callback, _keys, _inProgress, _singleEmit, _isAttached, _onKeyDownBound, _onKeyUpBound;
import { is } from "../utils/functions";
export class CuiKeyPressListener {
    constructor(singleEmit, keys) {
        _callback.set(this, void 0);
        _keys.set(this, void 0);
        _inProgress.set(this, void 0);
        _singleEmit.set(this, void 0);
        _isAttached.set(this, void 0);
        _onKeyDownBound.set(this, void 0);
        _onKeyUpBound.set(this, void 0);
        __classPrivateFieldSet(this, _inProgress, false);
        __classPrivateFieldSet(this, _singleEmit, true);
        __classPrivateFieldSet(this, _isAttached, false);
        __classPrivateFieldSet(this, _callback, undefined);
        __classPrivateFieldSet(this, _keys, keys !== null && keys !== void 0 ? keys : []);
        __classPrivateFieldSet(this, _onKeyDownBound, this.onKeyDown.bind(this));
        __classPrivateFieldSet(this, _onKeyUpBound, this.onKeyUp.bind(this));
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _callback, callback);
    }
    isInProgress() {
        return __classPrivateFieldGet(this, _inProgress);
    }
    attach() {
        document.addEventListener('keydown', __classPrivateFieldGet(this, _onKeyDownBound));
        if (__classPrivateFieldGet(this, _singleEmit)) {
            document.addEventListener('keyup', __classPrivateFieldGet(this, _onKeyUpBound));
        }
        __classPrivateFieldSet(this, _isAttached, true);
    }
    detach() {
        document.removeEventListener('keydown', __classPrivateFieldGet(this, _onKeyDownBound));
        if (__classPrivateFieldGet(this, _singleEmit)) {
            document.addEventListener('keyup', __classPrivateFieldGet(this, _onKeyUpBound));
        }
        __classPrivateFieldSet(this, _isAttached, false);
    }
    isAttached() {
        return __classPrivateFieldGet(this, _isAttached);
    }
    onKeyDown(ev) {
        if (__classPrivateFieldGet(this, _inProgress)) {
            return;
        }
        __classPrivateFieldSet(this, _inProgress, true);
        try {
            if ((!is(__classPrivateFieldGet(this, _keys)) || __classPrivateFieldGet(this, _keys).includes(ev.code)) && __classPrivateFieldGet(this, _callback)) {
                __classPrivateFieldGet(this, _callback).call(this, ev);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            if (!__classPrivateFieldGet(this, _singleEmit))
                __classPrivateFieldSet(this, _inProgress, false);
        }
    }
    onKeyUp(ev) {
        __classPrivateFieldSet(this, _inProgress, false);
    }
}
_callback = new WeakMap(), _keys = new WeakMap(), _inProgress = new WeakMap(), _singleEmit = new WeakMap(), _isAttached = new WeakMap(), _onKeyDownBound = new WeakMap(), _onKeyUpBound = new WeakMap();
