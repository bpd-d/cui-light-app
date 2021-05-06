import { ICuiComponent, ICuiKeysCombo } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiFloatActionCalculator, ICuiFloatSwipingAction } from "./helpers";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { ICuiMoveExtensionPerformer } from "../extensions/move/performer";
import { ICuiEventBusFacade, ICuiInteractionsFacade, ICuiStyleHelper } from "../../core/handlers/extensions/facades";
import { ICuiActionExtensionPerformer } from "../extensions/performers";
import { ICuiKeyActionPerformer } from "../extensions/keys/performer";
import { ICuiParser } from "../../core/utils/parsers/interfaces";
export declare class CuiFloatArgs extends CuiAutoParseArgs {
    escClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;
    constructor(prefix: string, defTimeout?: number);
}
export declare function CuiFloatComponent(prefix?: string): ICuiComponent;
export declare class CuiFloatHandler extends CuiHandlerBase<CuiFloatArgs> {
    _prevX: number;
    _prevY: number;
    _prefix: string;
    _positionCalculator: ICuiFloatActionCalculator;
    _resizeCalculator: ICuiFloatActionCalculator;
    _resizeBtn: HTMLElement | null;
    _moveBtn: HTMLElement | null;
    _movePerformer: ICuiMoveExtensionPerformer;
    _busFacade: ICuiEventBusFacade;
    _openActionPerformer: ICuiActionExtensionPerformer<any>;
    _closeActionPerformer: ICuiActionExtensionPerformer<any>;
    _keysPerformer: ICuiKeyActionPerformer;
    _currentAction: ICuiFloatSwipingAction | undefined;
    _interactions: ICuiInteractionsFacade;
    _styles: ICuiStyleHelper;
    _keyComboParser: ICuiParser<string, ICuiKeysCombo>;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    updateSetups(): void;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onCloseAction;
}
