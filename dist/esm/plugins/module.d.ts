import { ICuiPlugin } from "../core/models/interfaces";
export interface CuiPluginsInit {
    autoLight: boolean;
    autoPrint: boolean;
}
export declare function GetPlugins(init: CuiPluginsInit): ICuiPlugin[];
