import { IUIInteractionProvider } from "../models/interfaces";

export class FastDom implements IUIInteractionProvider {
    #writes: any[];
    #reads: any[];
    #raf: any;
    #isScheduled: boolean = false;
    #limit: number;
    #reportCallback: ((e: Error) => void) | undefined;

    constructor() {
        this.#raf = window.requestAnimationFrame.bind(window)
        this.#writes = []
        this.#reads = []
        this.#limit = 5;
        this.#reportCallback = undefined;

    }

    onError(callback: (e: Error) => void) {
        this.#reportCallback = callback;
    }

    mutate(callback: any, ctx: any, ...args: any[]): void {
        this.#reads.push(this.createTask(callback, ctx, ...args))
        this.schedule()
    }

    fetch(callback: any, ctx: any, ...args: any[]): void {
        this.#writes.push(this.createTask(callback, ctx, ...args))
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
        if (!this.#isScheduled) {
            this.#isScheduled = true;
            if (recursion && recursion >= this.#limit) {
                throw new Error("Fast Dom limit reached")
            } else {
                this.#raf(this.flush.bind(this, recursion));
            }

        }
    }

    private flush(recursion?: number) {
        let rec: number = recursion ?? 0;
        let error = null;
        let writes = this.#writes;
        let reads = this.#reads;

        try {
            this.run(reads);
            this.run(writes);
        } catch (e) {
            if (this.#reportCallback) {
                this.#reportCallback(e);
            } else {
                console.error(`An error has been captured in interactions: ${e.message}`);
                //console.error(e)
            }
            error = e
        }
        this.#isScheduled = false;
        if (error || this.#writes.length || this.#reads.length) {
            this.schedule(rec + 1);
        }
    }
}

export class SyncInteractions implements IUIInteractionProvider {
    tasks: any[];
    raf: any;
    isRunning: boolean = false;
    constructor() {
        this.tasks = [];
        this.raf = window.requestAnimationFrame.bind(window)
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
            this.raf(this.flush.bind(this))
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