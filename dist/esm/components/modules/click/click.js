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
var _onClick;
export class CuiClickModule {
    constructor(element, args, click) {
        _onClick.set(this, void 0);
        this.type = 'click';
        this.description = "";
        __classPrivateFieldSet(this, _onClick, click);
        this.element = element;
        this.onElementClick = this.onElementClick.bind(this);
        this.args = args;
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.args = args;
            this.element.addEventListener('click', this.onElementClick);
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
            this.element.removeEventListener('click', this.onElementClick);
            return true;
        });
    }
    onClick(callback) {
        __classPrivateFieldSet(this, _onClick, callback);
    }
    onElementClick(ev) {
        if (!__classPrivateFieldGet(this, _onClick)) {
            return;
        }
        __classPrivateFieldGet(this, _onClick).call(this, ev);
        if (this.args.prevent) {
            ev.preventDefault();
        }
        if (this.args.stopPropagation) {
            ev.stopPropagation();
        }
    }
}
_onClick = new WeakMap();
