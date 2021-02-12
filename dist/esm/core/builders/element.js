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
var _id, _classes, _attributes, _tag, _text, _children, _rawChildren, _callback, _evName;
import { is, enumerateObject, are } from "../utils/functions";
export class ElementBuilder {
    constructor(tag) {
        _id.set(this, void 0);
        _classes.set(this, void 0);
        _attributes.set(this, void 0);
        _tag.set(this, void 0);
        _text.set(this, void 0);
        _children.set(this, void 0);
        _rawChildren.set(this, void 0);
        _callback.set(this, void 0);
        _evName.set(this, void 0);
        __classPrivateFieldSet(this, _tag, tag);
        __classPrivateFieldSet(this, _classes, []);
        __classPrivateFieldSet(this, _attributes, undefined);
        __classPrivateFieldSet(this, _id, undefined);
        __classPrivateFieldSet(this, _text, undefined);
        __classPrivateFieldSet(this, _children, []);
        __classPrivateFieldSet(this, _rawChildren, []);
        __classPrivateFieldSet(this, _evName, undefined);
        __classPrivateFieldSet(this, _callback, undefined);
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
    setTextContent(text) {
        __classPrivateFieldSet(this, _text, text);
        return this;
    }
    setChildren(...elements) {
        __classPrivateFieldSet(this, _children, [...elements]);
        return this;
    }
    setRawChildren(...elements) {
        __classPrivateFieldSet(this, _rawChildren, [...elements]);
        return this;
    }
    onEvent(name, callback) {
        __classPrivateFieldSet(this, _evName, name);
        __classPrivateFieldSet(this, _callback, callback);
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
        else if (is(__classPrivateFieldGet(this, _text))) {
            // @ts-ignore text checked already
            element.textContent = __classPrivateFieldGet(this, _text);
        }
        __classPrivateFieldGet(this, _rawChildren).forEach(raw => { element.appendChild(raw.build()); });
        __classPrivateFieldGet(this, _children).forEach(child => element.appendChild(child));
        if (are(__classPrivateFieldGet(this, _evName), __classPrivateFieldGet(this, _callback))) {
            // @ts-ignore
            element.addEventListener(__classPrivateFieldGet(this, _evName), (ev) => {
                // @ts-ignore
                __classPrivateFieldGet(this, _callback).call(this, ev);
            });
        }
        return element;
    }
}
_id = new WeakMap(), _classes = new WeakMap(), _attributes = new WeakMap(), _tag = new WeakMap(), _text = new WeakMap(), _children = new WeakMap(), _rawChildren = new WeakMap(), _callback = new WeakMap(), _evName = new WeakMap();
