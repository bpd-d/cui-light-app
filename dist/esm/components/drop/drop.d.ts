import { ICuiComponent, ICuiComponentHandler, ICuiOpenable, ICuiClosable, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export interface CuiDropEvent {
    timestamp: number;
}
export declare class CuiDropArgs implements ICuiParsable {
    #private;
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
    parse(args: any): void;
}
export declare class CuiDropComponenet implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiDropHandler extends CuiHandler<CuiDropArgs> implements ICuiOpenable, ICuiClosable {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
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
