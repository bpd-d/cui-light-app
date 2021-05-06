import { CuiScrollEvent } from "src/core/listeners/scroll";
import { getBaseScrollPerformer } from "../extensions/scroll/performers";

export interface ICuiOffsetPerformerSetup {
    callback: (ev: CuiScrollEvent) => void;
    threshold: number;
}

export function getOffsetPerformer(setup: ICuiOffsetPerformerSetup) {
    let _prevX: number = 0;
    let _prevY: number = 0;
    function onScroll(ev: CuiScrollEvent) {
        if (_exceededThreshold(ev.left, ev.top)) {
            setup.callback(ev);
            _prevX = ev.left;
            _prevY = ev.top;
            return;
        }
    }

    function _exceededThreshold(x: number, y: number): boolean {
        return Math.abs(x - _prevX) > setup.threshold || Math.abs(y - _prevY) > setup.threshold;
    }

    return getBaseScrollPerformer({
        callback: onScroll
    })
}