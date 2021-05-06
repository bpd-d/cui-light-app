import { KeyDownEvent } from "../../../core/models/events";
import { ICuiKeysCombo, ICuiPair } from "../../../core/models/interfaces";
import { matchesKeyCombo } from "../../../core/utils/functions";
import { ICuiExtensionPerformer } from "../interfaces";

export interface ICuiKeyActionPerformer extends ICuiExtensionPerformer<KeyDownEvent> {
    setCallback(callback: (index: string) => void): void;
    setKeyCombos(combo: ICuiPair<string, ICuiKeysCombo>[]): void;

}

export function getCuiKeyActionPerformer(callback: (index: string, event: KeyDownEvent) => void): ICuiKeyActionPerformer {
    let _keyCombos: ICuiPair<string, ICuiKeysCombo>[] = [];
    let _callback: (index: string, event: KeyDownEvent) => void = callback;
    return {
        perform: (ev: KeyDownEvent) => {
            for (const combo of _keyCombos) {
                if (matchesKeyCombo(ev.event, combo.value)) {
                    _callback(combo.key, ev);
                    return;
                }
            }
        },

        setKeyCombos(combo: ICuiPair<string, ICuiKeysCombo>[]) {
            _keyCombos = combo;
        },

        setCallback: (callback: (index: string, event: KeyDownEvent) => void) => {
            _callback = callback;
        }
    }
}