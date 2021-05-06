import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { getSystemPrintMode } from "../../core/utils/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";
import { CuiPlugin, getPluginListenerExtension } from "../base";

export interface AutoPrintPluginSetup {
    autoPrint: boolean;
}

export function CuiAutoPrintModePluginFn(autoPrintInit: AutoPrintPluginSetup): ICuiPlugin {
    const desc: string = "CuiAutoPrintModePlugin";
    return new CuiPlugin({
        name: 'auto-print',
        description: desc,
        setup: autoPrintInit,
        callback: (utils: CuiCore, setup: AutoPrintPluginSetup) => {
            const listener = new CuiMediaQueryListener('print');
            listener.setCallback((t: MediaQueryListEvent) => {
                setup = utils.setup.plugins[desc] as AutoPrintPluginSetup;
                let autoPrint = setup?.autoPrint ?? false;
                if (autoPrint) {
                    if (t.matches) {
                        utils.setPrintMode(true)
                    } else {
                        utils.setPrintMode(false)
                    }
                }
            })

            if (setup.autoPrint && getSystemPrintMode()) {
                utils.setPrintMode(true)
            }

            return [[getPluginListenerExtension({
                listener: listener
            })], undefined]
        }
    })
}