import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiBannerArgs extends CuiAutoParseArgs {
    timeout: number;
    closeAct: string;
    swipe: boolean;
    constructor(prefix: string, timeout?: number);
}
export declare function CuiBannerComponent(prefix?: string): ICuiComponent;
export declare class CuiBannerHandler extends CuiHandlerBase<CuiBannerArgs> {
    private _swipeEngine;
    private _swipeAnimation;
    private _movePerformer;
    private _busFacade;
    private _closeActionPerformer;
    private _interactions;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private updateSetup;
    private onMove;
    private onUp;
}
