import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
declare type CuiResizeComponentMode = "smart" | "simple";
export declare class CuiResizeArgs extends CuiAutoParseArgs {
    mode: CuiResizeComponentMode;
    default: string;
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    delay: number;
    constructor();
}
export declare class CuiResizeComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiResizeHandler extends CuiHandlerBase<CuiResizeArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private resize;
    private onIntersection;
    private setNewValue;
    private getValue;
    private getSmartValue;
    private updateElement;
    private isSmartMode;
    private isInViewport;
    private run;
}
export {};
