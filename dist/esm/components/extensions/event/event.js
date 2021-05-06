var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CuiEventExtension {
    constructor(busFacade, setup) {
        var _a;
        this.type = (_a = setup.type) !== null && _a !== void 0 ? _a : setup.eventName;
        this.description = "";
        this._eventId = null;
        this._setup = setup;
        this._busFacade = busFacade;
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this._eventId = this._busFacade.on(this._setup.eventName, this.onEvent.bind(this));
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detach(this._setup.eventName, this._eventId);
            return true;
        });
    }
    onEvent(arg) {
        this._setup.performer.perform(arg);
    }
}
export function eventExtension(bus, setup) {
    var _a;
    let eventId = null;
    function onEvent(arg) {
        setup.performer.perform(arg);
    }
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : setup.eventName,
        description: "",
        init: (arg) => __awaiter(this, void 0, void 0, function* () {
            eventId = bus.on(setup.eventName, onEvent);
            return true;
        }),
        destroy: () => __awaiter(this, void 0, void 0, function* () {
            bus.detach(setup.eventName, eventId);
            return true;
        })
    };
}
