import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export interface CuiResizeObserverPluginSetup {
    resizeThreshold?: number;
}
export declare class CuiResizeObserverPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: any;
    constructor(setup: CuiResizeObserverPluginSetup);
    init(utils: CuiUtils): void;
    destroy(): void;
}
