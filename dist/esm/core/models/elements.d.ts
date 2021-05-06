export declare type CuiElementBoxType = Element | HTMLElement | Window;
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
export declare class CuiElementBoxFactory {
    static get(element: CuiElementBoxType): ICuiElementBox;
}
export declare class ElementBox implements ICuiElementBox {
    private _box;
    private _element;
    constructor(element: Element);
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
    scrollTo(options: ScrollToOptions): void;
}
export declare class HTMLElementBox implements ICuiElementBox {
    private _element;
    constructor(element: HTMLElement);
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
    scrollTo(options: ScrollToOptions): void;
}
export declare class WindowElementBox implements ICuiElementBox {
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
    scrollTo(options: ScrollToOptions): void;
}
