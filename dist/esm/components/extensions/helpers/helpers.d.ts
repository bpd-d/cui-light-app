import { ICuiStyleHelper } from "src/core/handlers/extensions/facades";
import { ICuiKeysCombo, ICuiPair } from "src/core/models/interfaces";
import { ICuiParser } from "src/core/utils/parsers/interfaces";
import { ICuiScrollFreezeHelper } from "./interfaces";
export declare function getScrollFreezeHelper(style: ICuiStyleHelper): ICuiScrollFreezeHelper;
export declare function getKeyCloseCombos(parser: ICuiParser<string, ICuiKeysCombo>, escClose: boolean, ...combos: string[]): ICuiPair<string, ICuiKeysCombo>[];
export declare function getDefaultSwitchKeyCombo(key?: string): ICuiKeysCombo;
