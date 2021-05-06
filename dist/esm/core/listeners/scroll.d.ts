import { CuiElementBoxType } from "../models/elements";
import { ICuiEventListener } from "../models/interfaces";
export interface CuiScrollEvent {
    base: Event | undefined;
    top: number;
    left: number;
    initial: boolean;
    scrolling: boolean;
    source: string;
}
export declare class CuiScrollListener implements ICuiEventListener<CuiScrollEvent> {
    private _target;
    private _inProgress;
    private _threshold;
    private _prevX;
    private _prevY;
    private _callback;
    private _isAttached;
    private _box;
    private _task;
    private _listener;
    constructor(target: CuiElementBoxType, threshold?: number);
    setCallback(callback: (ev: CuiScrollEvent) => void): void;
    attach(): void;
    detach(): void;
    setTarget(target: CuiElementBoxType): void;
    setThreshold(threshold: number): void;
    isInProgress(): boolean;
    isAttached(): boolean;
    private listener;
    private passedThreshold;
    private onScrollFinish;
}
