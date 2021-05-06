import { CuiPlugin } from "../base";
import { CuiResizeObserver } from "./observer";
export function CuiResizeObserverPluginFn(setup) {
    return new CuiPlugin({
        name: 'resize-observer-plugin',
        description: "CuiResizeObserverPlugin",
        setup: Object.assign({ resizeThreshold: 20 }, setup),
        callback: (utils, setup) => {
            const resizeObserver = new CuiResizeObserver(utils.bus, setup.resizeThreshold);
            resizeObserver.connect();
            return [
                [], () => { resizeObserver.disconnect(); }
            ];
        }
    });
}
