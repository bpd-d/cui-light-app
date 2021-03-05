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
var _keys, _values, _lock;
import { ItemNotFoundError, ArgumentError } from "../models/errors";
import { is } from "./functions";
export class CuiDictionary {
    constructor(init) {
        _keys.set(this, void 0);
        _values.set(this, void 0);
        _lock.set(this, void 0);
        __classPrivateFieldSet(this, _keys, []);
        __classPrivateFieldSet(this, _values, []);
        __classPrivateFieldSet(this, _lock, false);
        if (init) {
            init.forEach(x => {
                if (!is(x.key)) {
                    __classPrivateFieldSet(this, _keys, []);
                    __classPrivateFieldSet(this, _values, []);
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
            __classPrivateFieldGet(this, _keys).push(key);
            __classPrivateFieldGet(this, _values).push(value);
        });
    }
    remove(key) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = __classPrivateFieldGet(this, _keys).indexOf(key);
            if (index < 0) {
                return;
            }
            __classPrivateFieldGet(this, _keys).splice(index, 1);
            __classPrivateFieldGet(this, _values).splice(index, 1);
        });
    }
    get(key) {
        this.throwOnEmptyKey(key);
        let value = undefined;
        this.lock(() => {
            let index = this.indexOf(key);
            if (index >= 0) {
                value = __classPrivateFieldGet(this, _values)[index];
            }
        });
        return value;
    }
    containsKey(key) {
        return is(key) && this.indexOf(key) >= 0;
    }
    keys() {
        return [...__classPrivateFieldGet(this, _keys)];
    }
    values() {
        return [...__classPrivateFieldGet(this, _values)];
    }
    indexOf(key) {
        return is(key) ? __classPrivateFieldGet(this, _keys).indexOf(key) : -1;
    }
    update(key, value) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = this.indexOf(key);
            if (index < 0) {
                throw new ItemNotFoundError(`Item with key [${key}] not found`);
            }
            __classPrivateFieldGet(this, _values)[index] = value;
        });
    }
    clear() {
        this.lock(() => {
            __classPrivateFieldSet(this, _values, []);
            __classPrivateFieldSet(this, _keys, []);
        });
    }
    forEach(callback) {
        this.lock(() => {
            let len = __classPrivateFieldGet(this, _keys).length;
            for (let index = 0; index < len; index++) {
                callback(__classPrivateFieldGet(this, _keys)[index], __classPrivateFieldGet(this, _values)[index]);
            }
        });
    }
    checkLock() {
        if (__classPrivateFieldGet(this, _lock)) {
            throw new Error("You cannot alter dictionary when is locked!");
        }
    }
    lock(callback) {
        this.checkLock();
        __classPrivateFieldSet(this, _lock, true);
        try {
            callback();
        }
        catch (e) {
            throw e;
        }
        finally {
            __classPrivateFieldSet(this, _lock, false);
        }
    }
    throwOnEmptyKey(key) {
        if (!is(key)) {
            throw new ArgumentError("Key is empty");
        }
    }
}
_keys = new WeakMap(), _values = new WeakMap(), _lock = new WeakMap();
