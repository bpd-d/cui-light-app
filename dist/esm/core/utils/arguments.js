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
var _parser, _defaults, _defaultsLength, _options, _props;
import { enumerateObject, isStringTrue } from "./functions";
const parserCallbacks = {
    "string": (value) => value.trim().toLowerCase(),
    'boolean': isStringTrue,
    "number": (value) => {
        const num = value.includes('.') ? parseFloat(value) : parseInt(value);
        return isNaN(num) ? undefined : num;
    }
};
export class CuiAutoParseArgs {
    constructor(options) {
        _parser.set(this, void 0);
        _defaults.set(this, void 0);
        _defaultsLength.set(this, void 0);
        _options.set(this, void 0);
        __classPrivateFieldSet(this, _options, options !== null && options !== void 0 ? options : {});
        __classPrivateFieldSet(this, _parser, new TypeParser(__classPrivateFieldGet(this, _options).props));
        __classPrivateFieldSet(this, _defaults, {});
        __classPrivateFieldSet(this, _defaultsLength, 0);
    }
    parse(args) {
        this.fillDefaultValues();
        if (!args) {
            return;
        }
        if (typeof args === 'string' && __classPrivateFieldGet(this, _options).main) {
            const currentType = typeof this[__classPrivateFieldGet(this, _options).main];
            this[__classPrivateFieldGet(this, _options).main] = __classPrivateFieldGet(this, _parser).parseValue(__classPrivateFieldGet(this, _options).main, args, currentType);
            return;
        }
        enumerateObject(this, (thisProp, thisValue) => {
            const currentType = typeof thisValue;
            // In case args doesn't have property, set default value set during object construction
            if (!args[thisProp]) {
                this[thisProp] = __classPrivateFieldGet(this, _defaults)[thisProp];
                return;
            }
            // Case that value is in args, parse and adjust
            const newVal = __classPrivateFieldGet(this, _parser).parseValue(thisProp, args[thisProp], currentType);
            if (newVal) {
                this[thisProp] = newVal;
            }
        });
    }
    fillDefaultValues() {
        if (__classPrivateFieldGet(this, _defaultsLength) === 0) {
            enumerateObject(this, (prperty, value) => {
                __classPrivateFieldGet(this, _defaults)[prperty] = value;
            });
            __classPrivateFieldSet(this, _defaultsLength, Object.keys(__classPrivateFieldGet(this, _defaults)).length);
        }
    }
}
_parser = new WeakMap(), _defaults = new WeakMap(), _defaultsLength = new WeakMap(), _options = new WeakMap();
class TypeParser {
    constructor(props) {
        _props.set(this, void 0);
        __classPrivateFieldSet(this, _props, props !== null && props !== void 0 ? props : {});
    }
    parseValue(name, value, type) {
        var _a, _b, _c;
        let prop = __classPrivateFieldGet(this, _props)[name];
        let callback = parserCallbacks[(_a = prop === null || prop === void 0 ? void 0 : prop.type) !== null && _a !== void 0 ? _a : type];
        let newVal = callback === null || callback === void 0 ? void 0 : callback(value);
        if (!newVal) {
            return prop === null || prop === void 0 ? void 0 : prop.default;
        }
        return (_c = (_b = prop === null || prop === void 0 ? void 0 : prop.corrector) === null || _b === void 0 ? void 0 : _b.call(prop, newVal)) !== null && _c !== void 0 ? _c : newVal;
    }
}
_props = new WeakMap();
