import { ICuiComponent, ICuiParsable } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiSpinnerArgs extends CuiAutoParseArgs implements ICuiParsable {
    spinner: string;
    scale: number;
    constructor();
}
export declare function CuiSpinnerComponent(prefix?: string): ICuiComponent;
export declare class CuiSpinnerHandler extends CuiHandlerBase<CuiSpinnerArgs> {
    private _animationPauseClass;
    private _busFacade;
    private _interactionFacade;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private addSpinner;
    private add;
    private removeIfAnyExisists;
    private onPause;
}
