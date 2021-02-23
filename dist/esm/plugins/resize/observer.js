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
var _items, _promises, _prevYValue, _inProgress, _previousSize, _threshold, _bus, _listenerBoundCall;
import { calcWindowSize } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
export class CuiResizeObserver {
    constructor(bus, threshold) {
        _items.set(this, void 0);
        _promises.set(this, void 0);
        _prevYValue.set(this, void 0);
        _inProgress.set(this, void 0);
        _previousSize.set(this, void 0);
        _threshold.set(this, void 0);
        _bus.set(this, void 0);
        _listenerBoundCall.set(this, void 0);
        __classPrivateFieldSet(this, _items, []);
        __classPrivateFieldSet(this, _promises, []);
        __classPrivateFieldSet(this, _prevYValue, window.innerWidth);
        __classPrivateFieldSet(this, _inProgress, false);
        __classPrivateFieldSet(this, _previousSize, calcWindowSize(window.innerWidth));
        __classPrivateFieldSet(this, _threshold, threshold !== null && threshold !== void 0 ? threshold : 0);
        __classPrivateFieldSet(this, _bus, bus);
        __classPrivateFieldSet(this, _listenerBoundCall, this.listener.bind(this));
    }
    observe(target) {
        let idx = __classPrivateFieldGet(this, _items).findIndex(x => x === target);
        if (idx < 0) {
            __classPrivateFieldGet(this, _items).push(target);
        }
    }
    unobserve(target) {
        let idx = __classPrivateFieldGet(this, _items).findIndex(x => x === target);
        if (idx >= 0) {
            __classPrivateFieldGet(this, _items).splice(idx, 1);
        }
    }
    connect() {
        window.addEventListener('resize', __classPrivateFieldGet(this, _listenerBoundCall));
    }
    disconnect() {
        window.removeEventListener('resize', __classPrivateFieldGet(this, _listenerBoundCall));
    }
    pushUpdateToItems(resizeData) {
        if (__classPrivateFieldGet(this, _items).length < 1) {
            return;
        }
        __classPrivateFieldSet(this, _promises, []);
        __classPrivateFieldGet(this, _items).forEach(x => {
            __classPrivateFieldGet(this, _promises).push(x.resize(resizeData));
        });
        Promise.all(__classPrivateFieldGet(this, _promises));
        __classPrivateFieldSet(this, _promises, []);
    }
    listener(ev) {
        if (__classPrivateFieldGet(this, _inProgress)) {
            return;
        }
        __classPrivateFieldSet(this, _inProgress, true);
        const diff = window.innerWidth - __classPrivateFieldGet(this, _prevYValue);
        if (Math.abs(diff) >= __classPrivateFieldGet(this, _threshold)) {
            const currentSize = calcWindowSize(window.innerWidth);
            if (currentSize !== __classPrivateFieldGet(this, _previousSize)) {
                const resizeData = {
                    current: currentSize,
                    previous: __classPrivateFieldGet(this, _previousSize),
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: Date.now(),
                    name: EVENTS.RESIZE,
                    source: "CuiResizeObserver"
                };
                __classPrivateFieldGet(this, _bus).emit(EVENTS.RESIZE, "", resizeData);
                this.pushUpdateToItems(resizeData);
                __classPrivateFieldSet(this, _previousSize, currentSize);
            }
        }
        __classPrivateFieldSet(this, _inProgress, false);
    }
}
_items = new WeakMap(), _promises = new WeakMap(), _prevYValue = new WeakMap(), _inProgress = new WeakMap(), _previousSize = new WeakMap(), _threshold = new WeakMap(), _bus = new WeakMap(), _listenerBoundCall = new WeakMap();
