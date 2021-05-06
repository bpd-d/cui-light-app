export interface ICuiLock {
    lock(caller?: string): boolean;
    unlock(caller?: string): boolean;
    isLocked(): boolean;
}

export interface CuiLockOptions {
    throwErrors?: boolean;
    initial?: boolean;
    name?: string;
}

class CuiLock implements ICuiLock {
    private _lock: boolean;
    private _throwErrors: boolean;
    private _name: string;
    constructor(options: CuiLockOptions) {
        this._lock = options.initial === true;
        this._throwErrors = options.throwErrors === true;
        this._name = options.name ?? "-";
    }

    lock(caller?: string): boolean {
        if (this.isLocked()) {
            this.throwError("lock", caller)
            return false;
        }
        this._lock = true;
        return true;
    }
    unlock(caller?: string): boolean {
        if (!this.isLocked()) {
            this.throwError("unlock", caller)
            return false;
        }
        this._lock = false;
        return true;
    }
    isLocked(): boolean {
        return this._lock === true;
    }

    private throwError(fn: string, caller?: string) {
        if (!this._throwErrors) {
            return;
        }
        throw new Error(`[${this._name}] Component ${caller} error on: ${fn}`)
    }
}

export default function getLock(options?: CuiLockOptions) {
    return new CuiLock(options ?? {});
}