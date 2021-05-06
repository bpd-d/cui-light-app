import { IUIInteractionProvider } from "../models/interfaces";
import { CuiRAF } from "./statics";

export class FastDom implements IUIInteractionProvider {
    private _writes: any[];
    private _reads: any[];
    // private _raf: any;
    private _isScheduled: boolean = false;
    private _limit: number;
    private _reportCallback: ((e: Error) => void) | undefined;

    constructor() {
        // this._raf = window.requestAnimationFrame.bind(window)
        this._writes = []
        this._reads = []
        this._limit = 5;
        this._reportCallback = undefined;

    }

    onError(callback: (e: Error) => void) {
        this._reportCallback = callback;
    }

    mutate(callback: any, ctx: any, ...args: any[]): void {
        this._reads.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    fetch(callback: any, ctx: any, ...args: any[]): void {
        this._writes.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    private createTask(callback: any, ctx: any, ...args: any[]): any {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }

    private run(tasks: any[]) {
        let task = null
        while (task = tasks.shift()) {
            task()
        }
    }

    private schedule(recursion?: number) {
        if (!this._isScheduled) {
            this._isScheduled = true;
            if (recursion && recursion >= this._limit) {
                throw new Error("Fast Dom limit reached")
            } else {
                CuiRAF(this.flush.bind(this, recursion));
            }

        }
    }

    private flush(recursion?: number) {
        let rec: number = recursion ?? 0;
        let error = null;
        let writes = this._writes;
        let reads = this._reads;

        try {
            this.run(reads);
            this.run(writes);
        } catch (e) {
            if (this._reportCallback) {
                this._reportCallback(e);
            } else {
                console.error(`An error has been captured in interactions: ${e.message}`);
                //console.error(e)
            }
            error = e
        }
        this._isScheduled = false;
        if (error || this._writes.length || this._reads.length) {
            this.schedule(rec + 1);
        }
    }
}

export class SyncInteractions implements IUIInteractionProvider {
    tasks: any[];
    // raf: any;
    isRunning: boolean = false;
    constructor() {
        this.tasks = [];
        // this.raf = window.requestAnimationFrame.bind(window)
    }

    mutate(callback: any, ctx: any, ...args: any[]): void {
        this.tasks.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    fetch(callback: any, ctx: any, ...args: any[]): void {
        this.tasks.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    private schedule() {
        if (!this.isRunning) {
            this.isRunning = true;
            CuiRAF(this.flush.bind(this))
        }
    }

    private flush() {
        let task = null
        while (task = this.tasks.shift()) {
            try {
                task()
            }
            catch (e) {
            }
        }
        this.isRunning = false
    }

    private createTask(callback: any, ctx: any, ...args: any[]): any {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }

}