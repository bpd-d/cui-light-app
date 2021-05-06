import { splitText } from "../functions";
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
export function getCuiKeysComboParser(splitBy) {
    let _handlers = KeyComboParsers;
    let _splitBy = splitBy !== null && splitBy !== void 0 ? splitBy : "+";
    function getResult(input, item) {
        let itemPrep = item.trim();
        const handler = _handlers[itemPrep.toLowerCase()];
        if (handler) {
            input = handler(input, itemPrep);
        }
        else {
            input.key = itemPrep;
        }
        return input;
    }
    return {
        parse: (value) => {
            return splitText(value, _splitBy).reduce((result, item) => {
                return getResult(result, item);
            }, { isCtrl: false, isAlt: false, isShift: false });
        }
    };
}
export function AltParser(input, item) {
    input.isAlt = true;
    return input;
}
export function CtrlParser(input, item) {
    input.isCtrl = true;
    return input;
}
export function ShiftParser(input, item) {
    input.isShift = true;
    return input;
}
export const KeyComboParsers = {
    'ctrl': CtrlParser,
    'alt': AltParser,
    'shift': ShiftParser
};
