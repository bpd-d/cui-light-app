import { ICuiEventListener } from "../models/interfaces";
export interface CuiHoverEvent {
    isHovering: boolean;
    event: MouseEvent;
    timestamp: number;
}
export declare class CuiHoverListener implements ICuiEventListener<CuiHoverEvent> {
    #private;
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
