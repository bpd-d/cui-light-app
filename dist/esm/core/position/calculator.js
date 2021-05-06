import { CuiDevtoolFactory } from "../development/factory";
import { is } from "../utils/functions";
import { CuiBasePositionEvaluator } from "./evaluator";
export class CuiBasePositionCalculator {
    constructor(evaluator) {
        this._preferred = "top-center";
        this._static = "";
        this._evaluator = evaluator !== null && evaluator !== void 0 ? evaluator : new CuiBasePositionEvaluator();
        this._log = CuiDevtoolFactory.get("CuiBasePositionCalculator");
    }
    setMargin(value) {
        this._evaluator.setMargin(value);
    }
    setPreferred(position) {
        this._preferred = position;
    }
    setStatic(position) {
        this._static = position;
    }
    //targetWidth: number, targetHeight: number
    calculate(elementBox, targetBox) {
        this._evaluator.setElementBox(elementBox);
        this._evaluator.setTarget(targetBox);
        if (is(this._static)) {
            this._log.debug("Evaluating static position");
            const [vertical, horizontal] = this.parse(this._static);
            return [this._evaluator.getHorizontalPosition(horizontal), this._evaluator.getVerticalPosition(vertical), this._static];
        }
        let [vertical, horizontal] = ["", ""];
        if (is(this._preferred)) {
            this._log.debug("Evaluating auto position");
            [vertical, horizontal] = this.parse(this._preferred);
        }
        vertical = vertical !== null && vertical !== void 0 ? vertical : "top";
        horizontal = horizontal !== null && horizontal !== void 0 ? horizontal : "center";
        this._log.debug("Calculating position: " + vertical + "-" + horizontal);
        const [outVNum, outVPos] = this._evaluator.getAutoVerticalPosition(vertical);
        const [outHNum, outHPos] = this._evaluator.getAutoHorizontalPosition(horizontal);
        this._log.debug("Calculated position: " + outVPos + "-" + outHPos);
        return [outHNum, outVNum, outVPos + "-" + outHPos];
    }
    parse(position) {
        return position.split("-");
    }
}
