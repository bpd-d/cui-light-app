import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "src/core/models/arguments";
export declare class CuiScrollArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    parent: string;
    behavior: 'auto' | 'smooth';
    prevent: boolean;
    stopPropagation: boolean;
    constructor();
}
/**
 * Component scrolls to specified target in the document
 * Arguments:
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 *
 */
export declare class CuiScrollComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export interface CuiScrollAttribute {
    target?: string;
    parent?: string;
    behavior?: 'auto' | 'smooth';
}
export declare class CuiScrollHandler extends CuiHandlerBase<CuiScrollArgs> {
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    onClick(ev: MouseEvent): void;
    private getTarget;
    private getTargetsParent;
}
