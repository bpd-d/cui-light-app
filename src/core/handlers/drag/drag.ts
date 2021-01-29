import { CuiMoveEventListener, ICuiMoveEvent } from "../../listeners/move";

export class CuiDragHandler {
    #root: Element;
    #moveHandler: CuiMoveEventListener;
    #onDragStart: ((data: ICuiMoveEvent) => boolean) | undefined;
    #onDragOver: ((data: ICuiMoveEvent) => void) | undefined;
    #onDragEnd: ((data: ICuiMoveEvent) => void) | undefined;
    #timeout: number;
    #isTracking: boolean;
    #timeoutId: any;
    constructor(root: HTMLElement) {
        this.#root = root;
        this.#moveHandler = new CuiMoveEventListener();
        this.#timeout = 150;
        this.#isTracking = false;
        this.#timeoutId = undefined;
        this.#moveHandler.setTarget(this.#root);
        this.#moveHandler.preventDefault(false);
        this.#moveHandler.setCallback(this.onMove.bind(this));

        this.#onDragStart = undefined;
        this.#onDragOver = undefined;
        this.#onDragEnd = undefined;
    }

    setLongPressTimeout(timeout: number) {
        this.#timeout = timeout;
    }

    onDragStart(callback: (data: ICuiMoveEvent) => boolean) {
        this.#onDragStart = callback;
    }

    onDragOver(callback: (data: ICuiMoveEvent) => void) {
        this.#onDragOver = callback;
    }

    onDragEnd(callback: (data: ICuiMoveEvent) => void) {
        this.#onDragEnd = callback;
    }

    attach() {
        this.#moveHandler.attach();
    }

    detach() {
        this.#moveHandler.detach();
    }

    private onMove(data: ICuiMoveEvent) {
        switch (data.type) {
            case "down":
                if (this.#isTracking) {
                    return;
                }

                this.#timeoutId = setTimeout(() => {
                    if (this.#onDragStart && this.#onDragStart(data)) {
                        this.#isTracking = true;
                    }
                }, this.#timeout);

                break;
            case "move":
                this.cancelTimeout();
                if (!this.#isTracking) {
                    return;
                }
                if (this.#onDragOver) {
                    this.#onDragOver(data);
                }
                break;
            case "up":
                this.cancelTimeout();
                if (!this.#isTracking) {
                    return;
                }
                if (this.#onDragEnd) {
                    this.#onDragEnd(data);
                }
                this.#isTracking = false;
                break;
        }
    }

    private cancelTimeout() {
        if (this.#timeoutId) {
            clearTimeout(this.#timeoutId);
            this.#timeoutId = undefined;
        }
    }
}