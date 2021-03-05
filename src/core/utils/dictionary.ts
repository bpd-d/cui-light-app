import { ICuiDictionary, ICuiDictionaryItem } from "../models/interfaces";
import { ItemNotFoundError, ArgumentError } from "../models/errors";
import { is } from "./functions";

export class CuiDictionary<T> implements ICuiDictionary<T> {

    #keys: string[];
    #values: T[];
    #lock: boolean;

    constructor(init?: ICuiDictionaryItem<T>[]) {
        this.#keys = []
        this.#values = []
        this.#lock = false;

        if (init) {
            init.forEach(x => {
                if (!is(x.key)) {
                    this.#keys = []
                    this.#values = []
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
            this.#keys.push(key)
            this.#values.push(value)
        })
    }

    remove(key: string): void {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = this.#keys.indexOf(key);
            if (index < 0) {
                return;
            }
            this.#keys.splice(index, 1)
            this.#values.splice(index, 1)
        })
    }

    get(key: string): T | undefined {
        this.throwOnEmptyKey(key)
        let value = undefined
        this.lock(() => {
            let index = this.indexOf(key)
            if (index >= 0) {
                value = this.#values[index];
            }
        })
        return value;
    }

    containsKey(key: string): boolean {
        return is(key) && this.indexOf(key) >= 0
    }

    keys(): string[] {
        return [...this.#keys];
    }
    values(): T[] {
        return [...this.#values];
    }

    indexOf(key: string): number {
        return is(key) ? this.#keys.indexOf(key) : -1;
    }

    update(key: string, value: T): void {
        this.throwOnEmptyKey(key)
        this.lock(() => {
            let index = this.indexOf(key)
            if (index < 0) {
                throw new ItemNotFoundError(`Item with key [${key}] not found`)
            }
            this.#values[index] = value
        })

    }

    clear() {
        this.lock(() => {
            this.#values = [];
            this.#keys = [];
        });

    }

    forEach(callback: (key: string, value: T) => void) {
        this.lock(() => {
            let len = this.#keys.length;
            for (let index = 0; index < len; index++) {
                callback(this.#keys[index], this.#values[index]);
            }
        });
    }

    private checkLock(): void {
        if (this.#lock) {
            throw new Error("You cannot alter dictionary when is locked!");
        }
    }

    private lock(callback: () => void) {
        this.checkLock();
        this.#lock = true;
        try {
            callback();
        } catch (e) {
            throw e;
        } finally {
            this.#lock = false;
        }
    }

    private throwOnEmptyKey(key: string) {
        if (!is(key)) {
            throw new ArgumentError("Key is empty");
        }
    }
}