import { CuiWindowClickPlugin } from "./click/click";
import { CuiKeysObserverPlugin } from "./keys/keys";
import { CuiAutoLightModePlugin } from "./light/light";
import { CuiAutoPrintModePlugin } from "./print/print";
import { CuiCSSVariablesPlugin } from "./properties/properties";
export function GetPlugins(init) {
    let light = init ? init.autoLight : true;
    let print = init ? init.autoPrint : true;
    return [
        new CuiAutoLightModePlugin({ autoLight: light }),
        new CuiAutoPrintModePlugin({ autoPrint: print }),
        new CuiKeysObserverPlugin({}),
        new CuiWindowClickPlugin(),
        new CuiCSSVariablesPlugin({})
    ];
}
