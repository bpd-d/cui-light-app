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
var _hoverListener, _onHover;
import { CuiHoverListener } from "../../../core/listeners/hover";
export class CuiHoverModule {
    constructor(element, onHover) {
        _hoverListener.set(this, void 0);
        _onHover.set(this, void 0);
        this.type = 'hover';
        this.description = "";
        __classPrivateFieldSet(this, _onHover, onHover);
        __classPrivateFieldSet(this, _hoverListener, new CuiHoverListener(element));
        __classPrivateFieldGet(this, _hoverListener).setCallback(this.onHover.bind(this));
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _hoverListener).attach();
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _hoverListener).detach();
            return true;
        });
    }
    onHover(ev) {
        __classPrivateFieldGet(this, _onHover).call(this, ev);
    }
}
_hoverListener = new WeakMap(), _onHover = new WeakMap();
