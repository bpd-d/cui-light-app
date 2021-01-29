import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
declare type CuiResizeComponentMode = "smart" | "simple";
export declare class CuiResizeArgs implements ICuiParsable {
    mode: CuiResizeComponentMode;
    default: string;
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    delay: number;
    constructor();
    parse(args: any): void;
}
export declare class CuiResizeComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiResizeHandler extends CuiHandler<CuiResizeArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    private resize;
    private onIntersection;
    private setNewValue;
    private getValue;
    private getSmartValue;
    private updateElement;
    private isSmartMode;
    private isInViewport;
    private run;
}
export {};
