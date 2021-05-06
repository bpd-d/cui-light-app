import { ICuiPlugin } from "../core/models/interfaces";
import { CuiAlertsPluginFn } from "./alert/alert";
import { CuiWindowClickPluginFn } from "./click/click";
import { CuiLightFocusPluginFn, ICuiLightFocusPluginSetup } from "./focus/focus";
import { CuiKeysObserverPluginFn } from "./keys/keys";
import { CuiAutoLightModePluginFn } from "./light/light";
import { CuiMoveObserverPluginFn } from "./move/move";
import { CuiNotificationPluginFn } from "./notification/notification";
import { CuiAutoPrintModePluginFn } from "./print/print";
//import { CuiCSSVariablesPlugin } from "./properties/properties";
import { CuiResizeObserverPluginFn } from "./resize/resize";
import { CuiToastP } from "./toast/toast";

export interface CuiPluginsInit {
    autoLight: boolean;
    autoPrint: boolean;
    notifcationTimeout?: number;
    focusSetup?: ICuiLightFocusPluginSetup;
}

export function GetPlugins(init: CuiPluginsInit): ICuiPlugin[] {
    let light: boolean = init ? init.autoLight : true;
    let print: boolean = init ? init.autoPrint : true;
    return [
        CuiAutoLightModePluginFn({ autoLight: light }),
        CuiAutoPrintModePluginFn({ autoPrint: print }),
        CuiKeysObserverPluginFn({}),
        CuiWindowClickPluginFn(),
        //  new CuiCSSVariablesPlugin({}),
        CuiMoveObserverPluginFn(),
        CuiResizeObserverPluginFn({}),
        CuiToastP({}),
        CuiAlertsPluginFn(),
        CuiNotificationPluginFn({ timeout: init.notifcationTimeout }),
        CuiLightFocusPluginFn(init.focusSetup ?? {})

    ]
}