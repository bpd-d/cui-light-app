import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export interface CuiCircleProgressChnaged {
    timestamp: number;
    progress: number;
}
export declare class CuiCircleArgs extends CuiAutoParseArgs {
    progress: number;
    constructor();
}
export declare function CuiCircleComponent(prefix?: string): import("../../core/models/interfaces").ICuiComponent;
export declare class CuiCircleHandler extends CuiHandlerBase<CuiCircleArgs> {
    private _factor;
    private _full;
    private _path;
    private _busFacade;
    private _interactions;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    onSetProgress(val: any): void;
    private updateStyle;
    private readStyle;
}
