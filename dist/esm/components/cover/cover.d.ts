import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export interface CuiDialogEvent {
    timestamp: number;
}
export declare class CuiCoverArgs extends CuiAutoParseArgs {
    escClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;
    constructor(prefix: string, defTimeout?: number);
}
export declare function CuiCoverComponent(prefix?: string): import("../../core/models/interfaces").ICuiComponent;
export declare class CuiCoverHandler extends CuiHandlerBase<CuiCoverArgs> {
    private _bodyClass;
    private _busFacade;
    private _openActionPerformer;
    private _closeActionPerformer;
    private _keysPerformer;
    private _freezeHelper;
    private _keyComboParser;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private updateSetup;
    private closeOutside;
    onBeforeOpen(): boolean;
    onAfterOpen(): void;
    onAfterClose(): void;
    private isAnyActive;
}
