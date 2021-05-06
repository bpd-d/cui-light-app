import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiTooltipArgs extends CuiAutoParseArgs {
    content: string;
    width: number;
    pos: string;
    margin: number;
    action: string;
    timeout: number;
    constructor(prefix: string);
}
export declare function CuiTooltipComponent(prefix?: string): ICuiComponent;
export declare class CuiTooltipHandler extends CuiHandlerBase<CuiTooltipArgs> {
    private _tooltip;
    private _positionCalculator;
    private _tooltipDataCls;
    private _task;
    private _interactions;
    constructor(element: HTMLElement, attribute: string, utils: CuiCore, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private onHover;
    private createTooltip;
    private removeTooltip;
    private getDataFromArgs;
    private toggleActions;
}
