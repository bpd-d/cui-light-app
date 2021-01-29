import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
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
export declare class CuiScrollArgs implements ICuiParsable {
    target: string;
    parent: string;
    behavior: 'auto' | 'smooth';
    constructor();
    parse(val: any): void;
}
export declare class CuiScrollHandler extends CuiHandler<CuiScrollArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onClick(ev: MouseEvent): void;
    private setTargets;
}
