import { ICuiPlugin } from "src/core/models/interfaces";
export interface CuiResizeObserverPluginSetup {
    resizeThreshold?: number;
}
export declare function CuiResizeObserverPluginFn(setup: CuiResizeObserverPluginSetup): ICuiPlugin;
