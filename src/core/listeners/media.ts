import { ICuiEventListener } from "../models/interfaces";

export class CuiMediaQueryListener implements ICuiEventListener<MediaQueryListEvent> {

    #mediaQuery: string;
    #callback: ((t: MediaQueryListEvent) => void) | undefined;
    #isInitialized: boolean;
    #inProgress: boolean;

    #onEventBound: (ev: MediaQueryListEvent) => void;
    constructor(mediaQuery: string) {
        this.#mediaQuery = mediaQuery;
        this.#isInitialized = false;
        this.#callback = undefined;
        this.#inProgress = false;

        this.#onEventBound = this.event.bind(this);
    }
    setCallback(callback: (t: MediaQueryListEvent) => void): void {
        this.#callback = callback;
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }
    attach(): void {
        if (!window.matchMedia || this.#isInitialized || !this.#mediaQuery) {
            return;
        }
        window.matchMedia(this.#mediaQuery)
            .addEventListener('change', this.#onEventBound)
        this.#isInitialized = true
    }

    detach(): void {
        if (this.#isInitialized) {
            window.matchMedia(this.#mediaQuery).removeEventListener('change', this.#onEventBound);
            this.#isInitialized = false
        }
    }

    isAttached(): boolean {
        return this.#isInitialized;
    }

    private event(ev: MediaQueryListEvent): void {
        if (this.#inProgress || !this.#callback) {
            return
        }
        this.#inProgress = true;
        try {
            this.#callback(ev);
        } catch (e) {
            console.error(e)
        } finally {
            this.#inProgress = false;
        }
    }
}