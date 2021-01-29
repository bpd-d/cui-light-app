import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiWindowClickPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: any;
    constructor();
    init(utils: CuiUtils): void;
    destroy(): void;
    onWindowClick(ev: MouseEvent): void;
}
