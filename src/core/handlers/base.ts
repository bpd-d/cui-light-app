import { IUIInteractionProvider, CuiContext, ICuiComponentHandler, ICuiParsable, ICuiOpenable, ICuiClosable, CuiHTMLElement } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
import { ICuiComponentMutationObserver, CuiComponentMutationHandler } from "../observers/mutations";
import { AriaAttributes } from "../utils/aria";
import { CuiActionsHelper } from "../helpers/helpers";
import { ICuiComponentAction, CuiActionsListFactory } from "../utils/actions";
import { is, getActiveClass, clone } from "../utils/functions";
import { EVENTS } from "../utils/statics";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { CuiDevtoolFactory } from "../development/factory";
import { EventBase, KeyDownEvent } from "../models/events";
import { CuiModulesHandler } from "./modules/handler";
import { ICuiHandlerModule } from "./modules/interfaces";

export interface CuiChildMutation {
    removed: Node[];
    added: Node[];
    changed: Node[];
}

export class ComponentHelper {
    #interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this.#interactions = interactions;
    }

    hasClass(cls: string, element: Element): boolean {
        return cls && element.classList.contains(cls) ? true : false;
    }

    setClass(cls: string, element: Element): void {
        this.setClasses([cls], element);
    }

    setClasses(classes: string[], element?: Element) {
        if (element) {
            element.classList.add(...classes)
        }
    }

    setClassesAs(element: Element, ...classes: string[]) {
        this.#interactions.mutate(this.setClasses, this, classes, element);
    }

    removeClass(cls: string, element: Element) {
        this.removeClasses([cls], element);
    }

    removeClasses(classes: string[], element?: Element) {
        if (element) {
            element.classList.remove(...classes)
        }
    }

    removeClassesAs(element: Element, ...classes: string[]) {
        this.#interactions.mutate(this.removeClasses, this, classes, element);
    }

    removeAttribute(attributeName: string, element: Element) {
        if (element && element.hasAttribute(attributeName))
            element.removeAttribute(attributeName);
    }

    setStyle(element: any, property: string, value: string) {
        if (element && element["style"] && is(value)) {
            element.style[property] = value
        }
    }


}

export class CuiComponentBase implements CuiContext {
    _log: ICuiDevelopmentTool;
    utils: CuiUtils;
    element: HTMLElement;
    cuid: string;
    isLocked: boolean;
    activeClassName: string;
    helper: ComponentHelper;
    #emittedEvents: string[];
    componentName: string;
    constructor(componentName: string, element: HTMLElement, utils: CuiUtils) {
        this._log = CuiDevtoolFactory.get(componentName);
        this.utils = utils;
        this.element = element;
        this.cuid = (<any>element).$cuid;
        this.isLocked = false;
        // this._log.setId(this.cuid);
        this.activeClassName = getActiveClass(utils.setup.prefix);
        this.helper = new ComponentHelper(utils.interactions);
        this.#emittedEvents = [];
        this.componentName = componentName;
    }


    mutate(callback: any, ...args: any[]): void {
        this.utils.interactions.mutate(callback, this, ...args)
    }

    fetch(callback: any, ...args: any[]): void {
        this.utils.interactions.fetch(callback, this, ...args)
    }

    getEventName(name: string) {
        return [name, this.cuid].join('-');
    }

