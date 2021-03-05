import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
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
export declare class CuiCircleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiCircleHandler extends CuiHandlerBase<CuiCircleArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    onSetProgress(val: any): void;
    private updateStyle;
    private readStyle;
}
