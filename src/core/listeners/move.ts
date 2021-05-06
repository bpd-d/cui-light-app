import { ICuiEventListener } from "../models/interfaces";
import { is } from "../utils/functions";
import { EVENTS } from "../utils/statics";

interface OnMoveCallback {
    (ev: ICuiMoveData): void;
}

interface IMoveListener {
    onMove(data: OnMoveCallback): void
    start(): void;
    stop(): void;
}

export type CuiMoveEventState = "down" | "up" | "move";
export interface ICuiMoveData {
    x: number;
    y: number;
    moveX: number;
    moveY: number;
    type: CuiMoveEventState;
    target: EventTarget | null;
    event: MouseEvent | TouchEvent;
}

export class CuiMoveEventListener implements ICuiEventListener<ICuiMoveData> {
    private _element: HTMLElement | Document;
    private _onEvent: ((t: ICuiMoveData) => void) | undefined;
    private _isLocked: boolean;
    private _isAttached: boolean;
    private _preventDefault: boolean;
    private _target: Element | undefined;
    constructor(element?: HTMLElement) {
        this._isLocked = false;
        this._element = element ?? document.body;
        this._isAttached = false;
        this._preventDefault = false;
        this._onEvent = undefined;
        this._target = undefined;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
    }

    setCallback(callback: (t: ICuiMoveData) => void): void {
        this._onEvent = callback;
    }

    setTarget(element?: Element) {
        this._target = element;
    }
    isInProgress(): boolean {
        return this._isLocked;
    }
    preventDefault(flag: boolean) {
        this._preventDefault = flag;
    }
    attach(): void {
        if (this._isAttached) {
            return;
        }

        //@ts-ignore
        this._element.addEventListener('mousedown', this.onMouseDown, { passive: false } as any);
        //@ts-ignore
        this._element.addEventListener('mouseup', this.onMouseUp, { passive: false } as any);
        //@ts-ignore
        this._element.addEventListener('mousemove', this.onMouseMove, { passive: false } as any);
        //@ts-ignore
        this._element.addEventListener('touchstart', this.onTouchStart, { passive: false } as any);
        //@ts-ignore
        this._element.addEventListener('touchend', this.onTouchEnd, { passive: false } as any);
        //@ts-ignore
        this._element.addEventListener('touchmove', this.onTouchMove, { passive: false } as any);
        this._isAttached = true;
    }
    detach(): void {
        if (!this._isAttached) {
            return;
        }
        //@ts-ignore
        this._element.removeEventListener('mousedown', this.onMouseDown, { passive: false } as any);
        //@ts-ignore
        this._element.removeEventListener('mouseup', this.onMouseUp, { passive: false } as any);
        //@ts-ignore
        this._element.removeEventListener('mousemove', this.onMouseMove, { passive: false } as any);
        //@ts-ignore
        this._element.removeEventListener('touchstart', this.onTouchStart, { passive: false } as any);
        //@ts-ignore
        this._element.removeEventListener('touchend', this.onTouchEnd, { passive: false } as any);
        //@ts-ignore
        this._element.removeEventListener('touchmove', this.onTouchMove, { passive: false } as any);
        this._isAttached = false;
    }

    isAttached(): boolean {
        return this._isAttached
    }

    onMouseDown(ev: MouseEvent) {
        if (this._isLocked) {
            return;
        }
        if (this._target && !this._target.contains(ev.target as Node)) {
            return;
        }

        this._isLocked = true;
        this.publishMouseEvent("down", ev)

    }

    onMouseUp(ev: MouseEvent) {
        if (!this._isLocked) {
            return;
        }
        this._isLocked = false;
        this.publishMouseEvent("up", ev)

    }

    onMouseMove(ev: MouseEvent) {
        if (this._isLocked) {
            this.publishMouseEvent("move", ev)
        }
    }

    onTouchStart(ev: TouchEvent) {
        if (this._isLocked) {
            return;
        }
        if (this._target && !this._target.contains(ev.target as Node)) {
            return;
        }
        this._isLocked = true;
        this.publishTouchEvent('down', ev);
    }

    onTouchEnd(ev: TouchEvent) {
        if (!this._isLocked) {
            return;
        }
        this._isLocked = false;
        this.publishTouchEvent('up', ev);
    }

    onTouchMove(ev: TouchEvent) {
        if (this._isLocked) {
            this.publishTouchEvent('move', ev);
        }
    }

    private publishMouseEvent(type: CuiMoveEventState, ev: MouseEvent) {
        if (this._preventDefault && ev.cancelable) {
            ev.preventDefault();
        }
        if (!is(this._onEvent)) { return }
        // @ts-ignore
        this._onEvent({
            type: type,
            x: ev.clientX,
            y: ev.clientY,
            moveX: ev.movementX,
            moveY: ev.movementY,
            target: ev.target,
            event: ev,
        })

    }

    private publishTouchEvent(type: CuiMoveEventState, ev: TouchEvent) {
        if (this._preventDefault && ev.cancelable)
            ev.preventDefault();
        if (!is(this._onEvent)) {
            return;
        }
        let touch = null;
        if (ev.touches.length > 0) {
            touch = ev.touches[0]
        } else if (ev.changedTouches.length > 0) {
            touch = ev.changedTouches[0]
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
        })

    }

}
