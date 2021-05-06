import { CuiCore } from "../models/core";
export interface ICuiComponentAction {
    add(element: Element, core?: CuiCore): void;
    remove(element: Element, core?: CuiCore): void;
    toggle(element: Element, core?: CuiCore): void;
}
export declare class CuiClassAction implements ICuiComponentAction {
    #private;
    constructor(className: string);
    add(element: Element, core?: CuiCore): void;
    remove(element: Element, core?: CuiCore): void;
    toggle(element: Element, core?: CuiCore): void;
}
export declare class CuiInboundAction implements ICuiComponentAction {
    _name: string;
    constructor(name: string);
    add(element: Element, core?: CuiCore): void;
    remove(element: Element, core?: CuiCore): void;
    toggle(element: Element, core?: CuiCore): void;
    private setDarkMode;
}
export declare class AttributeAction implements ICuiComponentAction {
    private _attributeName;
    private _attributeValue;
    constructor(attribute: string);
    add(element: Element, core?: CuiCore): void;
    remove(element: Element, core?: CuiCore): void;
    toggle(element: Element, core?: CuiCore): void;
}
export declare class StyleAction implements ICuiComponentAction {
    private _attributeName;
    private _attributeValue;
    constructor(attribute: string);
    add(element: Element, core?: CuiCore): void;
    remove(element: Element, core?: CuiCore): void;
    toggle(element: Element, core?: CuiCore): void;
}
export declare class DummyAction implements ICuiComponentAction {
    constructor();
    add(element: Element, utils?: CuiCore): void;
    remove(element: Element, utils?: CuiCore): void;
    toggle(element: Element, utils?: CuiCore): void;
}
export declare class CuiActionsFactory {
    static get(value: string): ICuiComponentAction;
}
export declare class CuiActionsListFactory {
    static get(value: string): ICuiComponentAction[];
}
