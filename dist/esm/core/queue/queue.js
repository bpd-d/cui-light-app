var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CuiQueue {
    constructor(adapter) {
        this._lock = false;
        this._items = [];
        this._adapter = adapter;
        this._comparer = undefined;
        this._onError = undefined;
    }
    add(item) {
        this._items.push(item);
        if (this._lock) {
            return;
        }
        this._lock = true;
        this.flush().then(() => {
            this._lock = false;
        });
    }
    delete(item) {
        const index = this._items.findIndex(_item => this.compare(_item, item));
        if (index < 0) {
            return undefined;
        }
        return this._items.splice(index, 1)[0];
    }
    isLocked() {
        return this._lock;
    }
    setCompareCallback(callback) {
        this._comparer = callback;
    }
    onError(callback) {
        this._onError = callback;
    }
    compare(item1, item2) {
        if (this._comparer) {
            return this._comparer(item1, item2);
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
                yield this._adapter.onFlush(items);
            }
            catch (e) {
                this.callError(e, items);
            }
            return this.flush();
        });
    }
    getItemsForFlush() {
        if (this._adapter.type === 'batch') {
            let result = [...this._items];
            this._items = [];
            return result;
        }
        const item = this._items.shift();
        if (item) {
            return [item];
        }
        return [];
    }
    callError(error, items) {
        if (this._onError) {
            this._onError(error, items);
        }
    }
}
