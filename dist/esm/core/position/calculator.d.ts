import { ElementBox, ICuiPositionCalculator, ICuiPositionEvaluator } from "./interfaces";
export declare class CuiBasePositionCalculator implements ICuiPositionCalculator {
    private _static;
    private _preferred;
    private _evaluator;
    private _log;
    constructor(evaluator?: ICuiPositionEvaluator);
    setMargin(value: number): void;
    setPreferred(position: string): void;
    setStatic(position: string): void;
    calculate(elementBox: ElementBox, targetBox: ElementBox): [number, number, string];
    private parse;
}
