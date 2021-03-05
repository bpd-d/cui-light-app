import { ICuiEventBus } from "src/core/bus/interfaces";
export declare class CuiMoveObserver {
    #private;
    constructor(bus: ICuiEventBus, gestures: boolean);
    attach(): void;
    detach(): void;
    isAttached(): boolean;
    private onMove;
    private pushMoveEvent;
    private onMoveLock;
    private getGestureDiff;
    private calculateGesture;
    private pushGestureEvent;
    private getGestureEventName;
}
