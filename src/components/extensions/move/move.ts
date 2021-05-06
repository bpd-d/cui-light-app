import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
import { CuiMoveEventListener, ICuiMoveData } from "../../../core/listeners/move";
import { ICuiExtensionPerformer } from "../interfaces";
import { listenerExtension } from "../listener/listener";

export interface ICuiMoveExtensionSetup {
    root?: HTMLElement;
    target?: HTMLElement;
    preventDefault?: boolean;
    performer: ICuiExtensionPerformer<ICuiMoveData>;
}

export function moveExtension(setup: ICuiMoveExtensionSetup): ICuiHandlerExtension<any> {
    const listener = new CuiMoveEventListener(setup.root);
    listener.setTarget(setup.target)
    listener.preventDefault(setup.preventDefault === true);
    listener.setCallback((ev: ICuiMoveData) => {
        setup.performer.perform(ev);
    })

    return listenerExtension({
        type: "move",
        listener: listener
    })
}