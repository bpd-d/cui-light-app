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
var _red, _green, _blue, _alpha, _colorStr, _colorStr_1;
import { getRangeValue, is, isInRange, } from "../utils/functions";
import { CuiColorError } from "./errors";
export class CuiColor {
    constructor(red, green, blue, alpha) {
        _red.set(this, void 0);
        _green.set(this, void 0);
        _blue.set(this, void 0);
        _alpha.set(this, void 0);
        __classPrivateFieldSet(this, _red, 0);
        __classPrivateFieldSet(this, _blue, 0);
        __classPrivateFieldSet(this, _green, 0);
        __classPrivateFieldSet(this, _alpha, 0);
        this.set(red, green, blue, alpha);
    }
    static create(colorStr) {
        if (!is(colorStr)) {
            throw new CuiColorError(`Given color value is not in a valid format`);
        }
        let parser;
        if (colorStr.startsWith("#")) {
            parser = new HexColorParser(colorStr);
        }
        else if (colorStr.startsWith("rgb")) {
            parser = new RgbColorParser(colorStr);
        }
        else {
            throw new CuiColorError("Unknown color string format");
        }
        let res = parser.parse();
        if (!res) {
            throw new CuiColorError("Color was not parsed");
        }
        return res;
    }
    set(red, green, blue, alpha) {
        __classPrivateFieldSet(this, _alpha, getRangeValue(alpha !== null && alpha !== void 0 ? alpha : 1, 0, 1));
        __classPrivateFieldSet(this, _blue, getRangeValue(blue, 0, 255));
        __classPrivateFieldSet(this, _red, getRangeValue(red, 0, 255));
        __classPrivateFieldSet(this, _green, getRangeValue(green, 0, 255));
    }
    setRed(red) {
        __classPrivateFieldSet(this, _red, getRangeValue(red, 0, 255));
    }
    setGreen(green) {
        __classPrivateFieldSet(this, _green, getRangeValue(green, 0, 255));
    }
    setBlue(blue) {
        __classPrivateFieldSet(this, _blue, getRangeValue(blue, 0, 255));
    }
    opacity(val) {
        __classPrivateFieldSet(this, _alpha, getRangeValue(val, 0, 1));
        return this;
    }
    lighten(amount) {
        this.shade(amount);
        return this;
    }
    darken(amount) {
        this.shade(-amount);
        return this;
    }
    invert() {
        __classPrivateFieldSet(this, _blue, 255 - __classPrivateFieldGet(this, _blue));
        __classPrivateFieldSet(this, _red, 255 - __classPrivateFieldGet(this, _red));
        __classPrivateFieldSet(this, _green, 255 - __classPrivateFieldGet(this, _green));
        return this;
    }
    getColorValue(type) {
        const t = type ? type.toLowerCase() : '#';
        switch (type) {
            case 'red':
                return __classPrivateFieldGet(this, _red);
            case 'green':
                return __classPrivateFieldGet(this, _green);
            case 'blue':
                return __classPrivateFieldGet(this, _blue);
            case 'alpha':
                return __classPrivateFieldGet(this, _alpha);
        }
        return -1;
    }
    toCssString() {
        return `rgba(${__classPrivateFieldGet(this, _red)}, ${__classPrivateFieldGet(this, _green)}, ${__classPrivateFieldGet(this, _blue)}, ${__classPrivateFieldGet(this, _alpha)})`;
    }
    shade(percent, self = true) {
        __classPrivateFieldSet(this, _red, this.shadeSingle(__classPrivateFieldGet(this, _red), percent, self));
        __classPrivateFieldSet(this, _green, this.shadeSingle(__classPrivateFieldGet(this, _green), percent, self));
        __classPrivateFieldSet(this, _blue, this.shadeSingle(__classPrivateFieldGet(this, _blue), percent, self));
    }
    shadeSingle(val, percent, self = true) {
        let rel = self ? val : 255;
        let prop = (rel * percent) / 100;
        let newVal = val + Math.round(prop);
        return getRangeValue(newVal, 0, 255);
    }
    clone() {
        return new CuiColor(__classPrivateFieldGet(this, _red), __classPrivateFieldGet(this, _green), __classPrivateFieldGet(this, _blue), __classPrivateFieldGet(this, _alpha));
    }
}
_red = new WeakMap(), _green = new WeakMap(), _blue = new WeakMap(), _alpha = new WeakMap();
export class HexColorParser {
    constructor(colorStr) {
        _colorStr.set(this, void 0);
        __classPrivateFieldSet(this, _colorStr, colorStr);
    }
    trim() {
        __classPrivateFieldSet(this, _colorStr, __classPrivateFieldGet(this, _colorStr) ? __classPrivateFieldGet(this, _colorStr).trim() : "");
        return;
    }
    isValid() {
        return is(__classPrivateFieldGet(this, _colorStr)) && __classPrivateFieldGet(this, _colorStr).startsWith("#");
    }
    parse() {
        let red = 0;
        let blue = 0;
        let green = 0;
        let alpha = 1;
        let length = __classPrivateFieldGet(this, _colorStr).length;
        if (__classPrivateFieldGet(this, _colorStr).length === 4) {
            red = parseInt(__classPrivateFieldGet(this, _colorStr)[1] + __classPrivateFieldGet(this, _colorStr)[1], 16);
            green = parseInt(__classPrivateFieldGet(this, _colorStr)[2] + __classPrivateFieldGet(this, _colorStr)[2], 16);
            blue = parseInt(__classPrivateFieldGet(this, _colorStr)[3] + __classPrivateFieldGet(this, _colorStr)[3], 16);
        }
        else {
            red = parseInt(__classPrivateFieldGet(this, _colorStr)[1] + __classPrivateFieldGet(this, _colorStr)[2], 16);
            green = parseInt(__classPrivateFieldGet(this, _colorStr)[3] + __classPrivateFieldGet(this, _colorStr)[4], 16);
            blue = parseInt(__classPrivateFieldGet(this, _colorStr)[5] + __classPrivateFieldGet(this, _colorStr)[6], 16);
            if (length > 7) {
                let alphaHex = parseInt(__classPrivateFieldGet(this, _colorStr)[7] + __classPrivateFieldGet(this, _colorStr)[8], 16);
                alpha = parseFloat((alphaHex / 255).toFixed(2));
            }
        }
        return new CuiColor(red, green, blue, alpha);
    }
}
_colorStr = new WeakMap();
export class RgbColorParser {
    constructor(colorStr) {
        _colorStr_1.set(this, void 0);
        __classPrivateFieldSet(this, _colorStr_1, colorStr);
    }
    trim() {
        __classPrivateFieldSet(this, _colorStr_1, is(__classPrivateFieldGet(this, _colorStr_1)) ? __classPrivateFieldGet(this, _colorStr_1).trim() : "");
    }
    isValid() {
        return is(__classPrivateFieldGet(this, _colorStr_1)) && __classPrivateFieldGet(this, _colorStr_1).startsWith("rgb");
    }
    parse() {
        let len = __classPrivateFieldGet(this, _colorStr_1).length;
        let str = __classPrivateFieldGet(this, _colorStr_1).startsWith("rgba") ? __classPrivateFieldGet(this, _colorStr_1).substring(5, len - 1) : __classPrivateFieldGet(this, _colorStr_1).substring(4, len - 1);
        let split = str.split(",");
        if (!isInRange(split.length, 3, 4)) {
            return undefined;
        }
        let red = parseInt(split[0]);
        let green = parseInt(split[1]);
        let blue = parseInt(split[2]);
        let alpha = split.length === 4 ? parseFloat(split[3]) : 1;
        return new CuiColor(red, green, blue, alpha);
    }
}
_colorStr_1 = new WeakMap();
