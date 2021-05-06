var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { is, are } from "../../core/utils/functions";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiActionsFactory, CuiClassAction } from "../../core/utils/actions";
import { CuiDevtoolFactory } from "../../core/development/factory";
export class ElementManager {
    constructor(elements, utils) {
        this._elements = elements;
        this._isLocked = false;
        this._logger = CuiDevtoolFactory.get("ElementManager");
        this._core = utils;
        this._cDt = Date.now();
        this._actionsHelper = new CuiActionsHelper(utils.interactions);
    }
    toggleClass(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(className)) {
                return false;
            }
            return this.call((element) => {
                if (!element.classList.contains(className)) {
                    element.classList.add(className);
                }
                else {
                    element.classList.remove(className);
                }
            }, 'toggleClass');
        });
    }
    toggleClassAs(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(className)) {
                return false;
            }
            return this.call((element) => {
                let classes = element.classList;
                this._core.interactions.fetch(() => {
                    if (!classes.contains(className)) {
                        this._core.interactions.mutate(classes.add, classes, className);
                    }
                    else {
                        this._core.interactions.mutate(classes.remove, classes, className);
                    }
                }, this);
            }, 'toggleClassAs');
        });
    }
    setClass(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(className)) {
                return false;
            }
            return this.call((element) => {
                if (!element.classList.contains(className)) {
                    element.classList.add(className);
                }
            }, 'setClass');
        });
    }
    setClassAs(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(className)) {
                return false;
            }
            return this.call((element) => {
                let classes = element.classList;
                this._core.interactions.fetch(() => {
                    if (!classes.contains(className)) {
                        this._core.interactions.mutate(classes.add, classes, className);
                    }
                }, this);
            }, 'setClassAs');
        });
    }
    removeClass(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(className)) {
                return false;
            }
            return this.call((element) => {
                if (element.classList.contains(className)) {
                    element.classList.remove(className);
                }
            }, 'removeClass');
        });
    }
    removeClassAs(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(className)) {
                return false;
            }
            return this.call((element) => {
                let classes = element.classList;
                this._core.interactions.fetch(() => {
                    if (classes.contains(className)) {
                        this._core.interactions.mutate(classes.remove, classes, className);
                    }
                }, this);
            }, 'removeClass');
        });
    }
    getAttribute(attributeName) {
        if (!is(attributeName)) {
            return [];
        }
        return this._elements.reduce((val, current) => {
            let attr = current.getAttribute(attributeName);
            if (attr != null) {
                val.push(attr);
            }
            return val;
        }, []);
    }
    setAttribute(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                element.setAttribute(attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
            }, 'setAttribute');
        });
    }
    setAttributeAs(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                this._core.interactions.mutate(element.setAttribute, element, attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
            }, 'setAttributeAs');
        });
    }
    removeAttribute(attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                element.removeAttribute(attributeName);
            }, 'removeAttribute');
        });
    }
    removeAttributeAs(attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                this._core.interactions.mutate(element.removeAttribute, element, attributeName);
            }, 'removeAttributeAs');
        });
    }
    toggleAttribute(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                if (element.hasAttribute(attributeName)) {
                    element.removeAttribute(attributeName);
                }
                else {
                    element.setAttribute(attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
                }
            }, 'toggleAttribute');
        });
    }
    toggleAttributeAs(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                this._core.interactions.fetch(() => {
                    if (element.hasAttribute(attributeName)) {
                        this._core.interactions.mutate(element.removeAttribute, element, attributeName);
                    }
                    else {
                        this._core.interactions.mutate(element.setAttribute, element, attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
                    }
                }, this);
            }, 'toggleAttributeAs');
        });
    }
    click(onClick) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(onClick)) {
                return false;
            }
            return this.call((element) => {
                //@ts-ignore
                element.addEventListener('click', onClick);
            }, 'click');
        });
    }
    event(eventName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(eventName) || !is(callback)) {
                return false;
            }
            return this.call((element) => {
                element.addEventListener(eventName, callback);
            }, 'event');
        });
    }
    call(callback, functionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isLocked) {
                this._logger.error("Element is locked", functionName);
            }
            this.lock();
            this._elements.forEach((element, index) => {
                callback(element, index);
            });
            this.unlock();
            return true;
        });
    }
    setAction(actionStr, animationClass, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(actionStr)) {
                return false;
            }
            let act = CuiActionsFactory.get(actionStr);
            return this.animate(animationClass, timeout, (element) => {
                act.add(element);
            });
        });
    }
    removeAction(actionStr, animationClass, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(actionStr)) {
                return false;
            }
            let act = CuiActionsFactory.get(actionStr);
            return this.animate(animationClass, timeout, (element) => {
                act.remove(element);
            });
        });
    }
    /**
     * Perform animation on the element
     * @param animationClass
     * @param timeout
     * @param callback
     */
    animate(animationClass, timeout, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(animationClass)) {
                return false;
            }
            const delay = (_a = timeout !== null && timeout !== void 0 ? timeout : this._core.setup.animationTime) !== null && _a !== void 0 ? _a : 0;
            const action = new CuiClassAction(animationClass);
            return this.call((element) => {
                return this._actionsHelper.performAction(element, action, delay, () => {
                    if (callback)
                        callback(element);
                });
            });
        });
    }
    emit(event, ...args) {
        if (!is(event)) {
            this._logger.warning("Not enough data to emit event", "emit");
            return;
        }
        this.call((element) => {
            let cuid = element.$cuid;
            if (is(cuid)) {
                this._logger.debug(`Emitting event ${event} to ${cuid}`);
                this._core.bus.emit(event, cuid, ...args);
            }
        }, "emit");
    }
    on(event, callback) {
        let ids = [];
        if (!are(event, callback)) {
            this._logger.error("Incorrect arguments", "on");
            return ids;
        }
        this.call((element) => {
            let cuiElement = element;
            if (is(cuiElement)) {
                let disposeId = this._core.bus.on(event, callback, cuiElement);
                if (disposeId != null)
                    ids.push(disposeId);
            }
        }, "on");
        return ids;
    }
    detach(event, id) {
        if (!are(event, id)) {
            this._logger.error("Incorrect arguments", "detach");
        }
        this.call((element) => {
            let cuiElement = element;
            if (is(cuiElement)) {
                this._core.bus.detach(event, id, cuiElement);
            }
        }, "detach");
    }
    read(callback, ...args) {
        this._core.interactions.fetch(callback, this, ...args);
    }
    change(callback, ...args) {
        this._core.interactions.mutate(callback, this, ...args);
    }
    elements() {
        return this._elements;
    }
    count() {
        return this._elements.length;
    }
    lock() {
        this._isLocked = true;
    }
    unlock() {
        this._isLocked = false;
    }
    isLocked() {
        return this._isLocked;
    }
    refresh() {
        return (Date.now() - this._cDt) < 360000;
    }
}
