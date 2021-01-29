import { ElementBox, ICuiPositionCalculator, ICuiPositionEvaluator } from "./interfaces";
export declare class CuiBasePositionCalculator implements ICuiPositionCalculator {
    #private;
    constructor(evaluator?: ICuiPositionEvaluator);
    setMargin(value: number): void;
    setPreferred(position: string): void;
    setStatic(position: string): void;
    calculate(elementBox: ElementBox, targetBox: ElementBox): [number, number, string];
    private parse;
}
