import { CuiUtils } from "src/core/models/utils";
export interface ICuiHandlerModule<T> {
    type: string;
    description: string;
    init(args: T): Promise<boolean>;
    update?(args: T): Promise<boolean>;
    destroy(): Promise<boolean>;
}
export interface CuiHandlerModuleProps {
    element: HTMLElement;
    cuid: string;
    utils: CuiUtils;
}
