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
var _box, _targetWidth, _targetHeight, _margin;
import { CuiPositionError } from "../models/errors";
import { is } from "../utils/functions";
export class CuiBasePositionEvaluator {
    constructor() {
        _box.set(this, void 0);
        _targetWidth.set(this, void 0);
        _targetHeight.set(this, void 0);
        _margin.set(this, void 0);
        __classPrivateFieldSet(this, _targetHeight, -1);
        __classPrivateFieldSet(this, _targetWidth, -1);
        __classPrivateFieldSet(this, _box, undefined);
        __classPrivateFieldSet(this, _margin, 0);
    }
    setElementBox(box) {
        __classPrivateFieldSet(this, _box, box);
    }
    setTarget(targetBox) {
        __classPrivateFieldSet(this, _targetWidth, targetBox.width);
        __classPrivateFieldSet(this, _targetHeight, targetBox.height);
    }
    setMargin(value) {
        __classPrivateFieldSet(this, _margin, value);
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
        else if ((initial === "bottom" || initial === "middle") && number + __classPrivateFieldGet(this, _targetHeight) > innerHeight) {
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
        else if ((initial === 'left' || initial === "center") && number + __classPrivateFieldGet(this, _targetWidth) > innerWidth) {
            return [this.getHorizontalPosition("right"), "right"];
        }
        return [number, initial];
    }
    getTopPosition() {
        this.throwIfNotValid("getTopPosition");
        // @ts-ignore - already checked in validate
        return __classPrivateFieldGet(this, _box).top - __classPrivateFieldGet(this, _margin) - __classPrivateFieldGet(this, _targetHeight);
    }
    getBottomPosition() {
        this.throwIfNotValid("getBottomPosition");
        // @ts-ignore - already checked in validate
        return __classPrivateFieldGet(this, _box).top + __classPrivateFieldGet(this, _box).height + __classPrivateFieldGet(this, _margin);
    }
    getMiddlePosition() {
        this.throwIfNotValid("getMiddlePosition");
        // @ts-ignore - already checked in validate
        return (__classPrivateFieldGet(this, _box).top + __classPrivateFieldGet(this, _box).height / 2) - __classPrivateFieldGet(this, _targetHeight) / 2;
    }
    getLeftPosition() {
        this.throwIfNotValid("getLeftPosition");
        // @ts-ignore - already checked in validate
        return __classPrivateFieldGet(this, _box).left;
    }
    getRightPosition() {
        this.throwIfNotValid("getRightPosition");
        // @ts-ignore - already checked in validate
        return __classPrivateFieldGet(this, _box).left + __classPrivateFieldGet(this, _box).width - __classPrivateFieldGet(this, _targetWidth);
    }
    getCenterPosition() {
        this.throwIfNotValid("getCenterPosition");
        // @ts-ignore - already checked in validate
        return (__classPrivateFieldGet(this, _box).left + __classPrivateFieldGet(this, _box).width / 2) - __classPrivateFieldGet(this, _targetWidth) / 2;
    }
    validate() {
        return is(__classPrivateFieldGet(this, _box)) && __classPrivateFieldGet(this, _targetHeight) > 0 && __classPrivateFieldGet(this, _targetWidth) > 0;
    }
    throwIfNotValid(method) {
        if (!this.validate()) {
            throw new CuiPositionError(`[${method}] Position cannot be calculated: missing data [width: ${__classPrivateFieldGet(this, _targetWidth)}][height: ${__classPrivateFieldGet(this, _targetHeight)}]`);
        }
    }
}
_box = new WeakMap(), _targetWidth = new WeakMap(), _targetHeight = new WeakMap(), _margin = new WeakMap();
