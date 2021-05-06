import { CuiElementBoxFactory, CuiElementBoxType, ICuiElementBox } from "../models/elements";
import { ICuiEventListener } from "../models/interfaces";
import { getRangeValueOrDefault, is } from "../utils/functions";
import { CuiTaskRunner, ICuiTask } from "../utils/task";

const DEFAULT_SCROLL_END_TIMEOUT: number = 50;

export interface CuiScrollEvent {
    base: Event | undefined;
    top: number;
    left: number;
    initial: boolean;
    scrolling: boolean;
    source: string;
}

export class CuiScrollListener implements ICuiEventListener<CuiScrollEvent> {
    private _target: CuiElementBoxType;
    private _inProgress: boolean;
    private _threshold: number;
    private _prevX: number;
    private _prevY: number;
    private _callback: ((ev: CuiScrollEvent) => void) | undefined;
    private _isAttached: boolean;
    private _box: ICuiElementBox;
    private _task: ICuiTask;
    private _listener: (ev: Event) => void;
    constructor(target: CuiElementBoxType, threshold?: number) {
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

    setCallback(callback: (ev: CuiScrollEvent) => void) {
        this._callback = callback;
    }

    attach() {
        this._target.addEventListener('scroll', this._listener)
        this._isAttached = true;
        this.listener(undefined, true, "init");
    }

    detach() {
        this._target.removeEventListener('scroll', this._listener)
        this._task.stop();
        this._isAttached = false;
    }

    setTarget(target: CuiElementBoxType) {
        if (target !== this._target) {
            this.detach();
            this._target = target;
            this.attach();
        }
    }

    setThreshold(threshold: number) {
        this._threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
    }

    isInProgress(): boolean {
        return this._inProgress;
    }

    isAttached(): boolean {
        return this._isAttached;
    }

    private listener(ev?: Event, initial?: boolean, source?: string) {
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
            initial: initial ?? false,
            scrolling: is(ev),
            source: source ?? "event"
        })
        if (is(ev))
            this._task.start();
        this._inProgress = false
        this._prevX = 0;
        this._prevY = 0;
    }

    private passedThreshold() {
        return this._threshold <= 0 || (this._prevX >= this._threshold || this._prevY >= this._threshold);
    }

    private onScrollFinish() {
        this.listener(undefined, false, "task");
    }
}