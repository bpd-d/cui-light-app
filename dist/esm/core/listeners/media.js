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
var _onEventBound;
export class CuiMediaQueryListener {
    constructor(mediaQuery) {
        _onEventBound.set(this, void 0);
        this._mediaQuery = mediaQuery;
        this._isInitialized = false;
        this._callback = undefined;
        this._inProgress = false;
        __classPrivateFieldSet(this, _onEventBound, this.event.bind(this));
    }
    setCallback(callback) {
        this._callback = callback;
    }
    isInProgress() {
        return this._inProgress;
    }
    attach() {
        if (!window.matchMedia || this._isInitialized || !this._mediaQuery) {
            return;
        }
        window.matchMedia(this._mediaQuery)
            .addEventListener('change', __classPrivateFieldGet(this, _onEventBound));
        this._isInitialized = true;
    }
    detach() {
        if (this._isInitialized) {
            window.matchMedia(this._mediaQuery).removeEventListener('change', __classPrivateFieldGet(this, _onEventBound));
            this._isInitialized = false;
        }
    }
    isAttached() {
        return this._isInitialized;
    }
    event(ev) {
        if (this._inProgress || !this._callback) {
            return;
        }
        this._inProgress = true;
        try {
            this._callback(ev);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this._inProgress = false;
        }
    }
}
_onEventBound = new WeakMap();
