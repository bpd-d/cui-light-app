import { getBaseScrollPerformer } from "../extensions/scroll/performers";
export function getOffsetPerformer(setup) {
    let _prevX = 0;
    let _prevY = 0;
    function onScroll(ev) {
        if (_exceededThreshold(ev.left, ev.top)) {
            setup.callback(ev);
            _prevX = ev.left;
            _prevY = ev.top;
            return;
        }
    }
    function _exceededThreshold(x, y) {
        return Math.abs(x - _prevX) > setup.threshold || Math.abs(y - _prevY) > setup.threshold;
    }
    return getBaseScrollPerformer({
        callback: onScroll
    });
}
