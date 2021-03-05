import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
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
export declare class CuiScrollSpyArgs extends CuiAutoParseArgs {
    selector: string;
    action: string;
    link: string;
    linkAction: string;
    ratio: number;
    isRoot: boolean;
    mode: "single" | "multi";
    threshold: number;
    constructor();
}
export declare class CuiScrollspyComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiScrollspyHandler extends CuiHandlerBase<CuiScrollSpyArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private onIntersection;
    private init;
    private update;
}
