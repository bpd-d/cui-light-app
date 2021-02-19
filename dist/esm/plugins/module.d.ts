import { ICuiPlugin } from "../core/models/interfaces";
import { ICuiLightFocusPluginSetup } from "./focus/focus";
export interface CuiPluginsInit {
    autoLight: boolean;
    autoPrint: boolean;
    notifcationTimeout?: number;
    focusSetup?: ICuiLightFocusPluginSetup;
}
export declare function GetPlugins(init: CuiPluginsInit): ICuiPlugin[];
