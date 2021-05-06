import { ICuiEventListener, ICuiPlugin } from "src/core/models/interfaces";
import { CuiCore } from "src/core/models/core";
export interface ICuiPluginExtension {
    init(utils: CuiCore): Promise<boolean>;
    finish(): Promise<boolean>;
}
export interface ICuiPluginEventExtensionSetup<T> {
    name: string;
    callback: (t: T) => void;
    id?: string;
}
export interface CuiPluginDestroyCallback {
    (): void;
}
export interface CuiPluginImplCallback<T> {
    (utils: CuiCore, t: T): [ICuiPluginExtension[], CuiPluginDestroyCallback | undefined];
}
export interface ICuiPluginImpl<T> {
    name: string;
    description: string;
    setup: T;
    callback?: CuiPluginImplCallback<T>;
}
export declare class CuiPlugin<T> implements ICuiPlugin {
    description: string;
    name: string;
    setup: T;
    private _callback;
    private _onDestroy;
    private _extensions;
    constructor(setup: ICuiPluginImpl<T>);
    init(utils: CuiCore): void;
    destroy(): void;
    private forEachExtension;
}
export declare function getPluginEventExtension<T>(setup: ICuiPluginEventExtensionSetup<T>): ICuiPluginExtension;
export interface ICuiPluginListenerExtensionSetup<T> {
    listener: ICuiEventListener<T>;
}
export declare function getPluginListenerExtension<T>(setup: ICuiPluginListenerExtensionSetup<T>): ICuiPluginExtension;
