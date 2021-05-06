var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiHoverListener } from "../../../core/listeners/hover";
export class CuiHoverModule {
    constructor(element, onHover) {
        this.type = 'hover';
        this.description = "";
        this._onHover = onHover;
        this._hoverListener = new CuiHoverListener(element);
        this._hoverListener.setCallback(this.onHover.bind(this));
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this._hoverListener.attach();
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this._hoverListener.detach();
            return true;
        });
    }
    onHover(ev) {
        this._onHover(ev);
    }
}
export function hoverExtension(setup) {
    var _a;
    const _hoverListener = new CuiHoverListener(setup.element);
    function onHover(arg) {
        setup.performer.perform(arg);
    }
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : 'hover',
        init: () => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            _hoverListener.setCallback(onHover);
            _hoverListener.attach();
            return true;
        }),
        destroy: () => __awaiter(this, void 0, void 0, function* () {
            _hoverListener.detach();
            return true;
        })
    };
}
