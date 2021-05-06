import { CuiPositionError } from "../models/errors";
import { is } from "../utils/functions";
import { ElementBox, ICuiPositionEvaluator } from "./interfaces";

export class CuiBasePositionEvaluator implements ICuiPositionEvaluator {
    private _box: ElementBox | undefined;
    private _targetWidth: number;
    private _targetHeight: number;
    private _margin: number;
    constructor() {
        this._targetHeight = -1;
        this._targetWidth = -1;
        this._box = undefined;
        this._margin = 0;
    }


    setElementBox(box: ElementBox): void {
        this._box = box;
    }

    setTarget(targetBox: ElementBox): void {
        this._targetWidth = targetBox.width;
        this._targetHeight = targetBox.height;
    }

    setMargin(value: number) {
        this._margin = value;
    }

    getVerticalPosition(value: string): number {
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

    getHorizontalPosition(value: string): number {
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

    getAutoVerticalPosition(initial: string): [number, string] {
        let innerHeight = window.innerHeight;
        let number = this.getVerticalPosition(initial);

        if ((initial === 'top' || initial === "middle") && number < 0) {
            return [this.getVerticalPosition("bottom"), "bottom"]
        } else if ((initial === "bottom" || initial === "middle") && number + this._targetHeight > innerHeight) {
            return [this.getVerticalPosition("top"), "top"]
        }
        return [number, initial];
    }

    getAutoHorizontalPosition(initial: string): [number, string] {
        let innerWidth = window.innerWidth;
        let number = this.getHorizontalPosition(initial);

        if ((initial === 'right' || initial === "center") && number < 0) {
            return [this.getHorizontalPosition("left"), "left"]
        } else if ((initial === 'left' || initial === "center") && number + this._targetWidth > innerWidth) {
            return [this.getHorizontalPosition("right"), "right"]
        }
        return [number, initial];
    }

    private getTopPosition(): number {
        this.throwIfNotValid("getTopPosition");
        // @ts-ignore - already checked in validate
        return this._box.top - this._margin - this._targetHeight;
    }

    private getBottomPosition(): number {
        this.throwIfNotValid("getBottomPosition");
        // @ts-ignore - already checked in validate
        return this._box.top + this._box.height + this._margin;
    }

    private getMiddlePosition(): number {
        this.throwIfNotValid("getMiddlePosition");
        // @ts-ignore - already checked in validate
        return (this._box.top + this._box.height / 2) - this._targetHeight / 2;
    }

    private getLeftPosition(): number {
        this.throwIfNotValid("getLeftPosition");
        // @ts-ignore - already checked in validate
        return this._box.left;
    }

    private getRightPosition(): number {
        this.throwIfNotValid("getRightPosition");
        // @ts-ignore - already checked in validate
        return this._box.left + this._box.width - this._targetWidth;
    }

    private getCenterPosition(): number {
        this.throwIfNotValid("getCenterPosition");
        // @ts-ignore - already checked in validate
        return (this._box.left + this._box.width / 2) - this._targetWidth / 2;
    }

    private validate(): boolean {
        return is(this._box) && this._targetHeight > 0 && this._targetWidth > 0;
    }



    private throwIfNotValid(method: string): void {
        if (!this.validate()) {
            throw new CuiPositionError(`[${method}] Position cannot be calculated: missing data [width: ${this._targetWidth}][height: ${this._targetHeight}]`)
        }
    }
}