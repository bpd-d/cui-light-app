import { CuiDevtoolFactory } from "../development/factory";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { is } from "../utils/functions";
import { CuiBasePositionEvaluator } from "./evaluator";
import { ElementBox, ICuiPositionCalculator, ICuiPositionEvaluator } from "./interfaces";

export class CuiBasePositionCalculator implements ICuiPositionCalculator {
    private _static: string;
    private _preferred: string;
    private _evaluator: ICuiPositionEvaluator;
    private _log: ICuiDevelopmentTool;
    constructor(evaluator?: ICuiPositionEvaluator) {
        this._preferred = "top-center";
        this._static = "";
        this._evaluator = evaluator ?? new CuiBasePositionEvaluator();
        this._log = CuiDevtoolFactory.get("CuiBasePositionCalculator");
    }

    setMargin(value: number): void {
        this._evaluator.setMargin(value);
    }

    setPreferred(position: string): void {
        this._preferred = position
    }

    setStatic(position: string): void {
        this._static = position;
    }

    //targetWidth: number, targetHeight: number
    calculate(elementBox: ElementBox, targetBox: ElementBox): [number, number, string] {
        this._evaluator.setElementBox(elementBox)
        this._evaluator.setTarget(targetBox);

        if (is(this._static)) {
            this._log.debug("Evaluating static position")
            const [vertical, horizontal] = this.parse(this._static);
            return [this._evaluator.getHorizontalPosition(horizontal), this._evaluator.getVerticalPosition(vertical), this._static];
        }

        let [vertical, horizontal]: string[] = ["", ""];
        if (is(this._preferred)) {
            this._log.debug("Evaluating auto position");
            [vertical, horizontal] = this.parse(this._preferred);
        }
        vertical = vertical ?? "top";
        horizontal = horizontal ?? "center";
        this._log.debug("Calculating position: " + vertical + "-" + horizontal)
        const [outVNum, outVPos] = this._evaluator.getAutoVerticalPosition(vertical);
        const [outHNum, outHPos] = this._evaluator.getAutoHorizontalPosition(horizontal);
        this._log.debug("Calculated position: " + outVPos + "-" + outHPos)
        return [outHNum, outVNum, outVPos + "-" + outHPos];
    }

    private parse(position: string): string[] {
        return position.split("-");
    }
}