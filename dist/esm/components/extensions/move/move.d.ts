import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
import { ICuiMoveData } from "../../../core/listeners/move";
import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiMoveExtensionSetup {
    root?: HTMLElement;
    target?: HTMLElement;
    preventDefault?: boolean;
    performer: ICuiExtensionPerformer<ICuiMoveData>;
}
export declare function moveExtension(setup: ICuiMoveExtensionSetup): ICuiHandlerExtension<any>;
