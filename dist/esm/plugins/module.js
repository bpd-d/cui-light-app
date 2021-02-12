import { CuiAlertsPlugin } from "./alert/alert";
import { CuiWindowClickPlugin } from "./click/click";
import { CuiKeysObserverPlugin } from "./keys/keys";
import { CuiAutoLightModePlugin } from "./light/light";
import { CuiMoveObserverPlugin } from "./move/move";
import { CuiNotificationPlugin } from "./notification/notification";
import { CuiAutoPrintModePlugin } from "./print/print";
import { CuiCSSVariablesPlugin } from "./properties/properties";
import { CuiResizeObserverPlugin } from "./resize/resize";
import { CuiToastPlugin } from "./toast/toast";
export function GetPlugins(init) {
    let light = init ? init.autoLight : true;
    let print = init ? init.autoPrint : true;
    return [
        new CuiAutoLightModePlugin({ autoLight: light }),
        new CuiAutoPrintModePlugin({ autoPrint: print }),
        new CuiKeysObserverPlugin({}),
        new CuiWindowClickPlugin(),
        new CuiCSSVariablesPlugin({}),
        new CuiMoveObserverPlugin(),
        new CuiResizeObserverPlugin({}),
        new CuiToastPlugin({}),
        new CuiAlertsPlugin(),
        new CuiNotificationPlugin({ timeout: init.notifcationTimeout })
    ];
}
