var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _target, _inProgress, _threshold, _prevX, _prevY, _callback, _isAttached, _box, _task, _listener;
import { CuiElementBoxFactory } from "../models/elements";
import { getRangeValueOrDefault, is } from "../utils/functions";
import { CuiTaskRunner } from "../utils/task";
const DEFAULT_SCROLL_END_TIMEOUT = 50;
export class CuiScrollListener {
    constructor(target, threshold) {
        _target.set(this, void 0);
        _inProgress.set(this, void 0);
        _threshold.set(this, void 0);
        _prevX.set(this, void 0);
        _prevY.set(this, void 0);
        _callback.set(this, void 0);
        _isAttached.set(this, void 0);
        _box.set(this, void 0);
        _task.set(this, void 0);
        _listener.set(this, void 0);
        __classPrivateFieldSet(this, _target, target);
        __classPrivateFieldSet(this, _box, CuiElementBoxFactory.get(target));
        __classPrivateFieldSet(this, _inProgress, false);
        __classPrivateFieldSet(this, _threshold, getRangeValueOrDefault(threshold, 0, 100, 0));
        __classPrivateFieldSet(this, _prevX, __classPrivateFieldSet(this, _prevY, 0));
        __classPrivateFieldSet(this, _isAttached, false);
        __classPrivateFieldSet(this, _callback, undefined);
        __classPrivateFieldSet(this, _task, new CuiTaskRunner(DEFAULT_SCROLL_END_TIMEOUT, false, this.onScrollFinish.bind(this)));
        __classPrivateFieldSet(this, _listener, this.listener.bind(this));
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _callback, callback);
    }
    attach() {
        __classPrivateFieldGet(this, _target).addEventListener('scroll', __classPrivateFieldGet(this, _listener));
        __classPrivateFieldSet(this, _isAttached, true);
        this.listener(undefined, true, "init");
    }
    detach() {
        __classPrivateFieldGet(this, _target).removeEventListener('scroll', __classPrivateFieldGet(this, _listener));
        __classPrivateFieldGet(this, _task).stop();
        __classPrivateFieldSet(this, _isAttached, false);
    }
    setTarget(target) {
        if (target !== __classPrivateFieldGet(this, _target)) {
            this.detach();
            __classPrivateFieldSet(this, _target, target);
            this.attach();
        }
    }
    setThreshold(threshold) {
        __classPrivateFieldSet(this, _threshold, getRangeValueOrDefault(threshold, 0, 100, 0));
    }
    isInProgress() {
        return __classPrivateFieldGet(this, _inProgress);
    }
    isAttached() {
        return __classPrivateFieldGet(this, _isAttached);
    }
    listener(ev, initial, source) {
        if (!is(__classPrivateFieldGet(this, _callback))) {
            return;
        }
        let left = __classPrivateFieldGet(this, _box).getScrollLeft();
        let top = __classPrivateFieldGet(this, _box).getScrollTop();
        __classPrivateFieldSet(this, _prevX, __classPrivateFieldGet(this, _prevX) + left);
        __classPrivateFieldSet(this, _prevY, __classPrivateFieldGet(this, _prevY) + top);
        if (__classPrivateFieldGet(this, _inProgress) || (!this.passedThreshold() && is(ev))) {
            return;
        }
        __classPrivateFieldSet(this, _inProgress, true);
        // @ts-ignore - callback already checked
        __classPrivateFieldGet(this, _callback).call(this, {
            base: ev,
            top: top,
            left: left,
            initial: initial !== null && initial !== void 0 ? initial : false,
            scrolling: is(ev),
            source: source !== null && source !== void 0 ? source : "event"
        });
        if (is(ev))
            __classPrivateFieldGet(this, _task).start();
        __classPrivateFieldSet(this, _inProgress, false);
        __classPrivateFieldSet(this, _prevX, 0);
        __classPrivateFieldSet(this, _prevY, 0);
    }
    passedThreshold() {
        return __classPrivateFieldGet(this, _threshold) <= 0 || (__classPrivateFieldGet(this, _prevX) >= __classPrivateFieldGet(this, _threshold) || __classPrivateFieldGet(this, _prevY) >= __classPrivateFieldGet(this, _threshold));
    }
    onScrollFinish() {
        this.listener(undefined, false, "task");
    }
}
_target = new WeakMap(), _inProgress = new WeakMap(), _threshold = new WeakMap(), _prevX = new WeakMap(), _prevY = new WeakMap(), _callback = new WeakMap(), _isAttached = new WeakMap(), _box = new WeakMap(), _task = new WeakMap(), _listener = new WeakMap();
