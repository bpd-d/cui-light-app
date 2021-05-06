import { is } from "../utils/functions";
export class CuiMoveEventListener {
    constructor(element) {
        this._isLocked = false;
        this._element = element !== null && element !== void 0 ? element : document.body;
        this._isAttached = false;
        this._preventDefault = false;
        this._onEvent = undefined;
        this._target = undefined;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }
    setCallback(callback) {
        this._onEvent = callback;
    }
    setTarget(element) {
        this._target = element;
    }
    isInProgress() {
        return this._isLocked;
    }
    preventDefault(flag) {
        this._preventDefault = flag;
    }
    attach() {
        if (this._isAttached) {
            return;
        }
        //@ts-ignore
        this._element.addEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        this._element.addEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        this._element.addEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        this._element.addEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        this._element.addEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        this._element.addEventListener('touchmove', this.onTouchMove, { passive: false });
        this._isAttached = true;
    }
    detach() {
        if (!this._isAttached) {
            return;
        }
        //@ts-ignore
        this._element.removeEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('touchmove', this.onTouchMove, { passive: false });
        this._isAttached = false;
    }
    isAttached() {
        return this._isAttached;
    }
    onMouseDown(ev) {
        if (this._isLocked) {
            return;
        }
        if (this._target && !this._target.contains(ev.target)) {
            return;
        }
        this._isLocked = true;
        this.publishMouseEvent("down", ev);
    }
    onMouseUp(ev) {
        if (!this._isLocked) {
            return;
        }
        this._isLocked = false;
        this.publishMouseEvent("up", ev);
    }
    onMouseMove(ev) {
        if (this._isLocked) {
            this.publishMouseEvent("move", ev);
        }
    }
    onTouchStart(ev) {
        if (this._isLocked) {
            return;
        }
        if (this._target && !this._target.contains(ev.target)) {
            return;
        }
        this._isLocked = true;
        this.publishTouchEvent('down', ev);
    }
    onTouchEnd(ev) {
        if (!this._isLocked) {
            return;
        }
        this._isLocked = false;
        this.publishTouchEvent('up', ev);
    }
    onTouchMove(ev) {
        if (this._isLocked) {
            this.publishTouchEvent('move', ev);
        }
    }
    publishMouseEvent(type, ev) {
        if (this._preventDefault && ev.cancelable) {
            ev.preventDefault();
        }
        if (!is(this._onEvent)) {
            return;
        }
        // @ts-ignore
        this._onEvent({
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
        if (this._preventDefault && ev.cancelable)
            ev.preventDefault();
        if (!is(this._onEvent)) {
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
        this._onEvent({
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
