export interface ICuiFloatPositionCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export interface ICuiFloatResizeCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare class BasePositionCalculator implements ICuiFloatPositionCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare class OptionalPositionCalculator implements ICuiFloatPositionCalculator {
    #private;
    constructor(element: HTMLElement);
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare class BaseResizeCalculator implements ICuiFloatResizeCalculator {
    #private;
    constructor(element: HTMLElement);
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare class OptionalResizeCalculator implements ICuiFloatResizeCalculator {
    #private;
    constructor(element: HTMLElement);
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
