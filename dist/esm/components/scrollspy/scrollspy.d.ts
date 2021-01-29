import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export interface CuiScrollspyScrollEvent {
    top: number;
    left: number;
    scrolling: boolean;
    initial: boolean;
    source: string;
    timestamp: number;
}
export interface CuiScrollspyTargetChangeEvent {
    intersecting: HTMLElement[];
    timestamp: number;
}
export interface CuiScrollSpyAttribute {
    selector?: string;
    action?: string;
    link?: string;
    linkAction?: string;
    ratio: number;
    threshold: number;
}
export declare class CuiScrollSpyArgs {
    selector: string;
    action: string;
    link: string;
    linkAction: string;
    ratio: number;
    isRoot: boolean;
    mode: "single" | "multi";
    threshold: number;
    constructor();
    parse(args: any): void;
}
export declare class CuiScrollspyComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiScrollspyHandler extends CuiHandler<CuiScrollSpyArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    private onIntersection;
    private parseAttribute;
    private updateAttributes;
}
