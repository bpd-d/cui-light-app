export class ErrorBase extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
export class ItemNotFoundError extends ErrorBase {
    constructor(message) {
        super("ItemNotFoundError", message);
    }
}
export class ArgumentError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}
export class CuiBusError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}
export class CuiInstanceInitError extends ErrorBase {
    constructor(message) {
        super("CuiInstanceInitError", message);
    }
}
export class CuiScrollSpyOutOfRangeError extends ErrorBase {
    constructor(message) {
        super("CuiScrollSpyOutOfRangeError", message);
    }
}
export class RegisterElementError extends ErrorBase {
    constructor(message) {
        super("RegisterElementError", message);
    }
}
export class AnimatorError extends ErrorBase {
    constructor(message) {
        super("AnimatorError", message);
    }
}
export class CSSVariableError extends ErrorBase {
    constructor(message) {
        super("CSSVariableError", message);
    }
}
export class CuiColorError extends ErrorBase {
    constructor(message) {
        super("CuiColorError", message);
    }
}
export class CuiPositionError extends ErrorBase {
    constructor(message) {
        super("CuiPositionError", message);
    }
}
