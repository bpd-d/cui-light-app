import { CuiIntersectionResultItem } from "../../core/intersection/interfaces";
import { ICuiComponentAction } from "../../core/utils/actions";
export interface CuiScrollspyUpdateResult {
    intersecting?: HTMLElement[];
    changed: boolean;
}
export interface ICuiScrollspyModeHandler {
    update(items: CuiIntersectionResultItem[], ratio: number, actions: ICuiComponentAction[], links: HTMLElement[], linksActions: ICuiComponentAction[]): CuiScrollspyUpdateResult;
}
export declare class CuiScrollSpyModeHandlerFactory {
    static get(mode: string): CuiMultiModeHandler | CuiSingleModeHandler;
}
declare abstract class CuiModeHandlerBase<T> {
    previous: T;
    constructor(init: T);
    getMatching(ratio: number, items: CuiIntersectionResultItem[]): number[];
    addActions(actions: ICuiComponentAction[], ...elements: HTMLElement[]): void;
    removeActions(actions: ICuiComponentAction[], ...elements: HTMLElement[]): void;
    private forEachAction;
    abstract matches(item: T): boolean;
}
export declare class CuiSingleModeHandler extends CuiModeHandlerBase<number> implements ICuiScrollspyModeHandler {
    constructor();
    update(items: CuiIntersectionResultItem[], ratio: number, actions: ICuiComponentAction[], links: HTMLElement[], linksActions: ICuiComponentAction[]): CuiScrollspyUpdateResult;
    matches(item: number): boolean;
}
export declare class CuiMultiModeHandler extends CuiModeHandlerBase<number[]> implements ICuiScrollspyModeHandler {
    constructor();
    update(items: CuiIntersectionResultItem[], ratio: number, actions: ICuiComponentAction[], links: HTMLElement[], linksActions: ICuiComponentAction[]): CuiScrollspyUpdateResult;
    matches(item: number[]): boolean;
}
export {};
