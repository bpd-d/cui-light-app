import { IUIInteractionProvider, CuiCachable } from "../../core/models/interfaces";
export declare class CollectionManager implements CuiCachable {
    private _log;
    private _cDt;
    private _helper;
    constructor(elements: Element[], interactions: IUIInteractionProvider);
    setToggle(className: string): void;
    setElements(elements: Element[]): void;
    click(callback: (element: Element, index: number) => void): void;
    next(): Promise<boolean>;
    previous(): Promise<boolean>;
    set(index: number): Promise<boolean>;
    setWithAnimation(index: number, animClassIn: string, animClassOut: string, duration: number): Promise<boolean>;
    getCurrentIndex(): number;
    length(): number;
    refresh(): boolean;
}
