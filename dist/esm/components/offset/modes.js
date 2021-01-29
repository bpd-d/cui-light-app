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
var _pointLeft, _pointTop, _prevDiffY, _prevDiffX, _wasTriggeredX, _wasTriggeredY, _threshold;
export class CuiOffsetStaticMode {
    matches(top, left, offsetX, offsetY) {
        return (offsetX > 0 && left >= offsetX) ||
            (offsetY > 0 && top >= offsetY);
    }
}
/**
 * Dynamically calculates whether to trigger or untrigger an action.
 * If current value exceedes offset and threshold action is triggered.
 * If action was triggered and current move is lower than threshold action is untriggered
 *
 * Example: If offsetY is 100, then first after 100 action is set on. It is kept when scrolling down.
 * If user decides to scroll up and difference between turning point and current is bigger than threshold then action is set off.
 *
 * Example usage is with navbar - it shall disappear after offset and return back when user scrolls up.
 */
export class CuiOffsetDynamicMode {
    constructor() {
        _pointLeft.set(this, void 0);
        _pointTop.set(this, void 0);
        _prevDiffY.set(this, void 0);
        _prevDiffX.set(this, void 0);
        _wasTriggeredX.set(this, void 0);
        _wasTriggeredY.set(this, void 0);
        _threshold.set(this, void 0);
        __classPrivateFieldSet(this, _pointLeft, 0);
        __classPrivateFieldSet(this, _pointTop, 0);
        __classPrivateFieldSet(this, _prevDiffX, 0);
        __classPrivateFieldSet(this, _prevDiffY, 0);
        __classPrivateFieldSet(this, _threshold, 100);
        __classPrivateFieldSet(this, _wasTriggeredX, false);
        __classPrivateFieldSet(this, _wasTriggeredY, false);
    }
    matches(top, left, offsetX, offsetY) {
        return this.fitsOffsetY(top, offsetY) || this.fitsOffsetX(left, offsetX);
    }
    fitsOffsetX(left, offsetX) {
        if (offsetX <= 0)
            return false;
        let diffX = left - __classPrivateFieldGet(this, _pointLeft);
        if (left >= offsetX && diffX > __classPrivateFieldGet(this, _threshold)) {
            __classPrivateFieldSet(this, _wasTriggeredX, true);
        }
        else if (__classPrivateFieldGet(this, _wasTriggeredX) && diffX < -__classPrivateFieldGet(this, _threshold)) {
            __classPrivateFieldSet(this, _wasTriggeredX, false);
        }
        if (diffX < 0 && __classPrivateFieldGet(this, _prevDiffX) < diffX || diffX >= 0 && __classPrivateFieldGet(this, _prevDiffX) > diffX) {
            __classPrivateFieldSet(this, _pointLeft, left);
        }
        __classPrivateFieldSet(this, _prevDiffX, diffX);
        return __classPrivateFieldGet(this, _wasTriggeredX);
    }
    fitsOffsetY(top, offsetY) {
        if (offsetY <= 0) {
            return false;
        }
        let diffY = top - __classPrivateFieldGet(this, _pointTop);
        if (top >= offsetY && diffY > __classPrivateFieldGet(this, _threshold)) {
            __classPrivateFieldSet(this, _wasTriggeredY, true);
        }
        else if (__classPrivateFieldGet(this, _wasTriggeredY) && diffY < -__classPrivateFieldGet(this, _threshold)) {
            __classPrivateFieldSet(this, _wasTriggeredY, false);
        }
        if (diffY < 0 && __classPrivateFieldGet(this, _prevDiffY) < diffY || diffY >= 0 && __classPrivateFieldGet(this, _prevDiffY) > diffY) {
            __classPrivateFieldSet(this, _pointTop, top);
        }
        __classPrivateFieldSet(this, _prevDiffY, diffY);
        return __classPrivateFieldGet(this, _wasTriggeredY);
    }
}
_pointLeft = new WeakMap(), _pointTop = new WeakMap(), _prevDiffY = new WeakMap(), _prevDiffX = new WeakMap(), _wasTriggeredX = new WeakMap(), _wasTriggeredY = new WeakMap(), _threshold = new WeakMap();
export class CuiOffsetModeFactory {
    static get(mode) {
        if (mode === 'dynamic') {
            return new CuiOffsetDynamicMode();
        }
        return new CuiOffsetStaticMode();
    }
}
