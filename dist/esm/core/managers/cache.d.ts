import { CuiCachable, ICuiManager } from "../models/interfaces";
export declare class CuiCacheManager implements ICuiManager<CuiCachable> {
    #private;
    constructor(maxSize?: number);
    put(key: string, element: CuiCachable): void;
    get(key: string): CuiCachable | undefined;
    has(key: string): boolean;
    remove(key: string): boolean;
    clear(): void;
    private clean;
}
