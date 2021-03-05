var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _interactions, _emittedEvents, _attribute, _openEventId, _closeEventId, _keyCloseEventId, _openAct, _closeAct, _mutionHandler;
import { CuiComponentMutationHandler } from "../observers/mutations";
import { AriaAttributes } from "../utils/aria";
import { CuiActionsHelper } from "../helpers/helpers";
import { CuiActionsListFactory } from "../utils/actions";
import { is, getActiveClass, clone } from "../utils/functions";
import { EVENTS } from "../utils/statics";
import { CuiDevtoolFactory } from "../development/factory";
export class ComponentHelper {
    constructor(interactions) {
        _interactions.set(this, void 0);
        __classPrivateFieldSet(this, _interactions, interactions);
    }
    hasClass(cls, element) {
        return cls && element.classList.contains(cls) ? true : false;
    }
    setClass(cls, element) {
        this.setClasses([cls], element);
    }
    setClasses(classes, element) {
        if (element) {
            element.classList.add(...classes);
        }
    }
    setClassesAs(element, ...classes) {
        __classPrivateFieldGet(this, _interactions).mutate(this.setClasses, this, classes, element);
    }
    removeClass(cls, element) {
        this.removeClasses([cls], element);
    }
    removeClasses(classes, element) {
        if (element) {
            element.classList.remove(...classes);
        }
    }
    removeClassesAs(element, ...classes) {
        __classPrivateFieldGet(this, _interactions).mutate(this.removeClasses, this, classes, element);
    }
    removeAttribute(attributeName, element) {
        if (element && element.hasAttribute(attributeName))
            element.removeAttribute(attributeName);
    }
    setStyle(element, property, value) {
        if (element && element["style"] && is(value)) {
            element.style[property] = value;
        }
    }
}
_interactions = new WeakMap();
export class CuiComponentBase {
    constructor(componentName, element, utils) {
        _emittedEvents.set(this, void 0);
        this._log = CuiDevtoolFactory.get(componentName);
        this.utils = utils;
        this.element = element;
        this.cuid = element.$cuid;
        this.isLocked = false;
        // this._log.setId(this.cuid);
        this.activeClassName = getActiveClass(utils.setup.prefix);
        this.helper = new ComponentHelper(utils.interactions);
        __classPrivateFieldSet(this, _emittedEvents, []);
        this.componentName = componentName;
    }
    mutate(callback, ...args) {
        this.utils.interactions.mutate(callback, this, ...args);
    }
    fetch(callback, ...args) {
        this.utils.interactions.fetch(callback, this, ...args);
    }
    getEventName(name) {
        return [name, this.cuid].join('-');
    }
    /**
     * Emits event using passed data and cuid of the element
     * NOTE: Don't use it to emit global events
     * @param event Event name
     * @param data Data to emit
     */
    emitEvent(event, data) {
        if (!__classPrivateFieldGet(this, _emittedEvents).includes(event))
            __classPrivateFieldGet(this, _emittedEvents).push(event);
        this.utils.bus.emit(event, this.cuid, data);
    }
    onEvent(event, callback) {
        return this.utils.bus.on(event, callback, this.element);
    }
    detachEvent(event, id) {
        if (id != null) {
            this.utils.bus.detach(event, id);
            id = "";
        }
    }
    getId() {
        return this.cuid;
    }
    checkLockAndWarn(fName) {
        if (this.isLocked) {
            this._log.warning("Component is locked", fName);
            return true;
        }
        return false;
    }
    /**
     * Helper which checks whether element has an active flag set
     */
    isActive() {
        return this.element.classList.contains(this.activeClassName);
    }
    detachEmiitedEvents() {
        __classPrivateFieldGet(this, _emittedEvents).forEach(event => {
            this.utils.bus.detachByCuid(event, this.cuid);
            this._log.debug("Detaching event: " + event + " on component delete");
        });
    }
    registerInDebug() {
        this._log.registerElement(this.element, this.cuid, this.componentName);
    }
    removeFromDebug() {
        this._log.unregisterElement(this.cuid, this.componentName);
    }
    setDebugProperty(name, value) {
    }
    logInfo(message, functionName) {
        this._log.debug(message, functionName);
    }
    logWarning(message, functionName) {
        this._log.warning(message, functionName);
    }
    logError(message, functionName, error) {
        this._log.error(message, functionName);
        if (error) {
            this._log.exception(error, functionName);
        }
    }
}
_emittedEvents = new WeakMap();
export class CuiHandlerBase extends CuiComponentBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, utils);
        _attribute.set(this, void 0);
        this.args = args;
        this.actionsHelper = new CuiActionsHelper(utils.interactions);
        this.prevArgs = undefined;
        this.isInitialized = false;
        __classPrivateFieldSet(this, _attribute, attribute);
    }
    handle(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isInitialized) {
                this.logWarning("Trying to initialize handler again", 'handle');
                return false;
            }
            if (this.isLocked) {
                this.logWarning("Handler is locked", 'handle');
                return false;
            }
            this.isLocked = true;
            this.registerInDebug();
            this.args.parse(args);
            if (!this.element.classList.contains(__classPrivateFieldGet(this, _attribute))) {
                this.helper.setClassesAs(this.element, __classPrivateFieldGet(this, _attribute));
            }
            this.logInfo("Init", 'handle');
            return this.performLifecycleOp("onHandle", this.onHandle(), () => {
                this.isLocked = false;
                this.isInitialized = true;
            });
        });
    }
    refresh(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logInfo("Update", 'refresh');
            if (!this.isInitialized) {
                this.logError("Cannot update not initialized component", 'refresh');
                return false;
            }
            if (!this.checkLock()) {
                return false;
            }
            this.isLocked = true;
            this.prevArgs = clone(this.args);
            this.args.parse(args);
            this._log.debug("Component update", 'refresh');
            return this.performLifecycleOp("onRefresh", this.onRefresh(), () => {
                this.isLocked = false;
            });
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logInfo("Destroy", "destroy");
            if (!this.isInitialized) {
                this.logError("Cannot update not initialized component", 'destroy');
                return false;
            }
            if (!this.checkLock()) {
                return false;
            }
            this.isLocked = true;
            return this.performLifecycleOp("onRemove", this.onRemove(), () => {
                this.detachEmiitedEvents();
                this.removeFromDebug();
                this.isInitialized = false;
                this.isLocked = false;
            });
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
    performAction(actions, timeout, onFinish, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.actionsHelper.performActions(this.element, actions, timeout, callback)) {
                onFinish();
                return true;
            }
            return false;
        });
    }
    checkLock() {
        if (this.isLocked) {
            this.logWarning("Handler is locked", 'handle');
            return false;
        }
        return true;
    }
    performLifecycleOp(method, operation, onFinish) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            try {
                result = yield operation;
            }
            catch (e) {
                this.logError("An exception occured in" + method, method, e);
            }
            finally {
                onFinish();
            }
            return result;
        });
    }
}
_attribute = new WeakMap();
export class CuiInteractableHandler extends CuiHandlerBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, attribute, args, utils);
        _openEventId.set(this, void 0);
        _closeEventId.set(this, void 0);
        _keyCloseEventId.set(this, void 0);
        _openAct.set(this, void 0);
        _closeAct.set(this, void 0);
        __classPrivateFieldSet(this, _openEventId, null);
        __classPrivateFieldSet(this, _closeEventId, null);
        __classPrivateFieldSet(this, _keyCloseEventId, null);
        __classPrivateFieldSet(this, _closeAct, []);
        __classPrivateFieldSet(this, _openAct, []);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _openEventId, this.onEvent(EVENTS.OPEN, this.openFromEvent.bind(this)));
            __classPrivateFieldSet(this, _closeEventId, this.onEvent(EVENTS.CLOSE, this.closeFromEvent.bind(this)));
            __classPrivateFieldSet(this, _openAct, CuiActionsListFactory.get(this.args.openAct));
            __classPrivateFieldSet(this, _closeAct, CuiActionsListFactory.get(this.args.closeAct));
            this.onInit();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.prevArgs || this.args.openAct !== this.prevArgs.openAct) {
                __classPrivateFieldSet(this, _openAct, CuiActionsListFactory.get(this.args.openAct));
            }
            if (!this.prevArgs || this.args.closeAct !== this.prevArgs.closeAct) {
                __classPrivateFieldSet(this, _closeAct, CuiActionsListFactory.get(this.args.closeAct));
            }
            this.onUpdate();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.detachEvent(EVENTS.CLOSE, __classPrivateFieldGet(this, _closeEventId));
            this.detachEvent(EVENTS.OPEN, __classPrivateFieldGet(this, _openEventId));
            this.onDestroy();
            return true;
        });
    }
    open(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn("open")) {
                return false;
            }
            if (this.isActive()) {
                this.logWarning("Component is already opened");
                return false;
            }
            if (this.args.escClose || is(this.args.keyClose)) {
                __classPrivateFieldSet(this, _keyCloseEventId, this.onEvent(EVENTS.KEYDOWN, this.onKeyClose.bind(this)));
            }
            if (!this.onBeforeOpen()) {
                return false;
            }
            this.isLocked = true;
            return this.performAction(__classPrivateFieldGet(this, _openAct), this.args.timeout, this.onActionFinish.bind(this, this.onAfterOpen.bind(this), EVENTS.OPENED, args), () => {
                this.helper.setClass(this.activeClassName, this.element);
                AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
            });
            ;
        });
    }
    close(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn("close")) {
                return false;
            }
            if (!this.isActive()) {
                this.logWarning("Component is already closed");
                return false;
            }
            this.detachEvent(EVENTS.KEYDOWN, __classPrivateFieldGet(this, _keyCloseEventId));
            if (!this.onBeforeClose()) {
                return false;
            }
            this.isLocked = true;
            return this.performAction(__classPrivateFieldGet(this, _closeAct), this.args.timeout, this.onActionFinish.bind(this, this.onAfterClose.bind(this), EVENTS.CLOSED, args), () => {
                this.helper.removeClass(this.activeClassName, this.element);
                AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
            });
            ;
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
    performAction(actions, timeout, onFinish, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.actionsHelper.performActions(this.element, actions, timeout, callback)) {
                onFinish();
                return true;
            }
            return false;
        });
    }
    openFromEvent(args) {
        this.open(args);
    }
    closeFromEvent(args) {
        this.close(args);
    }
    onActionFinish(callback, event, args) {
        callback();
        this.emitEvent(event, {
            timestamp: Date.now(),
            state: args
        });
        this.isLocked = false;
    }
    onKeyClose(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.args.escClose && ev.event.key === "Escape" || is(this.args.keyClose) && ev.event.key === this.args.keyClose) {
                yield this.close('Closed by key');
            }
        });
    }
}
_openEventId = new WeakMap(), _closeEventId = new WeakMap(), _keyCloseEventId = new WeakMap(), _openAct = new WeakMap(), _closeAct = new WeakMap();
export class CuiMutableHandler extends CuiHandlerBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, attribute, args, utils);
        _mutionHandler.set(this, void 0);
        __classPrivateFieldSet(this, _mutionHandler, new CuiComponentMutationHandler(element));
        __classPrivateFieldGet(this, _mutionHandler).onMutation(this.mutation.bind(this));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.onInit();
            __classPrivateFieldGet(this, _mutionHandler).observe();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _mutionHandler).unobserve();
            this.onUpdate();
            __classPrivateFieldGet(this, _mutionHandler).observe();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _mutionHandler).unobserve();
            this.onDestroy();
            return true;
        });
    }
    /**
     * Callback attached to mutation observer set on root element
     *
     * @param record - mutation records
     */
    mutation(records) {
        this._log.debug("Element mutation", "mutation");
        this.onMutation(this.prepareRecords(records));
    }
    prepareRecords(records) {
        return records.reduce((result, item) => {
            if (item.type !== "childList") {
                return result;
            }
            if (item.addedNodes.length > 0) {
                result.added.push(...item.addedNodes);
            }
            if (item.removedNodes.length > 0) {
                result.removed.push(...item.removedNodes);
            }
            return result;
        }, {
            added: [],
            removed: []
        });
    }
}
_mutionHandler = new WeakMap();
