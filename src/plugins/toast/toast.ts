import { EVENTS } from "../../core/utils/statics";
import { CuiCore } from "../../core/models/core";
import { CuiToastHandler } from "./handler";
import { CuiPlugin, getPluginEventExtension } from "../base";
import { ICuiPlugin } from "src/core/models/interfaces";

export interface CuiToastPluginSetup {

}

export function CuiToastP(setup?: CuiToastPluginSetup): ICuiPlugin {
    const name: string = "toast-plugin"

    return new CuiPlugin({
        name: name,
        description: "CuiToastPlugin",
        setup: setup ?? {},
        callback: (utils: CuiCore) => {

            const toastHandler = new CuiToastHandler(utils.interactions, utils.setup.prefix, utils.setup.animationTime ?? 300);

            function onToast(message: string) {
                if (!toastHandler) {
                    return;
                }
                utils.bus.emit(EVENTS.TOAST_SHOW, null, []);
                toastHandler.show(message).then(() => {
                    if (utils)
                        utils.bus.emit(EVENTS.TOAST_HIDDEN, null, []);
                })
            }

            return [
                [getPluginEventExtension({
                    name: EVENTS.TOAST,
                    id: name,
                    callback: onToast
                })], undefined]
        }
    })
}

// export class CuiToastPlugin extends CuiPluginBase<CuiToastPluginSetup> {
//     private _toastHandler: CuiToastHandler | undefined;

//     constructor(setup?: CuiToastPluginSetup) {
//         super("toast-plugin", "CuiToastPlugin", setup)
//         this.extend(getPluginEventExtension({
//             name: EVENTS.TOAST,
//             id: this.name,
//             callback: this.onToastShow.bind(this)
//         }))
//     }

//     onInit(): void {
//         //@ts-ignore - utils is set
//         this._toastHandler = new CuiToastHandler(this.utils.interactions, this.utils.setup.prefix, this.utils.setup.animationTime ?? 300);
//     }
//     onDestroy(): void {
//     }

//     private onToastShow(message: string) {
//         if (!this._toastHandler || !this.utils) {
//             return;
//         }
//         this.utils.bus.emit(EVENTS.TOAST_SHOW, null, []);
//         this._toastHandler.show(message).then(() => {
//             if (this.utils)
//                 this.utils.bus.emit(EVENTS.TOAST_HIDDEN, null, []);
//         })
//     }

// }

// export class CuiToastPlugin implements ICuiPlugin {
//     description: string;
//     name: string = 'toast-plugin';
//     setup: any;
//     #toastHandler: CuiToastHandler | undefined;
//     #eventId: string | null;
//     #utils: CuiUtils | undefined;
//     constructor(setup: CuiToastPluginSetup) {
//         this.description = "CuiToastPlugin";
//         this.setup = setup;
//         this.#toastHandler = undefined;
//         this.#eventId = null;
//         this.#utils = undefined;
//     }

//     init(utils: CuiUtils): void {
//         this.#utils = utils;
//         if (!this.#toastHandler) {
//             this.#toastHandler = new CuiToastHandler(utils.interactions, utils.setup.prefix, utils.setup.animationTime ?? 300);
//         }

//         this.#eventId = utils.bus.on(EVENTS.TOAST, this.onToastShow.bind(this), { $cuid: this.name });
//     }

//     destroy(): void {
//         if (this.#utils && this.#eventId) {
//             this.#utils.bus.detach(EVENTS.TOAST, this.#eventId);
//             this.#eventId = null;
//         }
//     }

//     private onToastShow(message: string) {
//         if (!this.#toastHandler || !this.#utils) {
//             return;
//         }
//         this.#utils.bus.emit(EVENTS.TOAST_SHOW, null, []);
//         this.#toastHandler.show(message).then(() => {
//             if (this.#utils)
//                 this.#utils.bus.emit(EVENTS.TOAST_HIDDEN, null, []);
//         })
//     }
// }