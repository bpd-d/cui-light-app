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
var _target, _callback, _inProgress, _isHovering, _isAttached, _onOverBound, _onMoveBound, _onOutBound;
import { are } from "../utils/functions";
export class CuiHoverListener {
    constructor(target) {
        _target.set(this, void 0);
        _callback.set(this, void 0);
        _inProgress.set(this, void 0);
        _isHovering.set(this, void 0);
        _isAttached.set(this, void 0);
        _onOverBound.set(this, void 0);
        _onMoveBound.set(this, void 0);
        _onOutBound.set(this, void 0);
        __classPrivateFieldSet(this, _target, target);
        __classPrivateFieldSet(this, _inProgress, false);
        __classPrivateFieldSet(this, _isHovering, false);
        __classPrivateFieldSet(this, _isAttached, false);
        __classPrivateFieldSet(this, _callback, undefined);
        __classPrivateFieldSet(this, _onMoveBound, this.onMouseMove.bind(this));
        __classPrivateFieldSet(this, _onOutBound, this.onMouseOut.bind(this));
        __classPrivateFieldSet(this, _onOverBound, this.onMouseOver.bind(this));
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _callback, callback);
    }
    isInProgress() {
        return __classPrivateFieldGet(this, _inProgress);
    }
    attach() {
        // @ts-ignore
        __classPrivateFieldGet(this, _target).addEventListener("mouseover", __classPrivateFieldGet(this, _onOverBound));
        // @ts-ignore
        __classPrivateFieldGet(this, _target).addEventListener("mousemove", __classPrivateFieldGet(this, _onMoveBound));
        // @ts-ignore
        __classPrivateFieldGet(this, _target).addEventListener("mouseout", __classPrivateFieldGet(this, _onOutBound));
        __classPrivateFieldSet(this, _isAttached, true);
    }
    detach() {
        // @ts-ignore
        __classPrivateFieldGet(this, _target).removeEventListener("mouseover", __classPrivateFieldGet(this, _onOverBound));
        // @ts-ignore
        __classPrivateFieldGet(this, _target).removeEventListener("mousemove", __classPrivateFieldGet(this, _onMoveBound));
        // @ts-ignore
        __classPrivateFieldGet(this, _target).removeEventListener("mouseout", __classPrivateFieldGet(this, _onOutBound));
        __classPrivateFieldSet(this, _isAttached, false);
    }
    emit(mouseEvent, force) {
        if (!are(__classPrivateFieldGet(this, _callback))) {
            return;
        }
        if (!force && __classPrivateFieldGet(this, _inProgress)) {
            return;
        }
        __classPrivateFieldSet(this, _inProgress, true);
        window.requestAnimationFrame(this.invoke.bind(this, {
            isHovering: __classPrivateFieldGet(this, _isHovering),
            event: mouseEvent,
            timestamp: Date.now()
        }));
    }
    isAttached() {
        return __classPrivateFieldGet(this, _isAttached);
    }
    invoke(ev) {
        if (__classPrivateFieldGet(this, _callback))
            __classPrivateFieldGet(this, _callback).call(this, ev);
        __classPrivateFieldSet(this, _inProgress, false);
    }
    onMouseOver(ev) {
        __classPrivateFieldSet(this, _isHovering, true);
        this.emit(ev, true);
    }
    onMouseOut(ev) {
        __classPrivateFieldSet(this, _isHovering, false);
        this.emit(ev, true);
    }
    onMouseMove(ev) {
        this.emit(ev, false);
    }
}
_target = new WeakMap(), _callback = new WeakMap(), _inProgress = new WeakMap(), _isHovering = new WeakMap(), _isAttached = new WeakMap(), _onOverBound = new WeakMap(), _onMoveBound = new WeakMap(), _onOutBound = new WeakMap();