    /**
     * Emits event using passed data and cuid of the element
     * NOTE: Don't use it to emit global events
     * @param event Event name
     * @param data Data to emit
     */
    emitEvent<T extends EventBase>(event: string, data: T, source?: CuiHTMLElement) {
        if (!this.#emittedEvents.includes(event))
            this.#emittedEvents.push(event);

        this.utils.bus.emit(event, this.cuid, {
            ...data,
            name: event,
            timestamp: Date.now(),
            source: source ?? this.element,
        })
    }

    onEvent<T>(event: string, callback: (t: T) => void): string | null {
        return this.utils.bus.on(event, callback, this.element as any)
    }

    detachEvent(event: string, id: string | null) {
        if (id != null) {
            this.utils.bus.detach(event, id);
            id = "";
        }
    }

    getId(): string {
        return this.cuid;
    }

    checkLockAndWarn(fName?: string): boolean {
        if (this.isLocked) {
            this._log.warning("Component is locked", fName)
            return true
        }
        return false;
    }

    /**
     * Helper which checks whether element has an active flag set
     */
    isActive(): boolean {
        return this.element.classList.contains(this.activeClassName);
    }

    detachEmiitedEvents() {
        this.#emittedEvents.forEach(event => {
            this.utils.bus.detachByCuid(event, this.cuid);
            this._log.debug("Detaching event: " + event + " on component delete");
        })
    }

    registerInDebug(): void {
        this._log.registerElement(this.element, this.cuid, this.componentName);
    }

    removeFromDebug(): void {
        this._log.unregisterElement(this.cuid, this.componentName);
    }

    setDebugProperty<T>(name: string, value: T): void {
    }

    logInfo(message: string, functionName?: string) {
        this._log.debug(message, functionName);
    }

    logWarning(message: string, functionName?: string) {
        this._log.warning(message, functionName);
    }

    logError(message: string, functionName?: string, error?: Error) {
        this._log.error(message, functionName);
        if (error) {
            this._log.exception(error, functionName)
        }
    }
}

