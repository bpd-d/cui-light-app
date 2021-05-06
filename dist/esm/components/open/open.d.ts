import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "../../core/models/arguments";
export declare class CuiOpenArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    stopPropagation: boolean;
    constructor(timeout?: number);
}
export declare function CuiOpenComponent(prefix?: string): import("../../core/models/interfaces").ICuiComponent;
export declare class CuiOpenHandler extends CuiHandlerBase<CuiOpenArgs> {
    private _busFacade;
    private _actionsHelper;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private onOpen;
    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    private run;
    handleClickCui(cuid: string): boolean;
    private emitOpen;
    private getTarget;
}
