import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiObserver } from "src/core/models/interfaces";
export interface ICuiObserverExtensionSetup {
    type?: string;
    element: HTMLElement;
    observer: ICuiObserver;
}
export declare class CuiObserverExtension implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    private _observer;
    private _element;
    constructor(element: HTMLElement, observer: ICuiObserver);
    init(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
}
export declare function cuiObserverExtension(setup: ICuiObserverExtensionSetup): ICuiHandlerExtension<any>;
