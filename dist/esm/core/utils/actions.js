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
var _class, _name, _attributeName, _attributeValue, _attributeName_1, _attributeValue_1;
import { is, are, splitColon } from "./functions";
export class CuiClassAction {
    constructor(className) {
        _class.set(this, void 0);
        __classPrivateFieldSet(this, _class, className);
    }
    add(element, utils) {
        if (are(element, __classPrivateFieldGet(this, _class)) && !element.classList.contains(__classPrivateFieldGet(this, _class))) {
            element.classList.add(__classPrivateFieldGet(this, _class));
        }
    }
    remove(element, utils) {
        if (are(element, __classPrivateFieldGet(this, _class)) && element.classList.contains(__classPrivateFieldGet(this, _class))) {
            element.classList.remove(__classPrivateFieldGet(this, _class));
        }
    }
    toggle(element, utils) {
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
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
    }
    add(element, utils) {
        if (!utils) {
            return;
        }
        switch (__classPrivateFieldGet(this, _name)) {
            case 'dark-mode':
                utils.setLightMode('dark');
                break;
            case 'light-mode':
                utils.setLightMode('light');
                break;
        }
    }
    remove(element, utils) {
        if (!utils) {
            return;
        }
        switch (__classPrivateFieldGet(this, _name)) {
            case 'dark-mode':
                utils.setLightMode('light');
                break;
            case 'light-mode':
                utils.setLightMode('dark');
                break;
        }
    }
    toggle(element, utils) {
        if (!utils) {
            return;
        }
        switch (__classPrivateFieldGet(this, _name)) {
            case 'dark-mode':
                this.setDarkMode(utils);
                break;
            case 'light-mode':
                this.setDarkMode(utils);
                break;
        }
    }
    setDarkMode(utils) {
        if (utils.getLightMode() === 'dark') {
            utils.setLightMode('light');
        }
        else {
            utils.setLightMode('dark');
        }
    }
}
_name = new WeakMap();
export class AttributeAction {
    constructor(attribute) {
        var _a, _b;
        _attributeName.set(this, void 0);
        _attributeValue.set(this, void 0);
        _a = this, _b = this, [({ set value(_c) { __classPrivateFieldSet(_a, _attributeName, _c); } }).value, ({ set value(_c) { __classPrivateFieldSet(_b, _attributeValue, _c); } }).value] = splitColon(attribute); // attribute.split(',')
    }
    add(element, utils) {
        if (!are(element, __classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue))) {
            return;
        }
        element.setAttribute(__classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue));
    }
    remove(element, utils) {
        if (!are(element, __classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue))) {
            return;
        }
        if (element.hasAttribute(__classPrivateFieldGet(this, _attributeName))) {
            element.removeAttribute(__classPrivateFieldGet(this, _attributeName));
        }
    }
    toggle(element, utils) {
        if (!are(element, __classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue))) {
            return;
        }
        if (element.hasAttribute(__classPrivateFieldGet(this, _attributeName))) {
            element.removeAttribute(__classPrivateFieldGet(this, _attributeName));
        }
        else {
            element.setAttribute(__classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue));
        }
    }
}
_attributeName = new WeakMap(), _attributeValue = new WeakMap();
export class StyleAction {
    constructor(attribute) {
        var _a, _b;
        _attributeName_1.set(this, void 0);
        _attributeValue_1.set(this, void 0);
        _a = this, _b = this, [({ set value(_c) { __classPrivateFieldSet(_a, _attributeName_1, _c); } }).value, ({ set value(_c) { __classPrivateFieldSet(_b, _attributeValue_1, _c); } }).value] = splitColon(attribute);
    }
    add(element, utils) {
        if (!are(element, __classPrivateFieldGet(this, _attributeName_1), __classPrivateFieldGet(this, _attributeValue_1))) {
            return;
        }
        let el = element;
        if (el.style && !el.style[__classPrivateFieldGet(this, _attributeName_1)]) {
            el.style[__classPrivateFieldGet(this, _attributeName_1)] = __classPrivateFieldGet(this, _attributeValue_1);
        }
    }
    remove(element, utils) {
        if (!are(element, __classPrivateFieldGet(this, _attributeName_1), __classPrivateFieldGet(this, _attributeValue_1))) {
            return;
        }
        let el = element;
        if (el.style && el.style[__classPrivateFieldGet(this, _attributeName_1)]) {
            el.style[__classPrivateFieldGet(this, _attributeName_1)] = "";
        }
    }
    toggle(element, utils) {
        if (!are(element, __classPrivateFieldGet(this, _attributeName_1), __classPrivateFieldGet(this, _attributeValue_1))) {
            return;
        }
        let el = element;
        if (!el.style) {
            return;
        }
        if (!el.style[__classPrivateFieldGet(this, _attributeName_1)]) {
            el.style[__classPrivateFieldGet(this, _attributeName_1)] = __classPrivateFieldGet(this, _attributeValue_1);
        }
        else {
            delete el.style[__classPrivateFieldGet(this, _attributeName_1)];
        }
    }
}
_attributeName_1 = new WeakMap(), _attributeValue_1 = new WeakMap();
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
export class CuiActionsFatory {
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
            return CuiActionsFatory.get(single.trim());
        });
    }
}
