import { GlobalClickEvent } from "src/core/models/events";
import { ICuiExtensionPerformer } from "../interfaces";

export interface ICuiWindowClickPerformer extends ICuiExtensionPerformer<GlobalClickEvent> {
    setEnabled(flag: boolean): void;
}

export function getCuiWindowClickPerformer(callback: (arg: GlobalClickEvent) => void): ICuiWindowClickPerformer {
    let _isEnabled = false;
    return {
        perform: (arg: GlobalClickEvent) => {
            if (!_isEnabled) {
                return;
            }
            callback(arg);
        },
        setEnabled: (flag: boolean) => {
            _isEnabled = flag;
        }
    }
}

export function getAdvancedCuiWindowClickPerformer(callback: (arg: GlobalClickEvent) => void, target?: Node): ICuiWindowClickPerformer {
    function nodeCallback(arg: GlobalClickEvent) {
        if (!target || !target.contains((arg.ev.target as Node))) {
            callback(arg)
        }
    }
    return getCuiWindowClickPerformer(nodeCallback)
}