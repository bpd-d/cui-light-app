var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EVENTS } from "../../../core/utils/statics";
export class CuiSwitchExtension {
    constructor(busFacade, callback) {
        this.type = 'switch';
        this.description = "";
        this._busFacade = busFacade;
        this._switchEventId = null;
        this._callback = callback;
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this._switchEventId = this._busFacade.on(EVENTS.SWITCH, this.onSwitch.bind(this));
            return true;
        });
    }
    // update?(args: any): Promise<boolean> {
    //     return true;
    // }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detach(EVENTS.SWITCH, this._switchEventId);
            return true;
        });
    }
    onSwitch(value) {
        if (!value) {
            return;
        }
        this._callback(value);
    }
}
