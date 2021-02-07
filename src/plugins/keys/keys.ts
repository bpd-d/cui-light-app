import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { ICuiKeysObserver, CuiKeysObserver } from "./observer";


export interface CuiKeysObserverPluginSetup {
    dummy?: boolean;
}

export class CuiKeysObserverPlugin implements ICuiPlugin {
    description: string;
    name: string = 'keys-plugin';
    setup: CuiKeysObserverPluginSetup;
    #keysObserver: ICuiKeysObserver | undefined;
    constructor(keySetup: CuiKeysObserverPluginSetup) {
        this.description = "CuiKeysObserverPlugin";
        this.setup = keySetup;
        this.#keysObserver = undefined;
    }

    init(utils: CuiUtils): void {
        this.#keysObserver = new CuiKeysObserver(utils.bus);
        this.#keysObserver.connect();
    }

    destroy(): void {
        if (this.#keysObserver)
            this.#keysObserver.disconnect();
    }
}