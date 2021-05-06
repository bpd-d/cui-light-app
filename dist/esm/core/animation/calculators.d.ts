import { ICuiTimingFunction } from "./interfaces";
/**
 * Forward: y = x
 * Backward: y = -x + 1
 */
export declare function getLinearTimingFunction(): ICuiTimingFunction;
/**
 *
 * @returns
 */
export declare function getSquareCalculator(): ICuiTimingFunction;
/**
 *
 * y = 2x - x^2
 */
export declare function getEaseTimingFunction(): ICuiTimingFunction;
