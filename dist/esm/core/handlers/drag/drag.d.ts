import { ICuiMoveData } from "../../listeners/move";
export declare class CuiDragHandler {
    private _root;
    private _moveHandler;
    private _onDragStart;
    private _onDragOver;
    private _onDragEnd;
    private _timeout;
    private _isTracking;
    private _timeoutId;
    constructor(root: HTMLElement);
    setLongPressTimeout(timeout: number): void;
    onDragStart(callback: (data: ICuiMoveData) => boolean): void;
    onDragOver(callback: (data: ICuiMoveData) => void): void;
    onDragEnd(callback: (data: ICuiMoveData) => void): void;
    attach(): void;
    detach(): void;
    private onMove;
    private cancelTimeout;
}
