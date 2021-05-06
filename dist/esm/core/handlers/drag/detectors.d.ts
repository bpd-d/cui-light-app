import { ICuiElementDetector } from "./interfaces";
/**
 * threshold keeps a outside margin value to extend box outside of an element
 */
export declare class CuiSimpleDragOverDetector implements ICuiElementDetector {
    _elements: Element[];
    _count: number;
    _threshold: number;
    constructor();
    setElements(elements: Element[]): void;
    setThreshold(value: number): void;
    detect(x: Number, y: Number): [number, Element | undefined];
    private isInBounds;
}
