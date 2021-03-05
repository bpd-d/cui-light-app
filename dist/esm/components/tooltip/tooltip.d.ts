import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
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
export declare class CuiTooltipComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiTooltipHandler extends CuiHandlerBase<CuiTooltipArgs> {
    #private;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private onHover;
    private createTooltip;
    private removeTooltip;
    private getDataFromArgs;
    private toggleActions;
}
