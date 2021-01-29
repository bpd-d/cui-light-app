import { ICuiEventListener } from "../models/interfaces";
import { are } from "../utils/functions";

export interface CuiHoverEvent {
    isHovering: boolean;
    event: MouseEvent;
    timestamp: number;
}
export class CuiHoverListener implements ICuiEventListener<CuiHoverEvent> {
    #target: Element;
    #callback: ((t: CuiHoverEvent) => void) | undefined;
    #inProgress: boolean;
    #isHovering: boolean;
    #isAttached: boolean;
    #onOverBound: (ev: MouseEvent) => void;
    #onMoveBound: (ev: MouseEvent) => void;
    #onOutBound: (ev: MouseEvent) => void;

    constructor(target: Element) {
        this.#target = target;
        this.#inProgress = false;
        this.#isHovering = false;
        this.#isAttached = false;
        this.#callback = undefined;

        this.#onMoveBound = this.onMouseMove.bind(this);
        this.#onOutBound = this.onMouseOut.bind(this);
        this.#onOverBound = this.onMouseOver.bind(this);

    }

    setCallback(callback: (t: CuiHoverEvent) => void): void {
        this.#callback = callback;
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }
    attach(): void {
        // @ts-ignore
        this.#target.addEventListener("mouseover", this.#onOverBound);
        // @ts-ignore
        this.#target.addEventListener("mousemove", this.#onMoveBound);
        // @ts-ignore
        this.#target.addEventListener("mouseout", this.#onOutBound);
        this.#isAttached = true;
    }

    detach(): void {
        // @ts-ignore
        this.#target.removeEventListener("mouseover", this.#onOverBound);
        // @ts-ignore
        this.#target.removeEventListener("mousemove", this.#onMoveBound);
        // @ts-ignore
        this.#target.removeEventListener("mouseout", this.#onOutBound);
        this.#isAttached = false;
    }

    private emit(mouseEvent: MouseEvent, force: boolean) {
        if (!are(this.#callback)) {
            return;
        }
        if (!force && this.#inProgress) {
            return;
        }
        this.#inProgress = true;
        window.requestAnimationFrame(this.invoke.bind(this, {
            isHovering: this.#isHovering,
            event: mouseEvent,
            timestamp: Date.now()
        }))
    }

    isAttached() {
        return this.#isAttached;
    }
    private invoke(ev: CuiHoverEvent) {
        if (this.#callback)
            this.#callback(ev);
        this.#inProgress = false;
    }

    private onMouseOver(ev: MouseEvent) {
        this.#isHovering = true;
        this.emit(ev, true);
    }

    private onMouseOut(ev: MouseEvent) {
        this.#isHovering = false;
        this.emit(ev, true);
    }

    private onMouseMove(ev: MouseEvent) {
        this.emit(ev, false);
    }
}