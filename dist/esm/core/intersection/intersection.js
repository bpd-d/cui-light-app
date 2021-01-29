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
var _scrollListener, _callback, _children, _box;
import { CuiScrollListener } from "../listeners/scroll";
import { CuiElementBoxFactory } from "../models/elements";
import { are, getRangeValue } from "../utils/functions";
const DEFAULT_OPTION_THRESHOLD = 0;
export class CuiIntersectionListener {
    constructor(element, options) {
        var _a;
        _scrollListener.set(this, void 0);
        _callback.set(this, void 0);
        _children.set(this, void 0);
        _box.set(this, void 0);
        __classPrivateFieldSet(this, _box, CuiElementBoxFactory.get(element));
        __classPrivateFieldSet(this, _scrollListener, new CuiScrollListener(element, (_a = options === null || options === void 0 ? void 0 : options.threshold) !== null && _a !== void 0 ? _a : DEFAULT_OPTION_THRESHOLD));
        __classPrivateFieldGet(this, _scrollListener).setCallback(this.onScroll.bind(this));
        __classPrivateFieldSet(this, _children, []);
        __classPrivateFieldSet(this, _callback, undefined);
    }
    /**
     * Sets child elements - ratio is calcutalated based on them
     * @param children
     */
    setChildren(children) {
        __classPrivateFieldSet(this, _children, children);
    }
    setThreshold(threshold) {
        __classPrivateFieldGet(this, _scrollListener).setThreshold(threshold);
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _callback, callback);
    }
    setParent(target) {
        __classPrivateFieldSet(this, _box, CuiElementBoxFactory.get(target));
        __classPrivateFieldGet(this, _scrollListener).setTarget(target);
    }
    isInProgress() {
        return __classPrivateFieldGet(this, _scrollListener).isInProgress();
    }
    attach() {
        if (this.isAttached()) {
            return;
        }
        __classPrivateFieldGet(this, _scrollListener).attach();
    }
    detach() {
        if (!this.isAttached()) {
            return;
        }
        __classPrivateFieldGet(this, _scrollListener).detach();
    }
    isAttached() {
        return __classPrivateFieldGet(this, _scrollListener) && __classPrivateFieldGet(this, _scrollListener).isAttached();
    }
    onScroll(ev) {
        if (!are(__classPrivateFieldGet(this, _children), __classPrivateFieldGet(this, _callback))) {
            return;
        }
        if (__classPrivateFieldGet(this, _callback))
            __classPrivateFieldGet(this, _callback).call(this, this.prepareCallbackResult(ev));
    }
    calcChildVerticalRatio(child, currentTop, currentBottom) {
        let childBottom = child.offsetTop + child.offsetHeight;
        // Simulated top if view top is outside of parent then takes parent top
        let symTop = currentTop > child.offsetTop ? currentTop : child.offsetTop;
        // Simulated bottom if view bottom is outside of parent then takes parent bottom
        let symBottom = currentBottom < childBottom ? currentBottom : childBottom;
        // Calculates amount of pixels that are in view
        let diff = symBottom - symTop;
        // Calculates ratio - how much of a child is in parent view
        let ratio = diff / child.offsetHeight;
        return getRangeValue(ratio, 0, 1);
    }
    calcChildHorizontalRatio(child, currentLeft, currentRight) {
        let childRight = child.offsetLeft + child.offsetWidth;
        // Simulated top if view left is outside of parent then takes parent left
        let symLeft = currentLeft > child.offsetLeft ? currentLeft : child.offsetLeft;
        // Simulated bottom if view right is outside of parent then takes parent right
        let symRight = currentRight < childRight ? currentRight : childRight;
        // Calculates amount of pixels that are in view
        let diff = symRight - symLeft;
        // Calculates ratio - how much of a child is in parent view
        let ratio = diff / child.offsetWidth;
        return getRangeValue(ratio, 0, 1);
    }
    prepareCallbackResult(ev) {
        var _a, _b;
        let parentBottom = ev.top + __classPrivateFieldGet(this, _box).getHeight();
        let parentRight = ev.left + __classPrivateFieldGet(this, _box).getWidth();
        let result = {
            ev: ev.base,
            top: ev.top,
            left: ev.left,
            scrolling: (_a = ev.scrolling) !== null && _a !== void 0 ? _a : false,
            initial: (_b = ev.initial) !== null && _b !== void 0 ? _b : false,
            source: ev.source,
            items: __classPrivateFieldGet(this, _children).map((child, index) => {
                let verticalRatio = this.calcChildVerticalRatio(child, ev.top, parentBottom);
                let horizontalRatio = this.calcChildHorizontalRatio(child, ev.left, parentRight);
                return {
                    verticalRatio: verticalRatio,
                    horizontalRatio: horizontalRatio,
                    element: child
                };
            })
        };
        return result;
    }
}
_scrollListener = new WeakMap(), _callback = new WeakMap(), _children = new WeakMap(), _box = new WeakMap();
