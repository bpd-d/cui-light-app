import { ICuiElementDetector } from "./interfaces";
export declare class CuiSimpleDragOverDetector implements ICuiElementDetector {
    #private;
    constructor();
    setElements(elements: Element[]): void;
    setThreshold(value: number): void;
    detect(x: Number, y: Number): [number, Element | undefined];
    private isInBounds;
}
