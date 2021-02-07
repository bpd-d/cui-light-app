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
import { CuiHandler } from "../../core/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is, isString, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { IconBuilder } from "../../core/builders/icon";
export class CuiIconArgs {
    constructor() {
        this.icon = "";
        this.scale = 1;
    }
    parse(val) {
        if (isString(val)) {
            this.icon = getStringOrDefault(val, "");
        }
        else {
            this.icon = getStringOrDefault(val.icon, "");
            this.scale = getIntOrDefault(val.scale, 1);
        }
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
export class CuiIconHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiIconHandler", element, attribute, new CuiIconArgs(), utils);
        _currentIcon.set(this, void 0);
        __classPrivateFieldSet(this, _currentIcon, null);
    }
    onInit() {
        if (this.isLocked) {
            return;
        }
        if (__classPrivateFieldGet(this, _currentIcon) !== null) {
            this._log.debug("Icon already initialized");
            return;
        }
        this.isLocked = true;
        __classPrivateFieldSet(this, _currentIcon, this.args.icon);
        this.addIcon(this.args.icon);
    }
    onUpdate() {
        if (this.isLocked) {
            return;
        }
        if (this.args.icon === __classPrivateFieldGet(this, _currentIcon)) {
            return;
        }
        __classPrivateFieldSet(this, _currentIcon, this.args.icon);
        this.addIcon(this.args.icon);
    }
    onDestroy() {
        const svg = this.element.querySelector('svg');
        if (is(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        __classPrivateFieldSet(this, _currentIcon, null);
    }
    addIcon(icon) {
        const iconStr = icon ? ICONS[icon] : null;
        if (!iconStr) {
            this.isLocked = false;
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
        }
        else {
            this.mutate(this.appendChild, iconSvg);
        }
    }
    insertBefore(iconElement) {
        this.element.insertBefore(iconElement, this.element.firstChild);
        this.isLocked = false;
    }
    appendChild(iconElement) {
        this.element.appendChild(iconElement);
        this.isLocked = false;
    }
}
_currentIcon = new WeakMap();
