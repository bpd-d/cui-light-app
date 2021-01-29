import { ICuiObserver } from "../models/interfaces";
export interface ICuiIntersectionObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}
export declare class CuiIntersectionEntry {
    isInView: boolean;
    ratio: number;
    constructor();
}
export interface ICuiIntersectionHandler {
    onIntersection(entry: CuiIntersectionEntry): Promise<boolean>;
}
/**
 * Creates a wrapper for intersection observer
 * Constructor gets a root element for observer and optional array of threshold values [0...1]
 */
export declare class CuiIntersectionObserver implements ICuiObserver {
    #private;
    constructor(root: Element, threshold?: number[]);
    setCallback(callback: IntersectionObserverCallback): void;
    connect(): void;
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}
