import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "../../core/models/arguments";
export declare class CuiCloseArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    action: string;
    timeout: number;
    state: string;
    prevent: boolean;
    stopPropagation: boolean;
    constructor(timeout?: number);
}
export declare function CuiCloseComponent(prefix?: string): import("../../core/models/interfaces").ICuiComponent;
export declare class CuiCloseHandler extends CuiHandlerBase<CuiCloseArgs> {
    private _busFacade;
    private _actionsHelper;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    onClose(ev: MouseEvent | null): void;
    private run;
    private getTarget;
    private emitClose;
}
