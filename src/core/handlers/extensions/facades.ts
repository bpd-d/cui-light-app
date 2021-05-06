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
    hasClass(cls: string, element: Element): boolean
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

export function getEventBusFacade(cuid: string, bus: ICuiEventBus, target: HTMLElement): ICuiEventBusFacade {
    const _emittedEvents: string[] = [];
    return {
        emit: async <T extends EventBase>(event: string, data: T, source?: CuiHTMLElement) => {
            if (!_emittedEvents.includes(event))
                _emittedEvents.push(event);

            return bus.emit(event, cuid, {
                ...data,
                name: event,
                timestamp: Date.now(),
                source: source ?? target,
            })
        },
        on: <T>(event: string, callback: (t: T) => void) => {
            return bus.on(event, callback, target as any)
        },
        detach: (event: string, id: string | null) => {
            if (id != null) {
                bus.detach(event, id);
                id = "";
            }
        },
        detachEmittedEvents: () => {
            _emittedEvents.forEach(event => {
                bus.detachByCuid(event, cuid);
            })
        }
    }
}

export function getCuiHandlerInteractions<T>(interactions: IUIInteractionProvider, ctx?: T): ICuiInteractionsFacade {
    return {
        mutate: (callback: any, ...args: any[]) => {
            interactions.mutate(callback, ctx ?? null, ...args)
        },
        fetch: (callback: any, ...args: any[]) => {
            interactions.fetch(callback, ctx ?? null, ...args)
        }
    }
}

export function cuiHandlerAsyncInteractions<T>(interactions: IUIInteractionProvider, ctx?: any): ICuiInteractionsAsyncFacade<T> {
    return {
        mutate: (callback: (...args: any[]) => T, ...args: any[]) => {
            return new Promise((resolve, reject) => {
                interactions.mutate(() => {
                    try {
                        resolve(callback(...args));
                    } catch (e) {
                        reject(e)
                    }
                }, ctx ?? null)
            });
        },
        fetch: (callback: (...args: any[]) => T, ...args: any[]) => {
            return new Promise((resolve, reject) => {
                interactions.fetch(() => {
                    try {
                        resolve(callback(...args));
                    } catch (e) {
                        reject(e)
                    }
                }, ctx ?? null)
            });
        }
    }
}


export class ClassesHelper implements ICuiClassesHelper {

    hasClass(cls: string, element: Element): boolean {
        return cls && element.classList.contains(cls) ? true : false;
    }

    setClass(cls: string, element: Element): void {
        this.setClasses([cls], element);
    }

    setClasses(classes: string[], element?: Element) {
        if (element) {
            element.classList.add(...classes)
        }
    }


    removeClass(cls: string, element: Element) {
        this.removeClasses([cls], element);
    }

    removeClasses(classes: string[], element?: Element) {
        if (element) {
            element.classList.remove(...classes)
        }
    }
}

export class CuiClassesAsyncHelper implements ICuiClassesAsyncHelper {
    private _interactions: IUIInteractionProvider;
    private _classesHelper: ICuiClassesHelper;
    constructor(interactions: IUIInteractionProvider, helper: ICuiClassesHelper) {
        this._interactions = interactions;
        this._classesHelper = helper;
    }

    removeClasses(element: Element, ...classes: string[]) {
        this._interactions.mutate(this._classesHelper.removeClasses, this._classesHelper, classes, element);
    }

    setClasses(element: Element, ...classes: string[]) {
        this._interactions.mutate(this._classesHelper.setClasses, this._classesHelper, classes, element);
    }

}

export class CuiAttributeHelper implements ICuiAttributesAsyncHelper {

    private _interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this._interactions = interactions;
    }

    removeAttribute(attributeName: string, element: Element): void {
        this._interactions.mutate(() => {
            element.removeAttribute(attributeName);
        }, null)
    }

    setAttribute(attributeName: string, value: string, element: Element): void {
        this._interactions.mutate(() => {
            element.setAttribute(attributeName, value);
        }, null)
    }

    removeAttributes(attributeName: string[], element: Element): void {
        this._interactions.mutate(() => {
            attributeName.forEach((attr) => {
                if (!attr) {
                    return;
                }
                element.removeAttribute(attr)
            })
        }, null)
    }

    setAttributes(attributes: ICuiPair<string, string>[], element: Element): void {
        this._interactions.mutate(() => {
            attributes.forEach((attr) => {
                if (!attr.key) {
                    return;
                }
                element.setAttribute(attr.key, attr.value)
            })
        }, null)
    }

}

export class CuiStyleHelper implements ICuiStyleHelper {
    clean(element: HTMLElement): void {
        if (!element || !element.hasAttribute('style')) {
            return;
        }
        element.removeAttribute('style');

    }

    setStyle(property: string, value: string, element: any): void {
        if (!element || !element['style']) {
            return;
        }
        element.style[property] = value;
    }

    removeStyle(property: string, element: any): void {
        if (!element || !element['style'] || !element['style'][property]) {
            return;
        }
        delete element['style'][property];
    }

}

export class CuiStyleAsyncHelper implements ICuiStyleAsyncHelper {
    private _interactions: IUIInteractionProvider;
    private _helper: ICuiStyleHelper;
    constructor(interactions: IUIInteractionProvider, helper: ICuiStyleHelper) {
        this._interactions = interactions;
        this._helper = helper;
    }

    setStyle(property: string, value: string, element: any): void {
        this._interactions.mutate(this._helper.setStyle, this._helper, property, value, element);
    }

    removeStyle(property: string, element: any): void {
        this._interactions.mutate(this._helper.removeStyle, this._helper, property, element);
    }

    setStyles(properties: ICuiPair<string, string>[], element: any): void {
        if (!element['style']) {
            return;
        }
        this._interactions.mutate(() => {
            properties.forEach(prop => {
                if (!prop.key) {
                    return;
                }
                element["style"][prop.key] = prop.value;
            })
        }, null);

    }

    removeStyles(properties: string[], element: any): void {
        if (!element['style']) {
            return;
        }
        this._interactions.mutate(() => {
            properties.forEach(prop => {
                if (!prop) {
                    return;
                }
                delete element["style"][prop];
            })
        }, null);
    }

    clean(element: HTMLElement) {
        this._interactions.mutate(this._helper.clean, this._helper, element);
    }
}