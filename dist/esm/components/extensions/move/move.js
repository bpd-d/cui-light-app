import { CuiMoveEventListener } from "../../../core/listeners/move";
import { listenerExtension } from "../listener/listener";
export function moveExtension(setup) {
    const listener = new CuiMoveEventListener(setup.root);
    listener.setTarget(setup.target);
    listener.preventDefault(setup.preventDefault === true);
    listener.setCallback((ev) => {
        setup.performer.perform(ev);
    });
    return listenerExtension({
        type: "move",
        listener: listener
    });
}