export abstract class CuiHandlerBase<T extends ICuiParsable> extends CuiComponentBase implements ICuiComponentHandler {
    args: T;
    prevArgs: T | undefined;
    isInitialized: boolean;
    actionsHelper: CuiActionsHelper;
    #attribute: string;
    #moduleHandler: CuiModulesHandler<T>;
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiUtils) {
        super(componentName, element, utils);
        this.args = args;
        this.actionsHelper = new CuiActionsHelper(utils.interactions)
        this.prevArgs = undefined;
        this.isInitialized = false;
        this.#attribute = attribute;
        this.#moduleHandler = new CuiModulesHandler();
    }

    async handle(args: any): Promise<boolean> {

        if (this.isInitialized) {
            this.logWarning("Trying to initialize handler again", 'handle');
            return false;
        }
        if (!this.checkLock("handle")) {
            return false;
        }
        this.isLocked = true;
        this.registerInDebug();
        this.args.parse(args);
        if (!this.element.classList.contains(this.#attribute)) {
            this.helper.setClassesAs(this.element, this.#attribute)
        }

        this.logInfo("Init", 'handle');
        await this.#moduleHandler.init(args);
        return this.performLifecycleOp("onHandle", this.onHandle(), () => {
            this.isLocked = false; this.isInitialized = true;
        });
    }

    async refresh(args: any): Promise<boolean> {
        this.logInfo("Update", 'refresh')
        if (!this.isInitialized) {
            this.logError("Cannot update not initialized component", 'refresh');
            return false;
        }
        if (!this.checkLock("refresh")) {
            return false;
        }
        this.isLocked = true;

        this.prevArgs = clone(this.args);
        this.args.parse(args);
        this._log.debug("Component update", 'refresh');
        await this.#moduleHandler.update(args);
        return this.performLifecycleOp("onRefresh", this.onRefresh(), () => {
            this.isLocked = false;
        });
    }

    async destroy(): Promise<boolean> {
        this.logInfo("Destroy", "destroy");
        if (!this.isInitialized) {
            this.logError("Cannot update not initialized component", 'destroy');
            return false;
        }
        if (!this.checkLock('destroy')) {
            return false;
        }
        this.isLocked = true;
        await this.#moduleHandler.destroy();
        return this.performLifecycleOp("onRemove", this.onRemove(), () => {
            this.detachEmiitedEvents();
            this.removeFromDebug();
            this.isInitialized = false;
            this.isLocked = false;
        });
    }

    /**
    * Helper created for elements that animate - perfroms an action *add*, after timeout it performs *remove*.
    * 
    * @param action - action to perfrom
    * @param timeout - timeout specified for action removal
    * @param onFinish - callback to be performed after action is finished after removal
    * @param callback - optional - callback to be executed in mutation on action removal, e.g. additional DOM changes on element
    */
    async performAction(actions: ICuiComponentAction[], timeout: number, onFinish: () => void, callback?: () => void): Promise<boolean> {
        if (await this.actionsHelper.performActions(this.element, actions, timeout, callback)) {
            onFinish();
            return true;
        }
        return false;
    }

    addModule(module: ICuiHandlerModule<T>) {
        this.#moduleHandler.add(module);
    }

    private checkLock(method?: string): boolean {
        if (this.isLocked) {
            this.logWarning("Handler is locked", method);
            return false;
        }
        return true;
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


export interface CuiInteractableArgs {
    timeout: number;
    openAct: string;
    closeAct: string;
    escClose: boolean;
    keyClose: string;
}

export abstract class CuiInteractableHandler<T extends ICuiParsable & CuiInteractableArgs> extends CuiHandlerBase<T> implements ICuiOpenable, ICuiClosable {
    #openEventId: string | null;
    #closeEventId: string | null;
    #keyCloseEventId: string | null;
    #openAct: ICuiComponentAction[];
    #closeAct: ICuiComponentAction[];
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiUtils) {
        super(componentName, element, attribute, args, utils);
        this.#openEventId = null;
        this.#closeEventId = null;
        this.#keyCloseEventId = null;
        this.#closeAct = [];
        this.#openAct = [];
    }

    async onHandle(): Promise<boolean> {
        this.#openEventId = this.onEvent(EVENTS.OPEN, this.openFromEvent.bind(this))
        this.#closeEventId = this.onEvent(EVENTS.CLOSE, this.closeFromEvent.bind(this))
        this.#openAct = CuiActionsListFactory.get(this.args.openAct)
        this.#closeAct = CuiActionsListFactory.get(this.args.closeAct)
        this.onInit();
        return true;
    }


    async onRefresh(): Promise<boolean> {
        if (!this.prevArgs || this.args.openAct !== this.prevArgs.openAct) {
            this.#openAct = CuiActionsListFactory.get(this.args.openAct)
        }
        if (!this.prevArgs || this.args.closeAct !== this.prevArgs.closeAct) {
            this.#closeAct = CuiActionsListFactory.get(this.args.closeAct)
        }
        this.onUpdate();
        return true;
    }

    async onRemove(): Promise<boolean> {
        this.detachEvent(EVENTS.CLOSE, this.#closeEventId);
        this.detachEvent(EVENTS.OPEN, this.#openEventId);
        this.onDestroy();
        return true;
    }

    async open(args?: any): Promise<boolean> {
        if (this.checkLockAndWarn("open")) {
            return false;
        }
        if (this.isActive()) {
            this.logWarning("Component is already opened");
            return false;
        }
        if (this.args.escClose || is(this.args.keyClose)) {
            this.#keyCloseEventId = this.onEvent(EVENTS.KEYDOWN, this.onKeyClose.bind(this))
        }

        if (!this.onBeforeOpen()) {
            return false;
        }
        this.isLocked = true;
        return this.performAction(this.#openAct, this.args.timeout, this.onActionFinish.bind(this, this.onAfterOpen.bind(this), EVENTS.OPENED, args), () => {
            this.helper.setClass(this.activeClassName, this.element)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
        });
    }

    async close(args?: any): Promise<boolean> {
        if (this.checkLockAndWarn("close")) {
            return false;
        }
        if (!this.isActive()) {
            this.logWarning("Component is already closed");
            return false;
        }

        this.detachEvent(EVENTS.KEYDOWN, this.#keyCloseEventId);
        if (!this.onBeforeClose()) {
            return false;
        }
        this.isLocked = true;
        return this.performAction(this.#closeAct, this.args.timeout, this.onActionFinish.bind(this, this.onAfterClose.bind(this), EVENTS.CLOSED, args), () => {
            this.helper.removeClass(this.activeClassName, this.element)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        });;
    }


    /**
     * Helper created for elements that animate - perfroms an action *add*, after timeout it performs *remove*.
     * 
     * @param action - action to perfrom
     * @param timeout - timeout specified for action removal
     * @param onFinish - callback to be performed after action is finished after removal
     * @param callback - optional - callback to be executed in mutation on action removal, e.g. additional DOM changes on element
     */
    async performAction(actions: ICuiComponentAction[], timeout: number, onFinish: () => void, callback?: () => void): Promise<boolean> {
        if (await this.actionsHelper.performActions(this.element, actions, timeout, callback)) {
            onFinish();
            return true;
        }
        return false;
    }

    private openFromEvent(args: any) {
        this.open(args);
    }

    private closeFromEvent(args: any) {
        this.close(args);
    }

    private onActionFinish(callback: () => void, event: string, args: any) {
        callback();
        this.emitEvent(event, {
            timestamp: Date.now(),
            state: args
        })
        this.isLocked = false;
    }

    private async onKeyClose(ev: KeyDownEvent) {
        if (this.args.escClose && ev.event.key === "Escape" || is(this.args.keyClose) && ev.event.key === this.args.keyClose) {
            await this.close('Closed by key');
        }
    }
    // Abstract
    abstract onInit(): void;
    abstract onUpdate(): void;
    abstract onDestroy(): void;
    abstract onBeforeOpen(): boolean;
    abstract onAfterOpen(): void;
    abstract onAfterClose(): void;
    abstract onBeforeClose(): boolean;

}

export abstract class CuiMutableHandler<T extends ICuiParsable> extends CuiHandlerBase<T> {
    #mutionHandler: ICuiComponentMutationObserver;
    constructor(componentName: string, element: HTMLElement, attribute: string, args: T, utils: CuiUtils) {
        super(componentName, element, attribute, args, utils);
        this.#mutionHandler = new CuiComponentMutationHandler(element);
        this.#mutionHandler.onMutation(this.mutation.bind(this))
    }

    async onHandle(): Promise<boolean> {
        this.onInit();
        this.#mutionHandler.observe();
        return true;
    }


    async onRefresh(): Promise<boolean> {
        this.#mutionHandler.unobserve();
        this.onUpdate();
        this.#mutionHandler.observe();
        return true;
    }

    async onRemove(): Promise<boolean> {
        this.#mutionHandler.unobserve();
        this.onDestroy();
        return true;
    }

    setMutationSelector(selector: string) {
        this.#mutionHandler.setSelector(selector);
    }

    setMutationAttributes(attributes: string[]) {
        this.#mutionHandler.setAttributes(attributes);
    }

    /**
     * Callback attached to mutation observer set on root element
     * 
     * @param record - mutation records
     */
    mutation(records: MutationRecord[]): void {
        this._log.debug("Element mutation", "mutation")
        this.onMutation(this.prepareRecords(records));
    }

    private prepareRecords(records: MutationRecord[]): CuiChildMutation {
        return records.reduce<CuiChildMutation>((result: CuiChildMutation, item: MutationRecord) => {
            if (item.type === "childList") {
                if (item.addedNodes.length > 0) {
                    result.added.push(...item.addedNodes)
                }
                if (item.removedNodes.length > 0) {
                    result.removed.push(...item.removedNodes)
                }
                return result;
            }
            if (item.type === "attributes") {
                result.changed.push(item.target);
            }
            return result;
        }, {
            added: [],
            removed: [],
            changed: []
        })
    }

    abstract onMutation(record: CuiChildMutation): void;
    abstract onInit(): void;
    abstract onUpdate(): void;
    abstract onDestroy(): void;
}