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
var _element, _element_1, _element_2;
export class BasePositionCalculator {
    calculate(x, y, diffX, diffY) {
        return [x, y];
    }
}
export class OptionalPositionCalculator {
    constructor(element) {
        _element.set(this, void 0);
        __classPrivateFieldSet(this, _element, element);
    }
    calculate(x, y, diffX, diffY) {
        let newX = __classPrivateFieldGet(this, _element).offsetLeft + diffX;
        let newY = __classPrivateFieldGet(this, _element).offsetTop + diffY;
        return [newX, newY];
    }
}
_element = new WeakMap();
export class BaseResizeCalculator {
    constructor(element) {
        _element_1.set(this, void 0);
        __classPrivateFieldSet(this, _element_1, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = x - __classPrivateFieldGet(this, _element_1).offsetLeft;
        let height = y - __classPrivateFieldGet(this, _element_1).offsetTop;
        return [width, height];
    }
}
_element_1 = new WeakMap();
export class OptionalResizeCalculator {
    constructor(element) {
        _element_2.set(this, void 0);
        __classPrivateFieldSet(this, _element_2, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = __classPrivateFieldGet(this, _element_2).offsetWidth + diffX;
        let height = __classPrivateFieldGet(this, _element_2).offsetHeight + diffY;
        return [width, height];
    }
}
_element_2 = new WeakMap();
