import { CuiMoveEventListener, ICuiMoveData } from "../../listeners/move";

export class CuiDragHandler {
    private _root: Element;
    private _moveHandler: CuiMoveEventListener;
    private _onDragStart: ((data: ICuiMoveData) => boolean) | undefined;
    private _onDragOver: ((data: ICuiMoveData) => void) | undefined;
    private _onDragEnd: ((data: ICuiMoveData) => void) | undefined;
    private _timeout: number;
    private _isTracking: boolean;
    private _timeoutId: any;
    constructor(root: HTMLElement) {
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

    setLongPressTimeout(timeout: number) {
        this._timeout = timeout;
    }

    onDragStart(callback: (data: ICuiMoveData) => boolean) {
        this._onDragStart = callback;
    }

    onDragOver(callback: (data: ICuiMoveData) => void) {
        this._onDragOver = callback;
    }

    onDragEnd(callback: (data: ICuiMoveData) => void) {
        this._onDragEnd = callback;
    }

    attach() {
        this._moveHandler.attach();
    }

    detach() {
        this._moveHandler.detach();
    }

    private onMove(data: ICuiMoveData) {
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

    private cancelTimeout() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = undefined;
        }
    }
}