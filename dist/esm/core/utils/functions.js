import { ArgumentError } from "../models/errors";
import { COMPONENTS_COUNTER, SCREEN_SIZE_LARGE, SCREEN_SIZE_MEDIUM, SCREEN_SIZE_SMALL, SCREEN_SIZE_XLARGE } from "./statics";
/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export function is(val, typecheck = true) {
    if (typeof val !== 'undefined' && val !== null) {
        if (!typecheck) {
            return true;
        }
        else {
            return !isEmpty(val);
        }
    }
    return false;
}
/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export function isEmpty(val) {
    if (typeof val === "string") {
        return val.length === 0;
    }
    if (typeof val === "boolean") {
        return val;
    }
    else if (Array.isArray(val)) {
        return val.length === 0;
    }
    return false;
}
export function getName(prefix, name) {
    if (!is(prefix) || !is(name)) {
        throw new ArgumentError("Missing argument value");
    }
    return `${prefix}-${name}`;
}
export function sleep(timeout) {
    return new Promise(resolve => setTimeout(() => {
        resolve(true);
    }, timeout));
}
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export function createElementFromString(htmlString) {
    if (!is(htmlString)) {
        return null;
    }
    let template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.children.length > 0 ? template.content.children[0] : null;
}
export function getMatchingAttribute(element, attributes) {
    let attr = null;
    let len = attributes.length;
    for (let i = 0; i < len; i++) {
        let attribute = attributes[i];
        if (element.hasAttribute(attribute)) {
            attr = attribute;
            break;
        }
    }
    return attr;
}
// export function getMatchingAttributes(element: any, attributes: string[]): string[] {
//     if (!element || !is(element.hasAttribute)) {
//         return [];
//     }
//     return attributes.filter(a => {
//         return element.hasAttribute(a);
//     });
// }
export function getRangeValue(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}
export function getRangeValueOrDefault(value, min, max, def) {
    if (value === null || typeof value === 'undefined' || isNaN(value)) {
        return def;
    }
    return getRangeValue(value, min, max);
}
export function increaseValue(value, amount) {
    return amount < 0 || amount > 1 ? 0 : value + (value * amount);
}
export function decreaseValue(value, amount) {
    return amount < 0 || amount > 1 ? 0 : value - (value * amount);
}
export function clone(object) {
    if (!is(object)) {
        return null;
    }
    return Object.assign({}, object);
}
export function getSingleColorRatio(first, second, max) {
    return Math.abs(((first - second) / max) * 100);
}
/**
 * Creates string containg css selector for array of attributes
 * @param attributes - attributes values
 */
export function joinAttributesForQuery(attributes) {
    if (!is(attributes)) {
        return "";
    }
    return `[${attributes.join('],[')}]`;
}
/**
 * Checks light system light mode
 * @returns Light Mode - dark/light
 */
