var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _onKey, _eventId;
import { CuiHandlerBusMixin } from "src/core/handlers/modules/mixins";
import { is } from "src/core/utils/functions";
import { Mixin } from "src/core/utils/mixins";
import { EVENTS } from "src/core/utils/statics";
export class CuiKeysHandlerModule extends Mixin([CuiHandlerBusMixin]) {
    constructor(props, args, onKey) {
        super();
        _onKey.set(this, void 0);
        _eventId.set(this, void 0);
        this.props = props;
        this.args = args;
        __classPrivateFieldSet(this, _onKey, onKey);
        __classPrivateFieldSet(this, _eventId, null);
        this.emittedEvents = [];
        this.type = "key-close";
        this.description = "";
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _eventId, this.on(EVENTS.KEYDOWN, this.onKeyDown.bind(this)));
            return true;
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.args = args;
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _eventId))
                this.detach(EVENTS.KEYDOWN, __classPrivateFieldGet(this, _eventId));
            return true;
        });
    }
    onKeyDown(ev) {
        if (this.args.escClose && ev.event.key === "Escape" || is(this.args.keyClose) && ev.event.key === this.args.keyClose) {
            __classPrivateFieldGet(this, _onKey).call(this, ev);
        }
    }
}
_onKey = new WeakMap(), _eventId = new WeakMap();
