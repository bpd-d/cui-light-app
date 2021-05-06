const SmartResizeSteps = [
    { key: "none", value: (args) => args.default },
    { key: "small", value: (args) => args.small },
    { key: "medium", value: (args) => args.medium },
    { key: "large", value: (args) => args.large },
    { key: "xlarge", value: (args) => args.xlarge },
];
export class SimpleResizeCalculator {
    constructor(replace) {
        this._replace = replace === true;
    }
    get(args, size) {
        let value = args[size];
        return (this._replace && !value) ? args.default : value !== null && value !== void 0 ? value : "";
    }
}
export class SmartResizeCalculator {
    constructor() {
        this._steps = SmartResizeSteps;
    }
    get(args, size) {
        var _a;
        let value = args.default;
        for (let step of this._steps) {
            value = (_a = step.value(args)) !== null && _a !== void 0 ? _a : value;
            if (size === step.key) {
                return value;
            }
        }
        return value;
    }
}
export function getResizeCalculator(mode) {
    if (mode === 'smart') {
        return new SmartResizeCalculator();
    }
    return new SimpleResizeCalculator();
}
