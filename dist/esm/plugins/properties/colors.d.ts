import { CuiColor } from "../../core/models/colors";
import { PropertySetter } from "./setter";
export interface BaseColors {
    background: CuiColor;
    base: CuiColor;
    active: CuiColor;
    muted: CuiColor;
}
interface ThemeColors {
    base: CuiColor;
    muted: CuiColor;
    active: CuiColor;
    shade: CuiColor;
    shadeDark: CuiColor;
}
export declare class CuiBaseColorsSetter {
    #private;
    constructor(colorSet: string, setter: PropertySetter);
    setBackgroundColor(color: CuiColor): void;
    setBaseColor(color: CuiColor): void;
    setActiveColor(color: CuiColor): void;
    setMutedColor(color: CuiColor): void;
    setBaseColors(colors: BaseColors): void;
    private setColor;
}
export declare class CuiThemeColorsSetter {
    #private;
    constructor(set: string, setter: PropertySetter);
    setBaseColor(color: CuiColor): void;
    setMutedColor(color: CuiColor): void;
    setActiveColor(color: CuiColor): void;
    setShadeColor(color: CuiColor): void;
    setShadeDarkColor(color: CuiColor): void;
    setColors(colors: ThemeColors): void;
    setAutoColors(base: CuiColor): void;
    private setColor;
}
export {};
