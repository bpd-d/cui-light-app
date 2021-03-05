import { CuiQueueCompareCallback, CuiQueueErrorCallback, ICuiQueue, ICuiQueueAdapter } from "./interfaces";

export class CuiQueue<T> implements ICuiQueue<T> {
    #items: T[];
    #lock: boolean;
    #adapter: ICuiQueueAdapter<T>;
    #onError?: CuiQueueErrorCallback<T>;
    #comparer?: CuiQueueCompareCallback<T>;

    constructor(adapter: ICuiQueueAdapter<T>) {
        this.#lock = false;
        this.#items = [];
        this.#adapter = adapter;
        this.#comparer = undefined;
        this.#onError = undefined;
    }

    add(item: T): void {
        this.#items.push(item);
        if (this.#lock) {
            return;
        }

        this.#lock = true;
        this.flush().then(() => {
            this.#lock = false;
        })
    }

    delete(item: T): T | undefined {
        const index = this.#items.findIndex(_item => this.compare(_item, item));
        if (index < 0) {
            return undefined;
        }
        return this.#items.splice(index, 1)[0];
    }

    isLocked(): boolean {
        return this.#lock;
    }

    setCompareCallback(callback: CuiQueueCompareCallback<T>) {
        this.#comparer = callback;
    }

    onError(callback: CuiQueueErrorCallback<T>) {
        this.#onError = callback;
    }

    private compare(item1: T, item2: T): boolean {
        if (this.#comparer) {
            return this.#comparer(item1, item2)
        }
        return Object.is(item1, item2);
    }

    private async flush(): Promise<boolean> {
        const items = this.getItemsForFlush();
        if (items.length === 0) {
            return true;
        }
        try {
            await this.#adapter.onFlush(items);
        } catch (e) {
            this.callError(e, items);
        }

        return this.flush();
    }

    private getItemsForFlush(): T[] {
        if (this.#adapter.type === 'batch') {
            let result = [...this.#items];
            this.#items = []
            return result;
        }
        const item = this.#items.shift();
        if (item) {
            return [item];
        }
        return [];
    }

    private callError(error: unknown, items?: T[]) {
        if (this.#onError) {
            this.#onError(error, items)
        }
    }
}