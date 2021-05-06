import { ICuiEventListener } from "../models/interfaces";

export class CuiMediaQueryListener implements ICuiEventListener<MediaQueryListEvent> {

    private _mediaQuery: string;
    private _callback: ((t: MediaQueryListEvent) => void) | undefined;
    private _isInitialized: boolean;
    private _inProgress: boolean;

    #onEventBound: (ev: MediaQueryListEvent) => void;
    constructor(mediaQuery: string) {
        this._mediaQuery = mediaQuery;
        this._isInitialized = false;
        this._callback = undefined;
        this._inProgress = false;

        this.#onEventBound = this.event.bind(this);
    }
    setCallback(callback: (t: MediaQueryListEvent) => void): void {
        this._callback = callback;
    }

    isInProgress(): boolean {
        return this._inProgress;
    }
    attach(): void {
        if (!window.matchMedia || this._isInitialized || !this._mediaQuery) {
            return;
        }
        window.matchMedia(this._mediaQuery)
            .addEventListener('change', this.#onEventBound)
        this._isInitialized = true
    }

    detach(): void {
        if (this._isInitialized) {
            window.matchMedia(this._mediaQuery).removeEventListener('change', this.#onEventBound);
            this._isInitialized = false
        }
    }

    isAttached(): boolean {
        return this._isInitialized;
    }

    private event(ev: MediaQueryListEvent): void {
        if (this._inProgress || !this._callback) {
            return
        }
        this._inProgress = true;
        try {
            this._callback(ev);
        } catch (e) {
            console.error(e)
        } finally {
            this._inProgress = false;
        }
    }
}