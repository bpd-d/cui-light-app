import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
/**
 * Toggles an action after specified offset is reached in relation to the element or document
 *
 * target?: string - target which action shall be triggered on
 * action?: string - action to trigger
 * offsetY?: number - vertical offset
 * offsetX?: number - horizontal offset
 * root?: boolean - set true if scroll listener shall be set on document element
 * mode?: string - static/dynamic
 */
export interface CuiOffsetEvent {
    matches: boolean;
    offsetX: number;
    offsetY: number;
    ratioY: number;
    ratioX: number;
    scrolling: boolean;
    timestamp: number;
}
export interface CuiOffsetAttribute {
    target?: string;
    action?: string;
    offsetY?: number;
    offsetX?: number;
    root?: boolean;
}
export declare class CuiOffsetArgs {
    target: string;
    action: string;
    offsetY: number;
    offsetX: number;
    root: boolean;
    mode: "static" | "dynamic";
    constructor();
    parse(args: any): void;
}
export declare class CuiOffsetComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiOffsetHandler extends CuiHandler<CuiOffsetArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    private onScroll;
    private parseAttribute;
    private checkAndPerformActions;
    private act;
    private callEvent;
    private getRoot;
    private exceededThreshold;
    private calcaRatio;
    private getTarget;
}
