import { CuiContext, ICuiComponentHandler, ICuiParsable } from "../models/interfaces";
import { CuiCore } from "../models/core";
import { ICuiComponentAction } from "../utils/actions";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { ICuiHandlerExtension } from "./extensions/interfaces";
import { ICuiClassesAsyncHelper, ICuiClassesHelper } from "./extensions/facades";
export declare class CuiComponentHandlerProps {
    log: ICuiDevelopmentTool;
    core: CuiCore;
    element: HTMLElement;
    cuid: string;
    activeClassName: string;
    componentName: string;
    constructor(componentName: string, element: HTMLElement, utils: CuiCore);
}
export declare class CuiComponentBase extends CuiComponentHandlerProps implements CuiContext {
    private _isLocked;
    constructor(componentName: string, element: HTMLElement, utils: CuiCore);
    getEventName(name: string): string;
    getId(): string;
    /**
     * Helper which checks whether element has an active flag set
     */
    isActive(): boolean;
    lock(fName?: string): boolean;
    unlock(fName?: string): boolean;
    logInfo(message: string, functionName?: string): void;
    logWarning(message: string, functionName?: string): void;
    logError(message: string, functionName?: string, error?: Error): void;
}
export declare abstract class CuiHandlerBase<T extends ICuiParsable> extends CuiComponentBase implements ICuiComponentHandler {
    args: T;
    prevArgs: T | undefined;
    isInitialized: boolean;
    classes: ICuiClassesHelper;
    asyncClasses: ICuiClassesAsyncHelper;
    activeAction: ICuiComponentAction;
    attribute: string;
    private _extensionHandler;
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiCore);
    handle(args: any): Promise<boolean>;
    refresh(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    extend(extension: ICuiHandlerExtension<T>): void;
    private performLifecycleOp;
    abstract onHandle(): Promise<boolean>;
    abstract onRefresh(): Promise<boolean>;
    abstract onRemove(): Promise<boolean>;
}
