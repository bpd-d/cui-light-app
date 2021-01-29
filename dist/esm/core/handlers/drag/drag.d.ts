import { ICuiMoveEvent } from "../../listeners/move";
export declare class CuiDragHandler {
    #private;
    constructor(root: HTMLElement);
    setLongPressTimeout(timeout: number): void;
    onDragStart(callback: (data: ICuiMoveEvent) => boolean): void;
    onDragOver(callback: (data: ICuiMoveEvent) => void): void;
    onDragEnd(callback: (data: ICuiMoveEvent) => void): void;
    attach(): void;
    detach(): void;
    private onMove;
    private cancelTimeout;
}
