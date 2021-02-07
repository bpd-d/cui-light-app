import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiMoveObserver } from "./observer";


export class CuiMoveObserverPlugin implements ICuiPlugin {
    description: string;
    name: string = 'move-observer-plugin';
    setup: any;
    #moveObserver: CuiMoveObserver | undefined;
    #gesturesEnabled: boolean;
    constructor(gestures?: boolean) {
        this.description = "CuiMoveObserverPlugin";
        this.#moveObserver = undefined;
        this.#gesturesEnabled = gestures === false ? false : true;
    }

    init(utils: CuiUtils): void {
        this.#moveObserver = new CuiMoveObserver(utils.bus, this.#gesturesEnabled);
        this.#moveObserver.attach();
    }

    destroy(): void {
        if (this.#moveObserver && this.#moveObserver.isAttached())
            this.#moveObserver.detach();
    }
}