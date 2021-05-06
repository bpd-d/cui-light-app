import { is } from "../../utils/functions";
/**
 * threshold keeps a outside margin value to extend box outside of an element
 */
export class CuiSimpleDragOverDetector {
    constructor() {
        this._elements = [];
        this._count = 0;
        this._threshold = 5;
    }
    setElements(elements) {
        this._elements = elements;
        this._count = this._elements.length;
    }
    setThreshold(value) {
        this._threshold = value;
    }
    detect(x, y) {
        if (!is(this._elements)) {
            return [-1, undefined];
        }
        let idx = -1;
        let found = undefined;
        for (let i = 0; i < this._count; i++) {
            if (this.isInBounds(this._elements[i], x, y)) {
                if (i === 0) {
                    idx = i;
                    found = this._elements[i];
                    //break;
                }
                else if (i < this._count - 1) {
                    idx = i + 1;
                    found = this._elements[i + 1];
                    //break;
                }
                break;
            }
        }
        return [idx, found];
    }
    isInBounds(element, x, y) {
        const box = element.getBoundingClientRect();
        return x > box.left - this._threshold && x < box.left + box.width + this._threshold &&
            y > box.top - this._threshold && y < box.top + box.height + this._threshold;
    }
}
