import { CuiElement, ICuiEventListener, ICuiPlugin } from "src/core/models/interfaces";
import { CuiCore } from "src/core/models/core";

export interface ICuiPluginExtension {
    init(utils: CuiCore): Promise<boolean>;
    finish(): Promise<boolean>;
}

export interface ICuiPluginEventExtensionSetup<T> {
    name: string,
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

export class CuiPlugin<T> implements ICuiPlugin {
    description: string;
    name: string;
    setup: T;
    private _callback: CuiPluginImplCallback<T> | undefined;
    private _onDestroy: CuiPluginDestroyCallback | void | undefined;
    private _extensions: ICuiPluginExtension[] | undefined;
    constructor(setup: ICuiPluginImpl<T>) {
        this._onDestroy = undefined;
        this._callback = setup.callback;
        this.name = setup.name;
        this.description = setup.description;
        this.setup = setup.setup;
        this._extensions = [];
    }

    init(utils: CuiCore): void {
        if (this._callback) {
            [this._extensions, this._onDestroy] = this._callback(utils, this.setup);
        }
        this.forEachExtension((extension) => {
            return extension.init(utils)
        }).then((result) => {

        })
    }
    destroy(): void {
        this.forEachExtension((extension) => {
            return extension.finish()
        }).then((result) => {

        })
        if (this._onDestroy) {
            this._onDestroy();
        }
    }

    private async forEachExtension(callback: (extension: ICuiPluginExtension) => Promise<boolean>): Promise<boolean> {
        if (!this._extensions || this._extensions.length === 0) {
            return true;
        }
        const promises: Promise<boolean>[] = [];
        this._extensions.forEach((extension) => {
            promises.push(callback(extension))
        })
        await Promise.all(promises);
        return true;
    }


}

export function getPluginEventExtension<T>(setup: ICuiPluginEventExtensionSetup<T>): ICuiPluginExtension {
    let _utils: CuiCore | undefined = undefined;
    let _handleId: string | null = null;

    function getCui(): CuiElement {
        return { $cuid: setup.id ?? setup.name }
    }
    return {
        init: async (utils: CuiCore) => {
            _utils = utils;
            if (_handleId) {
                return false;
            }
            _handleId = utils.bus.on<T>(setup.name, setup.callback, getCui())
            return true;
        },
        finish: async () => {
            if (!_utils || !_handleId) {
                return false;
            }
            _utils.bus.detach(setup.name, _handleId, getCui())
            _handleId = null;
            return true;
        }
    }
}

export interface ICuiPluginListenerExtensionSetup<T> {
    listener: ICuiEventListener<T>;
}

export function getPluginListenerExtension<T>(setup: ICuiPluginListenerExtensionSetup<T>): ICuiPluginExtension {
    return {
        init: async (utils: CuiCore) => {
            if (setup.listener.isAttached()) {
                return false;
            }
            setup.listener.attach();
            return true;
        },
        finish: async () => {
            if (!setup.listener.isAttached()) {
                return false;
            }
            setup.listener.detach();
            return true;
        }
    }
}
