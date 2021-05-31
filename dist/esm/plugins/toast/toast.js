import { EVENTS } from "../../core/utils/statics";
import { CuiToastHandler } from "./handler";
import { CuiPlugin, getPluginEventExtension } from "../base";
export function CuiToastPlugin(setup) {
    const name = "toast-plugin";
    return new CuiPlugin({
        name: name,
        description: "CuiToastPlugin",
        setup: setup !== null && setup !== void 0 ? setup : {},
        callback: (utils) => {
            var _a;
            const toastHandler = new CuiToastHandler(utils.interactions, utils.setup.prefix, (_a = utils.setup.animationTime) !== null && _a !== void 0 ? _a : 300);
            function onToast(message) {
                if (!toastHandler) {
                    return;
                }
                utils.bus.emit(EVENTS.TOAST_SHOW, null, []);
                toastHandler.show(message).then(() => {
                    if (utils)
                        utils.bus.emit(EVENTS.TOAST_HIDDEN, null, []);
                });
            }
            return [
                [
                    getPluginEventExtension({
                        name: EVENTS.TOAST,
                        id: name,
                        callback: onToast,
                    }),
                ],
                undefined,
            ];
        },
    });
}
