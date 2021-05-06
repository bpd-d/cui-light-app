import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiExtensionPerformer } from "../interfaces";

export interface CuiClickExtensionSetup {
    type?: string;
    element: HTMLElement;
    performer: ICuiExtensionPerformer<MouseEvent>;
}

export class CuiClickModule<T> implements ICuiHandlerExtension<T> {
    type: string;
    description: string;
    element: HTMLElement;
    private _perfromer: ICuiExtensionPerformer<MouseEvent>;

    constructor(element: HTMLElement, args: T, performer: ICuiExtensionPerformer<MouseEvent>) {
        this.type = 'click';
        this.description = "";
        this._perfromer = performer;
        this.element = element;
        this.onElementClick = this.onElementClick.bind(this);
    }

    async init(args: T): Promise<boolean> {

        this.element.addEventListener('click', this.onElementClick)
        return true;
    }

    async destroy(): Promise<boolean> {
        this.element.removeEventListener('click', this.onElementClick)
        return true;
    }

    private onElementClick(ev: MouseEvent) {
        this._perfromer.perform(ev);
    }
}


export function clickExtension(setup: CuiClickExtensionSetup): ICuiHandlerExtension<any> {
    function onClick(ev: MouseEvent) {
        setup.performer.perform(ev);
    }
    return {
        type: setup.type ?? 'click',
        init: async () => {
            setup.element.addEventListener('click', onClick);
            return true;
        },
        destroy: async () => {
            setup.element.removeEventListener('click', onClick);
            return true;
        }
    }
}