import { ICuiEventBus } from "../../core/models/interfaces";
export declare class CuiMoveObserver {
    #private;
    constructor(bus: ICuiEventBus);
    attach(): void;
    detach(): void;
    isAttached(): boolean;
    private onMove;
    private onMoveLock;
}
