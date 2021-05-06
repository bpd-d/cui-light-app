import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
import { CuiScrollEvent } from "../../../core/listeners/scroll";
import { CuiElementBoxType } from "../../../core/models/elements";
import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiScrollExtensionOptions {
    element: CuiElementBoxType;
    type?: string;
    threshold: number;
    performer: ICuiExtensionPerformer<CuiScrollEvent>;
}
export declare function getCuiScrollExtension(setup: ICuiScrollExtensionOptions): ICuiHandlerExtension<any>;
