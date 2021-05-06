import { ICuiEventListener } from "../models/interfaces";
export declare type CuiMoveEventState = "down" | "up" | "move";
export interface ICuiMoveData {
    x: number;
    y: number;
    moveX: number;
    moveY: number;
    type: CuiMoveEventState;
    target: EventTarget | null;
    event: MouseEvent | TouchEvent;
}
export declare class CuiMoveEventListener implements ICuiEventListener<ICuiMoveData> {
    private _element;
    private _onEvent;
    private _isLocked;
    private _isAttached;
    private _preventDefault;
    private _target;
    constructor(element?: HTMLElement);
    setCallback(callback: (t: ICuiMoveData) => void): void;
    setTarget(element?: Element): void;
    isInProgress(): boolean;
    preventDefault(flag: boolean): void;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
    onMouseDown(ev: MouseEvent): void;
    onMouseUp(ev: MouseEvent): void;
    onMouseMove(ev: MouseEvent): void;
    onTouchStart(ev: TouchEvent): void;
    onTouchEnd(ev: TouchEvent): void;
    onTouchMove(ev: TouchEvent): void;
    private publishMouseEvent;
    private publishTouchEvent;
}
