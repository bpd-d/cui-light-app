import { CuiScrollListener } from "../../../core/listeners/scroll";
import { listenerExtension } from "../listener/listener";
export function getCuiScrollExtension(setup) {
    var _a;
    const _scrollListener = new CuiScrollListener(setup.element, setup.threshold);
    _scrollListener.setCallback(onScroll);
    function onScroll(ev) {
        setup.performer.perform(ev);
    }
    return listenerExtension({
        listener: _scrollListener,
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : 'scroll'
    });
}
