import { CuiIntersectionResult } from "../../../core/intersection/interfaces";
import { CuiScrollEvent } from "../../../core/listeners/scroll";
import { CuiElementBoxType } from "../../../core/models/elements";
import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiBaseScrollPerfromerOptions {
    callback: (ev: CuiScrollEvent) => void;
}
export interface ICuiIntersectionPerfromerOptions {
    callback: (ev: CuiIntersectionResult) => void;
    element: CuiElementBoxType;
}
export interface ICuiIntersectionPerformer extends ICuiExtensionPerformer<CuiScrollEvent> {
    setChildren(children: HTMLElement[]): void;
    callInitialEvent(): void;
}
export declare function getBaseScrollPerformer(options: ICuiBaseScrollPerfromerOptions): ICuiExtensionPerformer<CuiScrollEvent>;
export declare function getCuiIntersectionPerformer(setup: ICuiIntersectionPerfromerOptions): ICuiIntersectionPerformer;
