export interface ICuiElementDetector {
    detect(x: Number, y: Number): [number, Element | undefined];
    setElements(elements: Element[]): void;
    setThreshold(value: number): void;
}
