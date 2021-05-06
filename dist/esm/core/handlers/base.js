var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiActionsFactory } from "../utils/actions";
import { getActiveClass, clone } from "../utils/functions";
import { CuiDevtoolFactory } from "../development/factory";
import { CuiExtensionsHandler } from "./extensions/handler";
import { ClassesHelper, CuiClassesAsyncHelper } from "./extensions/facades";
export class CuiComponentHandlerProps {
    constructor(componentName, element, utils) {
        this.log = CuiDevtoolFactory.get(componentName);
        this.core = utils;
        this.element = element;
        this.cuid = element.$cuid;
        this.activeClassName = getActiveClass(utils.setup.prefix);
        this.componentName = componentName;
    }
}
export class CuiComponentBase extends CuiComponentHandlerProps {
    constructor(componentName, element, utils) {
        super(componentName, element, utils);
        this._isLocked = false;
    }
    getEventName(name) {
        return [name, this.cuid].join('-');
    }
    getId() {
        return this.cuid;
    }
    /**
     * Helper which checks whether element has an active flag set
     */
    isActive() {
        return this.element.classList.contains(this.activeClassName);
    }
    lock(fName) {
        if (this._isLocked) {
            this.log.warning("Component is locked: ", fName !== null && fName !== void 0 ? fName : "");
            return false;
        }
        this._isLocked = true;
        return this._isLocked;
    }
    unlock(fName) {
        if (!this._isLocked) {
            this.log.warning("Component is not locked: ", fName !== null && fName !== void 0 ? fName : "");
            return false;
        }
        this._isLocked = false;
        return this._isLocked;
    }
    logInfo(message, functionName) {
        this.log.debug(message, functionName);
    }
    logWarning(message, functionName) {
        this.log.warning(message, functionName);
    }
    logError(message, functionName, error) {
        this.log.error(message, functionName);
        if (error) {
            this.log.exception(error, functionName);
        }
    }
}
export class CuiHandlerBase extends CuiComponentBase {
    constructor(componentName, element, attribute, args, utils) {
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
    handle(args) {
        return __awaiter(this, void 0, void 0, function* () {
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
                this.asyncClasses.setClasses(this.element, this.attribute);
            }
            this.logInfo("Init", 'handle');
            yield this._extensionHandler.init(args);
            return this.performLifecycleOp("onHandle", this.onHandle(), () => {
                this.unlock();
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
            if (!this.lock()) {
                return false;
            }
            this.prevArgs = clone(this.args);
            this.args.parse(args);
            this.log.debug("Component update", 'refresh');
            yield this._extensionHandler.update(args);
            return this.performLifecycleOp("onRefresh", this.onRefresh(), () => {
                this.unlock();
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
            if (!this.lock('destroy')) {
                return false;
            }
            yield this._extensionHandler.destroy();
            return this.performLifecycleOp("onRemove", this.onRemove(), () => {
                this.log.unregisterElement(this.cuid, this.componentName);
                this.isInitialized = false;
                this.unlock();
                //@ts-ignore - release the reference
                this.element = null;
            });
        });
    }
    extend(extension) {
        if (this.isInitialized) {
            throw (new Error("Cannot extend initialized handler"));
        }
        this._extensionHandler.add(extension);
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
