import { ICuiEventListener } from "../../core/models/interfaces";
export declare class CuiKeyPressListener implements ICuiEventListener<KeyboardEvent> {
    #private;
    constructor(singleEmit: boolean, keys?: string[]);
    setCallback(callback: (t: KeyboardEvent) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
    onKeyDown(ev: KeyboardEvent): void;
    onKeyUp(ev: KeyboardEvent): void;
}
