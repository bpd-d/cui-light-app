import { is } from "./functions";
export class CuiTaskRunner {
    constructor(timeout, autoRenew, callback) {
        this._autoRenew = autoRenew;
        this._timeout = timeout;
        this._callback = callback;
    }
    start() {
        if (!this.canRun()) {
            return;
        }
        this.stop();
        this._taskId = setTimeout(() => {
            //@ts-ignore - already checked in canRun
            this._callback();
            this._taskId = null;
            if (this._autoRenew) {
                this.start();
            }
        }, this._timeout);
    }
    stop() {
        if (this._taskId) {
            clearTimeout(this._taskId);
            this._taskId = null;
        }
    }
    getId() {
        return this._taskId;
    }
    canRun() {
        return is(this._callback) && this._timeout > 0;
    }
    setCallback(callback) {
        this._callback = callback;
    }
    setTimeout(timeout) {
        this._timeout = timeout;
    }
}
