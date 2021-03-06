import { CuiQueueCompareCallback, CuiQueueErrorCallback, ICuiQueue, ICuiQueueAdapter } from "./interfaces";
export declare class CuiQueue<T> implements ICuiQueue<T> {
    private _items;
    private _lock;
    private _adapter;
    private _onError?;
    private _comparer?;
    constructor(adapter: ICuiQueueAdapter<T>);
    add(item: T): void;
    delete(item: T): T | undefined;
    isLocked(): boolean;
    setCompareCallback(callback: CuiQueueCompareCallback<T>): void;
    onError(callback: CuiQueueErrorCallback<T>): void;
    private compare;
    private flush;
    private getItemsForFlush;
    private callError;
}
