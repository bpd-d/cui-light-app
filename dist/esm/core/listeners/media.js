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
var _mediaQuery, _callback, _isInitialized, _inProgress, _onEventBound;
export class CuiMediaQueryListener {
    constructor(mediaQuery) {
        _mediaQuery.set(this, void 0);
        _callback.set(this, void 0);
        _isInitialized.set(this, void 0);
        _inProgress.set(this, void 0);
        _onEventBound.set(this, void 0);
        __classPrivateFieldSet(this, _mediaQuery, mediaQuery);
        __classPrivateFieldSet(this, _isInitialized, false);
        __classPrivateFieldSet(this, _callback, undefined);
        __classPrivateFieldSet(this, _inProgress, false);
        __classPrivateFieldSet(this, _onEventBound, this.event.bind(this));
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _callback, callback);
    }
    isInProgress() {
        return __classPrivateFieldGet(this, _inProgress);
    }
    attach() {
        if (!window.matchMedia || __classPrivateFieldGet(this, _isInitialized) || !__classPrivateFieldGet(this, _mediaQuery)) {
            return;
        }
        window.matchMedia(__classPrivateFieldGet(this, _mediaQuery))
            .addEventListener('change', __classPrivateFieldGet(this, _onEventBound));
        __classPrivateFieldSet(this, _isInitialized, true);
    }
    detach() {
        if (__classPrivateFieldGet(this, _isInitialized)) {
            window.matchMedia(__classPrivateFieldGet(this, _mediaQuery)).removeEventListener('change', __classPrivateFieldGet(this, _onEventBound));
            __classPrivateFieldSet(this, _isInitialized, false);
        }
    }
    isAttached() {
        return __classPrivateFieldGet(this, _isInitialized);
    }
    event(ev) {
        if (__classPrivateFieldGet(this, _inProgress) || !__classPrivateFieldGet(this, _callback)) {
            return;
        }
        __classPrivateFieldSet(this, _inProgress, true);
        try {
            __classPrivateFieldGet(this, _callback).call(this, ev);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            __classPrivateFieldSet(this, _inProgress, false);
        }
    }
}
_mediaQuery = new WeakMap(), _callback = new WeakMap(), _isInitialized = new WeakMap(), _inProgress = new WeakMap(), _onEventBound = new WeakMap();
