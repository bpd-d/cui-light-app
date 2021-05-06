import { ICuiEventListener } from "../models/interfaces";
export declare class CuiMediaQueryListener implements ICuiEventListener<MediaQueryListEvent> {
    #private;
    private _mediaQuery;
    private _callback;
    private _isInitialized;
    private _inProgress;
    constructor(mediaQuery: string);
    setCallback(callback: (t: MediaQueryListEvent) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
    private event;
}
