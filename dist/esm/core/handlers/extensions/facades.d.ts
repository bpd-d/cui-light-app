import { ICuiEventBus } from "../../../core/bus/interfaces";
import { EventBase } from "../../../core/models/events";
import { CuiHTMLElement, ICuiPair, IUIInteractionProvider } from "../../../core/models/interfaces";
export interface ICuiEventBusFacade {
    emit<T extends EventBase>(event: string, data: T, source?: CuiHTMLElement): Promise<boolean>;
    on<T>(event: string, callback: (t: T) => void): string | null;
    detach(event: string, id: string | null): void;
    detachEmittedEvents(): void;
}
export interface ICuiInteractionsFacade {
    mutate(callback: any, ...args: any[]): void;
    fetch(callback: any, ...args: any[]): void;
}
export interface ICuiInteractionsAsyncFacade<T> {
    mutate(callback: (...args: any[]) => T, ...args: any[]): Promise<T>;
    fetch(callback: (...args: any[]) => T, ...args: any[]): Promise<T>;
}
export interface ICuiClassesHelper {
    hasClass(cls: string, element: Element): boolean;
}
export interface ICuiClassesHelper {
    hasClass(cls: string, element: Element): boolean;
    setClass(cls: string, element: Element): void;
    setClasses(classes: string[], element?: Element): void;
    removeClass(cls: string, element: Element): void;
    removeClasses(classes: string[], element?: Element): void;
}
export interface ICuiClassesAsyncHelper {
    removeClasses(element: Element, ...classes: string[]): void;
    setClasses(element: Element, ...classes: string[]): void;
}
export interface ICuiAttributesAsyncHelper {
    removeAttribute(attributeName: string, element: Element): void;
    removeAttributes(attributeName: string[], element: Element): void;
    setAttribute(attributeName: string, value: string, element: Element): void;
    setAttributes(attributes: ICuiPair<string, string>[], element: Element): void;
}
export interface ICuiStyleHelper {
    setStyle(property: string, value: string, element: any): void;
    removeStyle(property: string, element: any): void;
    clean(element: HTMLElement): void;
}
export interface ICuiStyleAsyncHelper {
    setStyle(property: string, value: string, element: any): void;
    removeStyle(property: string, element: any): void;
    setStyles(properties: ICuiPair<string, string>[], element: any): void;
    removeStyles(properties: string[], element: any): void;
    clean(element: HTMLElement): void;
}
export declare function getEventBusFacade(cuid: string, bus: ICuiEventBus, target: HTMLElement): ICuiEventBusFacade;
export declare function getCuiHandlerInteractions<T>(interactions: IUIInteractionProvider, ctx?: T): ICuiInteractionsFacade;
export declare function cuiHandlerAsyncInteractions<T>(interactions: IUIInteractionProvider, ctx?: any): ICuiInteractionsAsyncFacade<T>;
export declare class ClassesHelper implements ICuiClassesHelper {
    hasClass(cls: string, element: Element): boolean;
    setClass(cls: string, element: Element): void;
    setClasses(classes: string[], element?: Element): void;
    removeClass(cls: string, element: Element): void;
    removeClasses(classes: string[], element?: Element): void;
}
export declare class CuiClassesAsyncHelper implements ICuiClassesAsyncHelper {
    private _interactions;
    private _classesHelper;
    constructor(interactions: IUIInteractionProvider, helper: ICuiClassesHelper);
    removeClasses(element: Element, ...classes: string[]): void;
    setClasses(element: Element, ...classes: string[]): void;
}
export declare class CuiAttributeHelper implements ICuiAttributesAsyncHelper {
    private _interactions;
    constructor(interactions: IUIInteractionProvider);
    removeAttribute(attributeName: string, element: Element): void;
    setAttribute(attributeName: string, value: string, element: Element): void;
    removeAttributes(attributeName: string[], element: Element): void;
    setAttributes(attributes: ICuiPair<string, string>[], element: Element): void;
}
export declare class CuiStyleHelper implements ICuiStyleHelper {
    clean(element: HTMLElement): void;
    setStyle(property: string, value: string, element: any): void;
    removeStyle(property: string, element: any): void;
}
export declare class CuiStyleAsyncHelper implements ICuiStyleAsyncHelper {
    private _interactions;
    private _helper;
    constructor(interactions: IUIInteractionProvider, helper: ICuiStyleHelper);
    setStyle(property: string, value: string, element: any): void;
    removeStyle(property: string, element: any): void;
    setStyles(properties: ICuiPair<string, string>[], element: any): void;
    removeStyles(properties: string[], element: any): void;
    clean(element: HTMLElement): void;
}
