import { ICuiPlugin } from "src/core/models/interfaces";
export interface ICuiLightFocusPluginSetup {
    keybordClass?: string;
    mouseClass?: string;
    touchClass?: string;
}
export declare function CuiLightFocusPluginFn(setup: ICuiLightFocusPluginSetup): ICuiPlugin;
