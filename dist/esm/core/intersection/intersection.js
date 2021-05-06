import { CuiScrollListener } from "../listeners/scroll";
import { CuiElementBoxFactory } from "../models/elements";
import { are, getRangeValue } from "../utils/functions";
const DEFAULT_OPTION_THRESHOLD = 0;
export class CuiIntersectionListener {
    constructor(element, options) {
        var _a;
        this._box = CuiElementBoxFactory.get(element);
        this._scrollListener = new CuiScrollListener(element, (_a = options === null || options === void 0 ? void 0 : options.threshold) !== null && _a !== void 0 ? _a : DEFAULT_OPTION_THRESHOLD);
        this._scrollListener.setCallback(this.onScroll.bind(this));
        this._children = [];
        this._callback = undefined;
    }
    /**
     * Sets child elements - ratio is calcutalated based on them
     * @param children
     */
    setChildren(children) {
        this._children = children;
    }
    setThreshold(threshold) {
        this._scrollListener.setThreshold(threshold);
    }
    setCallback(callback) {
        this._callback = callback;
    }
    setParent(target) {
        this._box = CuiElementBoxFactory.get(target);
        this._scrollListener.setTarget(target);
    }
    isInProgress() {
        return this._scrollListener.isInProgress();
    }
    attach() {
        if (this.isAttached()) {
            return;
        }
        this._scrollListener.attach();
    }
    detach() {
        if (!this.isAttached()) {
            return;
        }
        this._scrollListener.detach();
    }
    isAttached() {
        return this._scrollListener && this._scrollListener.isAttached();
    }
    onScroll(ev) {
        if (!are(this._children, this._callback)) {
            return;
        }
        if (this._callback)
            this._callback(this.prepareCallbackResult(ev));
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
        let parentBottom = ev.top + this._box.getHeight();
        let parentRight = ev.left + this._box.getWidth();
        let result = {
            ev: ev.base,
            top: ev.top,
            left: ev.left,
            scrolling: (_a = ev.scrolling) !== null && _a !== void 0 ? _a : false,
            initial: (_b = ev.initial) !== null && _b !== void 0 ? _b : false,
            source: ev.source,
            items: this._children.map((child, index) => {
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
