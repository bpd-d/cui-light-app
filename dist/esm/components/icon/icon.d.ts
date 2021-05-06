import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiIconArgs extends CuiAutoParseArgs {
    icon: string;
    scale: number;
    constructor();
}
export declare function CuiIconComponent(prefix?: string): import("../../core/models/interfaces").ICuiComponent;
export declare class CuiIconHandler extends CuiHandlerBase<CuiIconArgs> {
    private _interactions;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private addIcon;
    private insertBefore;
    private appendChild;
}
