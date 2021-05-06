import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "../../core/models/arguments";
export declare class CuiToggleArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    action: string;
    prevent: boolean;
    stopPropagation: boolean;
    constructor();
}
export declare function CuiToggleComponent(prefix?: string): import("../../core/models/interfaces").ICuiComponent;
/**
 * Events: toggle
 * Emits: Toggled
 */
export declare class CuiToggleHandler extends CuiHandlerBase<CuiToggleArgs> {
    private _busFacade;
    private _interactions;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    toggle(): void;
    getTarget(): Element | null;
}
