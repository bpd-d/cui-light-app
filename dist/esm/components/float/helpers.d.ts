import { ICuiInteractionsFacade, ICuiStyleHelper } from "src/core/handlers/extensions/facades";
import { ICuiMoveData } from "src/core/listeners/move";
export interface ICuiFloatActionCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export interface ICuiFloatSwipingAction {
    init: (ev: ICuiMoveData) => void;
    move: (x: number, y: number, diffX: number, diffY: number) => void;
}
export declare class BasePositionCalculator implements ICuiFloatActionCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare class OptionalPositionCalculator implements ICuiFloatActionCalculator {
    #private;
    constructor(element: HTMLElement);
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare class BaseResizeCalculator implements ICuiFloatActionCalculator {
    #private;
    constructor(element: HTMLElement);
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare class OptionalResizeCalculator implements ICuiFloatActionCalculator {
    #private;
    constructor(element: HTMLElement);
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}
export declare function getMoveAction(type: string, calculator: ICuiFloatActionCalculator, element: HTMLElement, interactions: ICuiInteractionsFacade, styles: ICuiStyleHelper): ICuiFloatSwipingAction | undefined;
