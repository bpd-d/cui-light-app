import { ICuiEventBusFacade } from "src/core/handlers/extensions/facades";
import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
import { EVENTS } from "../../../core/utils/statics";

export class CuiSwitchExtension implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    _busFacade: ICuiEventBusFacade;

    private _callback: (value: any) => void;
    private _switchEventId: string | null;
    constructor(busFacade: ICuiEventBusFacade, callback: (value: any) => void) {
        this.type = 'switch';
        this.description = "";
        this._busFacade = busFacade;

        this._switchEventId = null;
        this._callback = callback;
    }

    async init(args: any): Promise<boolean> {
        this._switchEventId = this._busFacade.on<any>(EVENTS.SWITCH, this.onSwitch.bind(this));
        return true;
    }

    // update?(args: any): Promise<boolean> {
    //     return true;
    // }

    async destroy(): Promise<boolean> {
        this._busFacade.detach(EVENTS.SWITCH, this._switchEventId)
        return true;
    }

    onSwitch(value: any) {
        if (!value) {
            return
        }
        this._callback(value);
    }
}