import { ICuiEventBus } from "src/core/bus/interfaces";
export interface ICuiKeysObserver {
    connect(): void;
    disconnect(): void;
}
export declare class CuiKeysObserver {
    #private;
    constructor(bus: ICuiEventBus);
    connect(): void;
    disconnect(): void;
    onKeyDown(ev: KeyboardEvent): void;
}
