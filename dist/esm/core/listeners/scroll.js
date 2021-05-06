import { CuiElementBoxFactory } from "../models/elements";
import { getRangeValueOrDefault, is } from "../utils/functions";
import { CuiTaskRunner } from "../utils/task";
const DEFAULT_SCROLL_END_TIMEOUT = 50;
export class CuiScrollListener {
    constructor(target, threshold) {
        this._target = target;
        this._box = CuiElementBoxFactory.get(target);
        this._inProgress = false;
        this._threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
        this._prevX = this._prevY = 0;
        this._isAttached = false;
        this._callback = undefined;
        this._task = new CuiTaskRunner(DEFAULT_SCROLL_END_TIMEOUT, false, this.onScrollFinish.bind(this));
        this._listener = this.listener.bind(this);
    }
    setCallback(callback) {
        this._callback = callback;
    }
    attach() {
        this._target.addEventListener('scroll', this._listener);
        this._isAttached = true;
        this.listener(undefined, true, "init");
    }
    detach() {
        this._target.removeEventListener('scroll', this._listener);
        this._task.stop();
        this._isAttached = false;
    }
    setTarget(target) {
        if (target !== this._target) {
            this.detach();
            this._target = target;
            this.attach();
        }
    }
    setThreshold(threshold) {
        this._threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
    }
    isInProgress() {
        return this._inProgress;
    }
    isAttached() {
        return this._isAttached;
    }
    listener(ev, initial, source) {
        if (!is(this._callback)) {
            return;
        }
        let left = this._box.getScrollLeft();
        let top = this._box.getScrollTop();
        this._prevX += left;
        this._prevY += top;
        if (this._inProgress || (!this.passedThreshold() && is(ev))) {
            return;
        }
        this._inProgress = true;
        // @ts-ignore - callback already checked
        this._callback({
            base: ev,
            top: top,
            left: left,
            initial: initial !== null && initial !== void 0 ? initial : false,
            scrolling: is(ev),
            source: source !== null && source !== void 0 ? source : "event"
        });
        if (is(ev))
            this._task.start();
        this._inProgress = false;
        this._prevX = 0;
        this._prevY = 0;
    }
    passedThreshold() {
        return this._threshold <= 0 || (this._prevX >= this._threshold || this._prevY >= this._threshold);
    }
    onScrollFinish() {
        this.listener(undefined, false, "task");
    }
}
