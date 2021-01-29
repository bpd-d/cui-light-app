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
var _elements, _count, _threshold;
import { is } from "../../utils/functions";
export class CuiSimpleDragOverDetector {
    constructor() {
        _elements.set(this, void 0);
        _count.set(this, void 0);
        _threshold.set(this, void 0);
        __classPrivateFieldSet(this, _elements, []);
        __classPrivateFieldSet(this, _count, 0);
        __classPrivateFieldSet(this, _threshold, 5);
    }
    setElements(elements) {
        __classPrivateFieldSet(this, _elements, elements);
        __classPrivateFieldSet(this, _count, __classPrivateFieldGet(this, _elements).length);
    }
    setThreshold(value) {
        __classPrivateFieldSet(this, _threshold, value);
    }
    detect(x, y) {
        if (!is(__classPrivateFieldGet(this, _elements))) {
            return [-1, undefined];
        }
        let idx = -1;
        let found = undefined;
        for (let i = 0; i < __classPrivateFieldGet(this, _count); i++) {
            if (this.isInBounds(__classPrivateFieldGet(this, _elements)[i], x, y)) {
                if (i === 0) {
                    idx = i;
                    found = __classPrivateFieldGet(this, _elements)[i];
                    //break;
                }
                else if (i < __classPrivateFieldGet(this, _count) - 1) {
                    idx = i + 1;
                    found = __classPrivateFieldGet(this, _elements)[i + 1];
                    //break;
                }
                break;
            }
        }
        return [idx, found];
    }
    isInBounds(element, x, y) {
        const box = element.getBoundingClientRect();
        return x > box.left - __classPrivateFieldGet(this, _threshold) && x < box.left + box.width + __classPrivateFieldGet(this, _threshold) &&
            y > box.top - __classPrivateFieldGet(this, _threshold) && y < box.top + box.height + __classPrivateFieldGet(this, _threshold);
    }
}
_elements = new WeakMap(), _count = new WeakMap(), _threshold = new WeakMap();
