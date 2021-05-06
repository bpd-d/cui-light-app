import { CuiWindowSize } from "src/core/utils/types";
import { CuiSizeArgs } from "./resize";
export interface ICuiResizeCalculator<T extends CuiSizeArgs> {
    get(args: T, size: CuiWindowSize): string | undefined;
}
export declare class SimpleResizeCalculator<T extends CuiSizeArgs> implements ICuiResizeCalculator<T> {
    private _replace;
    constructor(replace?: boolean);
    get(args: T, size: CuiWindowSize): string;
}
export declare class SmartResizeCalculator<T extends CuiSizeArgs> implements ICuiResizeCalculator<T> {
    private _steps;
    constructor();
    get(args: T, size: CuiWindowSize): string;
}
export declare function getResizeCalculator<T extends CuiSizeArgs>(mode: string): SmartResizeCalculator<T> | SimpleResizeCalculator<T>;
