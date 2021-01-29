import { ElementBox, ICuiPositionEvaluator } from "./interfaces";
export declare class CuiBasePositionEvaluator implements ICuiPositionEvaluator {
    #private;
    constructor();
    setElementBox(box: ElementBox): void;
    setTarget(targetBox: ElementBox): void;
    setMargin(value: number): void;
    getVerticalPosition(value: string): number;
    getHorizontalPosition(value: string): number;
    getAutoVerticalPosition(initial: string): [number, string];
    getAutoHorizontalPosition(initial: string): [number, string];
    private getTopPosition;
    private getBottomPosition;
    private getMiddlePosition;
    private getLeftPosition;
    private getRightPosition;
    private getCenterPosition;
    private validate;
    private throwIfNotValid;
}
