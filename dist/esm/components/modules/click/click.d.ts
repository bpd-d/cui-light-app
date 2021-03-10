import { CuiClickableArgs } from "../../../core/models/arguments";
import { ICuiHandlerModule } from "src/core/handlers/modules/interfaces";
export declare class CuiClickModule<T extends CuiClickableArgs> implements ICuiHandlerModule<T> {
    #private;
    type: string;
    description: string;
    element: HTMLElement;
    args: T;
    constructor(element: HTMLElement, args: T, click?: (ev: MouseEvent) => void | undefined);
    init(args: T): Promise<boolean>;
    update?(args: T): Promise<boolean>;
    destroy(): Promise<boolean>;
    onClick(callback: (ev: MouseEvent) => void): void;
    onElementClick(ev: MouseEvent): void;
}
