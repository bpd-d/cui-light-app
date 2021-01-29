import { CuiLoggerFactory } from "../factories/logger";
import { ICuiLogger } from "../models/interfaces";
import { is } from "../utils/functions";
import { CuiBasePositionEvaluator } from "./evaluator";
import { ElementBox, ICuiPositionCalculator, ICuiPositionEvaluator } from "./interfaces";

export class CuiBasePositionCalculator implements ICuiPositionCalculator {
    #static: string;
    #preferred: string;
    #evaluator: ICuiPositionEvaluator;
    #log: ICuiLogger;
    constructor(evaluator?: ICuiPositionEvaluator) {
        this.#preferred = "top-center";
        this.#static = "";
        this.#evaluator = evaluator ?? new CuiBasePositionEvaluator();
        this.#log = CuiLoggerFactory.get("CuiBasePositionCalculator");
    }

    setMargin(value: number): void {
        this.#evaluator.setMargin(value);
    }

    setPreferred(position: string): void {
        this.#preferred = position
    }

    setStatic(position: string): void {
        this.#static = position;
    }

    //targetWidth: number, targetHeight: number
    calculate(elementBox: ElementBox, targetBox: ElementBox): [number, number, string] {
        this.#evaluator.setElementBox(elementBox)
        this.#evaluator.setTarget(targetBox);

        if (is(this.#static)) {
            this.#log.debug("Evaluating static position")
            const [vertical, horizontal] = this.parse(this.#static);
            return [this.#evaluator.getHorizontalPosition(horizontal), this.#evaluator.getVerticalPosition(vertical), this.#static];
        }

        let [vertical, horizontal]: string[] = ["", ""];
        if (is(this.#preferred)) {
            this.#log.debug("Evaluating auto position");
            [vertical, horizontal] = this.parse(this.#preferred);
        }
        vertical = vertical ?? "top";
        horizontal = horizontal ?? "center";
        this.#log.debug("Calculating position: " + vertical + "-" + horizontal)
        const [outVNum, outVPos] = this.#evaluator.getAutoVerticalPosition(vertical);
        const [outHNum, outHPos] = this.#evaluator.getAutoHorizontalPosition(horizontal);
        this.#log.debug("Calculated position: " + outVPos + "-" + outHPos)
        return [outHNum, outVNum, outVPos + "-" + outHPos];
    }

    private parse(position: string): string[] {
        return position.split("-");
    }
}