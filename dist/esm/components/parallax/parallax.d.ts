import { CuiChildMutation, CuiMutableHandler } from "../../core/handlers/base";
import { CuiIntersectionResult } from "../../core/intersection/interfaces";
import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiAutoParseArgs } from "../..//core/utils/arguments";
export declare class CuiParallaxArgs extends CuiAutoParseArgs {
    root: boolean;
    targets: string;
    startRatio: number;
    stopRatio: number;
    animation: string;
    constructor();
}
export declare class CuiParallaxComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string;
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiParallaxHandler extends CuiMutableHandler<CuiParallaxArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onIntersection(ev: CuiIntersectionResult): void;
    onMutation(record: CuiChildMutation): void;
    private getTargets;
    private getParent;
    private getTargetAnimator;
    private clean;
}
