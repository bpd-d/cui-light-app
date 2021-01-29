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
var _element, _scale, _appender;
import { createElementFromString, getIntOrDefault, is } from "../utils/functions";
export class IconBuilder {
    constructor(svgString) {
        _element.set(this, void 0);
        _scale.set(this, void 0);
        _appender.set(this, void 0);
        __classPrivateFieldSet(this, _element, svgString);
        __classPrivateFieldSet(this, _scale, 1);
        __classPrivateFieldSet(this, _appender, new IconScaleAppender());
    }
    setScale(scale) {
        __classPrivateFieldSet(this, _scale, scale);
        return this;
    }
    build() {
        let created = createElementFromString(__classPrivateFieldGet(this, _element));
        if (is(created) && __classPrivateFieldGet(this, _scale)) {
            // @ts-ignore created is checked already
            __classPrivateFieldGet(this, _appender).append(created, __classPrivateFieldGet(this, _scale));
        }
        return created;
    }
}
_element = new WeakMap(), _scale = new WeakMap(), _appender = new WeakMap();
export class IconScaleAppender {
    append(element, value) {
        let width = getIntOrDefault(element.getAttribute("width"), 20);
        let height = getIntOrDefault(element.getAttribute("height"), 20);
        element.setAttribute("width", (width * value).toString());
        element.setAttribute("height", (height * value).toString());
    }
}
