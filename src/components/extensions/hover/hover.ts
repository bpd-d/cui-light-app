import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { CuiHoverEvent, CuiHoverListener } from "../../../core/listeners/hover";
import { ICuiExtensionPerformer } from "../interfaces";

export interface ICuiHoverExtensionSetup<T extends CuiHoverEvent> {
    element: HTMLElement,
    type?: string;
    performer: ICuiExtensionPerformer<T>;
}

export class CuiHoverModule implements ICuiHandlerExtension<any> {
    type: string;
    description: string;

    private _hoverListener: CuiHoverListener;
    private _onHover: (ev: CuiHoverEvent) => void;

    constructor(element: HTMLElement, onHover: (ev: CuiHoverEvent) => void) {
        this.type = 'hover';
        this.description = "";
        this._onHover = onHover;
        this._hoverListener = new CuiHoverListener(element);
        this._hoverListener.setCallback(this.onHover.bind(this));
    }

    async init(args: any): Promise<boolean> {
        this._hoverListener.attach();
        return true;
    }

    async destroy(): Promise<boolean> {
        this._hoverListener.detach();
        return true;
    }

    private onHover(ev: CuiHoverEvent) {
        this._onHover(ev);
    }
}


export function hoverExtension<T extends CuiHoverEvent>(setup: ICuiHoverExtensionSetup<T>): ICuiHandlerExtension<any> {
    const _hoverListener = new CuiHoverListener(setup.element);

    function onHover(arg: T) {
        setup.performer.perform(arg);
    }
    return {
        type: setup.type ?? 'hover',
        init: async () => {
            //@ts-ignore
            _hoverListener.setCallback(onHover);
            _hoverListener.attach();
            return true;
        },
        destroy: async () => {
            _hoverListener.detach();
            return true;
        }
    }
}