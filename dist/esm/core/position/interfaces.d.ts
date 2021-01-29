export declare type CuiElementPosition = "top-left" | "top-center" | "top-right" | "middle-left" | "middle-right" | "bottom-right" | "bottom-left";
export interface ElementBox {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface ICuiPositionCalculator {
    setMargin(value: number): void;
    setPreferred(position: string): void;
    setStatic(position: string): void;
    calculate(elementBox: ElementBox, targetBox: ElementBox): [number, number, string];
}
export interface ICuiPositionEvaluator {
    setElementBox(box: ElementBox): void;
    setTarget(target: ElementBox): void;
    setMargin(value: number): void;
    getVerticalPosition(name: string): number;
    getHorizontalPosition(name: string): number;
    getAutoVerticalPosition(initial: string): [number, string];
    getAutoHorizontalPosition(initial: string): [number, string];
}
