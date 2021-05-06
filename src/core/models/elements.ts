
export type CuiElementBoxType = Element | HTMLElement | Window;

export interface ICuiElementBox {
    getHeight(): number;
    getWidth(): number;
    getTop(): number;
    getLeft(): number;
    getScrollHeight(): number;
    getScrollWidth(): number;
    getScrollTop(): number;
    getScrollLeft(): number;
    queryAll(selector: string): HTMLElement[];
    get(): CuiElementBoxType;
    scrollTo(scrollObj: ScrollToOptions): void;
}

export class CuiElementBoxFactory {
    static get(element: CuiElementBoxType): ICuiElementBox {
        if (element instanceof Window) {
            return new WindowElementBox();
        } else if (element instanceof HTMLElement) {
            return new HTMLElementBox(element);
        }
        return new ElementBox(element);
    }
}

export class ElementBox implements ICuiElementBox {
    private _box: DOMRect;
    private _element: Element;
    constructor(element: Element) {
        this._element = element;
        this._box = element.getBoundingClientRect();
    }

    getHeight(): number {
        return this._box.height;
    }
    getWidth(): number {
        return this._box.width;
    }
    getTop(): number {
        return this._box.top;
    }
    getLeft(): number {
        return this._box.left;
    }
    getScrollHeight(): number {
        return this._element.scrollHeight;
    }

    getScrollWidth(): number {
        return this._element.scrollWidth;
    }

    getScrollTop(): number {
        return this._element.scrollTop;
    }

    getScrollLeft(): number {
        return this._element.scrollLeft;
    }

    queryAll(selector: string): HTMLElement[] {
        return [...this._element.querySelectorAll<HTMLElement>(selector)];
    }

    get(): CuiElementBoxType {
        return this._element;
    }

    scrollTo(options: ScrollToOptions) {
        this._element.scrollTo(options);
    }
}

export class HTMLElementBox implements ICuiElementBox {
    private _element: HTMLElement;
    constructor(element: HTMLElement) {
        this._element = element;
    }

    getHeight(): number {
        return this._element.offsetHeight;
    }
    getWidth(): number {
        return this._element.offsetWidth;
    }
    getTop(): number {
        return this._element.offsetTop;
    }
    getLeft(): number {
        return this._element.offsetLeft;
    }

    getScrollHeight(): number {
        return this._element.scrollHeight;
    }

    getScrollWidth(): number {
        return this._element.scrollWidth;
    }

    getScrollTop(): number {
        return this._element.scrollTop;
    }

    getScrollLeft(): number {
        return this._element.scrollLeft;
    }

    queryAll(selector: string): HTMLElement[] {
        return [...this._element.querySelectorAll<HTMLElement>(selector)];
    }
    get(): CuiElementBoxType {
        return this._element;
    }

    scrollTo(options: ScrollToOptions) {
        this._element.scrollTo(options);
    }
}

export class WindowElementBox implements ICuiElementBox {
    getHeight(): number {
        return window.innerHeight;
    }
    getWidth(): number {
        return window.innerWidth;
    }
    getTop(): number {
        return 0;
    }
    getLeft(): number {
        return 0;
    }

    getScrollHeight(): number {
        return window.innerHeight;
    }

    getScrollWidth(): number {
        return window.innerWidth;
    }

    getScrollTop(): number {
        return window.pageYOffset;
    }
    getScrollLeft(): number {
        return window.pageXOffset;
    }
    queryAll(selector: string): HTMLElement[] {
        return [...document.querySelectorAll(selector)] as any[];
    }

    get(): CuiElementBoxType {
        return window;
    }

    scrollTo(options: ScrollToOptions) {
        window.scrollTo(options);
    }

}

