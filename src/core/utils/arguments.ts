import { ICuiParsable } from "../models/interfaces";
import { enumerateObject, isStringTrue, measure } from "./functions";

export interface ValueCorrectors {
    [name: string]: (value: any) => any;
}

export interface CuiArgProp {
    default?: any;
    type?: string;
    corrector?: (value: any) => any;
}

export interface CuiArgProps {
    [name: string]: CuiArgProp;
}

export interface CuiAutoParseOptions {
    main?: string;
    props?: CuiArgProps;
}

interface TypeParserCallbacks {
    [type: string]: (value: any) => string | number | boolean | undefined;
}

const parserCallbacks: TypeParserCallbacks = {
    "string": (value: any) => value.trim().toLowerCase(),
    'boolean': isStringTrue,
    "number": (value: any) => {
        const num = value.includes('.') ? parseFloat(value) : parseInt(value);
        return isNaN(num) ? undefined : num;
    }
}

export class CuiAutoParseArgs implements ICuiParsable {
    private _parser: TypeParser;
    private _defaults: any;
    private _defaultsLength: number;
    private _options: CuiAutoParseOptions
    constructor(options?: CuiAutoParseOptions) {
        this._options = options ?? {};
        this._parser = new TypeParser(this._options.props);
        this._defaults = {};
        this._defaultsLength = 0;
    }

    parse(args: any): void {
        this.fillDefaultValues();
        if (!args) {
            return;
        }

        if (typeof args === 'string' && this._options.main) {
            const currentType: string = typeof (this as any)[this._options.main];
            (this as any)[this._options.main] = this._parser.parseValue(this._options.main, args, currentType);
            return;
        }

        enumerateObject(this, (thisProp, thisValue) => {
            const currentType: string = typeof thisValue;
            // In case args doesn't have property, set default value set during object construction
            if (!args[thisProp]) {
                (this as any)[thisProp] = this._defaults[thisProp];
                return;
            }
            // Case that value is in args, parse and adjust
            const newVal = this._parser.parseValue(thisProp, args[thisProp], currentType);
            if (newVal) {
                (this as any)[thisProp] = newVal;
            }
        })
    }

    fillDefaultValues() {
        if (this._defaultsLength === 0) {
            enumerateObject(this, (prperty, value) => {
                this._defaults[prperty] = value;
            })
            this._defaultsLength = Object.keys(this._defaults).length;
        }
    }
}



class TypeParser {
    private _props: CuiArgProps;
    constructor(props?: CuiArgProps) {
        this._props = props ?? {};
    }

    parseValue(name: string, value: any, type: string): string | number | boolean | undefined {
        let prop = this._props[name];
        let callback = parserCallbacks[prop?.type ?? type];
        let newVal = callback?.(value);
        if (!newVal) {
            return prop?.default;
        }
        return prop?.corrector?.(newVal) ?? newVal;
    }
}