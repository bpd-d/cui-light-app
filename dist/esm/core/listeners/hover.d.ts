import { ICuiEventListener } from "../models/interfaces";
export interface CuiHoverEvent {
    isHovering: boolean;
    event: MouseEvent;
    timestamp: number;
}
export declare class CuiHoverListener implements ICuiEventListener<CuiHoverEvent> {
    private _target;
    private _callback;
    private _inProgress;
    private _isHovering;
    private _isAttached;
    private _onOverBound;
    private _onMoveBound;
    private _onOutBound;
    constructor(target: Element);
    setCallback(callback: (t: CuiHoverEvent) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    private emit;
    isAttached(): boolean;
    private invoke;
    private onMouseOver;
    private onMouseOut;
    private onMouseMove;
}
