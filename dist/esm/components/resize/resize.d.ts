import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
declare type CuiResizeComponentMode = "smart" | "simple";
export interface CuiSizeArgs {
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    default: string;
}
export declare class CuiResizeArgs extends CuiAutoParseArgs implements CuiSizeArgs {
    mode: CuiResizeComponentMode;
    default: string;
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    delay: number;
    constructor();
}
export declare function CuiResizeComponent(prefix?: string): ICuiComponent;
export declare class CuiResizeHandler extends CuiHandlerBase<CuiResizeArgs> {
    private _currentValue;
    private _lastValue;
    private _currentAction;
    private _isIntersecting;
    private _task;
    private _busFacade;
    private _resizeValueCalculator;
    private _interactions;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    handleUpdate(): void;
    private resize;
    private onIntersection;
    private setNewValue;
    private updateElement;
    /**
     * Checks whether element can be updated
     * @returns
     */
    private cannotUpdate;
    /**
     * Used for task to update action on the element after receiving resize
     */
    private updateAction;
}
export {};
