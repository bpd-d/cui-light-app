import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiMoveObserverPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: any;
    constructor(gestures?: boolean);
    init(utils: CuiUtils): void;
    destroy(): void;
}
