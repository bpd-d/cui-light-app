import { ICuiHandlerModule } from "src/core/handlers/modules/interfaces";
import { CuiHoverEvent } from "../../../core/listeners/hover";
export declare class CuiHoverModule implements ICuiHandlerModule<any> {
    #private;
    type: string;
    description: string;
    constructor(element: HTMLElement, onHover: (ev: CuiHoverEvent) => void);
    init(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    private onHover;
}
