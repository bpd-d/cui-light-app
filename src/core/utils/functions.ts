import { CuiLightMode, CuiWindowSize } from "./types";
import { ArgumentError, RegisterElementError } from "../models/errors";
import { ICuiComponent, CuiElement } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
import { COMPONENTS_COUNTER, CUID_ATTRIBUTE } from "./statics";

/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 * 
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export function is(val: any, typecheck: boolean = true): boolean {
    if (typeof val !== 'undefined' && val !== null) {
        if (!typecheck) {
            return true;
        } else {
            return !isEmpty(val)
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
export function isEmpty(val: any): boolean {
    if (typeof val === "string") {
        return val.length === 0
    }
    if (typeof val === "boolean") {
        return val;
    }
    else if (Array.isArray(val)) {
        return val.length === 0
    }
    return false
}

export function getName(prefix: string, name: string) {
    if (!is(prefix) || !is(name)) {
        throw new ArgumentError("Missing argument value")
    }
    return `${prefix}-${name}`
}

export function sleep(timeout: number): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => {
        resolve(true)
    }, timeout));
}

/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export function createElementFromString(htmlString: string): Element | null {
    if (!is(htmlString)) {
        return null;
    }
    let template = document.createElement('template')
    template.innerHTML = htmlString
    return template.content.children.length > 0 ? template.content.children[0] : null;
}

export function getMatchingAttribute(element: any, attributes: string[]): string | null {
    let attr = null;
    let len = attributes.length;
    for (let i = 0; i < len; i++) {
        let attribute = attributes[i];
        if (element.hasAttribute(attribute)) {
            attr = attribute
            break;
        }
    }
    return attr;
}

export function getMatchingAttributes(element: any, attributes: string[]): string[] {
    if (!element || !is(element.hasAttribute)) {
        return [];
    }
    return attributes.filter(a => {
        return element.hasAttribute(a);
    });
}

export function getRangeValue(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}

export function getRangeValueOrDefault(value: number | undefined, min: number, max: number, def: number) {
    if (value === null || typeof value === 'undefined' || isNaN(value)) {
        return def;
    }
    return getRangeValue(value, min, max)
}

export function increaseValue(value: number, amount: number): number {
    return amount < 0 || amount > 1 ? 0 : value + (value * amount);
}

export function decreaseValue(value: number, amount: number): number {
    return amount < 0 || amount > 1 ? 0 : value - (value * amount);
}

export function clone(object: any): any {
    if (!is(object)) {
        return null;
    }
    return Object.assign({}, object);
}

export function getSingleColorRatio(first: number, second: number, max: number): number {
    return Math.abs(((first - second) / max) * 100)
}

/**
 * Creates string containg css selector for array of attributes
 * @param attributes - attributes values
 */
export function joinAttributesForQuery(attributes: string[]): string {
    if (!is(attributes)) {
        return ""
    }
    return `[${attributes.join('],[')}]`
}

/**
 * Checks light system light mode
 * @returns Light Mode - dark/light
 */
