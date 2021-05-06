import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiEventListener } from "src/core/models/interfaces";

export interface ICuiListenerExtensionSetup<T> {
    listener: ICuiEventListener<T>;
    type: string;
}


export function listenerExtension<T>(setup: ICuiListenerExtensionSetup<T>): ICuiHandlerExtension<any> {
    return {
        type: setup.type,
        init: async () => {
            if (!setup.listener.isAttached())
                setup.listener.attach();

            return true;
        },
        destroy: async () => {
            if (setup.listener.isAttached())
                setup.listener.detach();
            return true;
        }
    }
}