import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
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
export declare class CuiOffsetArgs extends CuiAutoParseArgs {
    target: string;
    action: string;
    offsetY: number;
    offsetX: number;
    mode: "static" | "dynamic";
    constructor();
}
export declare function CuiOffsetComponent(prefix?: string): ICuiComponent;
export declare class CuiOffsetHandler extends CuiHandlerBase<CuiOffsetArgs> {
    private _targets;
    private _matched;
    private _actions;
    private _root;
    private _modeHandler;
    private _busFacade;
    private _interactions;
    private _performer;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private parseAttribute;
    private checkAndPerformActions;
    private act;
    private actForTargets;
    private callEvent;
    private calcaRatio;
    private getTargets;
}
