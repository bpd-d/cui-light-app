import { CuiWindowSize } from "../../core/utils/types";
import { ICuiEventBus } from "../../core/models/interfaces";
import { EventBase } from "src/core/models/events";
export interface ICuiResizable {
    resize(data: CuiResizeData): Promise<boolean>;
}
export interface ICuiResizableObserver {
    observe(target: ICuiResizable): void;
    unobserve(target: ICuiResizable): void;
    connect(): void;
    disconnect(): void;
}
export interface CuiResizeData extends EventBase {
    current: CuiWindowSize;
    previous: CuiWindowSize;
    width: number;
    height: number;
}
export declare class CuiResizeObserver implements ICuiResizableObserver {
    #private;
    constructor(bus: ICuiEventBus, threshold?: number);
    observe(target: ICuiResizable): void;
    unobserve(target: ICuiResizable): void;
    connect(): void;
    disconnect(): void;
    private pushUpdateToItems;
    private listener;
}
