import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiCore } from "../../core/models/core";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiOffCanvasArgs extends CuiAutoParseArgs {
    #private;
    escClose: boolean;
    outClose: boolean;
    openAct: string;
    closeAct: string;
    keyClose: string;
    position: 'left' | 'right';
    timeout: number;
    constructor(prefix: string, timeout?: number);
    getDefaultOpenClass(): string;
    getDefaultCloseClass(): string;
}
export declare function CuiOffCanvasComponent(prefix?: string): import("../../core/models/interfaces").ICuiComponent;
export declare class CuiOffCanvasHandler extends CuiHandlerBase<CuiOffCanvasArgs> {
    private _prefix;
    private _bodyClass;
    private _interactions;
    private _busFacade;
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
    isAnyActive(): boolean;
    setPositionLeft(): void;
}