export function getSystemLightMode() {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
/**
 * Check print mode in the browser window
 * @returns true if window is displayed in print mode
 */
export function getSystemPrintMode() {
    return window.matchMedia &&
        window.matchMedia('print').matches;
}
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export function are(...attributes) {
    if (!is(attributes)) {
        return false;
    }
    let c = attributes.length;
    for (let i = 0; i < c; i++) {
        if (!is(attributes[i])) {
            return false;
        }
    }
    return true;
}
export function calcWindowSize(width) {
    let size = "none";
    if (width >= SCREEN_SIZE_SMALL) {
        size = 'small';
    }
    if (width >= SCREEN_SIZE_MEDIUM) {
        size = "medium";
    }
    if (width >= SCREEN_SIZE_LARGE) {
        size = "large";
    }
    if (width >= SCREEN_SIZE_XLARGE) {
        size = 'xlarge';
    }
    return size;
}
/**
 * Creates object from string.
 * Supported syntaxes are:
 * - JSON
 * - single value
 * - key:value,value;key=value
 *
 * @param attribute - attribute value
 */
export function parseAttributeString(attribute) {
    let ret = {};
    if (!is(attribute)) {
        return ret;
    }
    //@ts-ignore - null already checked
    ret = parseJsonString(attribute.trim());
    if (!is(ret)) {
        //@ts-ignore - null already checked
        if (!attribute.includes(';') && !attribute.includes(':')) {
            ret = attribute;
        }
        else {
            ret = {};
            //@ts-ignore - null already checked
            attribute.split(';').forEach(val => {
                let sp = splitColon(val);
                let tag = undefined;
                let value = "";
                if (sp.length < 2) {
                    return;
                }
                tag = sp[0].trim();
                value = sp[1].trim();
                if (tag)
                    ret[tag] = value.replace('U+0003B', ';');
            });
        }
    }
    return ret;
}
/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */
export function parseJsonString(attribute) {
    let out = null;
    if (is(attribute) && attribute.startsWith('{') && attribute.endsWith('}')) {
        try {
            out = jsonify(attribute);
        }
        catch (e) {
            console.error(prepLogString("An exception occured", 'Functions', 'parseJsonString'), e);
        }
        return out;
    }
    return null;
}
/**
 * Creates object from JSON string
 * @param attribute - JSON string
 */
export function jsonify(attribute) {
    return attribute && attribute.length > 0 ? JSON.parse(attribute) : {};
}
export function getOffsetTop(element) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetTop - parseInt(getStyleValue(element, 'margin-top')) - parseInt(getStyleValue(element, 'padding-top')) - parseInt(getStyleValue(element, 'border-top-width'));
    return val < 0 ? element.offsetTop : val;
}
export function getOffsetLeft(element) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetLeft - parseInt(getStyleValue(element, 'margin-left')) - parseInt(getStyleValue(element, 'padding-left')) - parseInt(getStyleValue(element, 'border-left-width'));
    return val < 0 ? element.offsetLeft : val;
}
export function getIntOrDefault(value, def) {
    let integer = parseInt(value);
    return isNaN(integer) ? def : integer;
}
export function getStyleValue(target, property) {
    if (!is(target) || !is(property)) {
        return null;
    }
    if (target.currentStyle) {
        return target.currentStyle[property];
    }
    else if (window.getComputedStyle) {
        return window.getComputedStyle(target, null).getPropertyValue(property);
    }
    return null;
}
export function prepLogString(message, component, functionName) {
    return `[${new Date().toLocaleString()}][${component !== null && component !== void 0 ? component : "-"}][${functionName !== null && functionName !== void 0 ? functionName : '-'}][${message}]`;
}
export function isInRange(value, min, max) {
    return is(value) && value >= min && value <= max;
}
export function getActiveClass(prefix) {
    return `${prefix !== null && prefix !== void 0 ? prefix : ""}-active`;
}
export function parseAttribute(element, attribute) {
    return are(element, attribute) ? parseAttributeString(element.getAttribute(attribute)) : null;
}
/**
 *  Checks whether string value contains synonym of true
 * @param value - string to check
 */
export function isStringTrue(value) {
    return is(value) ? ['y', 't', 'true', 'yes'].includes(value.toLowerCase()) : false;
}
export function boolStringOrDefault(prop, def) {
    return is(prop) ? isStringTrue(prop) : def;
}
export function getStringOrDefault(value, def) {
    return is(value) ? value.toLowerCase() : def;
}
/**
 * Checks whether device supports touch
 */
export function isTouchSupported() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}
/**
 * Checks whether value is type of string
 * @param {any} value - value to be checked
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * Replaces mask {prefix} with actual value in the string
 * @param {string} value - text containg a mask
 * @param {string} prefix - value to be put in place of mask
 */
export function replacePrefix(value, prefix) {
    return !is(value) ? value : value.replace("{prefix}", prefix !== null && prefix !== void 0 ? prefix : "");
}
/**
 * Generates identifier for Cui element
 *
 * @param element - Cui element selector
 * @returns generated identifier
 */
