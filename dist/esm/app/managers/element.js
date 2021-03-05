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
var _elements, _isLocked, _logger, _cDt, _utils, _actionsHelper;
import { is, are } from "../../core/utils/functions";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiActionsFatory, CuiClassAction } from "../../core/utils/actions";
import { CuiDevtoolFactory } from "../../core/development/factory";
export class ElementManager {
    constructor(elements, utils) {
        _elements.set(this, void 0);
        _isLocked.set(this, void 0);
        _logger.set(this, void 0);
        _cDt.set(this, void 0);
        _utils.set(this, void 0);
        _actionsHelper.set(this, void 0);
        __classPrivateFieldSet(this, _elements, elements);
        __classPrivateFieldSet(this, _isLocked, false);
        __classPrivateFieldSet(this, _logger, CuiDevtoolFactory.get("ElementManager"));
        __classPrivateFieldSet(this, _utils, utils);
        __classPrivateFieldSet(this, _cDt, Date.now());
        __classPrivateFieldSet(this, _actionsHelper, new CuiActionsHelper(utils.interactions));
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
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (!classes.contains(className)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.add, classes, className);
                    }
                    else {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.remove, classes, className);
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
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (!classes.contains(className)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.add, classes, className);
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
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (classes.contains(className)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.remove, classes, className);
                    }
                }, this);
            }, 'removeClass');
        });
    }
    getAttribute(attributeName) {
        if (!is(attributeName)) {
            return [];
        }
        return __classPrivateFieldGet(this, _elements).reduce((val, current) => {
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
                __classPrivateFieldGet(this, _utils).interactions.mutate(element.setAttribute, element, attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
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
                __classPrivateFieldGet(this, _utils).interactions.mutate(element.removeAttribute, element, attributeName);
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
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (element.hasAttribute(attributeName)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(element.removeAttribute, element, attributeName);
                    }
                    else {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(element.setAttribute, element, attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
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
            if (__classPrivateFieldGet(this, _isLocked)) {
                __classPrivateFieldGet(this, _logger).error("Element is locked", functionName);
            }
            this.lock();
            __classPrivateFieldGet(this, _elements).forEach((element, index) => {
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
            let act = CuiActionsFatory.get(actionStr);
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
            let act = CuiActionsFatory.get(actionStr);
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
            const delay = (_a = timeout !== null && timeout !== void 0 ? timeout : __classPrivateFieldGet(this, _utils).setup.animationTime) !== null && _a !== void 0 ? _a : 0;
            const action = new CuiClassAction(animationClass);
            return this.call((element) => {
                return __classPrivateFieldGet(this, _actionsHelper).performAction(element, action, delay, () => {
                    if (callback)
                        callback(element);
                });
            });
        });
    }
    emit(event, ...args) {
        if (!is(event)) {
            __classPrivateFieldGet(this, _logger).warning("Not enough data to emit event", "emit");
            return;
        }
        this.call((element) => {
            let cuid = element.$cuid;
            if (is(cuid)) {
                __classPrivateFieldGet(this, _logger).debug(`Emitting event ${event} to ${cuid}`);
                __classPrivateFieldGet(this, _utils).bus.emit(event, cuid, ...args);
            }
        }, "emit");
    }
    on(event, callback) {
        let ids = [];
        if (!are(event, callback)) {
            __classPrivateFieldGet(this, _logger).error("Incorrect arguments", "on");
            return ids;
        }
        this.call((element) => {
            let cuiElement = element;
            if (is(cuiElement)) {
                let disposeId = __classPrivateFieldGet(this, _utils).bus.on(event, callback, cuiElement);
                if (disposeId != null)
                    ids.push(disposeId);
            }
        }, "on");
        return ids;
    }
    detach(event, id) {
        if (!are(event, id)) {
            __classPrivateFieldGet(this, _logger).error("Incorrect arguments", "detach");
        }
        this.call((element) => {
            let cuiElement = element;
            if (is(cuiElement)) {
                __classPrivateFieldGet(this, _utils).bus.detach(event, id, cuiElement);
            }
        }, "detach");
    }
    read(callback, ...args) {
        __classPrivateFieldGet(this, _utils).interactions.fetch(callback, this, ...args);
    }
    change(callback, ...args) {
        __classPrivateFieldGet(this, _utils).interactions.mutate(callback, this, ...args);
    }
    elements() {
        return __classPrivateFieldGet(this, _elements);
    }
    count() {
        return __classPrivateFieldGet(this, _elements).length;
    }
    lock() {
        __classPrivateFieldSet(this, _isLocked, true);
    }
    unlock() {
        __classPrivateFieldSet(this, _isLocked, false);
    }
    isLocked() {
        return __classPrivateFieldGet(this, _isLocked);
    }
    refresh() {
        return (Date.now() - __classPrivateFieldGet(this, _cDt)) < 360000;
    }
}
_elements = new WeakMap(), _isLocked = new WeakMap(), _logger = new WeakMap(), _cDt = new WeakMap(), _utils = new WeakMap(), _actionsHelper = new WeakMap();
