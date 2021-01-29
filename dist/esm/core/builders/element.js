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
var _id, _classes, _attributes, _tag;
import { is, enumerateObject } from "../utils/functions";
export class ElementBuilder {
    constructor(tag) {
        _id.set(this, void 0);
        _classes.set(this, void 0);
        _attributes.set(this, void 0);
        _tag.set(this, void 0);
        __classPrivateFieldSet(this, _tag, tag);
        __classPrivateFieldSet(this, _classes, []);
        __classPrivateFieldSet(this, _attributes, undefined);
        __classPrivateFieldSet(this, _id, undefined);
    }
    setId(id) {
        __classPrivateFieldSet(this, _id, id);
        return this;
    }
    setClasses(...classList) {
        __classPrivateFieldSet(this, _classes, classList);
        return this;
    }
    setAttributes(attributes) {
        __classPrivateFieldSet(this, _attributes, attributes);
        return this;
    }
    build(innerHTML) {
        let element = document.createElement(__classPrivateFieldGet(this, _tag));
        if (is(__classPrivateFieldGet(this, _id))) {
            // @ts-ignore id is checked
            element.id = __classPrivateFieldGet(this, _id);
        }
        if (is(__classPrivateFieldGet(this, _classes))) {
            element.classList.add(...__classPrivateFieldGet(this, _classes));
        }
        if (is(__classPrivateFieldGet(this, _attributes))) {
            // @ts-ignore attributes are checked
            enumerateObject(__classPrivateFieldGet(this, _attributes), (attr, value) => {
                element.setAttribute(attr, value);
            });
        }
        if (is(innerHTML)) {
            // @ts-ignore innerHTML checked already
            element.innerHTML = innerHTML;
        }
        return element;
    }
}
_id = new WeakMap(), _classes = new WeakMap(), _attributes = new WeakMap(), _tag = new WeakMap();
