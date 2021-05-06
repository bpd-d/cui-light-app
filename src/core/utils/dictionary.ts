import { ICuiDictionary, ICuiDictionaryItem } from "../models/interfaces";
import { ItemNotFoundError, ArgumentError } from "../models/errors";
import { is } from "./functions";

export class CuiDictionary<T> implements ICuiDictionary<T> {

    private _keys: string[];
    private _values: T[];
    private _lock: boolean;

    constructor(init?: ICuiDictionaryItem<T>[]) {
        this._keys = []
        this._values = []
        this._lock = false;

        if (init) {
            init.forEach(x => {
                if (!is(x.key)) {
                    this._keys = []
                    this._values = []
                    throw new ArgumentError("Key is empty");
                }
                this.add(x.key, x.value)
            })
        }
    }

    add(key: string, value: T): void {
        this.throwOnEmptyKey(key)
        this.lock(() => {
            if (this.containsKey(key))
                throw new Error("Key already exists");
            this._keys.push(key)
            this._values.push(value)
        })
    }

    remove(key: string): void {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = this._keys.indexOf(key);
            if (index < 0) {
                return;
            }
            this._keys.splice(index, 1)
            this._values.splice(index, 1)
        })
    }

    get(key: string): T | undefined {
        this.throwOnEmptyKey(key)
        let value = undefined
        this.lock(() => {
            let index = this.indexOf(key)
            if (index >= 0) {
                value = this._values[index];
            }
        })
        return value;
    }

    containsKey(key: string): boolean {
        return is(key) && this.indexOf(key) >= 0
    }

    keys(): string[] {
        return [...this._keys];
    }
    values(): T[] {
        return [...this._values];
    }

    indexOf(key: string): number {
        return is(key) ? this._keys.indexOf(key) : -1;
    }

    update(key: string, value: T): void {
        this.throwOnEmptyKey(key)
        this.lock(() => {
            let index = this.indexOf(key)
            if (index < 0) {
                throw new ItemNotFoundError(`Item with key [${key}] not found`)
            }
            this._values[index] = value
        })

    }

    clear() {
        this.lock(() => {
            this._values = [];
            this._keys = [];
        });

    }

    forEach(callback: (key: string, value: T) => void) {
        this.lock(() => {
            let len = this._keys.length;
            for (let index = 0; index < len; index++) {
                callback(this._keys[index], this._values[index]);
            }
        });
    }

    private checkLock(): void {
        if (this._lock) {
            throw new Error("You cannot alter dictionary when is locked!");
        }
    }

    private lock(callback: () => void) {
        this.checkLock();
        this._lock = true;
        try {
            callback();
        } catch (e) {
            throw e;
        } finally {
            this._lock = false;
        }
    }

    private throwOnEmptyKey(key: string) {
        if (!is(key)) {
            throw new ArgumentError("Key is empty");
        }
    }
}