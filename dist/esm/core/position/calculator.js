var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _static, _preferred, _evaluator, _log;
import { CuiLoggerFactory } from "../factories/logger";
import { is } from "../utils/functions";
import { CuiBasePositionEvaluator } from "./evaluator";
export class CuiBasePositionCalculator {
    constructor(evaluator) {
        _static.set(this, void 0);
        _preferred.set(this, void 0);
        _evaluator.set(this, void 0);
        _log.set(this, void 0);
        __classPrivateFieldSet(this, _preferred, "top-center");
        __classPrivateFieldSet(this, _static, "");
        __classPrivateFieldSet(this, _evaluator, evaluator !== null && evaluator !== void 0 ? evaluator : new CuiBasePositionEvaluator());
        __classPrivateFieldSet(this, _log, CuiLoggerFactory.get("CuiBasePositionCalculator"));
    }
    setMargin(value) {
        __classPrivateFieldGet(this, _evaluator).setMargin(value);
    }
    setPreferred(position) {
        __classPrivateFieldSet(this, _preferred, position);
    }
    setStatic(position) {
        __classPrivateFieldSet(this, _static, position);
    }
    //targetWidth: number, targetHeight: number
    calculate(elementBox, targetBox) {
        __classPrivateFieldGet(this, _evaluator).setElementBox(elementBox);
        __classPrivateFieldGet(this, _evaluator).setTarget(targetBox);
        if (is(__classPrivateFieldGet(this, _static))) {
            __classPrivateFieldGet(this, _log).debug("Evaluating static position");
            const [vertical, horizontal] = this.parse(__classPrivateFieldGet(this, _static));
            return [__classPrivateFieldGet(this, _evaluator).getHorizontalPosition(horizontal), __classPrivateFieldGet(this, _evaluator).getVerticalPosition(vertical), __classPrivateFieldGet(this, _static)];
        }
        let [vertical, horizontal] = ["", ""];
        if (is(__classPrivateFieldGet(this, _preferred))) {
            __classPrivateFieldGet(this, _log).debug("Evaluating auto position");
            [vertical, horizontal] = this.parse(__classPrivateFieldGet(this, _preferred));
        }
        vertical = vertical !== null && vertical !== void 0 ? vertical : "top";
        horizontal = horizontal !== null && horizontal !== void 0 ? horizontal : "center";
        __classPrivateFieldGet(this, _log).debug("Calculating position: " + vertical + "-" + horizontal);
        const [outVNum, outVPos] = __classPrivateFieldGet(this, _evaluator).getAutoVerticalPosition(vertical);
        const [outHNum, outHPos] = __classPrivateFieldGet(this, _evaluator).getAutoHorizontalPosition(horizontal);
        __classPrivateFieldGet(this, _log).debug("Calculated position: " + outVPos + "-" + outHPos);
        return [outHNum, outVNum, outVPos + "-" + outHPos];
    }
    parse(position) {
        return position.split("-");
    }
}
_static = new WeakMap(), _preferred = new WeakMap(), _evaluator = new WeakMap(), _log = new WeakMap();
