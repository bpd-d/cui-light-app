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
var _observer, _root, _threshold, _callback;
export class CuiIntersectionEntry {
    constructor() {
        this.isInView = false;
        this.ratio = 0;
    }
}
/**
 * Creates a wrapper for intersection observer
 * Constructor gets a root element for observer and optional array of threshold values [0...1]
 */
export class CuiIntersectionObserver {
    constructor(root, threshold) {
        _observer.set(this, void 0);
        _root.set(this, void 0);
        _threshold.set(this, void 0);
        _callback.set(this, void 0);
        __classPrivateFieldSet(this, _root, root);
        __classPrivateFieldSet(this, _threshold, threshold !== null && threshold !== void 0 ? threshold : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
        __classPrivateFieldSet(this, _callback, undefined);
        __classPrivateFieldSet(this, _observer, undefined);
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _callback, callback);
    }
    connect() {
        if (!__classPrivateFieldGet(this, _callback)) {
            return;
        }
        __classPrivateFieldSet(this, _observer, new IntersectionObserver(__classPrivateFieldGet(this, _callback), {
            root: __classPrivateFieldGet(this, _root),
            rootMargin: '0px',
            threshold: __classPrivateFieldGet(this, _threshold)
        }));
    }
    observe(target) {
        if (__classPrivateFieldGet(this, _observer))
            __classPrivateFieldGet(this, _observer).observe(target);
    }
    unobserve(target) {
        if (__classPrivateFieldGet(this, _observer))
            __classPrivateFieldGet(this, _observer).unobserve(target);
    }
    disconnect() {
        if (__classPrivateFieldGet(this, _observer))
            __classPrivateFieldGet(this, _observer).disconnect();
    }
}
_observer = new WeakMap(), _root = new WeakMap(), _threshold = new WeakMap(), _callback = new WeakMap();
