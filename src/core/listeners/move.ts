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
    #element: HTMLElement | Document;
    #onEvent: ((t: ICuiMoveData) => void) | undefined;
    #isLocked: boolean;
    #isAttached: boolean;
    #preventDefault: boolean;
    #target: Element | undefined;
    constructor(element?: HTMLElement) {
        this.#isLocked = false;
        this.#element = element ?? document.body;
        this.#isAttached = false;
        this.#preventDefault = false;
        this.#onEvent = undefined;
        this.#target = undefined;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
    }

    setCallback(callback: (t: ICuiMoveData) => void): void {
        this.#onEvent = callback;
    }

    setTarget(element: Element) {
        this.#target = element;
    }
    isInProgress(): boolean {
        return this.#isLocked;
    }
    preventDefault(flag: boolean) {
        this.#preventDefault = flag;
    }
    attach(): void {
        if (this.#isAttached) {
            return;
        }

        //@ts-ignore
        this.#element.addEventListener('mousedown', this.onMouseDown, { passive: false } as any);
        //@ts-ignore
        this.#element.addEventListener('mouseup', this.onMouseUp, { passive: false } as any);
        //@ts-ignore
        this.#element.addEventListener('mousemove', this.onMouseMove, { passive: false } as any);
        //@ts-ignore
        this.#element.addEventListener('touchstart', this.onTouchStart, { passive: false } as any);
        //@ts-ignore
        this.#element.addEventListener('touchend', this.onTouchEnd, { passive: false } as any);
        //@ts-ignore
        this.#element.addEventListener('touchmove', this.onTouchMove, { passive: false } as any);
        this.#isAttached = true;
    }
    detach(): void {
        if (!this.#isAttached) {
            return;
        }
        //@ts-ignore
        this.#element.removeEventListener('mousedown', this.onMouseDown, { passive: false } as any);
        //@ts-ignore
        this.#element.removeEventListener('mouseup', this.onMouseUp, { passive: false } as any);
        //@ts-ignore
        this.#element.removeEventListener('mousemove', this.onMouseMove, { passive: false } as any);
        //@ts-ignore
        this.#element.removeEventListener('touchstart', this.onTouchStart, { passive: false } as any);
        //@ts-ignore
        this.#element.removeEventListener('touchend', this.onTouchEnd, { passive: false } as any);
        //@ts-ignore
        this.#element.removeEventListener('touchmove', this.onTouchMove, { passive: false } as any);
        this.#isAttached = false;
    }

    isAttached(): boolean {
        return this.#isAttached
    }

    onMouseDown(ev: MouseEvent) {
        if (this.#isLocked) {
            return;
        }
        if (this.#target && !this.#target.contains(ev.target as Node)) {
            return;
        }

        this.#isLocked = true;
        this.publishMouseEvent("down", ev)

    }

    onMouseUp(ev: MouseEvent) {
        if (!this.#isLocked) {
            return;
        }
        this.#isLocked = false;
        this.publishMouseEvent("up", ev)

    }

    onMouseMove(ev: MouseEvent) {
        if (this.#isLocked) {
            this.publishMouseEvent("move", ev)
        }
    }

    onTouchStart(ev: TouchEvent) {
        if (this.#isLocked) {
            return;
        }
        if (this.#target && !this.#target.contains(ev.target as Node)) {
            return;
        }
        this.#isLocked = true;
        this.publishTouchEvent('down', ev);
    }

    onTouchEnd(ev: TouchEvent) {
        if (!this.#isLocked) {
            return;
        }
        this.#isLocked = false;
        this.publishTouchEvent('up', ev);
    }

    onTouchMove(ev: TouchEvent) {
        if (this.#isLocked) {
            this.publishTouchEvent('move', ev);
        }
    }

    private publishMouseEvent(type: CuiMoveEventState, ev: MouseEvent) {
        if (this.#preventDefault && ev.cancelable) {
            ev.preventDefault();
        }
        if (!is(this.#onEvent)) { return }
        // @ts-ignore
        this.#onEvent({
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
        if (this.#preventDefault && ev.cancelable)
            ev.preventDefault();
        if (!is(this.#onEvent)) {
            return;
        }
        let touch = null;
        if (ev.touches.length > 0) {
            touch = ev.touches[0]
        } else if (ev.changedTouches.length > 0) {
            touch = ev.changedTouches[0]
        }
        // @ts-ignore - already checked
        this.#onEvent({
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
