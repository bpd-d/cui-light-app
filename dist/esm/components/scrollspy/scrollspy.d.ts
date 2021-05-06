import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
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
    mode: "single" | "multi";
    threshold: number;
    constructor();
}
export declare function CuiScrollspyComponent(prefix?: string): ICuiComponent;
export declare class CuiScrollspyHandler extends CuiHandlerBase<CuiScrollSpyArgs> {
    private _links;
    private _actions;
    private _linkActions;
    private _modeHandler;
    private _busFacade;
    private _interactions;
    private _intersectionPerformer;
    private _root;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private onIntersection;
    private updateSetup;
}
