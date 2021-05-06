import { ICuiPlugin } from "../../core/models/interfaces";
export interface AutoLightPluginSetup {
    autoLight: boolean;
}
export declare function CuiAutoLightModePluginFn(setup: AutoLightPluginSetup): ICuiPlugin;
