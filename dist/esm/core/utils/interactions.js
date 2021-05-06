import { CuiRAF } from "./statics";
export class FastDom {
    constructor() {
        // private _raf: any;
        this._isScheduled = false;
        // this._raf = window.requestAnimationFrame.bind(window)
        this._writes = [];
        this._reads = [];
        this._limit = 5;
        this._reportCallback = undefined;
    }
    onError(callback) {
        this._reportCallback = callback;
    }
    mutate(callback, ctx, ...args) {
        this._reads.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    fetch(callback, ctx, ...args) {
        this._writes.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    createTask(callback, ctx, ...args) {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }
    run(tasks) {
        let task = null;
        while (task = tasks.shift()) {
            task();
        }
    }
    schedule(recursion) {
        if (!this._isScheduled) {
            this._isScheduled = true;
            if (recursion && recursion >= this._limit) {
                throw new Error("Fast Dom limit reached");
            }
            else {
                CuiRAF(this.flush.bind(this, recursion));
            }
        }
    }
    flush(recursion) {
        let rec = recursion !== null && recursion !== void 0 ? recursion : 0;
        let error = null;
        let writes = this._writes;
        let reads = this._reads;
        try {
            this.run(reads);
            this.run(writes);
        }
        catch (e) {
            if (this._reportCallback) {
                this._reportCallback(e);
            }
            else {
                console.error(`An error has been captured in interactions: ${e.message}`);
                //console.error(e)
            }
            error = e;
        }
        this._isScheduled = false;
        if (error || this._writes.length || this._reads.length) {
            this.schedule(rec + 1);
        }
    }
}
export class SyncInteractions {
    constructor() {
        // raf: any;
        this.isRunning = false;
        this.tasks = [];
        // this.raf = window.requestAnimationFrame.bind(window)
    }
    mutate(callback, ctx, ...args) {
        this.tasks.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    fetch(callback, ctx, ...args) {
        this.tasks.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    schedule() {
        if (!this.isRunning) {
            this.isRunning = true;
            CuiRAF(this.flush.bind(this));
        }
    }
    flush() {
        let task = null;
        while (task = this.tasks.shift()) {
            try {
                task();
            }
            catch (e) {
            }
        }
        this.isRunning = false;
    }
    createTask(callback, ctx, ...args) {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }
}
