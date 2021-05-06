import { ICuiKeysCombo } from "src/core/models/interfaces";
import { splitText } from "../functions";
import { ICuiParser, ICuiParserCallbacks } from "./interfaces";

// export class CuiKeysComboParser implements ICuiParser<string, ICuiKeysCombo> {
//     private _splitBy: string;
//     private _handlers: ICuiParserCallbacks<ICuiKeysCombo, string>;
//     constructor(handlers: ICuiParserCallbacks<ICuiKeysCombo, string>, splitBy?: string) {
//         this._splitBy = splitBy ?? "+";
//         this._handlers = handlers;
//     }

//     parse(value: string): ICuiKeysCombo {
//         return splitText(value, this._splitBy).reduce((result: ICuiKeysCombo, item: string) => {
//             return this.getResult(result, item);
//         }, { isCtrl: false, isAlt: false, isShift: false });
//     }

//     private getResult(input: ICuiKeysCombo, item: string): ICuiKeysCombo {
//         let itemPrep = item.trim();
//         const handler = this._handlers[itemPrep.toLowerCase()];
//         if (handler) {
//             input = handler(input, itemPrep);
//         } else {
//             input.key = itemPrep;
//         }
//         return input;
//     }
// }

export function getCuiKeysComboParser(splitBy?: string): ICuiParser<string, ICuiKeysCombo> {
    let _handlers = KeyComboParsers;
    let _splitBy = splitBy ?? "+";
    function getResult(input: ICuiKeysCombo, item: string): ICuiKeysCombo {
        let itemPrep = item.trim();
        const handler = _handlers[itemPrep.toLowerCase()];
        if (handler) {
            input = handler(input, itemPrep);
        } else {
            input.key = itemPrep;
        }
        return input;
    }
    return {
        parse: (value: string) => {
            return splitText(value, _splitBy).reduce((result: ICuiKeysCombo, item: string) => {
                return getResult(result, item);
            }, { isCtrl: false, isAlt: false, isShift: false });
        }
    }

}


export function AltParser(input: ICuiKeysCombo, item: string): ICuiKeysCombo {
    input.isAlt = true;
    return input
}

export function CtrlParser(input: ICuiKeysCombo, item: string): ICuiKeysCombo {
    input.isCtrl = true;
    return input
}

export function ShiftParser(input: ICuiKeysCombo, item: string): ICuiKeysCombo {
    input.isShift = true;
    return input
}

export const KeyComboParsers: ICuiParserCallbacks<ICuiKeysCombo, string> = {
    'ctrl': CtrlParser,
    'alt': AltParser,
    'shift': ShiftParser

}