import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiIntersectionResult } from "../../core/intersection/interfaces";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiAutoParseArgs } from "../..//core/utils/arguments";
export declare class CuiParallaxArgs extends CuiAutoParseArgs {
    targets: string;
    startRatio: number;
    stopRatio: number;
    animation: string;
    constructor();
}
export declare function CuiParallaxComponent(prefix?: string): ICuiComponent;
export declare class CuiParallaxHandler extends CuiHandlerBase<CuiParallaxArgs> {
    private _defaultAnimator;
    private _targetSetup;
    private _interactions;
    private _intersectionPerformer;
    private _mutationPerformer;
    private _styles;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private updateArguments;
    onIntersection(ev: CuiIntersectionResult): void;
    onMutation(record: MutationRecord[]): void;
    private getTargets;
    private getTargetAnimator;
    private clean;
}
