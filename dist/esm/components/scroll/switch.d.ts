import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiCore } from "../../core/models/core";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { ScrollDirection } from "./interfaces";
export declare class CuiScrollSwitchArgs extends CuiAutoParseArgs {
    mode: ScrollBehavior;
    direction: ScrollDirection;
    loop: boolean;
    switch: string;
    constructor();
}
export declare function CuiScrollSwitchComponent(prefix?: string): ICuiComponent;
export declare class CuiScrollSwitchHandler extends CuiHandlerBase<CuiScrollSwitchArgs> {
    private _busFacade;
    private _root;
    private _scrollPerformers;
    private _helper;
    constructor(element: HTMLElement, attribute: string, core: CuiCore);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private switch;
    private setArgs;
    private emitSwitch;
}
