import { IUIInteractionProvider, CuiContext, ICuiComponentHandler, ICuiParsable, ICuiOpenable, ICuiClosable, CuiHTMLElement } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
import { CuiActionsHelper } from "../helpers/helpers";
import { ICuiComponentAction } from "../utils/actions";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { EventBase } from "../models/events";
import { ICuiHandlerModule } from "./modules/interfaces";
export interface CuiChildMutation {
    removed: Node[];
    added: Node[];
    changed: Node[];
}
export declare class ComponentHelper {
    #private;
    constructor(interactions: IUIInteractionProvider);
    hasClass(cls: string, element: Element): boolean;
    setClass(cls: string, element: Element): void;
    setClasses(classes: string[], element?: Element): void;
    setClassesAs(element: Element, ...classes: string[]): void;
    removeClass(cls: string, element: Element): void;
    removeClasses(classes: string[], element?: Element): void;
    removeClassesAs(element: Element, ...classes: string[]): void;
    removeAttribute(attributeName: string, element: Element): void;
    setStyle(element: any, property: string, value: string): void;
}
export declare class CuiComponentBase implements CuiContext {
    #private;
    _log: ICuiDevelopmentTool;
    utils: CuiUtils;
    element: HTMLElement;
    cuid: string;
    isLocked: boolean;
    activeClassName: string;
    helper: ComponentHelper;
    componentName: string;
    constructor(componentName: string, element: HTMLElement, utils: CuiUtils);
    mutate(callback: any, ...args: any[]): void;
    fetch(callback: any, ...args: any[]): void;
    getEventName(name: string): string;
    /**
     * Emits event using passed data and cuid of the element
     * NOTE: Don't use it to emit global events
     * @param event Event name
     * @param data Data to emit
     */
    emitEvent<T extends EventBase>(event: string, data: T, source?: CuiHTMLElement): void;
    onEvent<T>(event: string, callback: (t: T) => void): string | null;
    detachEvent(event: string, id: string | null): void;
    getId(): string;
    checkLockAndWarn(fName?: string): boolean;
    /**
     * Helper which checks whether element has an active flag set
     */
    isActive(): boolean;
    detachEmiitedEvents(): void;
    registerInDebug(): void;
    removeFromDebug(): void;
    setDebugProperty<T>(name: string, value: T): void;
    logInfo(message: string, functionName?: string): void;
    logWarning(message: string, functionName?: string): void;
    logError(message: string, functionName?: string, error?: Error): void;
}
export declare abstract class CuiHandlerBase<T extends ICuiParsable> extends CuiComponentBase implements ICuiComponentHandler {
    #private;
    args: T;
    prevArgs: T | undefined;
    isInitialized: boolean;
    actionsHelper: CuiActionsHelper;
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiUtils);
    handle(args: any): Promise<boolean>;
    refresh(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    /**
    * Helper created for elements that animate - perfroms an action *add*, after timeout it performs *remove*.
    *
    * @param action - action to perfrom
    * @param timeout - timeout specified for action removal
    * @param onFinish - callback to be performed after action is finished after removal
    * @param callback - optional - callback to be executed in mutation on action removal, e.g. additional DOM changes on element
    */
    performAction(actions: ICuiComponentAction[], timeout: number, onFinish: () => void, callback?: () => void): Promise<boolean>;
    addModule(module: ICuiHandlerModule<T>): void;
    private checkLock;
    private performLifecycleOp;
    abstract onHandle(): Promise<boolean>;
    abstract onRefresh(): Promise<boolean>;
    abstract onRemove(): Promise<boolean>;
}
export interface CuiInteractableArgs {
    timeout: number;
    openAct: string;
    closeAct: string;
    escClose: boolean;
    keyClose: string;
}
export declare abstract class CuiInteractableHandler<T extends ICuiParsable & CuiInteractableArgs> extends CuiHandlerBase<T> implements ICuiOpenable, ICuiClosable {
    #private;
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiUtils);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    open(args?: any): Promise<boolean>;
    close(args?: any): Promise<boolean>;
    /**
     * Helper created for elements that animate - perfroms an action *add*, after timeout it performs *remove*.
     *
     * @param action - action to perfrom
     * @param timeout - timeout specified for action removal
     * @param onFinish - callback to be performed after action is finished after removal
     * @param callback - optional - callback to be executed in mutation on action removal, e.g. additional DOM changes on element
     */
    performAction(actions: ICuiComponentAction[], timeout: number, onFinish: () => void, callback?: () => void): Promise<boolean>;
    private openFromEvent;
    private closeFromEvent;
    private onActionFinish;
    private onKeyClose;
    abstract onInit(): void;
    abstract onUpdate(): void;
    abstract onDestroy(): void;
    abstract onBeforeOpen(): boolean;
    abstract onAfterOpen(): void;
    abstract onAfterClose(): void;
    abstract onBeforeClose(): boolean;
}
export declare abstract class CuiMutableHandler<T extends ICuiParsable> extends CuiHandlerBase<T> {
    #private;
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiUtils);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    setMutationSelector(selector: string): void;
    setMutationAttributes(attributes: string[]): void;
    /**
     * Callback attached to mutation observer set on root element
     *
     * @param record - mutation records
     */
    mutation(records: MutationRecord[]): void;
    private prepareRecords;
    abstract onMutation(record: CuiChildMutation): void;
    abstract onInit(): void;
    abstract onUpdate(): void;
    abstract onDestroy(): void;
}
