import { ICuiPlugin } from "../core/models/interfaces";
import { CuiAlertsPlugin } from "./alert/alert";
import { CuiWindowClickPlugin } from "./click/click";
import { CuiKeysObserverPlugin } from "./keys/keys";
import { CuiAutoLightModePlugin } from "./light/light";
import { CuiMoveObserverPlugin } from "./move/move";
import { CuiAutoPrintModePlugin } from "./print/print";
import { CuiCSSVariablesPlugin } from "./properties/properties";
import { CuiResizeObserverPlugin } from "./resize/resize";
import { CuiToastPlugin } from "./toast/toast";

export interface CuiPluginsInit {
    autoLight: boolean;
    autoPrint: boolean;
}

export function GetPlugins(init: CuiPluginsInit): ICuiPlugin[] {
    let light: boolean = init ? init.autoLight : true;
    let print: boolean = init ? init.autoPrint : true;
    return [
        new CuiAutoLightModePlugin({ autoLight: light }),
        new CuiAutoPrintModePlugin({ autoPrint: print }),
        new CuiKeysObserverPlugin({}),
        new CuiWindowClickPlugin(),
        new CuiCSSVariablesPlugin({}),
        new CuiMoveObserverPlugin(),
        new CuiResizeObserverPlugin({}),
        new CuiToastPlugin({}),
        new CuiAlertsPlugin()
    ]
}