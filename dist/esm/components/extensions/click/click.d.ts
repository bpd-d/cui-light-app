import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiExtensionPerformer } from "../interfaces";
export interface CuiClickExtensionSetup {
    type?: string;
    element: HTMLElement;
    performer: ICuiExtensionPerformer<MouseEvent>;
}
export declare class CuiClickModule<T> implements ICuiHandlerExtension<T> {
    type: string;
    description: string;
    element: HTMLElement;
    private _perfromer;
    constructor(element: HTMLElement, args: T, performer: ICuiExtensionPerformer<MouseEvent>);
    init(args: T): Promise<boolean>;
    destroy(): Promise<boolean>;
    private onElementClick;
}
export declare function clickExtension(setup: CuiClickExtensionSetup): ICuiHandlerExtension<any>;
