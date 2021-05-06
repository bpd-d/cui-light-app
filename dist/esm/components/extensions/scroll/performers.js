import { CuiElementBoxFactory } from "../../../core/models/elements";
import { getRangeValue, is } from "../../../core/utils/functions";
export function getBaseScrollPerformer(options) {
    return {
        perform: (ev) => {
            options.callback(ev);
        }
    };
}
export function getCuiIntersectionPerformer(setup) {
    let _children = [];
    let _box = CuiElementBoxFactory.get(setup.element);
    function onScroll(ev) {
        if (!is(_children)) {
            return;
        }
        setup.callback(prepareCallbackResult(ev));
    }
    function prepareCallbackResult(ev) {
        var _a, _b;
        let parentBottom = ev.top + _box.getHeight();
        let parentRight = ev.left + _box.getWidth();
        let result = {
            ev: ev.base,
            top: ev.top,
            left: ev.left,
            scrolling: (_a = ev.scrolling) !== null && _a !== void 0 ? _a : false,
            initial: (_b = ev.initial) !== null && _b !== void 0 ? _b : false,
            source: ev.source,
            items: _children.map((child, index) => {
                let verticalRatio = calcChildVerticalRatio(child, ev.top, parentBottom);
                let horizontalRatio = calcChildHorizontalRatio(child, ev.left, parentRight);
                return {
                    verticalRatio: verticalRatio,
                    horizontalRatio: horizontalRatio,
                    element: child
                };
            })
        };
        return result;
    }
    function calcChildVerticalRatio(child, currentTop, currentBottom) {
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
    function calcChildHorizontalRatio(child, currentLeft, currentRight) {
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
    return Object.assign(Object.assign({}, getBaseScrollPerformer({
        callback: onScroll
    })), { setChildren: (children) => {
            _children = children;
        }, callInitialEvent: () => {
            onScroll({
                base: undefined,
                initial: true,
                scrolling: false,
                left: _box.getScrollLeft(),
                top: _box.getScrollTop(),
                source: "performer"
            });
        } });
}
