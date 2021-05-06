import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
import { CuiScrollEvent, CuiScrollListener } from "../../../core/listeners/scroll";
import { CuiElementBoxType } from "../../../core/models/elements";
import { ICuiExtensionPerformer } from "../interfaces";
import { listenerExtension } from "../listener/listener";

export interface ICuiScrollExtensionOptions {
    element: CuiElementBoxType;
    type?: string;
    threshold: number;
    performer: ICuiExtensionPerformer<CuiScrollEvent>;
}

export function getCuiScrollExtension(setup: ICuiScrollExtensionOptions): ICuiHandlerExtension<any> {
    const _scrollListener = new CuiScrollListener(setup.element, setup.threshold)
    _scrollListener.setCallback(onScroll);

    function onScroll(ev: CuiScrollEvent) {
        setup.performer.perform(ev);
    }

    return listenerExtension({
        listener: _scrollListener,
        type: setup.type ?? 'scroll'
    })
}