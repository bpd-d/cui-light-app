var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CuiComponentMutationExtension {
    constructor(element, performer, options) {
        this.type = 'mutations';
        this.description = "";
        this._element = element;
        this._performer = performer;
        this._disabled = true;
        this._isObserving = false;
        this._options = options !== null && options !== void 0 ? options : {
            childList: true,
            subtree: true,
        };
        this._observer = new MutationObserver(this.onMutation.bind(this));
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.observe();
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.unobserve();
            return true;
        });
    }
    observe() {
        if (!this._isObserving && !this._disabled) {
            this._observer.observe(this._element, this._options);
            this._isObserving = true;
        }
    }
    unobserve() {
        if (this._isObserving) {
            this._observer.disconnect();
            this._isObserving = false;
        }
    }
    disable(flag) {
        this._disabled = flag;
        if (this._disabled) {
            this.unobserve();
        }
    }
    onMutation(record) {
        this._performer.perform(record);
    }
}
