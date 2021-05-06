import { are, is } from "./functions";

export interface ICuiTask {
    start(): void;
    stop(): void;
    getId(): any;
    setCallback(callback: () => void): void;
    setTimeout(timeout: number): void;
}

export class CuiTaskRunner implements ICuiTask {
    private _taskId: any;
    private _autoRenew: boolean;
    private _timeout: number;
    private _callback: (() => void) | undefined;

    constructor(timeout: number, autoRenew: boolean, callback?: () => void) {
        this._autoRenew = autoRenew;
        this._timeout = timeout;
        this._callback = callback;
    }
    start(): void {
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

    stop(): void {
        if (this._taskId) {
            clearTimeout(this._taskId);
            this._taskId = null
        }
    }

    getId() {
        return this._taskId;
    }

    private canRun(): boolean {
        return is(this._callback) && this._timeout > 0;
    }

    setCallback(callback: () => void) {
        this._callback = callback;
    }

    setTimeout(timeout: number) {
        this._timeout = timeout;
    }

}