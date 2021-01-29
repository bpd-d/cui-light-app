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
var _cache, _maxSize;
import { CuiDictionary } from "../utils/dictionary";
import { is } from "../utils/functions";
export class CuiCacheManager {
    constructor(maxSize) {
        _cache.set(this, void 0);
        _maxSize.set(this, void 0);
        __classPrivateFieldSet(this, _cache, new CuiDictionary());
        __classPrivateFieldSet(this, _maxSize, maxSize !== null && maxSize !== void 0 ? maxSize : 500);
    }
    put(key, element) {
        if (!is(key))
            return;
        if (this.has(key)) {
            __classPrivateFieldGet(this, _cache).update(key, element);
            return;
        }
        this.clean();
        __classPrivateFieldGet(this, _cache).add(key, element);
    }
    get(key) {
        if (!this.has(key))
            return undefined;
        let item = __classPrivateFieldGet(this, _cache).get(key);
        if (item && item.refresh()) {
            return item;
        }
        __classPrivateFieldGet(this, _cache).remove(key);
        return undefined;
    }
    has(key) {
        return is(key) ? __classPrivateFieldGet(this, _cache).containsKey(key) : false;
    }
    remove(key) {
        if (!is(key))
            return false;
        if (this.has(key)) {
            __classPrivateFieldGet(this, _cache).remove(key);
            return true;
        }
        return false;
    }
    clear() {
        __classPrivateFieldGet(this, _cache).clear();
    }
    clean() {
        if (__classPrivateFieldGet(this, _cache).keys().length >= __classPrivateFieldGet(this, _maxSize)) {
            __classPrivateFieldGet(this, _cache).remove(__classPrivateFieldGet(this, _cache).keys()[0]);
        }
    }
}
_cache = new WeakMap(), _maxSize = new WeakMap();
