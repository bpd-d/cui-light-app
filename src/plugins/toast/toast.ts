import { EVENTS } from "../../core/utils/statics";
import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiToastHandler } from "./handler";

export interface CuiToastPluginSetup {

}

export class CuiToastPlugin implements ICuiPlugin {
    description: string;
    name: string = 'toast-plugin';
    setup: any;
    #toastHandler: CuiToastHandler | undefined;
    #eventId: string | null;
    #utils: CuiUtils | undefined;
    constructor(setup: CuiToastPluginSetup) {
        this.description = "CuiToastPlugin";
        this.setup = setup;
        this.#toastHandler = undefined;
        this.#eventId = null;
        this.#utils = undefined;
    }

    init(utils: CuiUtils): void {
        this.#utils = utils;
        if (!this.#toastHandler) {
            this.#toastHandler = new CuiToastHandler(utils.interactions, utils.setup.prefix, utils.setup.animationTime ?? 300);
        }

        this.#eventId = utils.bus.on(EVENTS.TOAST, this.onToastShow.bind(this), { $cuid: this.name });
    }

    destroy(): void {
        if (this.#utils && this.#eventId) {
            this.#utils.bus.detach(EVENTS.TOAST, this.#eventId);
            this.#eventId = null;
        }
    }

    private onToastShow(message: string) {
        if (!this.#toastHandler || !this.#utils) {
            return;
        }
        this.#utils.bus.emit(EVENTS.TOAST_SHOW, null, []);
        this.#toastHandler.show(message).then(() => {
            if (this.#utils)
                this.#utils.bus.emit(EVENTS.TOAST_HIDDEN, null, []);
        })
    }
}