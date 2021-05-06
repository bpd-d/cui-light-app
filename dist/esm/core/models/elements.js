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
        this._element = element;
        this._box = element.getBoundingClientRect();
    }
    getHeight() {
        return this._box.height;
    }
    getWidth() {
        return this._box.width;
    }
    getTop() {
        return this._box.top;
    }
    getLeft() {
        return this._box.left;
    }
    getScrollHeight() {
        return this._element.scrollHeight;
    }
    getScrollWidth() {
        return this._element.scrollWidth;
    }
    getScrollTop() {
        return this._element.scrollTop;
    }
    getScrollLeft() {
        return this._element.scrollLeft;
    }
    queryAll(selector) {
        return [...this._element.querySelectorAll(selector)];
    }
    get() {
        return this._element;
    }
    scrollTo(options) {
        this._element.scrollTo(options);
    }
}
export class HTMLElementBox {
    constructor(element) {
        this._element = element;
    }
    getHeight() {
        return this._element.offsetHeight;
    }
    getWidth() {
        return this._element.offsetWidth;
    }
    getTop() {
        return this._element.offsetTop;
    }
    getLeft() {
        return this._element.offsetLeft;
    }
    getScrollHeight() {
        return this._element.scrollHeight;
    }
    getScrollWidth() {
        return this._element.scrollWidth;
    }
    getScrollTop() {
        return this._element.scrollTop;
    }
    getScrollLeft() {
        return this._element.scrollLeft;
    }
    queryAll(selector) {
        return [...this._element.querySelectorAll(selector)];
    }
    get() {
        return this._element;
    }
    scrollTo(options) {
        this._element.scrollTo(options);
    }
}
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
    get() {
        return window;
    }
    scrollTo(options) {
        window.scrollTo(options);
    }
}
