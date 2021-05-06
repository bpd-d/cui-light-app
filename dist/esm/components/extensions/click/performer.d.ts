import { ICuiExtensionPerformer, ICuiPerformerCallback } from "../interfaces";
export interface ICuiClickPerfromerHook extends ICuiExtensionPerformer<MouseEvent> {
    preventDefault(flag: boolean): void;
    stopPropagation(flag: boolean): void;
}
export interface ICuiClickPerformer<T> extends ICuiClickPerfromerHook, ICuiPerformerCallback<T> {
}
export declare class CuiClickPerformer implements ICuiClickPerformer<MouseEvent> {
    private _preventDefault;
    private _stopPropagation;
    private _callback;
    constructor();
    setCallback(callback: (t: MouseEvent) => void): void;
    perform(arg: MouseEvent): void;
    preventDefault(flag: boolean): void;
    stopPropagation(flag: boolean): void;
}
export declare function clickPerformer(callback: (ev: MouseEvent) => void): ICuiClickPerfromerHook;
