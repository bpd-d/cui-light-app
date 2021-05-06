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
var _class;
import { is, are, splitColon } from "./functions";
export class CuiClassAction {
    constructor(className) {
        _class.set(this, void 0);
        __classPrivateFieldSet(this, _class, className);
    }
    add(element, core) {
        if (are(element, __classPrivateFieldGet(this, _class)) && !element.classList.contains(__classPrivateFieldGet(this, _class))) {
            element.classList.add(__classPrivateFieldGet(this, _class));
        }
    }
    remove(element, core) {
        if (are(element, __classPrivateFieldGet(this, _class)) && element.classList.contains(__classPrivateFieldGet(this, _class))) {
            element.classList.remove(__classPrivateFieldGet(this, _class));
        }
    }
    toggle(element, core) {
        if (are(element, __classPrivateFieldGet(this, _class))) {
            if (element.classList.contains(__classPrivateFieldGet(this, _class))) {
                element.classList.remove(__classPrivateFieldGet(this, _class));
            }
            else {
                element.classList.add(__classPrivateFieldGet(this, _class));
            }
        }
    }
}
_class = new WeakMap();
export class CuiInboundAction {
    constructor(name) {
        this._name = name;
    }
    add(element, core) {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                core.setLightMode('dark');
                break;
            case 'light-mode':
                core.setLightMode('light');
                break;
        }
    }
    remove(element, core) {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                core.setLightMode('light');
                break;
            case 'light-mode':
                core.setLightMode('dark');
                break;
        }
    }
    toggle(element, core) {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                this.setDarkMode(core);
                break;
            case 'light-mode':
                this.setDarkMode(core);
                break;
        }
    }
    setDarkMode(core) {
        if (core.getLightMode() === 'dark') {
            core.setLightMode('light');
        }
        else {
            core.setLightMode('dark');
        }
    }
}
export class AttributeAction {
    constructor(attribute) {
        [this._attributeName, this._attributeValue] = splitColon(attribute); // attribute.split(',')
    }
    add(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        element.setAttribute(this._attributeName, this._attributeValue);
    }
    remove(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        if (element.hasAttribute(this._attributeName)) {
            element.removeAttribute(this._attributeName);
        }
    }
    toggle(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        if (element.hasAttribute(this._attributeName)) {
            element.removeAttribute(this._attributeName);
        }
        else {
            element.setAttribute(this._attributeName, this._attributeValue);
        }
    }
}
export class StyleAction {
    constructor(attribute) {
        [this._attributeName, this._attributeValue] = splitColon(attribute);
    }
    add(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element;
        if (el.style && !el.style[this._attributeName]) {
            el.style[this._attributeName] = this._attributeValue;
        }
    }
    remove(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element;
        if (el.style && el.style[this._attributeName]) {
            el.style[this._attributeName] = "";
        }
    }
    toggle(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element;
        if (!el.style) {
            return;
        }
        if (!el.style[this._attributeName]) {
            el.style[this._attributeName] = this._attributeValue;
        }
        else {
            delete el.style[this._attributeName];
        }
    }
}
export class DummyAction {
    constructor() {
    }
    add(element, utils) {
    }
    remove(element, utils) {
    }
    toggle(element, utils) {
    }
}
export class CuiActionsFactory {
    static get(value) {
        if (!is(value)) {
            return new DummyAction();
        }
        let indicator = value[0];
        switch (indicator) {
            case '.':
                return new CuiClassAction(value.substring(1));
            case '~':
                return new CuiInboundAction(value.substring(1));
            case "&":
                return new AttributeAction(value.substring(1));
            case "^":
                return new StyleAction(value.substring(1));
            default:
                return new CuiClassAction(value);
        }
    }
}
export class CuiActionsListFactory {
    static get(value) {
        if (!is(value)) {
            return [];
        }
        const split = value.split(',');
        return split.map(single => {
            return CuiActionsFactory.get(single.trim());
        });
    }
}
