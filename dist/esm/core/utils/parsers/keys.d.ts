import { ICuiKeysCombo } from "src/core/models/interfaces";
import { ICuiParser, ICuiParserCallbacks } from "./interfaces";
export declare function getCuiKeysComboParser(splitBy?: string): ICuiParser<string, ICuiKeysCombo>;
export declare function AltParser(input: ICuiKeysCombo, item: string): ICuiKeysCombo;
export declare function CtrlParser(input: ICuiKeysCombo, item: string): ICuiKeysCombo;
export declare function ShiftParser(input: ICuiKeysCombo, item: string): ICuiKeysCombo;
export declare const KeyComboParsers: ICuiParserCallbacks<ICuiKeysCombo, string>;
