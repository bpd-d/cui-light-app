import { CuiAlertsPluginFn } from "./alert/alert";
import { CuiWindowClickPluginFn } from "./click/click";
import { CuiLightFocusPluginFn } from "./focus/focus";
import { CuiKeysObserverPluginFn } from "./keys/keys";
import { CuiAutoLightModePluginFn } from "./light/light";
import { CuiMoveObserverPluginFn } from "./move/move";
import { CuiNotificationPluginFn } from "./notification/notification";
import { CuiAutoPrintModePluginFn } from "./print/print";
//import { CuiCSSVariablesPlugin } from "./properties/properties";
import { CuiResizeObserverPluginFn } from "./resize/resize";
import { CuiToastPlugin } from "./toast/toast";
export function GetPlugins(init) {
    var _a;
    let light = init ? init.autoLight : true;
    let print = init ? init.autoPrint : true;
    return [
        CuiAutoLightModePluginFn({ autoLight: light }),
        CuiAutoPrintModePluginFn({ autoPrint: print }),
        CuiKeysObserverPluginFn({}),
        CuiWindowClickPluginFn(),
        //  new CuiCSSVariablesPlugin({}),
        CuiMoveObserverPluginFn(),
        CuiResizeObserverPluginFn({}),
        CuiToastPlugin({}),
        CuiAlertsPluginFn(),
        CuiNotificationPluginFn({ timeout: init.notifcationTimeout }),
        CuiLightFocusPluginFn((_a = init.focusSetup) !== null && _a !== void 0 ? _a : {})
    ];
}
