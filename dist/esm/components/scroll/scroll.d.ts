import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "../../core/models/arguments";
/**
 * Component scrolls to specified target in the document
 * Arguments:
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 *
 */
export declare class CuiScrollArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    parent: string;
    behavior: 'auto' | 'smooth';
    prevent: boolean;
    stopPropagation: boolean;
    constructor();
}
export declare function CuiScrollComponent(prefix?: string): ICuiComponent;
export declare class CuiScrollHandler extends CuiHandlerBase<CuiScrollArgs> {
    private _busFacade;
    private _clickPerformer;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    handleUpdate(): void;
    onClick(ev: MouseEvent): void;
    private getTarget;
    private getTargetsParent;
}
