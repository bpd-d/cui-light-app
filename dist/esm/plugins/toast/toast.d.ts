import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export interface CuiToastPluginSetup {
}
export declare class CuiToastPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: any;
    constructor(setup: CuiToastPluginSetup);
    init(utils: CuiUtils): void;
    destroy(): void;
    private onToastShow;
}
