import { CuiWindowSize } from "../utils/types";
import { ICuiEventBus } from "../models/interfaces";
export interface ICuiResizable {
    resize(data: CuiResizeData): Promise<boolean>;
}
export interface ICuiResizableObserver {
    observe(target: ICuiResizable): void;
    unobserve(target: ICuiResizable): void;
    connect(): void;
    disconnect(): void;
}
export interface CuiResizeData {
    current: CuiWindowSize;
    previous: CuiWindowSize;
    width: number;
    height: number;
    timestamp: number;
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
