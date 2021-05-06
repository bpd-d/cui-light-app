import { CuiIntersectionResult } from "../../../core/intersection/interfaces";
import { CuiScrollEvent } from "../../../core/listeners/scroll";
import { CuiElementBoxFactory, CuiElementBoxType, ICuiElementBox } from "../../../core/models/elements";
import { getRangeValue, is } from "../../../core/utils/functions";
import { ICuiExtensionPerformer } from "../interfaces";

export interface ICuiBaseScrollPerfromerOptions {
    callback: (ev: CuiScrollEvent) => void;
}

export interface ICuiIntersectionPerfromerOptions {
    callback: (ev: CuiIntersectionResult) => void;
    element: CuiElementBoxType;
}

export interface ICuiIntersectionPerformer extends ICuiExtensionPerformer<CuiScrollEvent> {
    setChildren(children: HTMLElement[]): void;
    callInitialEvent(): void
}

export function getBaseScrollPerformer(options: ICuiBaseScrollPerfromerOptions): ICuiExtensionPerformer<CuiScrollEvent> {
    return {
        perform: (ev: CuiScrollEvent) => {
            options.callback(ev)
        }
    }
}

export function getCuiIntersectionPerformer(setup: ICuiIntersectionPerfromerOptions): ICuiIntersectionPerformer {
    let _children: HTMLElement[] = [];
    let _box: ICuiElementBox = CuiElementBoxFactory.get(setup.element);

    function onScroll(ev: CuiScrollEvent) {
        if (!is(_children)) {
            return;
        }
        setup.callback(prepareCallbackResult(ev))
    }

    function prepareCallbackResult(ev: CuiScrollEvent): CuiIntersectionResult {
        let parentBottom = ev.top + _box.getHeight();
        let parentRight = ev.left + _box.getWidth();
        let result: CuiIntersectionResult = {
            ev: ev.base,
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling ?? false,
            initial: ev.initial ?? false,
            source: ev.source,
            items: _children.map((child: HTMLElement, index: number) => {
                let verticalRatio = calcChildVerticalRatio(child, ev.top, parentBottom)
                let horizontalRatio = calcChildHorizontalRatio(child, ev.left, parentRight);
                return {
                    verticalRatio: verticalRatio,
                    horizontalRatio: horizontalRatio,
                    element: child
                }
            })
        };

        return result;
    }

    function calcChildVerticalRatio(child: HTMLElement, currentTop: number, currentBottom: number): number {
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

    function calcChildHorizontalRatio(child: HTMLElement, currentLeft: number, currentRight: number): number {
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

    return {
        ...getBaseScrollPerformer({
            callback: onScroll
        }),
        setChildren: (children: HTMLElement[]) => {
            _children = children;
        },
        callInitialEvent: () => {
            onScroll({
                base: undefined,
                initial: true,
                scrolling: false,
                left: _box.getScrollLeft(),
                top: _box.getScrollTop(),
                source: "performer"
            })
        }
    }
}