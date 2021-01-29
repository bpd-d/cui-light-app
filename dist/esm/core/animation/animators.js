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
var _unit;
import { AnimatorError } from "../models/errors";
import { is } from "../utils/functions";
/**
 * Changes the opacity of the element from 0 to 1
 */
export class OpacityAnimator {
    constructor() {
        this.length = this.to = this.from = -1;
        this.rtl = false;
    }
    setProperty(prop) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[OpacityAnimator] Property has incorrect format");
        }
        this.from = prop.from;
        this.to = prop.to;
        this.length = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
    }
    perform(element, progress, factor) {
        if (this.to < 0) {
            return;
        }
        let current = this.length * progress;
        if (element["style"]) {
            element.style.opacity = this.rtl ? Math.max(this.from - current, 0) : Math.min(this.from + current, 1);
        }
    }
}
/**
 * Changes any style property of the element
 */
export class PropertyAnimator {
    constructor(property) {
        _unit.set(this, void 0);
        if (!is(property)) {
            throw new AnimatorError("[PropertyAnimator] Valid property is required");
        }
        this.property = property;
        this.length = this.to = this.from = -1;
        this.rtl = false;
        __classPrivateFieldSet(this, _unit, "");
    }
    setProperty(prop) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[PropertyAnimator] Property has incorrect format");
        }
        this.from = prop.from;
        this.to = prop.to;
        this.length = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
        __classPrivateFieldSet(this, _unit, prop.unit);
    }
    perform(element, progress, factor) {
        if (!this.property) {
            return;
        }
        let current = this.length * progress;
        if (element["style"]) {
            element.style[this.property] = this.createValue(this.rtl ? this.from - current : this.from + current, __classPrivateFieldGet(this, _unit));
        }
    }
    createValue(value, unit) {
        return `${value}${unit !== null && unit !== void 0 ? unit : ""}`;
    }
}
_unit = new WeakMap();
/**
 * Changes transform property of the element. Supports mulitple properties at the time
 */
export class TransformAnimator {
    constructor() {
        this.prop = undefined;
    }
    setProperty(prop) {
        if (!prop) {
            throw new AnimatorError("[TransformAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }
    build(progress) {
        let props = [];
        for (let name in this.prop) {
            let cur = this.prop[name];
            let diff = Math.abs(cur.to - cur.from);
            let rtl = cur.from > cur.to;
            let val = rtl ? cur.from - (diff * progress) : cur.from + (diff * progress);
            props.push(this.buildSingle(name, val, cur.unit));
        }
        return props.join(" ");
    }
    buildSingle(name, value, unit) {
        return `${name}(${value}${unit})`;
    }
    perform(element, progress) {
        if (!this.prop) {
            return;
        }
        if (element["style"]) {
            element.style.transform = this.build(progress);
        }
    }
}
