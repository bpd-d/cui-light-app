import { ICuiComponent, ICuiOpenable, ICuiClosable } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export interface CuiDropEvent {
    timestamp: number;
}
export declare class CuiDropArgs extends CuiAutoParseArgs {
    mode: "click" | "hover";
    trigger: string;
    prevent: boolean;
    autoClose: boolean;
    outClose: boolean;
    pos: string;
    action: string;
    timeout: number;
    margin: number;
    constructor(prefix: string);
}
export declare function CuiDropComponent(prefix?: string): ICuiComponent;
export declare class CuiDropHandler extends CuiHandlerBase<CuiDropArgs> implements ICuiOpenable, ICuiClosable {
    private _prefix;
    private _bodyClass;
    private _triggerHoverListener;
    private _trigger;
    private _windowClickEventId;
    private _positionCalculator;
    private _posClass;
    private _autoTask;
    private _actions;
    private _busFacade;
    private _interactions;
    private _windowClickPerformer;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private setDataFromArgs;
    /**
    * Api Method open
    */
    open(): Promise<boolean>;
    /**
     * Api Method close
     */
    close(): Promise<boolean>;
    /**
     * Set of actions performed during drop open
     */
    onOpen(): void;
    /**
        * Set of actions performed during drop close
        */
    onClose(): void;
    private isAnyActive;
    /**
     * Finds and opens other active drop element
     */
    findAndCloseOpenedDrop(): Promise<boolean>;
    /**
     * Invoked when trigger button is clicked
     * @param ev
     */
    private onTriggerClick;
    /**
    * Invoked when trigger button is hovered on
    * @param ev
    */
    private onHoverEvent;
    /**
     * Method triggered when opened element is hovered on
     * @param ev
     */
    private onElementHover;
    /**
     * Runs auto-close task on opened element
     */
    private runAutoCloseTask;
    private toggleActions;
    private acquireTrigger;
}
