import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiObserver } from "src/core/models/interfaces";

export interface ICuiObserverExtensionSetup {
    type?: string;
    element: HTMLElement;
    observer: ICuiObserver;
}

export class CuiObserverExtension implements ICuiHandlerExtension<any> {
    type: string;
    description: string;

    private _observer: ICuiObserver;
    private _element: HTMLElement;

    constructor(element: HTMLElement, observer: ICuiObserver) {
        this.type = 'observer';
        this.description = "";
        this._observer = observer;
        this._element = element;
    }

    async init(args: any): Promise<boolean> {
        this._observer.connect();
        this._observer.observe(this._element);
        return true;
    }

    async destroy(): Promise<boolean> {
        this._observer.unobserve(this._element);
        this._observer.disconnect();
        return true;
    }

}

export function cuiObserverExtension(setup: ICuiObserverExtensionSetup): ICuiHandlerExtension<any> {
    return {
        type: setup.type ?? "observer",
        init: async () => {
            setup.observer.connect();
            setup.observer.observe(setup.element);
            return true;
        },
        destroy: async () => {
            setup.observer.unobserve(setup.element);
            setup.observer.disconnect();
            return true;
        }

    }
}