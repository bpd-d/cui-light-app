import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { CuiHoverEvent } from "../../../core/listeners/hover";
import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiHoverExtensionSetup<T extends CuiHoverEvent> {
    element: HTMLElement;
    type?: string;
    performer: ICuiExtensionPerformer<T>;
}
export declare class CuiHoverModule implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    private _hoverListener;
    private _onHover;
    constructor(element: HTMLElement, onHover: (ev: CuiHoverEvent) => void);
    init(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    private onHover;
}
export declare function hoverExtension<T extends CuiHoverEvent>(setup: ICuiHoverExtensionSetup<T>): ICuiHandlerExtension<any>;
