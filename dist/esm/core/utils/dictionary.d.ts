import { ICuiDictionary, ICuiDictionaryItem } from "../models/interfaces";
export declare class CuiDictionary<T> implements ICuiDictionary<T> {
    private _keys;
    private _values;
    private _lock;
    constructor(init?: ICuiDictionaryItem<T>[]);
    add(key: string, value: T): void;
    remove(key: string): void;
    get(key: string): T | undefined;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
    indexOf(key: string): number;
    update(key: string, value: T): void;
    clear(): void;
    forEach(callback: (key: string, value: T) => void): void;
    private checkLock;
    private lock;
    private throwOnEmptyKey;
}
