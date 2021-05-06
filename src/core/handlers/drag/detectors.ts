import { is } from "../../utils/functions";
import { ICuiElementDetector } from "./interfaces";

/**
 * threshold keeps a outside margin value to extend box outside of an element
 */

export class CuiSimpleDragOverDetector implements ICuiElementDetector {
    _elements: Element[];
    _count: number;
    _threshold: number;
    constructor() {
        this._elements = [];
        this._count = 0;
        this._threshold = 5;
    }

    setElements(elements: Element[]): void {
        this._elements = elements;
        this._count = this._elements.length;
    }

    setThreshold(value: number) {
        this._threshold = value
    }

    detect(x: Number, y: Number): [number, Element | undefined] {
        if (!is(this._elements)) {
            return [-1, undefined];
        }

        let idx: number = -1;
        let found: Element | undefined = undefined;

        for (let i = 0; i < this._count; i++) {
            if (this.isInBounds(this._elements[i], x, y)) {
                if (i === 0) {
                    idx = i;
                    found = this._elements[i];
                    //break;
                } else if (i < this._count - 1) {
                    idx = i + 1;
                    found = this._elements[i + 1];
                    //break;
                }
                break;
            }
        }

        return [idx, found];
    }

    private isInBounds(element: Element, x: Number, y: Number): boolean {
        const box = element.getBoundingClientRect();
        return x > box.left - this._threshold && x < box.left + box.width + this._threshold &&
            y > box.top - this._threshold && y < box.top + box.height + this._threshold;
    }

}