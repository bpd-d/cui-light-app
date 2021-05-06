import { CuiMoveEventListener } from "../../listeners/move";
export class CuiDragHandler {
    constructor(root) {
        this._root = root;
        this._moveHandler = new CuiMoveEventListener();
        this._timeout = 150;
        this._isTracking = false;
        this._timeoutId = undefined;
        this._moveHandler.setTarget(this._root);
        this._moveHandler.preventDefault(false);
        this._moveHandler.setCallback(this.onMove.bind(this));
        this._onDragStart = undefined;
        this._onDragOver = undefined;
        this._onDragEnd = undefined;
    }
    setLongPressTimeout(timeout) {
        this._timeout = timeout;
    }
    onDragStart(callback) {
        this._onDragStart = callback;
    }
    onDragOver(callback) {
        this._onDragOver = callback;
    }
    onDragEnd(callback) {
        this._onDragEnd = callback;
    }
    attach() {
        this._moveHandler.attach();
    }
    detach() {
        this._moveHandler.detach();
    }
    onMove(data) {
        switch (data.type) {
            case "down":
                if (this._isTracking) {
                    return;
                }
                this._timeoutId = setTimeout(() => {
                    if (this._onDragStart && this._onDragStart(data)) {
                        this._isTracking = true;
                    }
                }, this._timeout);
                break;
            case "move":
                this.cancelTimeout();
                if (!this._isTracking) {
                    return;
                }
                if (this._onDragOver) {
                    this._onDragOver(data);
                }
                break;
            case "up":
                this.cancelTimeout();
                if (!this._isTracking) {
                    return;
                }
                if (this._onDragEnd) {
                    this._onDragEnd(data);
                }
                this._isTracking = false;
                break;
        }
    }
    cancelTimeout() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = undefined;
        }
    }
}
