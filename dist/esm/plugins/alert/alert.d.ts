import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiAlertsPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: any;
    constructor();
    init(utils: CuiUtils): void;
    destroy(): void;
    private detach;
    private onAlert;
    private validateEvent;
}
