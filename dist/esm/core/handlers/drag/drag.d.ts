import { ICuiMoveData } from "../../listeners/move";
export declare class CuiDragHandler {
    #private;
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