export function getSystemLightMode(): CuiLightMode {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Check print mode in the browser window
 * @returns true if window is displayed in print mode
 */
export function getSystemPrintMode(): boolean {
    return window.matchMedia &&
        window.matchMedia('print').matches;
}

/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export function are(...attributes: any[]): boolean {
    if (!is(attributes)) {
        return false
    }
    let c = attributes.length;
    for (let i = 0; i < c; i++) {
        if (!is(attributes[i])) {
            return false;
        }
    }
    return true;
}

export function calcWindowSize(width: number): CuiWindowSize {
    if (width <= 640) {
        return 'small';
    } else if (width > 640 && width <= 960) {
        return "medium"
    } else if (width > 960 && width <= 1200) {
        return "large"
    }
    return 'xlarge';
}

export function calcWindowSize2(width: number): CuiWindowSize {
    let size: CuiWindowSize = "none";
    if (width >= 640) {
        size = 'small';
    }
    if (width >= 960) {
        size = "medium";
    }
    if (width >= 1200) {
        size = "large"
    }

    if (width >= 1600) {
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
export function parseAttributeString(attribute: string | null): any {
    let ret: any = {};
    if (!is(attribute)) {
        return ret;
    }
    //@ts-ignore - null already checked
    ret = parseJsonString(attribute.trim())
    if (!is(ret)) {
        //@ts-ignore - null already checked
        if (!attribute.includes(';') && !attribute.includes(':')) {
            ret = attribute;
        } else {
            ret = {}
            //@ts-ignore - null already checked
            attribute.split(';').forEach(val => {
                let sp = splitColon(val);
                //let sp = val.split(':')
                let len = sp.length;
                let tag = undefined;
                let value = "";
                if (len < 2) {
                    return;
                }
                tag = sp[0].trim();
                value = sp[1].trim();
                if (tag)
                    ret[tag] = value.replace('U+0003B', ';');
            })
        }
    }
    return ret
}

/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */

export function parseJsonString(attribute: string): any | null {
    let out = null;
    if (is(attribute) && attribute.startsWith('{') && attribute.endsWith('}')) {
        try {
            out = jsonify(attribute);
        } catch (e) {
            console.error(prepLogString("An exception occured", 'Functions', 'parseJsonString'), e)
        }
        return out;
    }
    return null;
}

/**
 * Creates object from JSON string
 * @param attribute - JSON string
 */
export function jsonify(attribute: string): any {
    return attribute && attribute.length > 0 ? JSON.parse(attribute) : {}
}

export function getOffsetTop(element: HTMLElement) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetTop - parseInt(getStyleValue(element, 'margin-top')) - parseInt(getStyleValue(element, 'padding-top')) - parseInt(getStyleValue(element, 'border-top-width'))
    return val < 0 ? element.offsetTop : val;
}

export function getOffsetLeft(element: HTMLElement) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetLeft - parseInt(getStyleValue(element, 'margin-left')) - parseInt(getStyleValue(element, 'padding-left')) - parseInt(getStyleValue(element, 'border-left-width'))
    return val < 0 ? element.offsetLeft : val;
}

export function getIntOrDefault(value: any, def: number): number {
    let integer = parseInt(value);
    return isNaN(integer) ? def : integer;
}

export function getStyleValue(target: any, property: string): any {
    if (!is(target) || !is(property)) {
        return null;
    }
    if (target.currentStyle) {
        return target.currentStyle[property];
    } else if (window.getComputedStyle) {
        return window.getComputedStyle(target, null).getPropertyValue(property)
    }
    return null;
}

export function prepLogString(message: string, component: string, functionName?: string) {
    return `[${new Date().toLocaleString()}][${component ?? "-"}][${functionName ?? '-'}][${message}]`
}

export function isInRange(value: number, min: number, max: number): boolean {
    return is(value) && value >= min && value <= max;
}

export function getActiveClass(prefix: string) {
    return `${prefix ?? ""}-active`;
}

export function parseAttribute(element: Element, attribute: string): any {
    return are(element, attribute) ? parseAttributeString(element.getAttribute(attribute)) : null;
}


/**
 *  Checks whether string value contains synonym of true
 * @param value - string to check
 */
export function isStringTrue(value: string): boolean {
    return is(value) ? ['y', 't', 'true', 'yes'].includes(value.toLowerCase()) : false
}

export function boolStringOrDefault(prop: any, def: boolean): boolean {
    return is(prop) ? isStringTrue(prop) : def;
}

export function getStringOrDefault(value: any, def: string) {
    return is(value) ? value.toLowerCase() : def;
}

/**
 * Checks whether device supports touch
 */
export function isTouchSupported(): boolean {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

/**
 * Checks whether value is type of string
 * @param {any} value - value to be checked
 */
export function isString(value: any): boolean {
    return typeof value === 'string';
}


/**
 * Replaces mask {prefix} with actual value in the string
 * @param {string} value - text containg a mask
 * @param {string} prefix - value to be put in place of mask
 */
export function replacePrefix(value: string, prefix: string): string {
    return !is(value) ? value : value.replace("{prefix}", prefix ?? "");
}

/**
 * Generates identifier for Cui element
 * 
 * @param element - Cui element selector
 * @returns generated identifier
 */
export function generateCUID(element?: string) {
    let starter = is(element) ? element : "cui-element"
    return `${starter}-${COMPONENTS_COUNTER.next().value}`;
}

/**
 * Generates random string
 */
export function generateRandomString(): string {
    let rand = getRandomInt(1, 1000)
    let rand2 = getRandomInt(1, 100)
    return `${Math.floor(Math.random() * rand2)}-${Math.floor(rand)}`;
}
/**
 * Generates random integer
 * @param min - min number
 * @param max - max number
 * @returns random integer
 */
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Registers Element as Cui element, initializes handlers, sets component style to document header and sets $cuid
 * @param {any} node - document node
 * @param {ICuiComponent[]} components -supported components array
 * @param {string[]} attributes - supported attributes array
 * @param {CuiUtils} utils - Cui Utils instance
 */
export function registerCuiElement(node: any, components: ICuiComponent[], attributes: string[], utils: CuiUtils) {
    let element = node as CuiElement;
    element.$handlers = {};
    let matching: string[] = getMatchingAttributes(node, attributes)
    if (is(matching)) {
        element.$cuid = node.hasAttribute(CUID_ATTRIBUTE) ? node.getAttribute(CUID_ATTRIBUTE) : generateCUID(node.tagName)
        node.setAttribute(CUID_ATTRIBUTE, element.$cuid);
        matching.forEach(match => {
            let component = components.find(c => { return c.attribute === match });
            if (!is(component)) {
                return;
            }
            try {
                //@ts-ignore - component already checked agains undefined
                utils.styleAppender.append(component.getStyle());
                //@ts-ignore - component already checked agains undefined
                let handler = component.get(node, utils);
                //@ts-ignore - component already checked agains undefined
                element.$handlers[component.attribute] = handler;
                //@ts-ignore - component already checked agains undefined
                element.$handlers[component.attribute].handle(parseAttribute(node, component.attribute));
            } catch (e) {
                let attr = matching ? matching.join(", ") : "";
                throw new RegisterElementError(`An error occured during [${attr}] initialization: ${e.message}`);
            }

        })

    }
}

export function addCuiArgument<T extends object>(element: HTMLElement, cuiArg: string, args: T): boolean {
    if (!are(cuiArg, args, element)) {
        return false;
    }
    if (element.hasAttribute(cuiArg)) {
        return false;
    }
    let argArr: string[] = [];
    enumerateObject(args, (arg: string, value: string) => {
        argArr.push(`${arg}: ${value}`);
    })
    element.setAttribute(cuiArg, argArr.join("; "));
    return true;

}

export function* counter() {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0
        }
    }
}

