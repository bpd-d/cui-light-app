import { CuiElementBoxType } from "../models/elements";
import { ICuiEventListener } from "../models/interfaces";
import { CuiIntersectionListenerOptions, CuiIntersectionResult } from "./interfaces";
export declare class CuiIntersectionListener implements ICuiEventListener<CuiIntersectionResult> {
    #private;
    constructor(element: CuiElementBoxType, options?: CuiIntersectionListenerOptions);
    /**
     * Sets child elements - ratio is calcutalated based on them
     * @param children
     */
    setChildren(children: HTMLElement[]): void;
    setThreshold(threshold: number): void;
    setCallback(callback: (t: CuiIntersectionResult) => void): void;
    setParent(target: CuiElementBoxType): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
    private onScroll;
    private calcChildVerticalRatio;
    private calcChildHorizontalRatio;
    private prepareCallbackResult;
}
