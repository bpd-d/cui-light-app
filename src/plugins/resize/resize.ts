import { ICuiPlugin } from "src/core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiPlugin } from "../base";
import { ICuiResizableObserver, CuiResizeObserver } from "./observer";

export interface CuiResizeObserverPluginSetup {
    resizeThreshold?: number;
}

export function CuiResizeObserverPluginFn(setup: CuiResizeObserverPluginSetup): ICuiPlugin {
    return new CuiPlugin({
        name: 'resize-observer-plugin',
        description: "CuiResizeObserverPlugin",
        setup: {
            resizeThreshold: 20,
            ...setup
        },
        callback: (utils: CuiCore, setup: CuiResizeObserverPluginSetup) => {
            const resizeObserver: ICuiResizableObserver = new CuiResizeObserver(utils.bus, setup.resizeThreshold);
            resizeObserver.connect();
            return [
                [], () => { resizeObserver.disconnect(); }
            ]
        }
    })
}