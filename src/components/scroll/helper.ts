import { ICuiElementBox } from "../../core/models/elements";
import { getOffsetLeft, getOffsetTop } from "../../core/utils/functions";
import { ScrollDirection, ScrollPerformerHelper } from "./interfaces";

export function getScrollHelper(direction: ScrollDirection, box: ICuiElementBox, behavior: ScrollBehavior) {
    return direction === 'x' ? ScrollXHelper(box, behavior) : ScrollYHelper(box, behavior);
}

export function ScrollYHelper(box: ICuiElementBox, behavior: ScrollBehavior): ScrollPerformerHelper {
    function scroll(position: number) {
        box.scrollTo({
            left: 0,
            top: position,
            behavior: behavior
        })
    }
    return {
        scrollTo: (position: number) => {
            scroll(position)
        },
        toIndex: (index: number) => {
            scroll(index * box.getHeight());
        },
        getPagesCount: () => {
            return calcPages(box.getScrollHeight(), box.getHeight());
        },
        getCurrentPage: () => {
            return calcPages(box.getScrollTop(), box.getHeight())
        },
        toLast: () => {
            scroll(box.getScrollHeight() - box.getHeight());
        },
        toPercent: (value: number) => {
            const ratio = value / 100;
            scroll(ratio * box.getScrollHeight());
        },
        toSelector: (selector: string) => {
            const found = box.queryAll(selector);
            if (found.length === 0) {
                return false;
            }
            const to = getOffsetTop(found[0]) - box.getTop();
            scroll(to);
            return true;
        }
    }
}

export function ScrollXHelper(box: ICuiElementBox, behavior: ScrollBehavior): ScrollPerformerHelper {
    function scroll(position: number) {
        box.scrollTo({
            left: position,
            top: 0,
            behavior: behavior
        })
    }
    return {
        scrollTo: (position: number) => {
            scroll(position)
        },
        toIndex: (index: number) => {
            scroll(index * box.getWidth());
        },
        getPagesCount: () => {
            return calcPages(box.getScrollWidth(), box.getWidth());
        },
        getCurrentPage: () => {
            return calcPages(box.getScrollLeft(), box.getWidth())
        },
        toLast: () => {
            scroll(box.getScrollWidth() - box.getWidth());
        },
        toPercent: (value: number) => {
            const ratio = value / 100;
            scroll(ratio * box.getScrollWidth());
        },
        toSelector: (selector: string) => {
            const found = box.queryAll(selector);
            if (found.length === 0) {
                return false;
            }
            const to = getOffsetLeft(found[0]) - box.getLeft();
            scroll(to);
            return true;
        }
    }
}



function calcPages(scrollSize: number, size: number): number {
    return Math.ceil(scrollSize / size);
}