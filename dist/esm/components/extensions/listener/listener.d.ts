import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiEventListener } from "src/core/models/interfaces";
export interface ICuiListenerExtensionSetup<T> {
    listener: ICuiEventListener<T>;
    type: string;
}
export declare function listenerExtension<T>(setup: ICuiListenerExtensionSetup<T>): ICuiHandlerExtension<any>;
