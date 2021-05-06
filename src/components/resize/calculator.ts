import { ICuiPair } from "src/core/models/interfaces";
import { CuiWindowSize } from "src/core/utils/types";
import { CuiSizeArgs } from "./resize";

interface ResizeStepCallback<T extends CuiSizeArgs> {
    (args: T): string | undefined;
}

const SmartResizeSteps: ICuiPair<string, ResizeStepCallback<CuiSizeArgs>>[] = [
    { key: "none", value: (args) => args.default },
    { key: "small", value: (args) => args.small },
    { key: "medium", value: (args) => args.medium },
    { key: "large", value: (args) => args.large },
    { key: "xlarge", value: (args) => args.xlarge },
]

export interface ICuiResizeCalculator<T extends CuiSizeArgs> {
    get(args: T, size: CuiWindowSize): string | undefined;
}

export class SimpleResizeCalculator<T extends CuiSizeArgs> implements ICuiResizeCalculator<T> {
    private _replace: boolean;
    constructor(replace?: boolean) {
        this._replace = replace === true;
    }
    get(args: T, size: CuiWindowSize): string {
        let value: string | undefined = (<any>args)[size];
        return (this._replace && !value) ? args.default : value ?? "";
    }
}

export class SmartResizeCalculator<T extends CuiSizeArgs> implements ICuiResizeCalculator<T> {
    private _steps: ICuiPair<string, any>[];
    constructor() {
        this._steps = SmartResizeSteps;
    }
    get(args: T, size: CuiWindowSize): string {
        let value = args.default;
        for (let step of this._steps) {
            value = step.value(args) ?? value;
            if (size === step.key) {
                return value
            }
        }
        return value;
    }
}

export function getResizeCalculator<T extends CuiSizeArgs>(mode: string) {
    if (mode === 'smart') {
        return new SmartResizeCalculator<T>();
    }
    return new SimpleResizeCalculator<T>();
}