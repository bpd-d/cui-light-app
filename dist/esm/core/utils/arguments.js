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
        this._options = options !== null && options !== void 0 ? options : {};
        this._parser = new TypeParser(this._options.props);
        this._defaults = {};
        this._defaultsLength = 0;
    }
    parse(args) {
        this.fillDefaultValues();
        if (!args) {
            return;
        }
        if (typeof args === 'string' && this._options.main) {
            const currentType = typeof this[this._options.main];
            this[this._options.main] = this._parser.parseValue(this._options.main, args, currentType);
            return;
        }
        enumerateObject(this, (thisProp, thisValue) => {
            const currentType = typeof thisValue;
            // In case args doesn't have property, set default value set during object construction
            if (!args[thisProp]) {
                this[thisProp] = this._defaults[thisProp];
                return;
            }
            // Case that value is in args, parse and adjust
            const newVal = this._parser.parseValue(thisProp, args[thisProp], currentType);
            if (newVal) {
                this[thisProp] = newVal;
            }
        });
    }
    fillDefaultValues() {
        if (this._defaultsLength === 0) {
            enumerateObject(this, (prperty, value) => {
                this._defaults[prperty] = value;
            });
            this._defaultsLength = Object.keys(this._defaults).length;
        }
    }
}
class TypeParser {
    constructor(props) {
        this._props = props !== null && props !== void 0 ? props : {};
    }
    parseValue(name, value, type) {
        var _a, _b, _c;
        let prop = this._props[name];
        let callback = parserCallbacks[(_a = prop === null || prop === void 0 ? void 0 : prop.type) !== null && _a !== void 0 ? _a : type];
        let newVal = callback === null || callback === void 0 ? void 0 : callback(value);
        if (!newVal) {
            return prop === null || prop === void 0 ? void 0 : prop.default;
        }
        return (_c = (_b = prop === null || prop === void 0 ? void 0 : prop.corrector) === null || _b === void 0 ? void 0 : _b.call(prop, newVal)) !== null && _c !== void 0 ? _c : newVal;
    }
}
