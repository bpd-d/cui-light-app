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
var _from, _to, _x, _y, _id;
import { AnimatorError } from "../models/errors";
import { enumerateObject, getRangeValueOrDefault, is } from "../utils/functions";
/**
 * Changes the opacity of the element from 0 to 1
 */
export class OpacityAnimator {
    constructor() {
        this.prop = { from: 0, to: 0 };
    }
    setProperty(prop) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[OpacityAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }
    perform(element, progress, factor) {
        if (this.prop.to < 0) {
            return;
        }
        if (element["style"]) {
            element.style.opacity = calcUnitValue(this.prop, progress);
        }
    }
}
/**
 * Changes any style property of the element
 */
export class PropertyAnimator {
    constructor(property) {
        if (!is(property)) {
            throw new AnimatorError("[PropertyAnimator] Valid property is required");
        }
        this.property = property;
        this.prop = {
            from: 0,
            to: 0
        };
    }
    setProperty(prop) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[PropertyAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }
    perform(element, progress, factor) {
        if (!this.property) {
            return;
        }
        if (element["style"]) {
            element.style[this.property] = calcUnitValue(this.prop, progress);
        }
    }
}
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
            props.push(this.buildSingle(name, calcNewValue(cur.from, cur.to, progress), cur.unit));
        }
        return props.join(" ");
    }
    buildSingle(name, value, unit) {
        return `${name}(${prepUnitValue(value, unit)})`;
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
export class ColorAnimator {
    constructor(id) {
        _from.set(this, void 0);
        _to.set(this, void 0);
        __classPrivateFieldSet(this, _from, { red: 0, green: 0, blue: 0, alpha: 0 });
        __classPrivateFieldSet(this, _to, { red: 0, green: 0, blue: 0, alpha: 0 });
        this.id = id;
    }
    perform(element, progress, factor) {
        const newColor = {
            red: calcNewValue(__classPrivateFieldGet(this, _from).red, __classPrivateFieldGet(this, _to).red, progress),
            blue: calcNewValue(__classPrivateFieldGet(this, _from).blue, __classPrivateFieldGet(this, _to).blue, progress),
            green: calcNewValue(__classPrivateFieldGet(this, _from).green, __classPrivateFieldGet(this, _to).green, progress),
            alpha: calcNewValue(__classPrivateFieldGet(this, _from).alpha, __classPrivateFieldGet(this, _to).alpha, progress),
        };
        element.style[this.id] = `rgba(${newColor.red},${newColor.green},${newColor.blue},${newColor.alpha})`;
    }
    setProperty(prop) {
        __classPrivateFieldSet(this, _from, adjustColor(prop.from));
        __classPrivateFieldSet(this, _to, adjustColor(prop.to));
    }
}
_from = new WeakMap(), _to = new WeakMap();
export class FilterAnimator {
    constructor() {
        this.property = {};
    }
    perform(element, progress, factor) {
        let filters = [];
        enumerateObject(this.property, (filterName, setup) => {
            filters.push(`${filterName}(${calcUnitValue(setup, progress)})`);
        });
        element.style['filter'] = filters.join(' ');
    }
    setProperty(prop) {
        this.property = prop;
    }
}
export class PositionAnimator {
    constructor(id) {
        _x.set(this, void 0);
        _y.set(this, void 0);
        _id.set(this, void 0);
        __classPrivateFieldSet(this, _x, {
            from: 0,
            to: 0,
        });
        __classPrivateFieldSet(this, _y, {
            from: 0,
            to: 0,
        });
        __classPrivateFieldSet(this, _id, id !== null && id !== void 0 ? id : 'backgroundPosition');
    }
    perform(element, progress, factor) {
        let newX = calcUnitValue(__classPrivateFieldGet(this, _x), progress);
        let newY = calcUnitValue(__classPrivateFieldGet(this, _y), progress);
        element.style[__classPrivateFieldGet(this, _id)] = newX + " " + newY;
    }
    setProperty(prop) {
        const { x, y } = prop;
        if (x) {
            __classPrivateFieldSet(this, _x, x);
        }
        if (y) {
            __classPrivateFieldSet(this, _y, y);
        }
    }
}
_x = new WeakMap(), _y = new WeakMap(), _id = new WeakMap();
function adjustColor(color) {
    return {
        red: getRangeValueOrDefault(color.red, 0, 255, 0),
        green: getRangeValueOrDefault(color.green, 0, 255, 0),
        blue: getRangeValueOrDefault(color.blue, 0, 255, 0),
        alpha: getRangeValueOrDefault(color.alpha, 0, 1, 1),
    };
}
function calcNewValue(from, to, progress) {
    return from + (to - from) * progress;
}
function prepUnitValue(value, unit) {
    return value + (unit !== null && unit !== void 0 ? unit : "");
}
function calcUnitValue(prop, progress) {
    return prepUnitValue(calcNewValue(prop.from, prop.to, progress), prop.unit);
}
