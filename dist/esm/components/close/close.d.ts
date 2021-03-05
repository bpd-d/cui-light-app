import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiCloseArgs extends CuiAutoParseArgs {
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    constructor(timeout?: number);
}
export declare class CuiCloseComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiCloseHandler extends CuiHandlerBase<CuiCloseArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    onClick(ev: MouseEvent): void;
    onClose(ev: MouseEvent): void;
    private run;
    private removeActiveClass;
    private removeActiveClassAsync;
    private onActionFinish;
    private getTarget;
    private emitClose;
}
