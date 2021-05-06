import { ItemNotFoundError, ArgumentError } from "../models/errors";
import { is } from "./functions";
export class CuiDictionary {
    constructor(init) {
        this._keys = [];
        this._values = [];
        this._lock = false;
        if (init) {
            init.forEach(x => {
                if (!is(x.key)) {
                    this._keys = [];
                    this._values = [];
                    throw new ArgumentError("Key is empty");
                }
                this.add(x.key, x.value);
            });
        }
    }
    add(key, value) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            if (this.containsKey(key))
                throw new Error("Key already exists");
            this._keys.push(key);
            this._values.push(value);
        });
    }
    remove(key) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = this._keys.indexOf(key);
            if (index < 0) {
                return;
            }
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
        });
    }
    get(key) {
        this.throwOnEmptyKey(key);
        let value = undefined;
        this.lock(() => {
            let index = this.indexOf(key);
            if (index >= 0) {
                value = this._values[index];
            }
        });
        return value;
    }
    containsKey(key) {
        return is(key) && this.indexOf(key) >= 0;
    }
    keys() {
        return [...this._keys];
    }
    values() {
        return [...this._values];
    }
    indexOf(key) {
        return is(key) ? this._keys.indexOf(key) : -1;
    }
    update(key, value) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = this.indexOf(key);
            if (index < 0) {
                throw new ItemNotFoundError(`Item with key [${key}] not found`);
            }
            this._values[index] = value;
        });
    }
    clear() {
        this.lock(() => {
            this._values = [];
            this._keys = [];
        });
    }
    forEach(callback) {
        this.lock(() => {
            let len = this._keys.length;
            for (let index = 0; index < len; index++) {
                callback(this._keys[index], this._values[index]);
            }
        });
    }
    checkLock() {
        if (this._lock) {
            throw new Error("You cannot alter dictionary when is locked!");
        }
    }
    lock(callback) {
        this.checkLock();
        this._lock = true;
        try {
            callback();
        }
        catch (e) {
            throw e;
        }
        finally {
            this._lock = false;
        }
    }
    throwOnEmptyKey(key) {
        if (!is(key)) {
            throw new ArgumentError("Key is empty");
        }
    }
}
