import { ICuiEventListener } from "../models/interfaces";
import { are } from "../utils/functions";

export interface CuiHoverEvent {
    isHovering: boolean;
    event: MouseEvent;
    timestamp: number;
}
export class CuiHoverListener implements ICuiEventListener<CuiHoverEvent> {
    private _target: Element;
    private _callback: ((t: CuiHoverEvent) => void) | undefined;
    private _inProgress: boolean;
    private _isHovering: boolean;
    private _isAttached: boolean;
    private _onOverBound: (ev: MouseEvent) => void;
    private _onMoveBound: (ev: MouseEvent) => void;
    private _onOutBound: (ev: MouseEvent) => void;

    constructor(target: Element) {
        this._target = target;
        this._inProgress = false;
        this._isHovering = false;
        this._isAttached = false;
        this._callback = undefined;

        this._onMoveBound = this.onMouseMove.bind(this);
        this._onOutBound = this.onMouseOut.bind(this);
        this._onOverBound = this.onMouseOver.bind(this);

    }

    setCallback(callback: (t: CuiHoverEvent) => void): void {
        this._callback = callback;
    }

    isInProgress(): boolean {
        return this._inProgress;
    }
    attach(): void {
        // @ts-ignore
        this._target.addEventListener("mouseover", this._onOverBound);
        // @ts-ignore
        this._target.addEventListener("mousemove", this._onMoveBound);
        // @ts-ignore
        this._target.addEventListener("mouseout", this._onOutBound);
        this._isAttached = true;
    }

    detach(): void {
        // @ts-ignore
        this._target.removeEventListener("mouseover", this._onOverBound);
        // @ts-ignore
        this._target.removeEventListener("mousemove", this._onMoveBound);
        // @ts-ignore
        this._target.removeEventListener("mouseout", this._onOutBound);
        this._isAttached = false;
    }

    private emit(mouseEvent: MouseEvent, force: boolean) {
        if (!are(this._callback)) {
            return;
        }
        if (!force && this._inProgress) {
            return;
        }
        this._inProgress = true;
        window.requestAnimationFrame(this.invoke.bind(this, {
            isHovering: this._isHovering,
            event: mouseEvent,
            timestamp: Date.now()
        }))
    }

    isAttached() {
        return this._isAttached;
    }
    private invoke(ev: CuiHoverEvent) {
        if (this._callback)
            this._callback(ev);
        this._inProgress = false;
    }

    private onMouseOver(ev: MouseEvent) {
        this._isHovering = true;
        this.emit(ev, true);
    }

    private onMouseOut(ev: MouseEvent) {
        this._isHovering = false;
        this.emit(ev, true);
    }

    private onMouseMove(ev: MouseEvent) {
        this.emit(ev, false);
    }
}