export class CuiIntersectionEntry {
    constructor() {
        this.isInView = false;
        this.ratio = 0;
    }
}
/**
 * Creates a wrapper for intersection observer
 * Constructor gets a root element for observer and optional array of threshold values [0...1]
 */
export class CuiIntersectionObserver {
    constructor(root, threshold) {
        this._root = root;
        this._threshold = threshold !== null && threshold !== void 0 ? threshold : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
        this._callback = undefined;
        this._observer = undefined;
    }
    setCallback(callback) {
        this._callback = callback;
    }
    connect() {
        if (!this._callback) {
            return;
        }
        this._observer = new IntersectionObserver(this._callback, {
            root: this._root,
            rootMargin: '0px',
            threshold: this._threshold
        });
    }
    observe(target) {
        if (this._observer)
            this._observer.observe(target);
    }
    unobserve(target) {
        if (this._observer)
            this._observer.unobserve(target);
    }
    disconnect() {
        if (this._observer)
            this._observer.disconnect();
    }
}
