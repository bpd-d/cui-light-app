export interface ICuiOffsetMode {
    matches(top: number, left: number, offsetX: number, offsetY: number): boolean;
}
export declare class CuiOffsetStaticMode implements ICuiOffsetMode {
    matches(top: number, left: number, offsetX: number, offsetY: number): boolean;
}
/**
 * Dynamically calculates whether to trigger or untrigger an action.
 * If current value exceedes offset and threshold action is triggered.
 * If action was triggered and current move is lower than threshold action is untriggered
 *
 * Example: If offsetY is 100, then first after 100 action is set on. It is kept when scrolling down.
 * If user decides to scroll up and difference between turning point and current is bigger than threshold then action is set off.
 *
 * Example usage is with navbar - it shall disappear after offset and return back when user scrolls up.
 */
export declare class CuiOffsetDynamicMode implements ICuiOffsetMode {
    #private;
    constructor();
    matches(top: number, left: number, offsetX: number, offsetY: number): boolean;
    private fitsOffsetX;
    private fitsOffsetY;
}
export declare class CuiOffsetModeFactory {
    static get(mode: string): CuiOffsetStaticMode | CuiOffsetDynamicMode;
}