export function generateCUID(element) {
    let starter = is(element) ? element : "cui-element";
    return `${starter}-${COMPONENTS_COUNTER.next().value}`;
}
/**
 * Generates random string
 */
export function generateRandomString() {
    let rand = getRandomInt(1, 1000);
    let rand2 = getRandomInt(1, 100);
    return `${Math.floor(Math.random() * rand2)}-${Math.floor(rand)}`;
}
/**
 * Generates random integer
 * @param min - min number
 * @param max - max number
 * @returns random integer
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function* counter() {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0;
        }
    }
}
export function all(array, condition) {
    return array && array.length > 0 && array.find((t) => !condition(t)) === undefined;
}
export function getHandlerExtendingOrNull(target, fName) {
    if (!is(target.$handlers)) {
        return null;
    }
    for (let handler in target.$handlers) {
        if (target.$handlers.hasOwnProperty(handler)) {
            let h = target.$handlers[handler];
            if (hasFunction(h, fName))
                return h;
        }
    }
    return null;
}
/**
 * Checks whether property exists on the object and it is a function
 * @param obj - object
 * @param fName - property name
 */
export function hasFunction(obj, fName) {
    return is(obj[fName]) && typeof obj[fName] === 'function';
}
/**
 * Gets closest parent element which is a cUI element
 * @param element
 */
export function getParentCuiElement(element) {
    if (!is(element)) {
        return undefined;
    }
    let parent = element.parentElement;
    return is(parent) && is(parent.$cuid) ? parent : getParentCuiElement(parent);
}
/**
 * Calculates element height by calculating childerns heights
 * @param element
 */
export function getChildrenHeight(element) {
    let height = 0;
    if (!element) {
        return -1;
    }
    Array.from(element.children).forEach((child) => {
        height += child.getBoundingClientRect().height;
    });
    return height > 0 ? height + 4 : height;
}
export function enumerateObject(object, callback) {
    if (!are(object, callback)) {
        return;
    }
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            callback(prop, object[prop]);
        }
    }
}
export function round(value, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.floor(value) / multiplier;
}
export function calculateNextIndex(val, currentIndex, totalLength) {
    let idx = -1;
    switch (val) {
        case 'prev':
            idx = currentIndex <= 0 ? totalLength - 1 : currentIndex - 1;
            break;
        case 'next':
            idx = currentIndex < totalLength - 1 ? currentIndex + 1 : 0;
            break;
        case 'first':
            idx = 0;
            break;
        case 'last':
            idx = totalLength - 1;
        default:
            idx = getIntOrDefault(val, -1);
            break;
    }
    return idx;
}
export function getFirstMatching(array, callback) {
    let count = array.length;
    if (!array || count === 0) {
        return undefined;
    }
    for (let idx = 0; idx < count; idx++) {
        if (callback(array[idx], idx)) {
            return array[idx];
        }
    }
    return undefined;
}
export function mapObject(input, callback) {
    return callback(input);
}
export function mapObjectArray(input, callback) {
    return input.map((item) => {
        return mapObject(item, callback);
    });
}
/**
 * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
 * @param callback - callback to execute
 * @param delayTime - time in ms that execution shall be delayed by
 * @returns Cancel callback
 */
export function delay(callback, delayTime) {
    if (!are(callback, delayTime)) {
        throw new Error("[delay]: Input arguments are not correct");
    }
    let id = null;
    return function (...args) {
        if (id === null) {
            id = setTimeout(() => {
                callback(...args);
                id = null;
            }, delayTime);
        }
        return function () {
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        };
    };
}
export function splitColon(text) {
    let ret = [];
    if (!is(text)) {
        return ret;
    }
    let split = text.split(":");
    if (split.length === 1) {
        return split;
    }
    let tag = split.shift();
    // @ts-ignore tag is always defined
    return [tag, split.join(":")];
}
