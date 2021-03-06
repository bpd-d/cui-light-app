import { ICuiObserver } from "../models/interfaces";

export interface ICuiIntersectionObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}

export class CuiIntersectionEntry {
    isInView: boolean;
    ratio: number;

    constructor() {
        this.isInView = false;
        this.ratio = 0;
    }
}

export interface ICuiIntersectionHandler {
    onIntersection(entry: CuiIntersectionEntry): Promise<boolean>;
}

/**
 * Creates a wrapper for intersection observer
 * Constructor gets a root element for observer and optional array of threshold values [0...1]
 */
export class CuiIntersectionObserver implements ICuiObserver {
    private _observer: IntersectionObserver | undefined;
    private _root: Element;
    private _threshold: number[];
    private _callback: IntersectionObserverCallback | undefined;
    constructor(root: Element, threshold?: number[]) {
        this._root = root;
        this._threshold = threshold ?? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
        this._callback = undefined;
        this._observer = undefined;
    }

    setCallback(callback: IntersectionObserverCallback) {
        this._callback = callback;
    }

    connect(): void {
        if (!this._callback) {
            return;
        }
        this._observer = new IntersectionObserver(this._callback, {
            root: this._root,
            rootMargin: '0px',
            threshold: this._threshold
        })
    }

    observe(target: Element): void {
        if (this._observer)
            this._observer.observe(target)
    }

    unobserve(target: Element): void {
        if (this._observer)
            this._observer.unobserve(target)
    }

    disconnect() {
        if (this._observer)
            this._observer.disconnect()
    }

}