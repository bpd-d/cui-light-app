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
}
export declare class CuiElementBoxFactory {
    static get(element: CuiElementBoxType): ICuiElementBox;
}
export declare class ElementBox implements ICuiElementBox {
    #private;
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
}
export declare class HTMLElementBox implements ICuiElementBox {
    #private;
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
}
