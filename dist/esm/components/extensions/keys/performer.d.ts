import { KeyDownEvent } from "../../../core/models/events";
import { ICuiKeysCombo, ICuiPair } from "../../../core/models/interfaces";
import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiKeyActionPerformer extends ICuiExtensionPerformer<KeyDownEvent> {
    setCallback(callback: (index: string) => void): void;
    setKeyCombos(combo: ICuiPair<string, ICuiKeysCombo>[]): void;
}
export declare function getCuiKeyActionPerformer(callback: (index: string, event: KeyDownEvent) => void): ICuiKeyActionPerformer;
