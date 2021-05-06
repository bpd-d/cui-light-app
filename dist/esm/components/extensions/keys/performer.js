import { matchesKeyCombo } from "../../../core/utils/functions";
export function getCuiKeyActionPerformer(callback) {
    let _keyCombos = [];
    let _callback = callback;
    return {
        perform: (ev) => {
            for (const combo of _keyCombos) {
                if (matchesKeyCombo(ev.event, combo.value)) {
                    _callback(combo.key, ev);
                    return;
                }
            }
        },
        setKeyCombos(combo) {
            _keyCombos = combo;
        },
        setCallback: (callback) => {
            _callback = callback;
        }
    };
}
