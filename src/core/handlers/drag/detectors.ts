import { is } from "../../utils/functions";
import { ICuiElementDetector } from "./interfaces";

export class CuiSimpleDragOverDetector implements ICuiElementDetector {
    #elements: Element[];
    #count: number;
    #threshold: number;
    constructor() {
        this.#elements = [];
        this.#count = 0;
        this.#threshold = 5;
    }

    setElements(elements: Element[]): void {
        this.#elements = elements;
        this.#count = this.#elements.length;
    }

    setThreshold(value: number) {
        this.#threshold = value
    }

    detect(x: Number, y: Number): [number, Element | undefined] {
        if (!is(this.#elements)) {
            return [-1, undefined];
        }

        let idx: number = -1;
        let found: Element | undefined = undefined;

        for (let i = 0; i < this.#count; i++) {
            if (this.isInBounds(this.#elements[i], x, y)) {
                if (i === 0) {
                    idx = i;
                    found = this.#elements[i];
                    //break;
                } else if (i < this.#count - 1) {
                    idx = i + 1;
                    found = this.#elements[i + 1];
                    //break;
                }
                break;
            }
        }

        return [idx, found];
    }

    private isInBounds(element: Element, x: Number, y: Number): boolean {
        const box = element.getBoundingClientRect();
        return x > box.left - this.#threshold && x < box.left + box.width + this.#threshold &&
            y > box.top - this.#threshold && y < box.top + box.height + this.#threshold;
    }

}