export type CuiQueueAdapterType = 'batch' | 'single';

export interface ICuiQueueAdapter<T> {
    type?: CuiQueueAdapterType;
    onFlush(items: T[]): Promise<boolean>;
}

export interface ICuiQueue<T> {
    add(item: T): void;
    delete(item: T): T | undefined;
    isLocked(): boolean;
    setCompareCallback(callback: CuiQueueCompareCallback<T>): void;
    onError(callback: CuiQueueErrorCallback<T>): void;
}

export interface CuiQueueCompareCallback<T> {
    (item1: T, item2: T): boolean;
}

export interface CuiQueueErrorCallback<T> {
    (e: unknown, items?: T[]): void;
}