import { CuiDevtoolFactory } from "../../core/development/factory";
import { ICuiDevelopmentTool } from "../../core/development/interfaces";
import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { EVENTS } from "../../core/utils/statics";
import { CuiAlertFactory } from "./handler";
import { CuiAlertEvent } from "./models";



export class CuiAlertsPlugin implements ICuiPlugin {
    description: string;
    name: string;
    setup: any;

    #handleId: string | null;
    #utils: CuiUtils | undefined;
    #log: ICuiDevelopmentTool;
    constructor() {
        this.name = "alert-plugin";
        this.description = "CuiAlertsPlugin";

        this.#handleId = null;
        this.#utils = undefined;
        //@ts-ignore
        this.#log = null;
    }
    init(utils: CuiUtils): void {
        this.#log = CuiDevtoolFactory.get("CuiAlertsPlugin");
        this.#utils = utils;
        this.detach();
        this.#handleId = this.#utils.bus.on(EVENTS.ALERT, this.onAlert.bind(this), { $cuid: this.name });
    }

    destroy(): void {
        this.detach();
    }

    private detach() {
        if (this.#handleId && this.#utils) {
            this.#utils.bus.detach(EVENTS.ALERT, this.#handleId);

            this.#handleId = null;
        }
    }

    private onAlert(event: CuiAlertEvent) {
        if (!this.#utils) {
            this.#log.error("Utils are not set");
            return;
        }
        if (!this.validateEvent(event)) {
            this.#log.error("Event validation failed");
            return;
        }
        let popup = CuiAlertFactory.get(event.id, event.type, event.options, this.#utils);
        if (!popup) {
            this.#log.error("Possibly incorrect alert type");
            return;
        }
        popup.show(this.#utils.setup.root);
    }

    private validateEvent(event: CuiAlertEvent): boolean {
        if (!event || !event.id || !event.type || !event.options) {
            return false;
        }
        return true
    }
}
