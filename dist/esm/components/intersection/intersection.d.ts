import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
/**
 * Intersection
 * Toggles action in/out when target is intersecting with the screen
 *
 * Set this on scrollable element
 * target - children selector
 * offset - 0...1 - tells how much target must intersecting with the screen
 * action - action to trigger
 */
export declare class CuiIntersectionAttributes extends CuiAutoParseArgs {
    target: string;
    action: string;
    offset: number;
    isRoot: boolean;
    constructor();
}
export declare class CuiIntersectionComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiIntersectionHandler extends CuiHandlerBase<CuiIntersectionAttributes> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    parseArguments(): void;
    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    emitIntersection(entry: IntersectionObserverEntry): void;
    private addActions;
    private removeActions;
}
