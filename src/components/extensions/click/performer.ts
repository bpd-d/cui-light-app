import { ICuiExtensionPerformer, ICuiPerformerCallback } from "../interfaces";

export interface ICuiClickPerfromerHook extends ICuiExtensionPerformer<MouseEvent> {
    preventDefault(flag: boolean): void;
    stopPropagation(flag: boolean): void;
}

export interface ICuiClickPerformer<T> extends ICuiClickPerfromerHook, ICuiPerformerCallback<T> { }


export class CuiClickPerformer implements ICuiClickPerformer<MouseEvent> {
    private _preventDefault: boolean;
    private _stopPropagation: boolean;
    private _callback: ((t: MouseEvent) => void) | undefined;

    constructor() {
        this._preventDefault = false;
        this._stopPropagation = false;
        this._callback = undefined;

    }

    setCallback(callback: (t: MouseEvent) => void): void {
        this._callback = callback;
    }

    perform(arg: MouseEvent): void {
        if (!this._callback) {
            return;
        }

        this._callback(arg);
        if (this._preventDefault) {
            arg.preventDefault();
        }
        if (this._stopPropagation) {
            arg.stopPropagation();
        }
    }

    preventDefault(flag: boolean): void {
        this._preventDefault = flag;
    }

    stopPropagation(flag: boolean): void {
        this._stopPropagation = flag
    }
}



export function clickPerformer(callback: (ev: MouseEvent) => void): ICuiClickPerfromerHook {
    let _prevent = false;
    let _stopPropagation = false;

    return {
        perform: (ev: MouseEvent) => {
            callback(ev);
            if (_prevent)
                ev.preventDefault();
            if (_stopPropagation)
                ev.stopPropagation();
        },
        stopPropagation: flag => _stopPropagation = flag,
        preventDefault: flag => _prevent = flag,
    }
}