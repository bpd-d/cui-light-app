import { are } from "../utils/functions";
export class CuiHoverListener {
    constructor(target) {
        this._target = target;
        this._inProgress = false;
        this._isHovering = false;
        this._isAttached = false;
        this._callback = undefined;
        this._onMoveBound = this.onMouseMove.bind(this);
        this._onOutBound = this.onMouseOut.bind(this);
        this._onOverBound = this.onMouseOver.bind(this);
    }
    setCallback(callback) {
        this._callback = callback;
    }
    isInProgress() {
        return this._inProgress;
    }
    attach() {
        // @ts-ignore
        this._target.addEventListener("mouseover", this._onOverBound);
        // @ts-ignore
        this._target.addEventListener("mousemove", this._onMoveBound);
        // @ts-ignore
        this._target.addEventListener("mouseout", this._onOutBound);
        this._isAttached = true;
    }
    detach() {
        // @ts-ignore
        this._target.removeEventListener("mouseover", this._onOverBound);
        // @ts-ignore
        this._target.removeEventListener("mousemove", this._onMoveBound);
        // @ts-ignore
        this._target.removeEventListener("mouseout", this._onOutBound);
        this._isAttached = false;
    }
    emit(mouseEvent, force) {
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
        }));
    }
    isAttached() {
        return this._isAttached;
    }
    invoke(ev) {
        if (this._callback)
            this._callback(ev);
        this._inProgress = false;
    }
    onMouseOver(ev) {
        this._isHovering = true;
        this.emit(ev, true);
    }
    onMouseOut(ev) {
        this._isHovering = false;
        this.emit(ev, true);
    }
    onMouseMove(ev) {
        this.emit(ev, false);
    }
}
