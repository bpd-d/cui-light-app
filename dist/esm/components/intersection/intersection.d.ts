import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
/**
 * Intersection
 * Toggles action in/out when target is intersecting with the screen
 *
 * Set this on scrollable element
 * target - children selector
 * offset - 0...1 - tells how much target must intersecting with the screen
 * action - action to trigger
 */
export declare class CuiIntersectionAttributes {
    target: string;
    action: string;
    offset: number;
    isRoot: boolean;
    constructor();
    parse(args: any): void;
}
export declare class CuiIntersectionComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiIntersectionHandler extends CuiHandler<CuiIntersectionAttributes> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    parseArguments(): void;
    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    emitIntersection(entry: IntersectionObserverEntry): void;
    private addActions;
    private removeActions;
}
