var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _attribute;
import { CuiComponentBase } from "../../core/handlers/base";
export class CuiDummyComponent {
    constructor() {
        this.attribute = 'cui-dummy';
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiDummyHandler(element, utils, this.attribute);
    }
}
export class CuiDummyHandler extends CuiComponentBase {
    constructor(element, utils, attribute) {
        super("CuiDummyHandler", element, utils);
        _attribute.set(this, void 0);
        __classPrivateFieldSet(this, _attribute, attribute);
    }
    handle(args) {
    }
    refresh(args) {
    }
    destroy() {
    }
}
_attribute = new WeakMap();
