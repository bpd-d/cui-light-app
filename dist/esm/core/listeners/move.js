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
var _element, _onEvent, _isLocked, _isAttached, _preventDefault, _target;
import { is } from "../utils/functions";
export class CuiMoveEventListener {
    constructor(element) {
        _element.set(this, void 0);
        _onEvent.set(this, void 0);
        _isLocked.set(this, void 0);
        _isAttached.set(this, void 0);
        _preventDefault.set(this, void 0);
        _target.set(this, void 0);
        __classPrivateFieldSet(this, _isLocked, false);
        __classPrivateFieldSet(this, _element, element !== null && element !== void 0 ? element : document.body);
        __classPrivateFieldSet(this, _isAttached, false);
        __classPrivateFieldSet(this, _preventDefault, false);
        __classPrivateFieldSet(this, _onEvent, undefined);
        __classPrivateFieldSet(this, _target, undefined);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _onEvent, callback);
    }
    setTarget(element) {
        __classPrivateFieldSet(this, _target, element);
    }
    isInProgress() {
        return __classPrivateFieldGet(this, _isLocked);
    }
    preventDefault(flag) {
        __classPrivateFieldSet(this, _preventDefault, flag);
    }
    attach() {
        if (__classPrivateFieldGet(this, _isAttached)) {
            return;
        }
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('touchmove', this.onTouchMove, { passive: false });
        __classPrivateFieldSet(this, _isAttached, true);
    }
    detach() {
        if (!__classPrivateFieldGet(this, _isAttached)) {
            return;
        }
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('touchmove', this.onTouchMove, { passive: false });
        __classPrivateFieldSet(this, _isAttached, false);
    }
    isAttached() {
        return __classPrivateFieldGet(this, _isAttached);
    }
    onMouseDown(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        if (__classPrivateFieldGet(this, _target) && !__classPrivateFieldGet(this, _target).contains(ev.target)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, true);
        this.publishMouseEvent("down", ev);
    }
    onMouseUp(ev) {
        if (!__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, false);
        this.publishMouseEvent("up", ev);
    }
    onMouseMove(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            this.publishMouseEvent("move", ev);
        }
    }
    onTouchStart(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        if (__classPrivateFieldGet(this, _target) && !__classPrivateFieldGet(this, _target).contains(ev.target)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, true);
        this.publishTouchEvent('down', ev);
    }
    onTouchEnd(ev) {
        if (!__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, false);
        this.publishTouchEvent('up', ev);
    }
    onTouchMove(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            this.publishTouchEvent('move', ev);
        }
    }
    publishMouseEvent(type, ev) {
        if (__classPrivateFieldGet(this, _preventDefault) && ev.cancelable) {
            ev.preventDefault();
        }
        if (!is(__classPrivateFieldGet(this, _onEvent))) {
            return;
        }
        // @ts-ignore
        __classPrivateFieldGet(this, _onEvent).call(this, {
            type: type,
            x: ev.clientX,
            y: ev.clientY,
            moveX: ev.movementX,
            moveY: ev.movementY,
            target: ev.target,
            event: ev,
        });
    }
    publishTouchEvent(type, ev) {
        if (__classPrivateFieldGet(this, _preventDefault) && ev.cancelable)
            ev.preventDefault();
        if (!is(__classPrivateFieldGet(this, _onEvent))) {
            return;
        }
        let touch = null;
        if (ev.touches.length > 0) {
            touch = ev.touches[0];
        }
        else if (ev.changedTouches.length > 0) {
            touch = ev.changedTouches[0];
        }
        // @ts-ignore - already checked
        __classPrivateFieldGet(this, _onEvent).call(this, {
            event: ev,
            type: type,
            target: ev.target,
            //@ts-ignore
            x: is(touch) ? touch.clientX : -1,
            //@ts-ignore
            y: is(touch) ? touch.clientY : -1,
            moveX: -1,
            moveY: -1
        });
    }
}
_element = new WeakMap(), _onEvent = new WeakMap(), _isLocked = new WeakMap(), _isAttached = new WeakMap(), _preventDefault = new WeakMap(), _target = new WeakMap();
