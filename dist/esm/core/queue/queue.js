var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _items, _lock, _adapter, _onError, _comparer;
export class CuiQueue {
    constructor(adapter) {
        _items.set(this, void 0);
        _lock.set(this, void 0);
        _adapter.set(this, void 0);
        _onError.set(this, void 0);
        _comparer.set(this, void 0);
        __classPrivateFieldSet(this, _lock, false);
        __classPrivateFieldSet(this, _items, []);
        __classPrivateFieldSet(this, _adapter, adapter);
        __classPrivateFieldSet(this, _comparer, undefined);
        __classPrivateFieldSet(this, _onError, undefined);
    }
    add(item) {
        __classPrivateFieldGet(this, _items).push(item);
        if (__classPrivateFieldGet(this, _lock)) {
            return;
        }
        __classPrivateFieldSet(this, _lock, true);
        this.flush().then(() => {
            __classPrivateFieldSet(this, _lock, false);
        });
    }
    delete(item) {
        const index = __classPrivateFieldGet(this, _items).findIndex(_item => this.compare(_item, item));
        if (index < 0) {
            return undefined;
        }
        return __classPrivateFieldGet(this, _items).splice(index, 1)[0];
    }
    isLocked() {
        return __classPrivateFieldGet(this, _lock);
    }
    setCompareCallback(callback) {
        __classPrivateFieldSet(this, _comparer, callback);
    }
    onError(callback) {
        __classPrivateFieldSet(this, _onError, callback);
    }
    compare(item1, item2) {
        if (__classPrivateFieldGet(this, _comparer)) {
            return __classPrivateFieldGet(this, _comparer).call(this, item1, item2);
        }
        return Object.is(item1, item2);
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.getItemsForFlush();
            if (items.length === 0) {
                return true;
            }
            try {
                yield __classPrivateFieldGet(this, _adapter).onFlush(items);
            }
            catch (e) {
                this.callError(e, items);
            }
            return this.flush();
        });
    }
    getItemsForFlush() {
        if (__classPrivateFieldGet(this, _adapter).type === 'batch') {
            let result = [...__classPrivateFieldGet(this, _items)];
            __classPrivateFieldSet(this, _items, []);
            return result;
        }
        const item = __classPrivateFieldGet(this, _items).shift();
        if (item) {
            return [item];
        }
        return [];
    }
    callError(error, items) {
        if (__classPrivateFieldGet(this, _onError)) {
            __classPrivateFieldGet(this, _onError).call(this, error, items);
        }
    }
}
_items = new WeakMap(), _lock = new WeakMap(), _adapter = new WeakMap(), _onError = new WeakMap(), _comparer = new WeakMap();
