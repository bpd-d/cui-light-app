import { CuiMoveEventListener, ICuiMoveData } from "../../listeners/move";

export class CuiDragHandler {
    #root: Element;
    #moveHandler: CuiMoveEventListener;
    #onDragStart: ((data: ICuiMoveData) => boolean) | undefined;
    #onDragOver: ((data: ICuiMoveData) => void) | undefined;
    #onDragEnd: ((data: ICuiMoveData) => void) | undefined;
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

    onDragStart(callback: (data: ICuiMoveData) => boolean) {
        this.#onDragStart = callback;
    }

    onDragOver(callback: (data: ICuiMoveData) => void) {
        this.#onDragOver = callback;
    }

    onDragEnd(callback: (data: ICuiMoveData) => void) {
        this.#onDragEnd = callback;
    }

    attach() {
        this.#moveHandler.attach();
    }

    detach() {
        this.#moveHandler.detach();
    }

    private onMove(data: ICuiMoveData) {
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