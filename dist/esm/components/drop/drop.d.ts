import { ICuiComponent, ICuiComponentHandler, ICuiOpenable, ICuiClosable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
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
export declare class CuiDropComponenet implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiDropHandler extends CuiHandlerBase<CuiDropArgs> implements ICuiOpenable, ICuiClosable {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    /**
    * Api Method open
    */
    open(): Promise<boolean>;
    /**
     * Api Method close
     */
    close(): Promise<boolean>;
    onClose(): void;
    onOpen(): void;
    /**
     * Event invoked when window is clicked
     * @param ev
     */
    private onWindowClick;
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
     * Sets event on trigger button
     */
    private setTriggerEvent;
    /**
     * Runs auto-close task on opened element
     */
    private runAutoCloseTask;
    private toggleActions;
    private acquireTrigger;
}
