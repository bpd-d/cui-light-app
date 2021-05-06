import { getOffsetLeft, getOffsetTop } from "../../core/utils/functions";
export function getScrollHelper(direction, box, behavior) {
    return direction === 'x' ? ScrollXHelper(box, behavior) : ScrollYHelper(box, behavior);
}
export function ScrollYHelper(box, behavior) {
    function scroll(position) {
        box.scrollTo({
            left: 0,
            top: position,
            behavior: behavior
        });
    }
    return {
        scrollTo: (position) => {
            scroll(position);
        },
        toIndex: (index) => {
            scroll(index * box.getHeight());
        },
        getPagesCount: () => {
            return calcPages(box.getScrollHeight(), box.getHeight());
        },
        getCurrentPage: () => {
            return calcPages(box.getScrollTop(), box.getHeight());
        },
        toLast: () => {
            scroll(box.getScrollHeight() - box.getHeight());
        },
        toPercent: (value) => {
            const ratio = value / 100;
            scroll(ratio * box.getScrollHeight());
        },
        toSelector: (selector) => {
            const found = box.queryAll(selector);
            if (found.length === 0) {
                return false;
            }
            const to = getOffsetTop(found[0]) - box.getTop();
            scroll(to);
            return true;
        }
    };
}
export function ScrollXHelper(box, behavior) {
    function scroll(position) {
        box.scrollTo({
            left: position,
            top: 0,
            behavior: behavior
        });
    }
    return {
        scrollTo: (position) => {
            scroll(position);
        },
        toIndex: (index) => {
            scroll(index * box.getWidth());
        },
        getPagesCount: () => {
            return calcPages(box.getScrollWidth(), box.getWidth());
        },
        getCurrentPage: () => {
            return calcPages(box.getScrollLeft(), box.getWidth());
        },
        toLast: () => {
            scroll(box.getScrollWidth() - box.getWidth());
        },
        toPercent: (value) => {
            const ratio = value / 100;
            scroll(ratio * box.getScrollWidth());
        },
        toSelector: (selector) => {
            const found = box.queryAll(selector);
            if (found.length === 0) {
                return false;
            }
            const to = getOffsetLeft(found[0]) - box.getLeft();
            scroll(to);
            return true;
        }
    };
}
function calcPages(scrollSize, size) {
    return Math.ceil(scrollSize / size);
}
