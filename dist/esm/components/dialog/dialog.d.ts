import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export interface CuiDialogEvent {
    timestamp: number;
}
export declare class CuiDialogArgs extends CuiAutoParseArgs {
    escClose: boolean;
    outClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;
    constructor(prefix: string, defTimeout?: number);
}
export declare function CuiDialogComponent(prefix?: string): ICuiComponent;
export declare class CuiDialogHandler extends CuiHandlerBase<CuiDialogArgs> {
    private _bodyClass;
    private _busFacade;
    private _interactions;
    private _openActionPerformer;
    private _closeActionPerformer;
    private _keysPerformer;
    private _freezeHelper;
    private _keyComboParser;
    private _windowClickPerformer;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private updateSetup;
    private closeOutside;
    onBeforeOpen(): boolean;
    onAfterOpen(): void;
    onAfterClose(): void;
    onBeforeClose(): boolean;
    private isAnyActive;
}
