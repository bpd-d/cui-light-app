export declare class ErrorBase extends Error {
    constructor(name: string, message?: string);
}
export declare class ItemNotFoundError extends ErrorBase {
    constructor(message?: string);
}
export declare class ArgumentError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiBusError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiInstanceInitError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiScrollSpyOutOfRangeError extends ErrorBase {
    constructor(message?: string);
}
export declare class RegisterElementError extends ErrorBase {
    constructor(message?: string);
}
export declare class AnimatorError extends ErrorBase {
    constructor(message?: string);
}
export declare class CSSVariableError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiColorError extends ErrorBase {
    constructor(message?: string);
}
export declare class CuiPositionError extends ErrorBase {
    constructor(message?: string);
}
