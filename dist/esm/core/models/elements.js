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
var _box, _element, _element_1;
export class CuiElementBoxFactory {
    static get(element) {
        if (element instanceof Window) {
            return new WindowElementBox();
        }
        else if (element instanceof HTMLElement) {
            return new HTMLElementBox(element);
        }
        return new ElementBox(element);
    }
}
export class ElementBox {
    constructor(element) {
        _box.set(this, void 0);
        _element.set(this, void 0);
        __classPrivateFieldSet(this, _element, element);
        __classPrivateFieldSet(this, _box, element.getBoundingClientRect());
    }
    getHeight() {
        return __classPrivateFieldGet(this, _box).height;
    }
    getWidth() {
        return __classPrivateFieldGet(this, _box).width;
    }
    getTop() {
        return __classPrivateFieldGet(this, _box).top;
    }
    getLeft() {
        return __classPrivateFieldGet(this, _box).left;
    }
    getScrollHeight() {
        return __classPrivateFieldGet(this, _element).scrollHeight;
    }
    getScrollWidth() {
        return __classPrivateFieldGet(this, _element).scrollWidth;
    }
    getScrollTop() {
        return __classPrivateFieldGet(this, _element).scrollTop;
    }
    getScrollLeft() {
        return __classPrivateFieldGet(this, _element).scrollLeft;
    }
    queryAll(selector) {
        return [...__classPrivateFieldGet(this, _element).querySelectorAll(selector)];
    }
}
_box = new WeakMap(), _element = new WeakMap();
export class HTMLElementBox {
    constructor(element) {
        _element_1.set(this, void 0);
        __classPrivateFieldSet(this, _element_1, element);
    }
    getHeight() {
        return __classPrivateFieldGet(this, _element_1).offsetHeight;
    }
    getWidth() {
        return __classPrivateFieldGet(this, _element_1).offsetWidth;
    }
    getTop() {
        return __classPrivateFieldGet(this, _element_1).offsetTop;
    }
    getLeft() {
        return __classPrivateFieldGet(this, _element_1).offsetLeft;
    }
    getScrollHeight() {
        return __classPrivateFieldGet(this, _element_1).scrollHeight;
    }
    getScrollWidth() {
        return __classPrivateFieldGet(this, _element_1).scrollWidth;
    }
    getScrollTop() {
        return __classPrivateFieldGet(this, _element_1).scrollTop;
    }
    getScrollLeft() {
        return __classPrivateFieldGet(this, _element_1).scrollLeft;
    }
    queryAll(selector) {
        return [...__classPrivateFieldGet(this, _element_1).querySelectorAll(selector)];
    }
}
_element_1 = new WeakMap();
export class WindowElementBox {
    getHeight() {
        return window.innerHeight;
    }
    getWidth() {
        return window.innerWidth;
    }
    getTop() {
        return 0;
    }
    getLeft() {
        return 0;
    }
    getScrollHeight() {
        return window.innerHeight;
    }
    getScrollWidth() {
        return window.innerWidth;
    }
    getScrollTop() {
        return window.pageYOffset;
    }
    getScrollLeft() {
        return window.pageXOffset;
    }
    queryAll(selector) {
        return [...document.querySelectorAll(selector)];
    }
}
