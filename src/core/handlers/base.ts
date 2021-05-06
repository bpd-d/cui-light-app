import { CuiContext, ICuiComponentHandler, ICuiParsable } from "../models/interfaces";
import { CuiCore } from "../models/core";
import { ICuiComponentAction, CuiActionsFactory } from "../utils/actions";
import { getActiveClass, clone } from "../utils/functions";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { CuiDevtoolFactory } from "../development/factory";
import { CuiExtensionsHandler } from "./extensions/handler";
import { ICuiHandlerExtension } from "./extensions/interfaces";
import { ClassesHelper, CuiClassesAsyncHelper, ICuiClassesAsyncHelper, ICuiClassesHelper } from "./extensions/facades";

export class CuiComponentHandlerProps {
    log: ICuiDevelopmentTool;
    core: CuiCore;
    element: HTMLElement;
    cuid: string;
    activeClassName: string;
    componentName: string;

    constructor(componentName: string, element: HTMLElement, utils: CuiCore) {
        this.log = CuiDevtoolFactory.get(componentName);
        this.core = utils;
        this.element = element;
        this.cuid = (<any>element).$cuid;
        this.activeClassName = getActiveClass(utils.setup.prefix);
        this.componentName = componentName;
    }
}

export class CuiComponentBase extends CuiComponentHandlerProps implements CuiContext {

    private _isLocked: boolean;

    constructor(componentName: string, element: HTMLElement, utils: CuiCore) {
        super(componentName, element, utils)
        this._isLocked = false;
    }

    getEventName(name: string) {
        return [name, this.cuid].join('-');
    }

    getId() {
        return this.cuid;
    }
    /**
     * Helper which checks whether element has an active flag set
     */
    isActive(): boolean {
        return this.element.classList.contains(this.activeClassName);
    }

    lock(fName?: string): boolean {
        if (this._isLocked) {
            this.log.warning("Component is locked: ", fName ?? "");
            return false;
        }
        this._isLocked = true;
        return this._isLocked;
    }

    unlock(fName?: string): boolean {
        if (!this._isLocked) {
            this.log.warning("Component is not locked: ", fName ?? "");
            return false;
        }
        this._isLocked = false;
        return this._isLocked;
    }

    logInfo(message: string, functionName?: string) {
        this.log.debug(message, functionName);
    }

    logWarning(message: string, functionName?: string) {
        this.log.warning(message, functionName);
    }

    logError(message: string, functionName?: string, error?: Error) {
        this.log.error(message, functionName);
        if (error) {
            this.log.exception(error, functionName)
        }
    }
}


export abstract class CuiHandlerBase<T extends ICuiParsable> extends CuiComponentBase implements ICuiComponentHandler {
    args: T;
    prevArgs: T | undefined;
    isInitialized: boolean;
    classes: ICuiClassesHelper;
    asyncClasses: ICuiClassesAsyncHelper;
    activeAction: ICuiComponentAction;
    attribute: string;
    private _extensionHandler: CuiExtensionsHandler<T>;
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiCore) {
        super(componentName, element, utils);
        this.args = args;
        this.classes = new ClassesHelper();
        this.asyncClasses = new CuiClassesAsyncHelper(utils.interactions, this.classes);
        this.prevArgs = undefined;
        this.isInitialized = false;
        this.attribute = attribute;
        this._extensionHandler = new CuiExtensionsHandler();
        this.activeAction = CuiActionsFactory.get(this.activeClassName);
    }

    async handle(args: any): Promise<boolean> {
        if (this.isInitialized) {
            this.logWarning("Trying to initialize handler again", 'handle');
            return false;
        }
        if (!this.lock("handle")) {
            return false;
        }
        this.log.registerElement(this.element, this.cuid, this.componentName);
        this.args.parse(args);
        if (!this.element.classList.contains(this.attribute)) {
            this.asyncClasses.setClasses(this.element, this.attribute)
        }

        this.logInfo("Init", 'handle');
        await this._extensionHandler.init(args);
        return this.performLifecycleOp("onHandle", this.onHandle(), () => {
            this.unlock();
            this.isInitialized = true;
        });
    }

    async refresh(args: any): Promise<boolean> {
        this.logInfo("Update", 'refresh')
        if (!this.isInitialized) {
            this.logError("Cannot update not initialized component", 'refresh');
            return false;
        }
        if (!this.lock()) {
            return false;
        }
        this.prevArgs = clone(this.args);
        this.args.parse(args);
        this.log.debug("Component update", 'refresh');
        await this._extensionHandler.update(args);
        return this.performLifecycleOp("onRefresh", this.onRefresh(), () => {
            this.unlock();
        });
    }

    async destroy(): Promise<boolean> {
        this.logInfo("Destroy", "destroy");
        if (!this.isInitialized) {
            this.logError("Cannot update not initialized component", 'destroy');
            return false;
        }
        if (!this.lock('destroy')) {
            return false;
        }
        await this._extensionHandler.destroy();
        return this.performLifecycleOp("onRemove", this.onRemove(), () => {
            this.log.unregisterElement(this.cuid, this.componentName);
            this.isInitialized = false;
            this.unlock();
            //@ts-ignore - release the reference
            this.element = null;
        });
    }

    extend(extension: ICuiHandlerExtension<T>) {
        if (this.isInitialized) {
            throw (new Error("Cannot extend initialized handler"))
        }
        this._extensionHandler.add(extension);
    }


    private async performLifecycleOp(method: string, operation: Promise<boolean>, onFinish: () => void): Promise<boolean> {
        let result = false;
        try {
            result = await operation;
        } catch (e) {
            this.logError("An exception occured in" + method, method, e)
        } finally {
            onFinish();
        }
        return result
    }


    // Abstract
    abstract onHandle(): Promise<boolean>;
    abstract onRefresh(): Promise<boolean>;
    abstract onRemove(): Promise<boolean>;
}