import { ICuiEventListener } from "../models/interfaces";
export declare type CuiMoveEventState = "down" | "up" | "move";
export interface ICuiMoveEvent {
    x: number;
    y: number;
    moveX: number;
    moveY: number;
    type: CuiMoveEventState;
    target: EventTarget | null;
    event: MouseEvent | TouchEvent;
}
export declare class CuiMoveEventListener implements ICuiEventListener<ICuiMoveEvent> {
    #private;
    constructor(element?: HTMLElement);
    setCallback(callback: (t: ICuiMoveEvent) => void): void;
    setTarget(element: Element): void;
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
