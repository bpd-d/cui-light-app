var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CuiClickModule {
    constructor(element, args, performer) {
        this.type = 'click';
        this.description = "";
        this._perfromer = performer;
        this.element = element;
        this.onElementClick = this.onElementClick.bind(this);
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.addEventListener('click', this.onElementClick);
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.removeEventListener('click', this.onElementClick);
            return true;
        });
    }
    onElementClick(ev) {
        this._perfromer.perform(ev);
    }
}
export function clickExtension(setup) {
    var _a;
    function onClick(ev) {
        setup.performer.perform(ev);
    }
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : 'click',
        init: () => __awaiter(this, void 0, void 0, function* () {
            setup.element.addEventListener('click', onClick);
            return true;
        }),
        destroy: () => __awaiter(this, void 0, void 0, function* () {
            setup.element.removeEventListener('click', onClick);
            return true;
        })
    };
}
