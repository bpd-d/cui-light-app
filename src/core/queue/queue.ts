import { CuiQueueCompareCallback, CuiQueueErrorCallback, ICuiQueue, ICuiQueueAdapter } from "./interfaces";

export class CuiQueue<T> implements ICuiQueue<T> {
    private _items: T[];
    private _lock: boolean;
    private _adapter: ICuiQueueAdapter<T>;
    private _onError?: CuiQueueErrorCallback<T>;
    private _comparer?: CuiQueueCompareCallback<T>;

    constructor(adapter: ICuiQueueAdapter<T>) {
        this._lock = false;
        this._items = [];
        this._adapter = adapter;
        this._comparer = undefined;
        this._onError = undefined;
    }

    add(item: T): void {
        this._items.push(item);
        if (this._lock) {
            return;
        }

        this._lock = true;
        this.flush().then(() => {
            this._lock = false;
        })
    }

    delete(item: T): T | undefined {
        const index = this._items.findIndex(_item => this.compare(_item, item));
        if (index < 0) {
            return undefined;
        }
        return this._items.splice(index, 1)[0];
    }

    isLocked(): boolean {
        return this._lock;
    }

    setCompareCallback(callback: CuiQueueCompareCallback<T>) {
        this._comparer = callback;
    }

    onError(callback: CuiQueueErrorCallback<T>) {
        this._onError = callback;
    }

    private compare(item1: T, item2: T): boolean {
        if (this._comparer) {
            return this._comparer(item1, item2)
        }
        return Object.is(item1, item2);
    }

    private async flush(): Promise<boolean> {
        const items = this.getItemsForFlush();
        if (items.length === 0) {
            return true;
        }
        try {
            await this._adapter.onFlush(items);
        } catch (e) {
            this.callError(e, items);
        }

        return this.flush();
    }

    private getItemsForFlush(): T[] {
        if (this._adapter.type === 'batch') {
            let result = [...this._items];
            this._items = []
            return result;
        }
        const item = this._items.shift();
        if (item) {
            return [item];
        }
        return [];
    }

    private callError(error: unknown, items?: T[]) {
        if (this._onError) {
            this._onError(error, items)
        }
    }
}