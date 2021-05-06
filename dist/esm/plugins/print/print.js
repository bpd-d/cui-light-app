import { getSystemPrintMode } from "../../core/utils/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";
import { CuiPlugin, getPluginListenerExtension } from "../base";
export function CuiAutoPrintModePluginFn(autoPrintInit) {
    const desc = "CuiAutoPrintModePlugin";
    return new CuiPlugin({
        name: 'auto-print',
        description: desc,
        setup: autoPrintInit,
        callback: (utils, setup) => {
            const listener = new CuiMediaQueryListener('print');
            listener.setCallback((t) => {
                var _a;
                setup = utils.setup.plugins[desc];
                let autoPrint = (_a = setup === null || setup === void 0 ? void 0 : setup.autoPrint) !== null && _a !== void 0 ? _a : false;
                if (autoPrint) {
                    if (t.matches) {
                        utils.setPrintMode(true);
                    }
                    else {
                        utils.setPrintMode(false);
                    }
                }
            });
            if (setup.autoPrint && getSystemPrintMode()) {
                utils.setPrintMode(true);
            }
            return [[getPluginListenerExtension({
                        listener: listener
                    })], undefined];
        }
    });
}