export function getHandlerExtendingOrNull<T>(target: CuiElement, fName: string): T | null {
    if (!is(target.$handlers)) {
        return null;
    }

    for (let handler in target.$handlers) {

        if (target.$handlers.hasOwnProperty(handler)) {
            let h: any = target.$handlers[handler];
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
export function hasFunction(obj: any, fName: string) {
    return is(obj[fName]) && typeof obj[fName] === 'function'
}

/**
 * Gets closest parent element which is a cUI element
 * @param element 
 */
export function getParentCuiElement(element: Element): Element | undefined {
    if (!is(element)) {
        return undefined;
    }
    let parent = element.parentElement as any;
    return is(parent) && is(parent.$cuid) ? parent : getParentCuiElement(parent);
}

/**
 * Calculates element height by calculating childerns heights
 * @param element
 */
export function getChildrenHeight(element: Element): number {
    let height: number = 0;
    if (!element) {
        return -1;
    }
    Array.from(element.children).forEach((child: Element) => {
        height += child.getBoundingClientRect().height;
    })
    return height > 0 ? height + 4 : height;
}

export function enumerateObject<T extends object>(object: T, callback: (property: string, value: any) => void) {
    if (!are(object, callback)) {
        return;
    }
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            callback(prop, object[prop]);
        }
    }
}

export function round(value: number, decimalPlaces: number): number {
    const multiplier = 10 ** decimalPlaces;
    return Math.floor(value) / multiplier;
}

export function calculateNextIndex(val: any, currentIndex: number, totalLength: number): number {
    let idx = -1;
    switch (val) {
        case 'prev':
            idx = currentIndex <= 0 ? totalLength - 1 : currentIndex - 1;
            break;
        case 'next':
            idx = currentIndex < totalLength - 1 ? currentIndex + 1 : 0
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

export function getFirstMatching<T>(array: T[], callback: (t: T, index: number) => boolean): T | undefined {
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

export function mapObject<T, V>(input: T, callback: (t: T) => V): V {
    return callback(input);
}

export function mapObjectArray<T, V>(input: T[], callback: (t: T) => V): V[] {
    return input.map((item: T) => {
        return mapObject(item, callback);
    })
}

/**
 * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
 * @param callback - callback to execute
 * @param delayTime - time in ms that execution shall be delayed by
 * @returns Cancel callback
 */
export function delay(callback: (...args: any[]) => void, delayTime: number) {
    if (!are(callback, delayTime)) {
        throw new Error("[delay]: Input arguments are not correct")
    }
    let id: any = null;
    return function (...args: any[]) {
        if (id === null) {
            id = setTimeout(() => {
                callback(...args);
                id = null;
            }, delayTime)
        }
        return function () {
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        }
    }
}

export function splitColon(text: string): string[] {
    let ret: string[] = [];
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