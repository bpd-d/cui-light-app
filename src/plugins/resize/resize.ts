import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { ICuiResizableObserver, CuiResizeObserver } from "./observer";

export interface CuiResizeObserverPluginSetup {
    resizeThreshold?: number;
}

export class CuiResizeObserverPlugin implements ICuiPlugin {
    description: string;
    name: string = 'resize-observer-plugin';
    setup: any;
    #resizeObserver: ICuiResizableObserver | undefined;

    constructor(setup: CuiResizeObserverPluginSetup) {
        this.description = "CuiResizeObserverPlugin";
        this.#resizeObserver = undefined;
        this.setup = setup
    }

    init(utils: CuiUtils): void {
        this.#resizeObserver = new CuiResizeObserver(utils.bus, this.setup.resizeThreshold ?? 20);
        this.#resizeObserver.connect();
    }

    destroy(): void {
        if (this.#resizeObserver)
            this.#resizeObserver.disconnect();
    }
}