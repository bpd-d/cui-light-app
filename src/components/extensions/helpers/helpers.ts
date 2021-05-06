import { ICuiStyleHelper } from "src/core/handlers/extensions/facades";
import { ICuiKeysCombo, ICuiPair } from "src/core/models/interfaces";
import { ICuiParser } from "src/core/utils/parsers/interfaces";
import { ICuiScrollFreezeHelper } from "./interfaces";

export function getScrollFreezeHelper(style: ICuiStyleHelper): ICuiScrollFreezeHelper {
    let _scrollY: number = 0;
    return {
        getScroll: () => {
            _scrollY = window.pageYOffset;
        },
        freeze: () => {
            style.setStyle('top', `-${_scrollY}px`, document.body);
        },
        release: () => {
            style.removeStyle('top', document.body);
            window.scrollTo(0, (_scrollY || 0) * -1);
            _scrollY = 0;
        }
    }
}

export function getKeyCloseCombos(parser: ICuiParser<string, ICuiKeysCombo>, escClose: boolean, ...combos: string[]): ICuiPair<string, ICuiKeysCombo>[] {
    const comboList: ICuiPair<string, ICuiKeysCombo>[] = [];
    if (escClose) {
        comboList.push({ key: "close", value: parser.parse("Escape") })
    }
    if (combos) {
        combos.forEach(c => {
            if (c) {
                comboList.push({ key: "close", value: parser.parse(c) })
            }
        })
    }
    return comboList;
}

export function getDefaultSwitchKeyCombo(key?: string): ICuiKeysCombo {
    return {
        isAlt: true,
        isCtrl: true,
        isShift: false,
        key: key
    }
}