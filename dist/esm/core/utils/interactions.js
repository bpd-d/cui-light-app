var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _writes, _reads, _raf, _isScheduled, _limit, _reportCallback;
export class FastDom {
    constructor() {
        _writes.set(this, void 0);
        _reads.set(this, void 0);
        _raf.set(this, void 0);
        _isScheduled.set(this, false);
        _limit.set(this, void 0);
        _reportCallback.set(this, void 0);
        __classPrivateFieldSet(this, _raf, window.requestAnimationFrame.bind(window));
        __classPrivateFieldSet(this, _writes, []);
        __classPrivateFieldSet(this, _reads, []);
        __classPrivateFieldSet(this, _limit, 5);
        __classPrivateFieldSet(this, _reportCallback, undefined);
    }
    onError(callback) {
        __classPrivateFieldSet(this, _reportCallback, callback);
    }
    mutate(callback, ctx, ...args) {
        __classPrivateFieldGet(this, _reads).push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    fetch(callback, ctx, ...args) {
        __classPrivateFieldGet(this, _writes).push(this.createTask(callback, ctx, ...args));
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
        if (!__classPrivateFieldGet(this, _isScheduled)) {
            __classPrivateFieldSet(this, _isScheduled, true);
            if (recursion && recursion >= __classPrivateFieldGet(this, _limit)) {
                throw new Error("Fast Dom limit reached");
            }
            else {
                __classPrivateFieldGet(this, _raf).call(this, this.flush.bind(this, recursion));
            }
        }
    }
    flush(recursion) {
        let rec = recursion !== null && recursion !== void 0 ? recursion : 0;
        let error = null;
        let writes = __classPrivateFieldGet(this, _writes);
        let reads = __classPrivateFieldGet(this, _reads);
        try {
            this.run(reads);
            this.run(writes);
        }
        catch (e) {
            if (__classPrivateFieldGet(this, _reportCallback)) {
                __classPrivateFieldGet(this, _reportCallback).call(this, e);
            }
            else {
                console.error(`An error has been captured in interactions: ${e.message}`);
                //console.error(e)
            }
            error = e;
        }
        __classPrivateFieldSet(this, _isScheduled, false);
        if (error || __classPrivateFieldGet(this, _writes).length || __classPrivateFieldGet(this, _reads).length) {
            this.schedule(rec + 1);
        }
    }
}
_writes = new WeakMap(), _reads = new WeakMap(), _raf = new WeakMap(), _isScheduled = new WeakMap(), _limit = new WeakMap(), _reportCallback = new WeakMap();
export class SyncInteractions {
    constructor() {
        this.isRunning = false;
        this.tasks = [];
        this.raf = window.requestAnimationFrame.bind(window);
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
            this.raf(this.flush.bind(this));
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
