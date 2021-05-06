var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isInViewport } from "../../../core/utils/functions";
import { EVENTS } from "../../../core/utils/statics";
export class ICuiKeysExtensionOptions {
}
export class CuiKeysHandlerExtension {
    constructor(element, busFacade, performer, options) {
        var _a, _b;
        this.type = "keys";
        this.description = "";
        this._busFacade = busFacade;
        this._performer = performer;
        this._eventId = null;
        this._element = element;
        this._options = {
            allowRepeatedEvent: (_a = options === null || options === void 0 ? void 0 : options.allowRepeatedEvent) !== null && _a !== void 0 ? _a : false,
            onlyWhenInViewport: (_b = options === null || options === void 0 ? void 0 : options.onlyWhenInViewport) !== null && _b !== void 0 ? _b : true,
        };
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this._eventId = this._busFacade.on(EVENTS.KEYDOWN, this.onKeyDown.bind(this));
            return true;
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            //  this.args = args;
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._eventId)
                this._busFacade.detach(EVENTS.KEYDOWN, this._eventId);
            this._eventId = null;
            return true;
        });
    }
    onKeyDown(ev) {
        if (!(this._options.onlyWhenInViewport && isInViewport(this._element)) || (this._options.allowRepeatedEvent && !ev.event.repeat)) {
            return;
        }
        this._performer.perform(ev);
    }
}
