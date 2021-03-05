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
var _currentIcon;
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is } from "../../core/utils/functions";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export class CuiIconArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            main: 'icon'
        });
        this.icon = "";
        this.scale = 1;
    }
}
export class CuiIconComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-icon`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiIconHandler(element, utils, this.attribute);
    }
}
export class CuiIconHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiIconHandler", element, attribute, new CuiIconArgs(), utils);
        _currentIcon.set(this, void 0);
        __classPrivateFieldSet(this, _currentIcon, null);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _currentIcon) !== null) {
                this._log.debug("Icon already initialized");
                return false;
            }
            __classPrivateFieldSet(this, _currentIcon, this.args.icon);
            this.addIcon(this.args.icon);
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.args.icon === __classPrivateFieldGet(this, _currentIcon)) {
                return false;
            }
            __classPrivateFieldSet(this, _currentIcon, this.args.icon);
            this.addIcon(this.args.icon);
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            const svg = this.element.querySelector('svg');
            if (is(svg)) {
                //@ts-ignore checked
                svg.remove();
            }
            __classPrivateFieldSet(this, _currentIcon, null);
            return true;
        });
    }
    addIcon(icon) {
        const iconStr = icon ? ICONS[icon] : null;
        if (!iconStr) {
            return;
        }
        const iconSvg = new IconBuilder(iconStr).setScale(this.args.scale).build();
        const svg = this.element.querySelector('svg');
        if (is(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        if (this.element.childNodes.length > 0) {
            this.mutate(this.insertBefore, iconSvg);
            return;
        }
        this.mutate(this.appendChild, iconSvg);
    }
    insertBefore(iconElement) {
        this.element.insertBefore(iconElement, this.element.firstChild);
    }
    appendChild(iconElement) {
        this.element.appendChild(iconElement);
    }
}
_currentIcon = new WeakMap();
