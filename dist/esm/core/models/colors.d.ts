export declare class CuiColor {
    #private;
    constructor(red: number, green: number, blue: number, alpha?: number);
    static create(colorStr: string): CuiColor;
    set(red: number, green: number, blue: number, alpha?: number): void;
    setRed(red: number): void;
    setGreen(green: number): void;
    setBlue(blue: number): void;
    opacity(val: number): CuiColor;
    lighten(amount: number): CuiColor;
    darken(amount: number): CuiColor;
    invert(): CuiColor;
    getColorValue(type: string): number;
    toCssString(): string;
    private shade;
    private shadeSingle;
    clone(): CuiColor;
}
export interface CuiColorSet {
    base: CuiColor;
    muted?: CuiColor;
    active?: CuiColor;
}
export interface CuiColorTheme {
    base: string;
    muted: string;
    active: string;
}
export interface CuiColorPair {
    light: string;
    dark: string;
}
interface ColorParser {
    trim(): void;
    isValid(): boolean;
    parse(): CuiColor | undefined;
}
export declare class HexColorParser implements ColorParser {
    #private;
    constructor(colorStr: string);
    trim(): void;
    isValid(): boolean;
    parse(): CuiColor | undefined;
}
export declare class RgbColorParser implements ColorParser {
    #private;
    constructor(colorStr: string);
    trim(): void;
    isValid(): boolean;
    parse(): CuiColor | undefined;
}
export {};
