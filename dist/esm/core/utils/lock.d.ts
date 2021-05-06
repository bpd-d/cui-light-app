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
declare class CuiLock implements ICuiLock {
    private _lock;
    private _throwErrors;
    private _name;
    constructor(options: CuiLockOptions);
    lock(caller?: string): boolean;
    unlock(caller?: string): boolean;
    isLocked(): boolean;
    private throwError;
}
export default function getLock(options?: CuiLockOptions): CuiLock;
export {};
