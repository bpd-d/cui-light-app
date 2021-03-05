import { ICuiEventBus } from "../../core/bus/interfaces";
import { CuiResizeData } from "src/core/models/events";
export interface ICuiResizable {
    resize(data: CuiResizeData): Promise<boolean>;
}
export interface ICuiResizableObserver {
    observe(target: ICuiResizable): void;
    unobserve(target: ICuiResizable): void;
    connect(): void;
    disconnect(): void;
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
