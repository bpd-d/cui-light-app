import { CuiPositionError } from "../models/errors";
import { is } from "../utils/functions";
export class CuiBasePositionEvaluator {
    constructor() {
        this._targetHeight = -1;
        this._targetWidth = -1;
        this._box = undefined;
        this._margin = 0;
    }
    setElementBox(box) {
        this._box = box;
    }
    setTarget(targetBox) {
        this._targetWidth = targetBox.width;
        this._targetHeight = targetBox.height;
    }
    setMargin(value) {
        this._margin = value;
    }
    getVerticalPosition(value) {
        switch (value) {
            case 'top':
                return this.getTopPosition();
            case "bottom":
                return this.getBottomPosition();
            case "middle":
                return this.getMiddlePosition();
            default:
                return -1;
        }
    }
    getHorizontalPosition(value) {
        switch (value) {
            case 'left':
                return this.getLeftPosition();
            case "right":
                return this.getRightPosition();
            case "center":
                return this.getCenterPosition();
            default:
                return -1;
        }
    }
    getAutoVerticalPosition(initial) {
        let innerHeight = window.innerHeight;
        let number = this.getVerticalPosition(initial);
        if ((initial === 'top' || initial === "middle") && number < 0) {
            return [this.getVerticalPosition("bottom"), "bottom"];
        }
        else if ((initial === "bottom" || initial === "middle") && number + this._targetHeight > innerHeight) {
            return [this.getVerticalPosition("top"), "top"];
        }
        return [number, initial];
    }
    getAutoHorizontalPosition(initial) {
        let innerWidth = window.innerWidth;
        let number = this.getHorizontalPosition(initial);
        if ((initial === 'right' || initial === "center") && number < 0) {
            return [this.getHorizontalPosition("left"), "left"];
        }
        else if ((initial === 'left' || initial === "center") && number + this._targetWidth > innerWidth) {
            return [this.getHorizontalPosition("right"), "right"];
        }
        return [number, initial];
    }
    getTopPosition() {
        this.throwIfNotValid("getTopPosition");
        // @ts-ignore - already checked in validate
        return this._box.top - this._margin - this._targetHeight;
    }
    getBottomPosition() {
        this.throwIfNotValid("getBottomPosition");
        // @ts-ignore - already checked in validate
        return this._box.top + this._box.height + this._margin;
    }
    getMiddlePosition() {
        this.throwIfNotValid("getMiddlePosition");
        // @ts-ignore - already checked in validate
        return (this._box.top + this._box.height / 2) - this._targetHeight / 2;
    }
    getLeftPosition() {
        this.throwIfNotValid("getLeftPosition");
        // @ts-ignore - already checked in validate
        return this._box.left;
    }
    getRightPosition() {
        this.throwIfNotValid("getRightPosition");
        // @ts-ignore - already checked in validate
        return this._box.left + this._box.width - this._targetWidth;
    }
    getCenterPosition() {
        this.throwIfNotValid("getCenterPosition");
        // @ts-ignore - already checked in validate
        return (this._box.left + this._box.width / 2) - this._targetWidth / 2;
    }
    validate() {
        return is(this._box) && this._targetHeight > 0 && this._targetWidth > 0;
    }
    throwIfNotValid(method) {
        if (!this.validate()) {
            throw new CuiPositionError(`[${method}] Position cannot be calculated: missing data [width: ${this._targetWidth}][height: ${this._targetHeight}]`);
        }
    }
}
