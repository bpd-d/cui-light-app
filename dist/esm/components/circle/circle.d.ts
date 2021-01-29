import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export interface CuiCircleProgressChnaged {
    timestamp: number;
    progress: number;
}
export declare class CuiCircleArgs implements ICuiParsable {
    progress: number;
    constructor();
    parse(val: any): void;
}
export declare class CuiCircleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiCircleHandler extends CuiHandler<CuiCircleArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onSetProgress(val: any): void;
    private updateStyle;
    private readStyle;
}
