var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getEventBusFacade(cuid, bus, target) {
    const _emittedEvents = [];
    return {
        emit: (event, data, source) => __awaiter(this, void 0, void 0, function* () {
            if (!_emittedEvents.includes(event))
                _emittedEvents.push(event);
            return bus.emit(event, cuid, Object.assign(Object.assign({}, data), { name: event, timestamp: Date.now(), source: source !== null && source !== void 0 ? source : target }));
        }),
        on: (event, callback) => {
            return bus.on(event, callback, target);
        },
        detach: (event, id) => {
            if (id != null) {
                bus.detach(event, id);
                id = "";
            }
        },
        detachEmittedEvents: () => {
            _emittedEvents.forEach(event => {
                bus.detachByCuid(event, cuid);
            });
        }
    };
}
export function getCuiHandlerInteractions(interactions, ctx) {
    return {
        mutate: (callback, ...args) => {
            interactions.mutate(callback, ctx !== null && ctx !== void 0 ? ctx : null, ...args);
        },
        fetch: (callback, ...args) => {
            interactions.fetch(callback, ctx !== null && ctx !== void 0 ? ctx : null, ...args);
        }
    };
}
export function cuiHandlerAsyncInteractions(interactions, ctx) {
    return {
        mutate: (callback, ...args) => {
            return new Promise((resolve, reject) => {
                interactions.mutate(() => {
                    try {
                        resolve(callback(...args));
                    }
                    catch (e) {
                        reject(e);
                    }
                }, ctx !== null && ctx !== void 0 ? ctx : null);
            });
        },
        fetch: (callback, ...args) => {
            return new Promise((resolve, reject) => {
                interactions.fetch(() => {
                    try {
                        resolve(callback(...args));
                    }
                    catch (e) {
                        reject(e);
                    }
                }, ctx !== null && ctx !== void 0 ? ctx : null);
            });
        }
    };
}
export class ClassesHelper {
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
    removeClass(cls, element) {
        this.removeClasses([cls], element);
    }
    removeClasses(classes, element) {
        if (element) {
            element.classList.remove(...classes);
        }
    }
}
export class CuiClassesAsyncHelper {
    constructor(interactions, helper) {
        this._interactions = interactions;
        this._classesHelper = helper;
    }
    removeClasses(element, ...classes) {
        this._interactions.mutate(this._classesHelper.removeClasses, this._classesHelper, classes, element);
    }
    setClasses(element, ...classes) {
        this._interactions.mutate(this._classesHelper.setClasses, this._classesHelper, classes, element);
    }
}
export class CuiAttributeHelper {
    constructor(interactions) {
        this._interactions = interactions;
    }
    removeAttribute(attributeName, element) {
        this._interactions.mutate(() => {
            element.removeAttribute(attributeName);
        }, null);
    }
    setAttribute(attributeName, value, element) {
        this._interactions.mutate(() => {
            element.setAttribute(attributeName, value);
        }, null);
    }
    removeAttributes(attributeName, element) {
        this._interactions.mutate(() => {
            attributeName.forEach((attr) => {
                if (!attr) {
                    return;
                }
                element.removeAttribute(attr);
            });
        }, null);
    }
    setAttributes(attributes, element) {
        this._interactions.mutate(() => {
            attributes.forEach((attr) => {
                if (!attr.key) {
                    return;
                }
                element.setAttribute(attr.key, attr.value);
            });
        }, null);
    }
}
export class CuiStyleHelper {
    clean(element) {
        if (!element || !element.hasAttribute('style')) {
            return;
        }
        element.removeAttribute('style');
    }
    setStyle(property, value, element) {
        if (!element || !element['style']) {
            return;
        }
        element.style[property] = value;
    }
    removeStyle(property, element) {
        if (!element || !element['style'] || !element['style'][property]) {
            return;
        }
        delete element['style'][property];
    }
}
export class CuiStyleAsyncHelper {
    constructor(interactions, helper) {
        this._interactions = interactions;
        this._helper = helper;
    }
    setStyle(property, value, element) {
        this._interactions.mutate(this._helper.setStyle, this._helper, property, value, element);
    }
    removeStyle(property, element) {
        this._interactions.mutate(this._helper.removeStyle, this._helper, property, element);
    }
    setStyles(properties, element) {
        if (!element['style']) {
            return;
        }
        this._interactions.mutate(() => {
            properties.forEach(prop => {
                if (!prop.key) {
                    return;
                }
                element["style"][prop.key] = prop.value;
            });
        }, null);
    }
    removeStyles(properties, element) {
        if (!element['style']) {
            return;
        }
        this._interactions.mutate(() => {
            properties.forEach(prop => {
                if (!prop) {
                    return;
                }
                delete element["style"][prop];
            });
        }, null);
    }
    clean(element) {
        this._interactions.mutate(this._helper.clean, this._helper, element);
    }
}
