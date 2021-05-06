var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CuiObserverExtension {
    constructor(element, observer) {
        this.type = 'observer';
        this.description = "";
        this._observer = observer;
        this._element = element;
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this._observer.connect();
            this._observer.observe(this._element);
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this._observer.unobserve(this._element);
            this._observer.disconnect();
            return true;
        });
    }
}
export function cuiObserverExtension(setup) {
    var _a;
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : "observer",
        init: () => __awaiter(this, void 0, void 0, function* () {
            setup.observer.connect();
            setup.observer.observe(setup.element);
            return true;
        }),
        destroy: () => __awaiter(this, void 0, void 0, function* () {
            setup.observer.unobserve(setup.element);
            setup.observer.disconnect();
            return true;
        })
    };
}
