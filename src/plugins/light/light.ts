import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { getSystemLightMode } from "../../core/utils/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";
import { CuiPlugin, getPluginListenerExtension } from "../base";

export interface AutoLightPluginSetup {
    autoLight: boolean;
}

export function CuiAutoLightModePluginFn(setup: AutoLightPluginSetup): ICuiPlugin {
    const _description = "CuiAutoLightModePlugin";
    return new CuiPlugin({
        name: 'auto-light',
        description: _description,
        setup: setup,
        callback: (utils: CuiCore, setup: AutoLightPluginSetup) => {

            function onChange(ev: MediaQueryListEvent) {
                let autoLightSetup = utils.setup.plugins[_description] as AutoLightPluginSetup;
                let autoLight = autoLightSetup?.autoLight ?? false;
                if (autoLight) {
                    utils.setLightMode(ev.matches ? "dark" : "light")
                }
            }

            if (setup.autoLight && getSystemLightMode() === 'dark') {
                utils.setLightMode('dark')
            }

            const listener = new CuiMediaQueryListener('(prefers-color-scheme: dark)');
            listener.setCallback(onChange)
            return [
                [getPluginListenerExtension({
                    listener: listener
                })],
                undefined
            ]
        }
    })
}