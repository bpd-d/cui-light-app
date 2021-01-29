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
    #observer: IntersectionObserver | undefined;
    #root: Element;
    #threshold: number[];
    #callback: IntersectionObserverCallback | undefined;
    constructor(root: Element, threshold?: number[]) {
        this.#root = root;
        this.#threshold = threshold ?? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
        this.#callback = undefined;
        this.#observer = undefined;
    }

    setCallback(callback: IntersectionObserverCallback) {
        this.#callback = callback;
    }

    connect(): void {
        if (!this.#callback) {
            return;
        }
        this.#observer = new IntersectionObserver(this.#callback, {
            root: this.#root,
            rootMargin: '0px',
            threshold: this.#threshold
        })
    }

    observe(target: Element): void {
        if (this.#observer)
            this.#observer.observe(target)
    }

    unobserve(target: Element): void {
        if (this.#observer)
            this.#observer.unobserve(target)
    }

    disconnect() {
        if (this.#observer)
            this.#observer.disconnect()
    }

}