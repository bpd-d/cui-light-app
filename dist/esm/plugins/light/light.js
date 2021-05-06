import { getSystemLightMode } from "../../core/utils/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";
import { CuiPlugin, getPluginListenerExtension } from "../base";
export function CuiAutoLightModePluginFn(setup) {
    const _description = "CuiAutoLightModePlugin";
    return new CuiPlugin({
        name: 'auto-light',
        description: _description,
        setup: setup,
        callback: (utils, setup) => {
            function onChange(ev) {
                var _a;
                let autoLightSetup = utils.setup.plugins[_description];
                let autoLight = (_a = autoLightSetup === null || autoLightSetup === void 0 ? void 0 : autoLightSetup.autoLight) !== null && _a !== void 0 ? _a : false;
                if (autoLight) {
                    utils.setLightMode(ev.matches ? "dark" : "light");
                }
            }
            if (setup.autoLight && getSystemLightMode() === 'dark') {
                utils.setLightMode('dark');
            }
            const listener = new CuiMediaQueryListener('(prefers-color-scheme: dark)');
            listener.setCallback(onChange);
            return [
                [getPluginListenerExtension({
                        listener: listener
                    })],
                undefined
            ];
        }
    });
}
