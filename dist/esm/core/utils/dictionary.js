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
var _keys, _values;
import { ItemNotFoundError, ArgumentError } from "../models/errors";
import { is } from "./functions";
export class CuiDictionary {
    constructor(init) {
        _keys.set(this, void 0);
        _values.set(this, void 0);
        __classPrivateFieldSet(this, _keys, []);
        __classPrivateFieldSet(this, _values, []);
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
        if (this.containsKey(key))
            throw new Error("Key already exists");
        __classPrivateFieldGet(this, _keys).push(key);
        __classPrivateFieldGet(this, _values).push(value);
    }
    remove(key) {
        if (!is(key)) {
            return;
        }
        let index = __classPrivateFieldGet(this, _keys).indexOf(key);
        if (index >= 0) {
            __classPrivateFieldGet(this, _keys).splice(index, 1);
            __classPrivateFieldGet(this, _values).splice(index, 1);
        }
    }
    get(key) {
        this.throwOnEmptyKey(key);
        let index = this.indexOf(key);
        if (index < 0) {
            return undefined;
        }
        return __classPrivateFieldGet(this, _values)[index];
    }
    containsKey(key) {
        return is(key) && this.indexOf(key) >= 0;
    }
    keys() {
        return __classPrivateFieldGet(this, _keys);
    }
    values() {
        return __classPrivateFieldGet(this, _values);
    }
    indexOf(key) {
        return is(key) ? __classPrivateFieldGet(this, _keys).indexOf(key) : -1;
    }
    update(key, value) {
        this.throwOnEmptyKey(key);
        let index = this.indexOf(key);
        if (index < 0) {
            throw new ItemNotFoundError(`Item with key [${key}] not found`);
        }
        __classPrivateFieldGet(this, _values)[index] = value;
    }
    clear() {
        __classPrivateFieldSet(this, _values, []);
        __classPrivateFieldSet(this, _keys, []);
    }
    throwOnEmptyKey(key) {
        if (!is(key)) {
            throw new ArgumentError("Key is empty");
        }
    }
}
_keys = new WeakMap(), _values = new WeakMap();
