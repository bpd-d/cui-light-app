(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cuiLight", [], factory);
	else if(typeof exports === 'object')
		exports["cuiLight"] = factory();
	else
		root["cuiLight"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "CUI_LIGHT_VERSION", function() { return /* binding */ CUI_LIGHT_VERSION; });
__webpack_require__.d(__webpack_exports__, "init", function() { return /* reexport */ init_init; });
__webpack_require__.d(__webpack_exports__, "ElementManager", function() { return /* reexport */ element_ElementManager; });

// CONCATENATED MODULE: ./src/core/models/errors.ts
class ErrorBase extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
class ItemNotFoundError extends ErrorBase {
    constructor(message) {
        super("ItemNotFoundError", message);
    }
}
class ArgumentError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}
class CuiBusError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}
class CuiInstanceInitError extends ErrorBase {
    constructor(message) {
        super("CuiInstanceInitError", message);
    }
}
class CuiScrollSpyOutOfRangeError extends ErrorBase {
    constructor(message) {
        super("CuiScrollSpyOutOfRangeError", message);
    }
}
class RegisterElementError extends ErrorBase {
    constructor(message) {
        super("RegisterElementError", message);
    }
}
class AnimatorError extends ErrorBase {
    constructor(message) {
        super("AnimatorError", message);
    }
}
class CSSVariableError extends ErrorBase {
    constructor(message) {
        super("CSSVariableError", message);
    }
}
class CuiColorError extends ErrorBase {
    constructor(message) {
        super("CuiColorError", message);
    }
}
class CuiPositionError extends ErrorBase {
    constructor(message) {
        super("CuiPositionError", message);
    }
}

// CONCATENATED MODULE: ./src/core/utils/statics.ts
//import { CuiColorPair } from "../models/colors";

const CUID_ATTRIBUTE = "cuid";
const CLASSES = {
    dark: 'dark',
    animProgress: 'animation-progress',
    print: 'print',
    active: 'active',
    swipingOn: "swiping-on",
    selectionOff: "selection-off",
};
const ATTRIBUTES = {
    root: "data-root"
};
const ICONS = {
    close: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 1.9999999,1.9999999 18,18\"></path><path d=\"M 18,1.9999999 1.9999999,18\"></path></svg>",
    accordion: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 5.0000475,7.4490018 10.000024,12.551028 15,7.4490018\"></path></svg>",
    special_menu: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path class=\"menu_handle_2\" d=\"M 1,10 H 19\"></path><path class=\"menu_handle_1\" d=\"M 1,4.8571429 H 19\"></path><path  class=\"menu_handle_3\" d=\"M 1,15.142857 H 19\"></path></svg>",
    special_fail: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-fail\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7.000001 A 43,43 0 0 1 92.999999,50 43,43 0 0 1 50,92.999999 43,43 0 0 1 7.0000011,50 43,43 0 0 1 50,7.000001 Z\"></path><path class=\"arm_1\" d=\"M 28.536809,28.536809 71.342023,71.342023\"></path><path class=\"arm_2\" d=\"M 71.342023,28.536809 28.536809,71.342023\"></path></svg>",
    special_success: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-success\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7 A 43,43 0 0 1 93,50 43,43 0 0 1 50,93 43,43 0 0 1 7,50 43,43 0 0 1 50,7 Z\"></path><path class=\"arm\" d=\"M 22.988405,48.234784 36.946233,72.410453 75.516456,33.84023\"></path></svg>",
};
// export const COLORS = ['red', 'green', 'blue', 'alpha']
// export const CSS_APP_BACKGROUND_COLORS: CuiColorPair = {
//     light: '--cui-color-light-app-background',
//     dark: '--cui-color-dark-app-background'
// }
// export const CSS_COMPONENT_BACKGROUND_COLORS: CuiColorPair = {
//     light: '--cui-color-light-background',
//     dark: '--cui-color-dark-background '
// }
// export const CSS_COMPONENT_BORDER_COLORS: CuiColorPair = {
//     light: '--cui-color-light-border',
//     dark: '--cui-color-dark-border'
// }
// export const CSS_THEMES = {
//     light: {
//         base: '--cui-color-light-base',
//         muted: '--cui-color-light-muted',
//         active: '--cui-color-light-active'
//     },
//     dark: {
//         base: '--cui-color-dark-base',
//         muted: '--cui-color-dark-muted',
//         active: '--cui-color-dark-active'
//     },
//     accent: {
//         base: '--cui-color-primary',
//         muted: '--cui-color-primary-muted',
//         active: '--cui-color-primary-active'
//     },
//     secondary: {
//         base: '--cui-color-secondary',
//         muted: '--cui-color-secondary-muted',
//         active: '--cui-color-secondary-active'
//     },
//     success: {
//         base: '--cui-color-success',
//         muted: '--cui-color-success-muted',
//         active: '--cui-color-success-active'
//     },
//     warning: {
//         base: '--cui-color-warning',
//         muted: '--cui-color-warning-muted',
//         active: '--cui-color-warning-active'
//     },
//     error: {
//         base: '--cui-color-error',
//         muted: '--cui-color-error-muted',
//         active: '--cui-color-error-active'
//     }
// }
const SCOPE_SELECTOR = ":scope ";
const CSS_VARIABLES = Object.freeze({
    fontSize: "--{prefix}-font-size",
    lineHeight: "--{prefix}-line-height",
    animationTime: "--{prefix}-animation-time",
    animationTimeLong: "--{prefix}-animation-time-long",
    animationTimeShort: "--{prefix}-animation-time-short",
    colorLightAppBackground: "--{prefix}-color-light-app-background",
    colorLightBackground: "--{prefix}-color-light-background",
    colorLightBorder: "--{prefix}-color-light-border",
    colorLightBase: "--{prefix}-color-light-base",
    colorLightActive: "--{prefix}-color-light-active",
    colorLightMuted: "--{prefix}-color-light-muted",
    colorDarkAppBackground: "--{prefix}-color-dark-app-background",
    colorDarkBackground: "--{prefix}-color-dark-background",
    colorDarkBorder: "--{prefix}-color-dark-border",
    colorDarkBase: "--{prefix}-color-dark-base",
    colorDarkActive: "--{prefix}-color-dark-active",
    colorDarkMuted: "--{prefix}-color-dark-muted",
    colorAccent: "--{prefix}-color-primary",
    colorAccentActive: "--{prefix}-color-primary-active",
    colorAccentMuted: "--{prefix}-color-primary-muted",
    colorAccentShade: "--{prefix}-color-primary-shade",
    colorAccentShadeDark: "--{prefix}-color-primary-shade-dark",
    colorSecondary: "--{prefix}-color-secondary",
    colorSecondaryActive: "--{prefix}-color-secondary-active",
    colorSecondaryMuted: "--{prefix}-color-secondary-muted",
    colorSecondaryShade: "--{prefix}-color-secondary-shade",
    colorSecondaryShadeDark: "--{prefix}-color-secondary-shade-dark",
    colorWarning: "--{prefix}-color-warning",
    colorWarningActive: "--{prefix}-color-warning-active",
    colorWarningMuted: "--{prefix}-color-warning-muted",
    colorWarningShade: "--{prefix}-color-warning-shade",
    colorWarningShadeDark: "--{prefix}-color-warning-shade-dark",
    colorSuccess: "--{prefix}-color-success",
    colorSuccessActive: "--{prefix}-color-success-active",
    colorSuccessMuted: "--{prefix}-color-success-muted",
    colorSuccessShade: "--{prefix}-color-success-shade",
    colorSuccessShadeDark: "--{prefix}-color-success-shade-dark",
    colorError: "--{prefix}-color-error",
    colorErrorActive: "--{prefix}-color-error-active",
    colorErrorMuted: "--{prefix}-color-error-muted",
    colorErrorShade: "--{prefix}-color-error-shade",
    colorErrorShadeDark: "--{prefix}-color-error-shade-dark",
    inputBackground: "--{prefix}-input-background-color",
    colorShade: "--{prefix}-color-shade",
    colorShadeDarker: "--{prefix}-color-shade-darker",
    colorShadeLight: "--{prefix}-color-shade-light",
    colorShadeLighter: "--{prefix}-color-shade-light-lighter",
    outline: "--{prefix}-outline",
    borderRadius: "--{prefix}-border-radius",
    padding: "--{prefix}-padding",
    margin: "--{prefix}-margin",
    scrollbarWidth: "--{prefix}-scrollbar-width",
    componentSpace: "--{prefix}-component-space",
    accordionIcon: "--{prefix}-accordion-icon"
});
class STATICS {
}
STATICS.logLevel = 'none';
STATICS.prefix = 'cui';
const EVENTS = Object.freeze({
    INSTANCE_INITIALIZED: 'instance-initialized',
    INSTANCE_FINISHED: 'instance-finished',
    RESIZE: "resize",
    OPEN: "open",
    OPENED: "opened",
    CLOSE: "close",
    CLOSED: "closed",
    TOGGLE: "toggle",
    TOGGLED: 'toggled',
    SWITCH: "switch",
    SWITCHED: "switched",
    ON_SCROLL: "scroll",
    TARGET_CHANGE: 'targetchange',
    INTERSECTION: 'intersection',
    KEYDOWN: 'keydown',
    SCROLLBY: 'scrollby',
    WINDOW_CLICK: 'windowclick',
    OFFSET: 'offset',
    PROGRESS_CHANGE: "progresschange",
    PROGRESS_CHANGED: "progresschanged",
    CHANGE: "change",
    CHANGED: "changed",
    GLOBAL_MOVE: "globalmove",
    MOVE_LOCK: "movelock",
    PAUSE: "pause",
    PAUSED: "paused",
    SORTED: "sorted",
    SORT_START: "sortstart",
    TOAST: "toast",
    TOAST_SHOW: "toastshow",
    TOAST_HIDDEN: "toasthidden",
    ALERT: "alert",
    GESTURE_DOWN: "gesture-down",
    GESTURE_UP: "gesture-up",
    GESTURE_LEFT: "gesture-left",
    GESTURE_RIGHT: "gesture-right",
    NOTIFY: "notify",
    NOTIFIED: "notified",
});
// export const GLOBAL_EVENTS = [EVENTS.ALERT, EVENTS.TOAST, EVENTS.KEYDOWN, EVENTS.MOVE_LOCK, EVENTS.GLOBAL_MOVE, EVENTS.RESIZE]
const OBSERVABLE_SCROLL = "SCROLL";
const OBSERVABLE_INTERSECTION = "INTERSECTION";
const COMPONENTS_COUNTER = counter();
const SCREEN_SIZE_SMALL = 640;
const SCREEN_SIZE_MEDIUM = 960;
const SCREEN_SIZE_LARGE = 1200;
const SCREEN_SIZE_XLARGE = 1600;
const MEASUREMENT = [];
const CuiRAF = window.requestAnimationFrame
    // || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    //  || window.msRequestAnimationFrame
    || function (f) { return setTimeout(f, 1000 / 60); };

// CONCATENATED MODULE: ./src/core/utils/functions.ts


/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
function is(val, typecheck = true) {
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
function isEmpty(val) {
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
function getName(prefix, name) {
    if (!is(prefix) || !is(name)) {
        throw new ArgumentError("Missing argument value");
    }
    return `${prefix}-${name}`;
}
function sleep(timeout) {
    return new Promise(resolve => setTimeout(() => {
        resolve(true);
    }, timeout));
}
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
function createElementFromString(htmlString) {
    if (!is(htmlString)) {
        return null;
    }
    let template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.children.length > 0 ? template.content.children[0] : null;
}
function getMatchingAttribute(element, attributes) {
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
function getRangeValue(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}
function getRangeValueOrDefault(value, min, max, def) {
    if (value === null || typeof value === 'undefined' || isNaN(value)) {
        return def;
    }
    return getRangeValue(value, min, max);
}
function increaseValue(value, amount) {
    return amount < 0 || amount > 1 ? 0 : value + (value * amount);
}
function decreaseValue(value, amount) {
    return amount < 0 || amount > 1 ? 0 : value - (value * amount);
}
function clone(object) {
    if (!is(object)) {
        return null;
    }
    return Object.assign({}, object);
}
function getSingleColorRatio(first, second, max) {
    return Math.abs(((first - second) / max) * 100);
}
/**
 * Creates string containg css selector for array of attributes
 * @param attributes - attributes values
 */
function joinAttributesForQuery(attributes) {
    if (!is(attributes)) {
        return "";
    }
    return `[${attributes.join('],[')}]`;
}
/**
 * Checks light system light mode
 * @returns Light Mode - dark/light
 */
function getSystemLightMode() {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
/**
 * Check print mode in the browser window
 * @returns true if window is displayed in print mode
 */
function getSystemPrintMode() {
    return window.matchMedia &&
        window.matchMedia('print').matches;
}
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
function are(...attributes) {
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
function calcWindowSize(width) {
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
 * Simply splits text by character or returns empty array
 * @param text Text to split
 * @param splitBy character to split by
 * @returns array of split characters
 */
function splitText(text, splitBy) {
    return text ? text.split(splitBy) : [];
}
function* generateSplitText(text, splitBy) {
    let array = splitText(text, splitBy);
    for (const item of array) {
        yield item;
    }
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
function parseAttributeString(attribute) {
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
                const pair = parseSingleAttribute(val);
                if (pair) {
                    ret[pair.key] = pair.value;
                }
            });
        }
    }
    return ret;
}
function parseSingleAttribute(value) {
    let sp = splitColon(value);
    if (sp.length < 2) {
        return undefined;
    }
    let tag = sp[0].trim();
    let val = sp[1].trim();
    return {
        key: tag,
        value: val.replace('U+0003B', ';')
    };
}
/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */
function parseJsonString(attribute) {
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
function jsonify(attribute) {
    return attribute && attribute.length > 0 ? JSON.parse(attribute) : {};
}
function getOffsetTop(element) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetTop - parseInt(getStyleValue(element, 'margin-top')) - parseInt(getStyleValue(element, 'padding-top')) - parseInt(getStyleValue(element, 'border-top-width'));
    return val < 0 ? element.offsetTop : val;
}
function getOffsetLeft(element) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetLeft - parseInt(getStyleValue(element, 'margin-left')) - parseInt(getStyleValue(element, 'padding-left')) - parseInt(getStyleValue(element, 'border-left-width'));
    return val < 0 ? element.offsetLeft : val;
}
function getIntOrDefault(value, def) {
    if (!value) {
        return def;
    }
    let integer = value.includes && value.includes('.') ? parseFloat(value) : parseInt(value);
    return isNaN(integer) ? def : integer;
}
function getStyleValue(target, property) {
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
function prepLogString(message, component, functionName) {
    return `[${new Date().toLocaleString()}][${component !== null && component !== void 0 ? component : "-"}][${functionName !== null && functionName !== void 0 ? functionName : '-'}][${message}]`;
}
function isInRange(value, min, max) {
    return is(value) && value >= min && value <= max;
}
function getActiveClass(prefix) {
    return `${prefix !== null && prefix !== void 0 ? prefix : ""}-active`;
}
function parseAttribute(element, attribute) {
    return are(element, attribute) ? parseAttributeString(element.getAttribute(attribute)) : null;
}
/**
 *  Checks whether string value contains synonym of true
 * @param value - string to check
 */
function isStringTrue(value) {
    return is(value) ? ['y', 't', 'true', 'yes'].includes(value.toLowerCase()) : false;
}
function boolStringOrDefault(prop, def) {
    return is(prop) ? isStringTrue(prop) : def;
}
function getStringOrDefault(value, def) {
    return is(value) ? value.toLowerCase() : def;
}
/**
 * Checks whether device supports touch
 */
function isTouchSupported() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}
/**
 * Checks whether value is type of string
 * @param {any} value - value to be checked
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Replaces mask {prefix} with actual value in the string
 * @param {string} value - text containg a mask
 * @param {string} prefix - value to be put in place of mask
 */
function replacePrefix(value, prefix) {
    return !is(value) ? value : value.replace("{prefix}", prefix !== null && prefix !== void 0 ? prefix : "");
}
/**
 * Generates identifier for Cui element
 *
 * @param element - Cui element selector
 * @returns generated identifier
 */
function generateCUID(element) {
    let starter = is(element) ? element : "cui-element";
    return `${starter}-${COMPONENTS_COUNTER.next().value}`;
}
/**
 * Generates random string
 */
function generateRandomString() {
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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function* counter() {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0;
        }
    }
}
function functions_all(array, condition) {
    return array && array.length > 0 && array.find((t) => !condition(t)) === undefined;
}
function getHandlerExtendingOrNull(target, fName) {
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
function hasFunction(obj, fName) {
    return is(obj[fName]) && typeof obj[fName] === 'function';
}
/**
 * Gets closest parent element which is a cUI element
 * @param element
 */
function getParentCuiElement(element) {
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
function getChildrenHeight(element) {
    let height = 0;
    if (!element) {
        return -1;
    }
    Array.from(element.children).forEach((child) => {
        height += child.getBoundingClientRect().height;
    });
    return height > 0 ? height + 4 : height;
}
function enumerateObject(object, callback) {
    if (!are(object, callback)) {
        return;
    }
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            callback(prop, object[prop]);
        }
    }
}
function round(value, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.floor(value) / multiplier;
}
function calculateNextIndex(val, currentIndex, totalLength) {
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
            idx = getRangeValueOrDefault(val, 0, totalLength, -1);
            break;
    }
    return idx;
}
function getFirstMatching(array, callback) {
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
function mapObject(input, callback) {
    return callback(input);
}
function mapObjectArray(input, callback) {
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
function functions_delay(callback, delayTime) {
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
function splitColon(text) {
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
function getEnumOrDefault(value, defVal, ...values) {
    if (values.includes(value)) {
        return value;
    }
    return defVal;
}
function joinWithScopeSelector(value) {
    return SCOPE_SELECTOR + value;
}
function measure(name) {
    const optName = name !== null && name !== void 0 ? name : "";
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const start = performance.now();
            const result = originalMethod.apply(this, args);
            const finish = performance.now();
            MEASUREMENT.push({
                target: optName,
                method: propertyKey,
                time: finish - start
            });
            return result;
        };
        return descriptor;
    };
}
;
function getChildSelectorFromScoped(scopedSelector) {
    const split = scopedSelector.split(">");
    return split[split.length - 1].trim();
}
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null));
        });
    });
}
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}
function matchesKeyCombo(event, compare) {
    return compare.key !== undefined && (compare.key === event.key) &&
        (event.ctrlKey === compare.isCtrl) &&
        (event.altKey === compare.isAlt) &&
        (event.shiftKey === compare.isShift);
}
/**
 * Performs query all and returns result as an array
 * @param root - root element to query from
 * @param selector - query selector
 * @returns list of found elements
 */
function queryAll(root, selector) {
    return [...root.querySelectorAll(selector)];
}
function findMatchingElementIndex(item, items) {
    return items.findIndex(i => i === item);
}
function getCuiElementsBySelector(selector) {
    let switches = is(selector) ? [...document.querySelectorAll(selector)] : [];
    return switches.reduce((result, item) => {
        if (item.$cuid) {
            //@ts-ignore
            result.push(item);
        }
        return result;
    }, []);
}

// CONCATENATED MODULE: ./src/core/models/setup.ts
class CuiSetup {
    constructor() {
        this.autoLightMode = false;
        this.scrollThreshold = 20;
        this.resizeThreshold = 20;
        this.prefix = "cui";
        this.plugins = {};
        this.root = document.body;
        this.parallaxAnimations = {};
    }
    fromInit(init) {
        var _a;
        this.prefix = (_a = init.prefix) !== null && _a !== void 0 ? _a : "cui";
        this.logLevel = init.logLevel;
        this.cacheSize = init.cacheSize;
        this.autoLightMode = init.autoLightMode;
        this.animationTime = init.animationTime;
        this.animationTimeShort = init.animationTimeShort;
        this.animationTimeLong = init.animationTimeLong;
        this.scrollThreshold = init.scrollThreshold;
        this.resizeThreshold = init.resizeThreshold;
        this.root = init.root;
        this.parallaxAnimations = init.parallaxAnimations;
        return this;
    }
}
class CuiSetupInit {
    constructor() {
        this.prefix = 'cui';
        this.app = '$cui';
        this.logLevel = 'warning';
        this.interaction = 'async';
        this.animationTime = 300;
        this.animationTimeShort = 150;
        this.animationTimeLong = 500;
        this.cacheSize = 500;
        this.autoLightMode = false;
        this.scrollThreshold = 20;
        this.resizeThreshold = 20;
        this.root = document.body;
        this.busSetup = undefined;
        this.development = undefined;
        this.parallaxAnimations = {};
    }
}

// CONCATENATED MODULE: ./src/core/development/console.ts

class console_CuiConsoleDevelopementTool {
    constructor(name, logLevel) {
        this._name = name;
        this._cuid = '-';
        this._level = logLevel !== null && logLevel !== void 0 ? logLevel : STATICS.logLevel;
    }
    registerElement(element, cuid, component) {
        this._cuid = cuid;
        console.log(this.prepString("Register element: " + cuid, 'debug', component));
    }
    unregisterElement(cuid, component) {
        this._cuid = '-';
        console.log(this.prepString("Unregister element: " + cuid, 'debug', component));
    }
    setProperty(cuid, component, name, t) {
        //throw new Error("Method not implemented.");
    }
    pushState(cuid, component, type, message, functionName) {
        this.logByType(type, message, functionName);
    }
    log(type, message, functionName) {
        this.logByType(type, message, functionName);
    }
    debug(message, functionName) {
        if (this._level === 'debug') {
            console.log(this.prepString(message, "debug", functionName));
        }
    }
    warning(message, functionName) {
        if (this._level === 'warning' || this._level === 'debug')
            console.warn(this.prepString(message, "warning", functionName));
    }
    error(message, functionName) {
        if (this._level === 'error' || this._level === 'debug' || this._level === 'warning')
            console.error(this.prepString(message, "error", functionName));
    }
    exception(e, functionName) {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, "exception", functionName));
        if (this._level === 'debug')
            console.error(e.stack);
    }
    setId(id) {
        if (id)
            this._cuid = id;
    }
    prepString(message, level, functionName) {
        return `[${new Date().toLocaleString()}][${level}][${this._name}][${functionName !== null && functionName !== void 0 ? functionName : '-'}][${this._cuid}][${message}]`;
    }
    logByType(type, message, functionName) {
        switch (type) {
            case 'debug':
                this.debug(message, functionName);
                break;
            case 'warning':
                this.warning(message, functionName);
                break;
            case 'error':
                this.error(message, functionName);
                break;
        }
    }
}

// CONCATENATED MODULE: ./src/core/development/factory.ts


class factory_CuiConsoleDevToolFactory {
    get(name) {
        return new console_CuiConsoleDevelopementTool(name);
    }
}
class factory_CuiDevtoolFactory {
    static get(name) {
        if (!STATICS.devTool) {
            STATICS.devTool = new factory_CuiConsoleDevToolFactory();
        }
        return STATICS.devTool.get(name);
    }
}

// CONCATENATED MODULE: ./src/core/api/functions.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function getMatchingComponents(node, components) {
    return components.filter(component => {
        return node.hasAttribute && node.hasAttribute(component.attribute);
    });
}
function createCuiElement(node, components, core) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!are(node, components, core)) {
            return false;
        }
        let element = node;
        if (!element.$cuid) {
            element.$cuid = node.hasAttribute(CUID_ATTRIBUTE) ? node.getAttribute(CUID_ATTRIBUTE) : generateCUID(node.tagName);
            node.setAttribute(CUID_ATTRIBUTE, element.$cuid);
        }
        for (let component of components) {
            yield createComponent(element, component, core, parseAttribute(element, component.attribute));
        }
        return true;
    });
}
function destroyCuiElement(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = node;
        if (!element.$handlers) {
            return false;
        }
        for (let name in element.$handlers) {
            yield destroyComponent(element, name);
        }
        return true;
    });
}
function addCuiArgument(element, cuiArg, args) {
    if (!are(cuiArg, args, element)) {
        return false;
    }
    if (element.hasAttribute(cuiArg)) {
        return false;
    }
    let argArr = [];
    enumerateObject(args, (arg, value) => {
        argArr.push(`${arg}: ${value}`);
    });
    element.setAttribute(cuiArg, argArr.join("; "));
    return true;
}
function createComponent(node, component, core, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node.$handlers) {
            node.$handlers = {};
        }
        // If handler already exists - ignore
        if (node.$handlers[component.attribute]) {
            return false;
        }
        try {
            let handler = component.get(node, core);
            node.$handlers[component.attribute] = handler;
            yield node.$handlers[component.attribute].handle(args);
        }
        catch (e) {
            throw new RegisterElementError(`An error occured during [${component.attribute}] initialization: ${e.message}`);
        }
        return true;
    });
}
function updateComponent(node, component, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node || !node.$handlers) {
            return false;
        }
        let handler = node.$handlers[component];
        if (!handler) {
            return false;
        }
        try {
            if (handler.refresh)
                yield handler.refresh(args);
        }
        catch (e) {
            throw new RegisterElementError(`An error occured during [${component}] update: ${e.message}`);
        }
        return true;
    });
}
function destroyComponent(node, component) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node || !node.$handlers) {
            return false;
        }
        let handler = node.$handlers[component];
        if (!handler) {
            return false;
        }
        try {
            yield handler.destroy();
        }
        catch (e) {
            throw new RegisterElementError(`An error occured during [${component}] destroy: ${e.message}`);
        }
        return true;
    });
}

// CONCATENATED MODULE: ./src/core/observers/mutations.ts
var mutations_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class mutations_CuiMutationObserver {
    constructor(element, core) {
        this._observer = undefined;
        this._plugins = undefined;
        this._options = undefined;
        this._element = element;
        this._log = factory_CuiDevtoolFactory.get("CuiMutationObserver");
        this._components = [];
        this._core = core;
        this._queryString = "";
    }
    setPlugins(plugins) {
        this._plugins = plugins;
        return this;
    }
    setComponents(components) {
        this._components = components;
        return this;
    }
    setAttributes(attributes) {
        this._options = {
            attributes: true,
            subtree: true,
            childList: true,
            attributeFilter: attributes,
        };
        this._queryString = joinAttributesForQuery(attributes);
        return this;
    }
    start() {
        this._log.debug("Starting");
        if (!this._options) {
            this._log.error("Cannot start - options are not defined");
            return this;
        }
        this._observer = new MutationObserver(this.mutationCallback.bind(this));
        this._observer.observe(this._element, this._options);
        this._log.debug("Started");
        return this;
    }
    stop() {
        this._log.debug("Stopping");
        if (!this._observer) {
            this._log.debug("Observer not available");
            return this;
        }
        this._observer.disconnect();
        this._observer = undefined;
        this._log.debug("Stopped");
        return this;
    }
    mutationCallback(mutations, observer) {
        mutations.forEach((mutation) => {
            switch (mutation.type) {
                case "attributes":
                    const item = mutation.target;
                    if (!are(mutation.attributeName, item)) {
                        this._log.error("Mutation attribute doesn't not exisist");
                        break;
                    }
                    // @ts-ignore attribute is defined
                    this.handeComponentUpdate(mutation.attributeName, item);
                    break;
                case "childList":
                    this.handleChildListMutation(mutation);
                    break;
            }
            if (is(this._plugins)) {
                // @ts-ignore plugins is defined here
                this._plugins.onMutation(mutation).then(() => {
                    //
                });
            }
        });
    }
    handeComponentUpdate(attributeName, item) {
        let args = parseAttribute(item, attributeName);
        updateComponent(item, attributeName, args)
            .then((result) => {
            this._log.debug("Component: " + attributeName + " updated with: " + result, "handeComponentUpdate");
        })
            .catch((e) => {
            this._log.exception(e);
        });
    }
    handleChildListMutation(mutation) {
        return mutations_awaiter(this, void 0, void 0, function* () {
            const addedLen = mutation.addedNodes.length;
            const removedLen = mutation.removedNodes.length;
            if (addedLen > 0) {
                this._log.debug("Registering added nodes: " + addedLen);
                try {
                    yield this.handleAddedNodes(mutation.addedNodes);
                }
                catch (e) {
                    this._log.exception(e);
                }
            }
            else if (removedLen > 0) {
                this._log.debug("Removing nodes: " + removedLen);
                try {
                    yield this.handleRemovedNodes(mutation.removedNodes);
                }
                catch (e) {
                    this._log.exception(e);
                }
            }
        });
    }
    handleAddedNodes(nodes) {
        return mutations_awaiter(this, void 0, void 0, function* () {
            for (let node of nodes) {
                yield this.handleAddedNode(node);
                let element = node;
                let children = element.hasChildNodes()
                    ? element.querySelectorAll(this._queryString)
                    : null;
                if (is(children)) {
                    // @ts-ignore children is defined
                    this._log.debug("Additional nodes to add: " + children.length);
                    // @ts-ignore children is defined
                    yield this.handleAddedChildren(children);
                }
            }
            return true;
        });
    }
    handleAddedChildren(nodes) {
        return mutations_awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let node of nodes) {
                result.push(yield this.handleAddedNode(node));
            }
            return result;
        });
    }
    handleAddedNode(node) {
        return mutations_awaiter(this, void 0, void 0, function* () {
            let matchingComponents = getMatchingComponents(node, this._components);
            return createCuiElement(node, matchingComponents, this._core);
        });
    }
    handleRemovedNodes(nodes) {
        return mutations_awaiter(this, void 0, void 0, function* () {
            for (let node of nodes) {
                yield destroyCuiElement(node);
                let element = node;
                let children = node.hasChildNodes()
                    ? element.querySelectorAll(this._queryString)
                    : null;
                if (is(children)) {
                    this._log.debug(
                    // @ts-ignore children is defined
                    "Additional nodes to remove: " + children.length);
                    // @ts-ignore children is defined
                    yield this.handleDestroyChildren(children);
                }
            }
            return true;
        });
    }
    handleDestroyChildren(nodes) {
        return mutations_awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let child of nodes) {
                result.push(yield destroyCuiElement(child));
            }
            return result;
        });
    }
}
class CuiComponentMutationHandler {
    constructor(target, selector) {
        this._options = {
            childList: true,
            subtree: true,
        };
        this._disabled = false;
        this._isObserving = false;
        this._element = target;
        this._selector = selector;
        this._callback = undefined;
        this._observer = new MutationObserver(this.mutationCallback.bind(this));
    }
    observe() {
        if (!this._isObserving && !this._disabled) {
            this._observer.observe(this._element, this._options);
            this._isObserving = true;
        }
    }
    unobserve() {
        if (this._isObserving) {
            this._observer.disconnect();
            this._isObserving = false;
        }
    }
    setSelector(selector) {
        this._selector = selector;
    }
    setAttributes(attributes) {
        if (attributes && attributes.length > 0) {
            this._options = Object.assign(Object.assign({}, this._options), { attributes: true, attributeFilter: attributes });
        }
        this._options = {
            childList: true,
            subtree: true,
        };
        this.unobserve();
    }
    isObserving() {
        return this._isObserving;
    }
    disable(flag) {
        this._disabled = flag;
        if (this._disabled) {
            this.unobserve();
        }
    }
    onMutation(callback) {
        this._callback = callback;
    }
    mutationCallback(record) {
        let records = record.reduce((result, record) => {
            if (this._selector && record.type === "childList") {
                if (this.matchesSelector(record)) {
                    result.push(record);
                }
            }
            else {
                result.push(record);
            }
            return result;
        }, []);
        if (this._callback) {
            this._callback(records);
        }
    }
    matchesSelector(record) {
        if (record.addedNodes.length > 0) {
            return this.isAnyItemMatching([
                ...record.addedNodes,
            ]);
        }
        if (record.removedNodes.length > 0) {
            return this.isAnyItemMatching([
                ...record.removedNodes,
            ]);
        }
        return false;
    }
    isAnyItemMatching(array) {
        return (array.find((node) => 
        //@ts-ignore
        node.matches(this._selector)) !== null);
    }
}

// CONCATENATED MODULE: ./src/core/utils/interactions.ts

class interactions_FastDom {
    constructor() {
        // private _raf: any;
        this._isScheduled = false;
        // this._raf = window.requestAnimationFrame.bind(window)
        this._writes = [];
        this._reads = [];
        this._limit = 5;
        this._reportCallback = undefined;
    }
    onError(callback) {
        this._reportCallback = callback;
    }
    mutate(callback, ctx, ...args) {
        this._reads.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    fetch(callback, ctx, ...args) {
        this._writes.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    createTask(callback, ctx, ...args) {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }
    run(tasks) {
        let task = null;
        while (task = tasks.shift()) {
            task();
        }
    }
    schedule(recursion) {
        if (!this._isScheduled) {
            this._isScheduled = true;
            if (recursion && recursion >= this._limit) {
                throw new Error("Fast Dom limit reached");
            }
            else {
                CuiRAF(this.flush.bind(this, recursion));
            }
        }
    }
    flush(recursion) {
        let rec = recursion !== null && recursion !== void 0 ? recursion : 0;
        let error = null;
        let writes = this._writes;
        let reads = this._reads;
        try {
            this.run(reads);
            this.run(writes);
        }
        catch (e) {
            if (this._reportCallback) {
                this._reportCallback(e);
            }
            else {
                console.error(`An error has been captured in interactions: ${e.message}`);
                //console.error(e)
            }
            error = e;
        }
        this._isScheduled = false;
        if (error || this._writes.length || this._reads.length) {
            this.schedule(rec + 1);
        }
    }
}
class interactions_SyncInteractions {
    constructor() {
        // raf: any;
        this.isRunning = false;
        this.tasks = [];
        // this.raf = window.requestAnimationFrame.bind(window)
    }
    mutate(callback, ctx, ...args) {
        this.tasks.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    fetch(callback, ctx, ...args) {
        this.tasks.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    schedule() {
        if (!this.isRunning) {
            this.isRunning = true;
            CuiRAF(this.flush.bind(this));
        }
    }
    flush() {
        let task = null;
        while (task = this.tasks.shift()) {
            try {
                task();
            }
            catch (e) {
            }
        }
        this.isRunning = false;
    }
    createTask(callback, ctx, ...args) {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }
}

// CONCATENATED MODULE: ./src/core/factories/interactions.ts

class interactions_CuiInteractionsFactory {
    /**
     * Gets new instance interactions provider
     * @param type - Interactions type
     */
    static get(type, errorReport) {
        const interactionType = type;
        switch (interactionType) {
            case 'async':
                const fastDom = new interactions_FastDom();
                if (errorReport)
                    fastDom.onError(errorReport);
                return fastDom;
            default:
                return new interactions_SyncInteractions();
        }
    }
}

// CONCATENATED MODULE: ./src/core/queue/queue.ts
var queue_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiQueue {
    constructor(adapter) {
        this._lock = false;
        this._items = [];
        this._adapter = adapter;
        this._comparer = undefined;
        this._onError = undefined;
    }
    add(item) {
        this._items.push(item);
        if (this._lock) {
            return;
        }
        this._lock = true;
        this.flush().then(() => {
            this._lock = false;
        });
    }
    delete(item) {
        const index = this._items.findIndex(_item => this.compare(_item, item));
        if (index < 0) {
            return undefined;
        }
        return this._items.splice(index, 1)[0];
    }
    isLocked() {
        return this._lock;
    }
    setCompareCallback(callback) {
        this._comparer = callback;
    }
    onError(callback) {
        this._onError = callback;
    }
    compare(item1, item2) {
        if (this._comparer) {
            return this._comparer(item1, item2);
        }
        return Object.is(item1, item2);
    }
    flush() {
        return queue_awaiter(this, void 0, void 0, function* () {
            const items = this.getItemsForFlush();
            if (items.length === 0) {
                return true;
            }
            try {
                yield this._adapter.onFlush(items);
            }
            catch (e) {
                this.callError(e, items);
            }
            return this.flush();
        });
    }
    getItemsForFlush() {
        if (this._adapter.type === 'batch') {
            let result = [...this._items];
            this._items = [];
            return result;
        }
        const item = this._items.shift();
        if (item) {
            return [item];
        }
        return [];
    }
    callError(error, items) {
        if (this._onError) {
            this._onError(error, items);
        }
    }
}

// CONCATENATED MODULE: ./src/core/bus/handlers.ts
var handlers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class handlers_EmitHandler {
    constructor(name, adapter) {
        this.log = factory_CuiDevtoolFactory.get(name);
        this.queue = new CuiQueue(adapter);
        this.queue.onError((e) => {
            this.log.error(e, "Flush");
        });
    }
    handle(events, cuid, args) {
        return handlers_awaiter(this, void 0, void 0, function* () {
            if (!is(events)) {
                this.log.warning("No events provided");
                return false;
            }
            this.queue.add({
                events: events,
                cuid: cuid,
                args: args
            });
            return true;
        });
    }
}
class SimpleEventEmitHandlerAdapter {
    constructor(executor) {
        this.type = 'single';
        this._executor = executor;
    }
    onFlush(items) {
        return handlers_awaiter(this, void 0, void 0, function* () {
            for (const task of items) {
                for (let id in task.events) {
                    let event = task.events[id];
                    if (idMatches(task.cuid, event.$cuid))
                        yield this._executor.execute(event.callback, task.args);
                }
            }
            return true;
        });
    }
}
class TaskedEventEmitHandlerAdapter {
    constructor(executor) {
        this.type = 'single';
        this._executor = executor;
    }
    onFlush(items) {
        return handlers_awaiter(this, void 0, void 0, function* () {
            for (const task of items) {
                let promises = [];
                for (let id in task.events) {
                    let event = task.events[id];
                    if (idMatches(task.cuid, event.$cuid))
                        promises.push(this._executor.execute(event.callback, task.args));
                }
                yield Promise.all(promises);
            }
            return true;
        });
    }
}
class CuiEventEmitHandlerFactory {
    static get(name, executor) {
        switch (name) {
            case "tasked":
                return new handlers_EmitHandler("TaskedEventEmitHandler", new TaskedEventEmitHandlerAdapter(executor));
            default:
                return new handlers_EmitHandler("SimpleEventEmitHandler", new SimpleEventEmitHandlerAdapter(executor));
        }
    }
}
function idMatches(emitId, handleId) {
    return !is(emitId) || (is(emitId) && emitId == handleId);
}

// CONCATENATED MODULE: ./src/core/bus/executors.ts
var executors_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiCallbackExecutor {
    execute(callback, args) {
        return executors_awaiter(this, void 0, void 0, function* () {
            try {
                callback(args);
                return true;
            }
            catch (e) {
            }
            return false;
        });
    }
}

// CONCATENATED MODULE: ./src/core/bus/bus.ts
var bus_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _isOn, _statistics;





class bus_CuiEventBus {
    constructor(emitHandler, name) {
        this._events = {};
        this._eventHandler = emitHandler;
        this._name = name !== null && name !== void 0 ? name : "CuiEventBus";
        this._log = factory_CuiDevtoolFactory.get(this._name);
    }
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to
     */
    on(name, callback, cui) {
        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument");
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = this._name + "-" + generateRandomString();
        if (!this._events[name]) {
            this._events[name] = {};
        }
        if (this.isAttached(this._events[name], id, cui)) {
            return null;
        }
        this._log.debug(`Attaching new event: [${name}] for: [${id}]`);
        this._events[name][id] = { callback: callback, $cuid: this.getCuid(cui) };
        return id;
    }
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name, id) {
        if (!are(name, id)) {
            throw new ArgumentError("Missing argument");
        }
        let ev = this._events[name];
        this._log.debug(`Detaching item: [${id}] from [${name}]`);
        if (this.isAttached(ev, id)) {
            delete ev[id];
        }
    }
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name) {
        if (is(name) && this._events[name]) {
            delete this._events[name];
        }
        else {
            this._log.error(`Event name is missing or incorrect`, "detachAll");
        }
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, cuid, args) {
        return bus_awaiter(this, void 0, void 0, function* () {
            if (!is(event)) {
                throw new ArgumentError("Event name is incorrect");
            }
            let callbacks = this._events[event];
            if (is(callbacks)) {
                this._log.debug(`Emit: [${event}]`);
                yield this._eventHandler.handle(callbacks, cuid, args);
            }
            return true;
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name, id, cui) {
        let ev = this._events[name];
        return this.isAttached(ev, id, cui);
    }
    /**
     * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
     * @param {string} event - event name
     * @param {string} cuid - cuid of the component
     */
    detachByCuid(event, cuid) {
        if (!are(event, cuid)) {
            return;
        }
        let ev = this._events[event];
        if (!is(ev)) {
            return;
        }
        enumerateObject(Object.assign({}, ev), (evId, evValue) => {
            if (evValue.$cuid === cuid) {
                delete ev[evId];
            }
        });
    }
    isAttached(ev, id, cui) {
        if (is(cui)) {
            // @ts-ignore
            return is(ev) && is(id) && is(ev[id]) && ev[id].$cuid == cui.$cuid;
        }
        return is(ev) && is(id) && is(ev[id]);
    }
    getCuid(cui) {
        // @ts-ignore
        return is(cui) ? cui.$cuid : null;
    }
}
class bus_CuiEventExtBus {
    constructor(setup) {
        this._log = factory_CuiDevtoolFactory.get("CuiEventBus");
        this._buses = [];
        this._events = {};
        this._last = 0;
        if (is(setup)) {
            this._log.debug("Initiating buses");
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority;
            });
            sorted.forEach((item, index) => {
                this._buses.push(this.initBusInstance(item.name, item.handler));
                this._events = Object.assign(Object.assign({}, this._events), this.mapEvents(item.eventsDef, index));
                this._log.debug(`Bus ${item.name} has been initialized with number: ${index}`);
            });
            this._buses.push(this.initBusInstance("DefaultEventBus", 'tasked'));
            this._last = this._buses.length - 1;
            this._log.debug(`Bus initialization finished`);
        }
    }
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to
     */
    on(name, callback, cui) {
        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument");
        }
        return this.get(name).on(name, callback, cui);
    }
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name, id, cui) {
        if (!are(name, id)) {
            throw new ArgumentError("Missing argument");
        }
        this.get(name).detach(name, id, cui);
    }
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name) {
        this.get(name).detachAll(name);
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, cuid, args) {
        return bus_awaiter(this, void 0, void 0, function* () {
            if (!is(event)) {
                throw new ArgumentError("Event name is incorrect");
            }
            return this.get(event).emit(event, cuid, args);
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name, id, cui) {
        return this.get(name).isSubscribing(name, id, cui);
    }
    /**
    * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
    * @param {string} event - event name
    * @param {string} cuid - cuid of the component
    */
    detachByCuid(event, cuid) {
        if (!are(event, cuid)) {
            return;
        }
        this.get(event).detachByCuid(event, cuid);
    }
    /**
     * Creates and initializes event bus instance
     * @param busName Event bus name for logger
     * @param handlerName handler name to create proper handler instance
     */
    initBusInstance(busName, handlerName) {
        if (!are(busName, handlerName)) {
            throw new ArgumentError("Bus name or handler name is incorrect");
        }
        let executor = new CuiCallbackExecutor();
        let handler = CuiEventEmitHandlerFactory.get(handlerName, executor);
        return new bus_CuiEventBus(handler, busName);
    }
    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    mapEvents(events, index) {
        return events.reduce((result, current) => {
            if (!result[current]) {
                return Object.assign(Object.assign({}, result), { [current]: index });
            }
            return result;
        }, {});
    }
    /**
     * Retrives porper event bus based on event name
     * @param event
     */
    get(event) {
        let idx = this._events[event];
        return this._buses[idx !== null && idx !== void 0 ? idx : this._last];
    }
}
class bus_CuiEventBusFactory {
    static get(setup) {
        //@ts-ignore - setup is underfined check is perfromed
        return is(setup) ? new bus_CuiEventExtBus(setup) : new bus_CuiEventBus(CuiEventEmitHandlerFactory.get('tasked', new CuiCallbackExecutor()));
    }
}
class CuiBusExtStatisticsHandler {
    constructor(gather, queueCount) {
        _isOn.set(this, void 0);
        _statistics.set(this, void 0);
        __classPrivateFieldSet(this, _isOn, gather);
        __classPrivateFieldSet(this, _statistics, {
            queueCount: queueCount,
            events: {}
        });
    }
    addEvent(event, queueNumber, emitCount) {
        __classPrivateFieldGet(this, _statistics).events[event] = {
            name: event,
            queueNumber: queueNumber,
            emits: emitCount !== null && emitCount !== void 0 ? emitCount : 0
        };
    }
    addQueue() {
        __classPrivateFieldGet(this, _statistics).queueCount += 1;
    }
    addEmit(event, queueNumber) {
        if (!__classPrivateFieldGet(this, _isOn)) {
            return;
        }
        if (__classPrivateFieldGet(this, _statistics).events[event]) {
            __classPrivateFieldGet(this, _statistics).events[event].emits += 1;
        }
        else {
            this.addEvent(event, queueNumber !== null && queueNumber !== void 0 ? queueNumber : -1, 1);
        }
    }
    getStatistics() {
        return __classPrivateFieldGet(this, _statistics);
    }
}
_isOn = new WeakMap(), _statistics = new WeakMap();

// CONCATENATED MODULE: ./src/core/styles/appender.ts

class appender_CuiDocumentStyleAppender {
    constructor(interactions) {
    }
    append(style) {
        if (is(style)) {
            const head = document.head || document.getElementsByTagName('head')[0];
            const node = document.createElement('style');
            const text = document.createTextNode(style);
            // node.type = 'text/css';
            node.appendChild(text);
            head.appendChild(node);
        }
        return true;
    }
}

// CONCATENATED MODULE: ./src/core/models/core.ts
var core_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var core_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _plugins;







class core_CuiCore {
    constructor(initialSetup, plugins) {
        _plugins.set(this, void 0);
        this.setup = new CuiSetup().fromInit(initialSetup);
        this.interactions = interactions_CuiInteractionsFactory.get(initialSetup.interaction, this.onInteractionError.bind(this));
        // this.cache = new CuiCacheManager(this.setup.cacheSize);
        this.bus = bus_CuiEventBusFactory.get(initialSetup.busSetup);
        // this.colors = new CuiInstanceColorHandler(this.interactions);
        this.styleAppender = new appender_CuiDocumentStyleAppender(this.interactions);
        core_classPrivateFieldSet(this, _plugins, plugins !== null && plugins !== void 0 ? plugins : []);
    }
    setLightMode(mode) {
        const name = getName(this.setup.prefix, CLASSES.dark);
        const classes = document.body.classList;
        if (mode === 'dark' && !classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.add(name);
            }, this);
        }
        else if (mode === 'light' && classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.remove(name);
            }, this);
        }
    }
    getLightMode() {
        const name = getName(this.setup.prefix, CLASSES.dark);
        return document.body.classList.contains(name) ? 'dark' : 'light';
    }
    setPrintMode(flag) {
        const name = getName(this.setup.prefix, CLASSES.print);
        const classes = document.body.classList;
        if (flag && !classes.contains(name)) {
            classes.add(name);
        }
        else if (!flag && classes.contains(name)) {
            classes.remove(name);
        }
    }
    isPrintMode() {
        const name = getName(this.setup.prefix, CLASSES.print);
        return document.body.classList.contains(name);
    }
    setProperty(name, value) {
        if (!are(name, value)) {
            throw new CSSVariableError("Property or value was not provided");
        }
        let prop = replacePrefix(name, this.setup.prefix);
        this.interactions.mutate(() => {
            document.documentElement.style.setProperty(prop, value);
        }, null);
    }
    isPlugin(name) {
        return is(name) && core_classPrivateFieldGet(this, _plugins).find(plugin => plugin === name);
    }
    onInteractionError(e) {
        console.error("An error has been captured from interactions");
        console.error(e);
    }
}
_plugins = new WeakMap();

// CONCATENATED MODULE: ./src/core/helpers/helpers.ts
var helpers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function getActionsHelper(interactions) {
    return {
        performActions: (target, actions, timeout, callback) => {
            function onFinish(resolve) {
                interactions.mutate(() => {
                    actions.forEach(x => x.remove(target));
                    target.classList.remove(CLASSES.animProgress);
                    if (callback)
                        callback();
                    resolve(true);
                }, null);
            }
            return new Promise((resolve) => {
                interactions.mutate(() => {
                    actions.forEach(x => x.add(target));
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        onFinish(resolve);
                    }, timeout);
                }, null);
            });
        }
    };
}
class helpers_CuiActionsHelper {
    constructor(interactions) {
        this._interactions = interactions;
    }
    performAction(target, action, timeout, callback) {
        return helpers_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this._interactions.mutate(() => {
                    action.add(target);
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        this._interactions.mutate(() => {
                            action.remove(target);
                            target.classList.remove(CLASSES.animProgress);
                            if (callback)
                                callback();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
    performActions(target, actions, timeout, callback) {
        return helpers_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this._interactions.mutate(() => {
                    actions.forEach(x => x.add(target));
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        this._interactions.mutate(() => {
                            actions.forEach(x => x.remove(target));
                            target.classList.remove(CLASSES.animProgress);
                            if (callback)
                                callback();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
    /**
     * Performs switch operation on two targets, by toggling in and out actions on in and out target.
     * Note: this runs in async
     * @param inTarget incoming target element
     * @param outTarget outgoing target element
     * @param inAction action for incoming target
     * @param outAction action for outgoing target
     * @param onFinish callback to be executed when perform is finished
     * @param timeout timeout for perfrom
     * @returns Promise when resolves after all acctions and callback are performed
     */
    performSwitchAction(inTarget, outTarget, inAction, outAction, onFinish, timeout) {
        return helpers_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this._interactions.mutate(() => {
                    inAction.forEach(x => x.add(inTarget));
                    inTarget.classList.add(CLASSES.animProgress);
                    if (is(outTarget)) {
                        //@ts-ignore
                        outAction.forEach(x => x.add(outTarget));
                        //@ts-ignore
                        outTarget.classList.add(CLASSES.animProgress);
                    }
                    setTimeout(() => {
                        this._interactions.mutate(() => {
                            inAction.forEach(x => x.remove(inTarget));
                            inTarget.classList.remove(CLASSES.animProgress);
                            if (is(outTarget)) {
                                //@ts-ignore
                                outAction.forEach(x => x.remove(outTarget));
                                //@ts-ignore
                                outTarget.classList.remove(CLASSES.animProgress);
                            }
                            onFinish();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
}

// CONCATENATED MODULE: ./src/core/utils/actions.ts
var actions_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var actions_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _class;

class actions_CuiClassAction {
    constructor(className) {
        _class.set(this, void 0);
        actions_classPrivateFieldSet(this, _class, className);
    }
    add(element, core) {
        if (are(element, actions_classPrivateFieldGet(this, _class)) && !element.classList.contains(actions_classPrivateFieldGet(this, _class))) {
            element.classList.add(actions_classPrivateFieldGet(this, _class));
        }
    }
    remove(element, core) {
        if (are(element, actions_classPrivateFieldGet(this, _class)) && element.classList.contains(actions_classPrivateFieldGet(this, _class))) {
            element.classList.remove(actions_classPrivateFieldGet(this, _class));
        }
    }
    toggle(element, core) {
        if (are(element, actions_classPrivateFieldGet(this, _class))) {
            if (element.classList.contains(actions_classPrivateFieldGet(this, _class))) {
                element.classList.remove(actions_classPrivateFieldGet(this, _class));
            }
            else {
                element.classList.add(actions_classPrivateFieldGet(this, _class));
            }
        }
    }
}
_class = new WeakMap();
class CuiInboundAction {
    constructor(name) {
        this._name = name;
    }
    add(element, core) {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                core.setLightMode('dark');
                break;
            case 'light-mode':
                core.setLightMode('light');
                break;
        }
    }
    remove(element, core) {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                core.setLightMode('light');
                break;
            case 'light-mode':
                core.setLightMode('dark');
                break;
        }
    }
    toggle(element, core) {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                this.setDarkMode(core);
                break;
            case 'light-mode':
                this.setDarkMode(core);
                break;
        }
    }
    setDarkMode(core) {
        if (core.getLightMode() === 'dark') {
            core.setLightMode('light');
        }
        else {
            core.setLightMode('dark');
        }
    }
}
class actions_AttributeAction {
    constructor(attribute) {
        [this._attributeName, this._attributeValue] = splitColon(attribute); // attribute.split(',')
    }
    add(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        element.setAttribute(this._attributeName, this._attributeValue);
    }
    remove(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        if (element.hasAttribute(this._attributeName)) {
            element.removeAttribute(this._attributeName);
        }
    }
    toggle(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        if (element.hasAttribute(this._attributeName)) {
            element.removeAttribute(this._attributeName);
        }
        else {
            element.setAttribute(this._attributeName, this._attributeValue);
        }
    }
}
class actions_StyleAction {
    constructor(attribute) {
        [this._attributeName, this._attributeValue] = splitColon(attribute);
    }
    add(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element;
        if (el.style && !el.style[this._attributeName]) {
            el.style[this._attributeName] = this._attributeValue;
        }
    }
    remove(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element;
        if (el.style && el.style[this._attributeName]) {
            el.style[this._attributeName] = "";
        }
    }
    toggle(element, core) {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element;
        if (!el.style) {
            return;
        }
        if (!el.style[this._attributeName]) {
            el.style[this._attributeName] = this._attributeValue;
        }
        else {
            delete el.style[this._attributeName];
        }
    }
}
class DummyAction {
    constructor() {
    }
    add(element, utils) {
    }
    remove(element, utils) {
    }
    toggle(element, utils) {
    }
}
class actions_CuiActionsFactory {
    static get(value) {
        if (!is(value)) {
            return new DummyAction();
        }
        let indicator = value[0];
        switch (indicator) {
            case '.':
                return new actions_CuiClassAction(value.substring(1));
            case '~':
                return new CuiInboundAction(value.substring(1));
            case "&":
                return new actions_AttributeAction(value.substring(1));
            case "^":
                return new actions_StyleAction(value.substring(1));
            default:
                return new actions_CuiClassAction(value);
        }
    }
}
class actions_CuiActionsListFactory {
    static get(value) {
        if (!is(value)) {
            return [];
        }
        const split = value.split(',');
        return split.map(single => {
            return actions_CuiActionsFactory.get(single.trim());
        });
    }
}

// CONCATENATED MODULE: ./src/app/managers/element.ts
var element_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class element_ElementManager {
    constructor(elements, utils) {
        this._elements = elements;
        this._isLocked = false;
        this._logger = factory_CuiDevtoolFactory.get("ElementManager");
        this._core = utils;
        this._cDt = Date.now();
        this._actionsHelper = new helpers_CuiActionsHelper(utils.interactions);
    }
    toggleClass(className) {
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                element.setAttribute(attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
            }, 'setAttribute');
        });
    }
    setAttributeAs(attributeName, attributeValue) {
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                this._core.interactions.mutate(element.setAttribute, element, attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
            }, 'setAttributeAs');
        });
    }
    removeAttribute(attributeName) {
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                element.removeAttribute(attributeName);
            }, 'removeAttribute');
        });
    }
    removeAttributeAs(attributeName) {
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(attributeName)) {
                return false;
            }
            return this.call((element) => {
                this._core.interactions.mutate(element.removeAttribute, element, attributeName);
            }, 'removeAttributeAs');
        });
    }
    toggleAttribute(attributeName, attributeValue) {
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(eventName) || !is(callback)) {
                return false;
            }
            return this.call((element) => {
                element.addEventListener(eventName, callback);
            }, 'event');
        });
    }
    call(callback, functionName) {
        return element_awaiter(this, void 0, void 0, function* () {
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
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(actionStr)) {
                return false;
            }
            let act = actions_CuiActionsFactory.get(actionStr);
            return this.animate(animationClass, timeout, (element) => {
                act.add(element);
            });
        });
    }
    removeAction(actionStr, animationClass, timeout) {
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(actionStr)) {
                return false;
            }
            let act = actions_CuiActionsFactory.get(actionStr);
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
        return element_awaiter(this, void 0, void 0, function* () {
            if (!is(animationClass)) {
                return false;
            }
            const delay = (_a = timeout !== null && timeout !== void 0 ? timeout : this._core.setup.animationTime) !== null && _a !== void 0 ? _a : 0;
            const action = new actions_CuiClassAction(animationClass);
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

// CONCATENATED MODULE: ./src/app/managers/plugins.ts
var plugins_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class plugins_CuiPluginManager {
    constructor(plugins) {
        this._plugins = plugins !== null && plugins !== void 0 ? plugins : [];
        this._log = factory_CuiDevtoolFactory.get("CuiPluginManager");
        this._mutated = [];
    }
    init(core) {
        this._log.debug("Plugins initialization started: " + this._plugins.length);
        this._mutated = this._plugins.filter((plugin) => {
            return is(plugin.mutation);
        });
        this._plugins.forEach(plugin => {
            plugin.init(core);
            core.setup.plugins[plugin.description] = plugin.setup;
        });
        this._log.debug("Plugins have been initialized");
    }
    get(name) {
        if (!is(name)) {
            return undefined;
        }
        return this._plugins.find(p => p.name === name);
    }
    has(name) {
        return is(this.get(name));
    }
    onMutation(mutation) {
        return plugins_awaiter(this, void 0, void 0, function* () {
            let tasks = [];
            this._mutated.forEach((plugin) => {
                tasks.push(plugin.mutation(mutation));
            });
            let result = yield Promise.all(tasks);
            return result.find(val => {
                val === false;
            }) ? false : true;
        });
    }
}

// CONCATENATED MODULE: ./src/core/api/handler.ts
var handler_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class handler_CuiApiHandler {
    constructor(components, core) {
        this._components = components;
        this._core = core;
    }
    registerComponent(node) {
        return handler_awaiter(this, void 0, void 0, function* () {
            let matching = getMatchingComponents(node, this._components);
            if (!matching || matching.length === 0) {
                return false;
            }
            return createCuiElement(node, matching, this._core);
        });
    }
    updateComponent(node, component, args) {
        return handler_awaiter(this, void 0, void 0, function* () {
            if (!node.hasAttribute(component)) {
                return false;
            }
            return updateComponent(node, component, args);
        });
    }
    destroyComponent(node) {
        return handler_awaiter(this, void 0, void 0, function* () {
            return destroyCuiElement(node);
        });
    }
}

// CONCATENATED MODULE: ./src/app/instance.ts
var instance_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










class instance_CuiInstance {
    constructor(setup, plugins, components) {
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        if (setup.development)
            STATICS.devTool = setup.development;
        this._plugins = new plugins_CuiPluginManager(plugins);
        this._components = components !== null && components !== void 0 ? components : [];
        this._core = new core_CuiCore(setup, plugins.map(plugin => { return plugin.name; }));
        this._log = factory_CuiDevtoolFactory.get("CuiInstance");
        this._rootElement = setup.root;
        this._mutationObserver = undefined;
        this._mutatedAttributes = [];
        this._api = new handler_CuiApiHandler(this._components, this._core);
    }
    init() {
        return instance_awaiter(this, void 0, void 0, function* () {
            this._log.debug("Instance started", "init");
            // Init elements
            if (!is(window.MutationObserver)) {
                throw new CuiInstanceInitError("Mutation observer does not exists");
            }
            this._mutatedAttributes = this._components.map(x => { return x.attribute; }); // MUTATED_ATTRIBUTES; 
            const initElements = is(this._mutatedAttributes) ? this._rootElement.querySelectorAll(joinAttributesForQuery(this._mutatedAttributes)) : null;
            if (is(initElements)) {
                //@ts-ignore initElements already checked
                this._log.debug(`Initiating ${initElements.length} elements`);
                let promises = [];
                //@ts-ignore initElements already checked
                for (let element of initElements) {
                    try {
                        let matchingComponents = getMatchingComponents(element, this._components);
                        promises.push(createCuiElement(element, matchingComponents, this._core));
                    }
                    catch (e) {
                        this._log.exception(e);
                    }
                }
                yield Promise.all(promises);
            }
            this._log.debug("Init plugins", "init");
            // Init plugins
            this._plugins.init(this._core);
            if (are(this._components, this._mutatedAttributes)) {
                this._log.debug("Init mutation observer", "init");
                this._mutationObserver = new mutations_CuiMutationObserver(this._rootElement, this._core);
                this._mutationObserver.setComponents(this._components).setAttributes(this._mutatedAttributes);
                this._mutationObserver.setPlugins(this._plugins);
                this._mutationObserver.start();
            }
            this._log.debug("Setting CSS globals", 'init');
            this._core.interactions.mutate(() => {
                this._core.setProperty(CSS_VARIABLES.animationTimeLong, `${this._core.setup.animationTimeLong}ms`);
                this._core.setProperty(CSS_VARIABLES.animationTime, `${this._core.setup.animationTime}ms`);
                this._core.setProperty(CSS_VARIABLES.animationTimeShort, `${this._core.setup.animationTimeShort}ms`);
            }, null);
            this._core.bus.emit(EVENTS.INSTANCE_INITIALIZED, null);
            return this;
        });
    }
    finish() {
        if (this._mutationObserver)
            this._mutationObserver.stop();
        this._core.bus.emit(EVENTS.INSTANCE_FINISHED, null);
    }
    get(selector) {
        const elements = this.all(selector);
        if (!elements) {
            return undefined;
        }
        const newElement = new element_ElementManager(elements, this._core);
        return newElement;
    }
    all(selector) {
        const nodes = document.querySelectorAll(selector);
        if (!is(nodes)) {
            return undefined;
        }
        return [...nodes];
    }
    getUtils() {
        return this._core; //;
    }
    on(event, callback, element) {
        if (!are(event, callback)) {
            this._log.error("Incorrect arguments", "on");
            return null;
        }
        return this._core.bus.on(event, callback, element);
    }
    detach(event, id) {
        if (!are(event, id)) {
            this._log.error("Incorrect arguments", "detach");
        }
        this._core.bus.detach(event, id);
    }
    detachAll(event) {
        if (!is(event)) {
            this._log.error("Incorrect arguments", "detachAll");
        }
        this._core.bus.detachAll(event);
    }
    emit(event, element, ...args) {
        if (!are(event, element)) {
            this._log.warning("Not enough data to emit event", "emit");
            return;
        }
        let cuid = null;
        if (typeof element === 'string' && element.startsWith('~')) {
            cuid = element.substring(1);
        }
        else {
            let el = typeof element === 'string' ? document.querySelector(element) : element;
            cuid = el.$cuid;
        }
        if (!is(cuid)) {
            this._log.warning("Element is not a cUI element", "emit");
            return;
        }
        this._core.bus.emit(event, cuid, ...args);
    }
    getPlugin(name) {
        return this._plugins.get(name);
    }
    api() {
        return this._api;
    }
    /**
     * Creates cUI element outside of cUI root scope
     * @param element
     * @param arg
     * @param data
     */
    createCuiElement(element, arg, data) {
        return instance_awaiter(this, void 0, void 0, function* () {
            if (!is(arg) || !this._mutatedAttributes.includes(arg)) {
                this._log.error("Element cannot be created: Unknown attribute");
                return false;
            }
            let component = this._components.find(component => component.attribute === arg);
            if (!component)
                return false;
            if (addCuiArgument(element, arg, data)) {
                return createCuiElement(element, [component], this._core);
            }
            return false;
        });
    }
}

// CONCATENATED MODULE: ./src/core/animation/definitions.ts
const SWIPE_ANIMATIONS_DEFINITIONS = {
    "slide": {
        current: {
            left: {
                transform: {
                    translateX: {
                        from: 0,
                        to: -100,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: 0,
                        to: 100,
                        unit: "%"
                    }
                }
            }
        },
        previous: {
            left: {
                transform: {
                    translateX: {
                        from: 100,
                        to: 0,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: -100,
                        to: 0,
                        unit: "%"
                    }
                }
            }
        }
    },
    fade: {
        current: {
            left: {
                opacity: {
                    from: 1,
                    to: 0
                }
            },
            right: {
                opacity: {
                    from: 1,
                    to: 0
                }
            }
        },
        previous: {
            left: {
                opacity: {
                    from: 0,
                    to: 1
                }
            },
            right: {
                opacity: {
                    from: 0,
                    to: 1
                }
            }
        }
    },
    push: {
        current: {
            left: {
                transform: {
                    translateX: {
                        from: 0,
                        to: -10,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: 0,
                        to: 10,
                        unit: "%"
                    }
                }
            }
        },
        previous: {
            left: {
                transform: {
                    translateX: {
                        from: 100,
                        to: 0,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: -100,
                        to: 0,
                        unit: "%"
                    }
                }
            }
        }
    }
};

// CONCATENATED MODULE: ./src/app/initializer.ts
var initializer_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





function initIcons(setup) {
    return initializer_awaiter(this, void 0, void 0, function* () {
        if (!is(setup.icons)) {
            return;
        }
        for (let icon in setup.icons) {
            ICONS[icon] = setup.icons[icon];
        }
        return;
    });
}
function initSwipeAnimations(setup) {
    return initializer_awaiter(this, void 0, void 0, function* () {
        if (!is(setup.swipeAnimations)) {
            return;
        }
        for (let animation in setup.swipeAnimations) {
            SWIPE_ANIMATIONS_DEFINITIONS[animation] =
                setup.swipeAnimations[animation];
        }
        return;
    });
}
function initInstance(root, settings) {
    return (setup) => initializer_awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            root[settings.app] = new instance_CuiInstance(settings, (_a = setup.plugins) !== null && _a !== void 0 ? _a : [], (_b = setup.components) !== null && _b !== void 0 ? _b : []);
            yield root[settings.app].init();
        }
        catch (e) {
            console.error(e);
            return e.message;
        }
        return;
    });
}
function checkIfExists(root, prefix) {
    return () => initializer_awaiter(this, void 0, void 0, function* () {
        if (is(root[prefix])) {
            return "Instance is already initialized";
        }
    });
}
function CuiInitializer(setup) {
    return initializer_awaiter(this, void 0, void 0, function* () {
        const _window = window;
        let settings = Object.assign(Object.assign({}, new CuiSetupInit()), setup.setup);
        const appPrefix = settings.app;
        const result = {
            result: false,
        };
        const steps = [
            checkIfExists(_window, appPrefix),
            initIcons,
            initSwipeAnimations,
            initInstance(_window, settings),
        ];
        for (let step of steps) {
            const errMsg = yield step(setup);
            if (errMsg) {
                result.message = errMsg;
                return result;
            }
        }
        result.result = true;
        return result;
    });
}

// CONCATENATED MODULE: ./src/plugins/base.ts
var base_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiPlugin {
    constructor(setup) {
        this._onDestroy = undefined;
        this._callback = setup.callback;
        this.name = setup.name;
        this.description = setup.description;
        this.setup = setup.setup;
        this._extensions = [];
    }
    init(utils) {
        if (this._callback) {
            [this._extensions, this._onDestroy] = this._callback(utils, this.setup);
        }
        this.forEachExtension((extension) => {
            return extension.init(utils);
        }).then((result) => {
        });
    }
    destroy() {
        this.forEachExtension((extension) => {
            return extension.finish();
        }).then((result) => {
        });
        if (this._onDestroy) {
            this._onDestroy();
        }
    }
    forEachExtension(callback) {
        return base_awaiter(this, void 0, void 0, function* () {
            if (!this._extensions || this._extensions.length === 0) {
                return true;
            }
            const promises = [];
            this._extensions.forEach((extension) => {
                promises.push(callback(extension));
            });
            yield Promise.all(promises);
            return true;
        });
    }
}
function getPluginEventExtension(setup) {
    let _utils = undefined;
    let _handleId = null;
    function getCui() {
        var _a;
        return { $cuid: (_a = setup.id) !== null && _a !== void 0 ? _a : setup.name };
    }
    return {
        init: (utils) => base_awaiter(this, void 0, void 0, function* () {
            _utils = utils;
            if (_handleId) {
                return false;
            }
            _handleId = utils.bus.on(setup.name, setup.callback, getCui());
            return true;
        }),
        finish: () => base_awaiter(this, void 0, void 0, function* () {
            if (!_utils || !_handleId) {
                return false;
            }
            _utils.bus.detach(setup.name, _handleId, getCui());
            _handleId = null;
            return true;
        })
    };
}
function getPluginListenerExtension(setup) {
    return {
        init: (utils) => base_awaiter(this, void 0, void 0, function* () {
            if (setup.listener.isAttached()) {
                return false;
            }
            setup.listener.attach();
            return true;
        }),
        finish: () => base_awaiter(this, void 0, void 0, function* () {
            if (!setup.listener.isAttached()) {
                return false;
            }
            setup.listener.detach();
            return true;
        })
    };
}

// CONCATENATED MODULE: ./src/core/builders/element.ts

class element_ElementBuilder {
    constructor(tag) {
        this._tag = tag;
        this._classes = [];
        this._attributes = undefined;
        this._id = undefined;
        this._text = undefined;
        this._children = [];
        this._rawChildren = [];
        this._evName = undefined;
        this._callback = undefined;
    }
    setId(id) {
        this._id = id;
        return this;
    }
    setClasses(...classList) {
        this._classes = classList;
        return this;
    }
    setAttributes(attributes) {
        this._attributes = attributes;
        return this;
    }
    setTextContent(text) {
        this._text = text;
        return this;
    }
    setChildren(...elements) {
        this._children = [...elements];
        return this;
    }
    setRawChildren(...elements) {
        this._rawChildren = [...elements];
        return this;
    }
    onEvent(name, callback) {
        this._evName = name;
        this._callback = callback;
        return this;
    }
    build(innerHTML) {
        let element = document.createElement(this._tag);
        if (is(this._id)) {
            // @ts-ignore id is checked
            element.id = this._id;
        }
        if (is(this._classes)) {
            element.classList.add(...this._classes);
        }
        if (is(this._attributes)) {
            // @ts-ignore attributes are checked
            enumerateObject(this._attributes, (attr, value) => {
                element.setAttribute(attr, value);
            });
        }
        if (is(innerHTML)) {
            // @ts-ignore innerHTML checked already
            element.innerHTML = innerHTML;
        }
        else if (is(this._text)) {
            // @ts-ignore text checked already
            element.textContent = this._text;
        }
        this._rawChildren.forEach(raw => { element.appendChild(raw.build()); });
        this._children.forEach(child => element.appendChild(child));
        if (are(this._evName, this._callback)) {
            // @ts-ignore
            element.addEventListener(this._evName, (ev) => {
                // @ts-ignore
                this._callback(ev);
            });
        }
        return element;
    }
}

// CONCATENATED MODULE: ./src/plugins/alert/builder.ts
var builder_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var builder_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _header, _body, _footer, _prefix, _switches, _reverse;


class builder_DialogBuilder {
    constructor(prefix, reverse, switches) {
        _header.set(this, void 0);
        _body.set(this, void 0);
        _footer.set(this, void 0);
        _prefix.set(this, void 0);
        _switches.set(this, void 0);
        _reverse.set(this, void 0);
        builder_classPrivateFieldSet(this, _prefix, prefix);
        builder_classPrivateFieldSet(this, _header, builder_classPrivateFieldSet(this, _footer, builder_classPrivateFieldSet(this, _body, undefined)));
        builder_classPrivateFieldSet(this, _switches, switches !== null && switches !== void 0 ? switches : "");
        builder_classPrivateFieldSet(this, _reverse, reverse);
    }
    createHeader(title, classes, elements) {
        if (!is(classes)) {
            classes = [];
        }
        if (!is(elements)) {
            elements = [];
        }
        let headerBuilder = new element_ElementBuilder('div');
        headerBuilder.setClasses(`${builder_classPrivateFieldGet(this, _prefix)}-dialog-header`, ...classes);
        builder_classPrivateFieldSet(this, _header, headerBuilder.build());
        let titleElement = new element_ElementBuilder('span').setClasses(this.getPrefixedString("-dialog-title")).build(title);
        builder_classPrivateFieldGet(this, _header).appendChild(titleElement);
        // @ts-ignore
        this.appendChildrens(builder_classPrivateFieldGet(this, _header), ...elements);
    }
    createFooter(classes, elements) {
        if (!is(classes)) {
            classes = [];
        }
        if (!is(elements)) {
            elements = [];
        }
        builder_classPrivateFieldSet(this, _footer, new element_ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-footer"), ...classes).build());
        // @ts-ignore
        this.appendChildrens(builder_classPrivateFieldGet(this, _footer), ...elements);
    }
    createBody(classes, elements) {
        if (!is(classes)) {
            classes = [];
        }
        if (!is(elements)) {
            elements = [];
        }
        builder_classPrivateFieldSet(this, _body, new element_ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-body"), ...classes).build());
        // @ts-ignore
        this.appendChildrens(builder_classPrivateFieldGet(this, _body), ...elements);
    }
    build(id) {
        let classes = [this.getPrefixedString("-dialog")];
        if (builder_classPrivateFieldGet(this, _reverse)) {
            classes.push(this.getPrefixedString('-reverse-auto'));
        }
        let dialog = new element_ElementBuilder('div').setId(id).setClasses(...classes).setAttributes({
            [this.getPrefixedString('-dialog')]: builder_classPrivateFieldGet(this, _switches)
        }).build();
        let container = new element_ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-container")).build();
        if (builder_classPrivateFieldGet(this, _header))
            container.appendChild(builder_classPrivateFieldGet(this, _header));
        if (builder_classPrivateFieldGet(this, _body))
            container.appendChild(builder_classPrivateFieldGet(this, _body));
        if (builder_classPrivateFieldGet(this, _footer))
            container.appendChild(builder_classPrivateFieldGet(this, _footer));
        dialog.appendChild(container);
        return dialog;
    }
    appendChildrens(parent, ...elements) {
        if (is(elements)) {
            elements.forEach((element) => parent.appendChild(element));
        }
    }
    getPrefixedString(str) {
        return builder_classPrivateFieldGet(this, _prefix) + str;
    }
}
_header = new WeakMap(), _body = new WeakMap(), _footer = new WeakMap(), _prefix = new WeakMap(), _switches = new WeakMap(), _reverse = new WeakMap();

// CONCATENATED MODULE: ./src/plugins/alert/handler.ts
var handler_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var handler_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _callbacks, _utils, _id, _manager, _attid, _id_1, _id_2, _id_3;




class handler_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        _callbacks.set(this, void 0);
        _utils.set(this, void 0);
        _id.set(this, void 0);
        _manager.set(this, void 0);
        _attid.set(this, void 0);
        handler_classPrivateFieldSet(this, _callbacks, {
            "yes": data.onYes,
            "no": data.onNo,
            "cancel": data.onCancel,
            "ok": data.onOk
        });
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        handler_classPrivateFieldSet(this, _utils, setup);
        handler_classPrivateFieldSet(this, _id, id);
        this.reverse = false;
        handler_classPrivateFieldSet(this, _attid, null);
        this.closeStr = `${handler_classPrivateFieldGet(this, _utils).setup.prefix}-close`;
        this.iconStr = `${handler_classPrivateFieldGet(this, _utils).setup.prefix}-icon`;
        handler_classPrivateFieldSet(this, _manager, undefined);
    }
    getId() {
        return handler_classPrivateFieldGet(this, _id);
    }
    show(root) {
        if (!handler_classPrivateFieldGet(this, _utils)) {
            return;
        }
        let element = document.getElementById(handler_classPrivateFieldGet(this, _id));
        if (!is(element)) {
            element = this.createElement();
            handler_classPrivateFieldGet(this, _utils).interactions.mutate(() => {
                // @ts-ignore - already checked
                root.appendChild(element);
            }, null);
        }
        else {
            // @ts-ignore - already checked
            this.updateElement(element);
        }
        setTimeout(() => {
            // @ts-ignore - already checked
            handler_classPrivateFieldSet(this, _manager, new element_ElementManager([element], handler_classPrivateFieldGet(this, _utils)));
            let ids = handler_classPrivateFieldGet(this, _manager).on('closed', this.onClose.bind(this));
            handler_classPrivateFieldSet(this, _attid, ids.length > 0 ? ids[0] : null);
            handler_classPrivateFieldGet(this, _manager).emit("open");
        }, 50);
    }
    updateElement(element) {
        handler_classPrivateFieldGet(this, _utils).interactions.fetch(() => {
            let title = element.querySelector(`.${this.prefix}-dialog-title`);
            let content = element.querySelector(`.${this.prefix}-dialog-body>p`);
            handler_classPrivateFieldGet(this, _utils).interactions.mutate(() => {
                if (title) {
                    title.innerHTML = this.title;
                }
                if (content) {
                    content.innerHTML = this.content;
                }
            }, null);
        }, null);
    }
    onClose(arg) {
        try {
            if (is(arg) && arg.state && handler_classPrivateFieldGet(this, _callbacks)) {
                if (is(handler_classPrivateFieldGet(this, _callbacks)[arg.state])) {
                    let callback = handler_classPrivateFieldGet(this, _callbacks)[arg.state];
                    if (callback) {
                        callback();
                    }
                }
            }
        }
        finally {
            if (handler_classPrivateFieldGet(this, _attid) != null) {
                if (handler_classPrivateFieldGet(this, _manager))
                    handler_classPrivateFieldGet(this, _manager).detach('closed', handler_classPrivateFieldGet(this, _attid));
                handler_classPrivateFieldSet(this, _attid, null);
            }
            handler_classPrivateFieldSet(this, _manager, undefined);
        }
    }
}
_callbacks = new WeakMap(), _utils = new WeakMap(), _id = new WeakMap(), _manager = new WeakMap(), _attid = new WeakMap();
class handler_CuiAlertHandler extends handler_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_1.set(this, void 0);
        handler_classPrivateFieldSet(this, _id_1, id);
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new builder_DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, [], [
            new element_ElementBuilder('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new element_ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new element_ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: cancel" }).build("Cancel"),
            new element_ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ]);
        return dialogBuilder.build(handler_classPrivateFieldGet(this, _id_1));
    }
}
_id_1 = new WeakMap();
class handler_CuiInfoAlertUpHandler extends handler_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_2.set(this, void 0);
        handler_classPrivateFieldSet(this, _id_2, id);
        this.content = data.message;
        ;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new builder_DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, []);
        dialogBuilder.createBody([], [
            new element_ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new element_ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ]);
        return dialogBuilder.build(handler_classPrivateFieldGet(this, _id_2));
    }
}
_id_2 = new WeakMap();
class handler_CuiYesNoPopUpHandler extends handler_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_3.set(this, void 0);
        handler_classPrivateFieldSet(this, _id_3, id);
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new builder_DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, [], [
            new element_ElementBuilder('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new element_ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new element_ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: no" }).build("No"),
            new element_ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: yes" }).build("Yes")
        ]);
        return dialogBuilder.build(handler_classPrivateFieldGet(this, _id_3));
    }
}
_id_3 = new WeakMap();
class CuiAlertFactory {
    static get(id, type, data, utils) {
        if (type === "Info") {
            return new handler_CuiInfoAlertUpHandler(utils, id, data);
        }
        else if (type === 'YesNoCancel') {
            return new handler_CuiYesNoPopUpHandler(utils, id, data);
        }
        else if (type === 'OkCancel') {
            return new handler_CuiAlertHandler(utils, id, data);
        }
        return undefined;
    }
}

// CONCATENATED MODULE: ./src/plugins/alert/alert.ts




function CuiAlertsPluginFn() {
    const pluginName = "alert-plugin";
    return new CuiPlugin({
        name: pluginName,
        description: "CuiAlertsPlugin",
        setup: undefined,
        callback: (utils) => {
            const log = factory_CuiDevtoolFactory.get("CuiAlertsPlugin");
            function onAlert(event) {
                if (!validateEvent(event)) {
                    log.error("Event validation failed");
                    return;
                }
                let popup = CuiAlertFactory.get(event.id, event.type, event.options, utils);
                if (!popup) {
                    log.error("Possibly incorrect alert type");
                    return;
                }
                popup.show(utils.setup.root);
            }
            function validateEvent(event) {
                if (!event || !event.id || !event.type || !event.options) {
                    return false;
                }
                return true;
            }
            return [
                [getPluginEventExtension({
                        name: EVENTS.ALERT,
                        id: pluginName,
                        callback: onAlert
                    })],
                undefined
            ];
        }
    });
}
// export class CuiAlertsPlugin implements ICuiPlugin {
//     description: string;
//     name: string;
//     setup: any;
//     #handleId: string | null;
//     #utils: CuiUtils | undefined;
//     #log: ICuiDevelopmentTool;
//     constructor() {
//         this.name = "alert-plugin";
//         this.description = "CuiAlertsPlugin";
//         this.#handleId = null;
//         this.#utils = undefined;
//         //@ts-ignore
//         this.#log = null;
//     }
//     init(utils: CuiUtils): void {
//         this.#log = CuiDevtoolFactory.get("CuiAlertsPlugin");
//         this.#utils = utils;
//         this.detach();
//         this.#handleId = this.#utils.bus.on(EVENTS.ALERT, this.onAlert.bind(this), { $cuid: this.name });
//     }
//     destroy(): void {
//         this.detach();
//     }
//     private detach() {
//         if (this.#handleId && this.#utils) {
//             this.#utils.bus.detach(EVENTS.ALERT, this.#handleId);
//             this.#handleId = null;
//         }
//     }
//     private onAlert(event: CuiAlertEvent) {
//         if (!this.#utils) {
//             this.#log.error("Utils are not set");
//             return;
//         }
//         if (!this.validateEvent(event)) {
//             this.#log.error("Event validation failed");
//             return;
//         }
//         let popup = CuiAlertFactory.get(event.id, event.type, event.options, this.#utils);
//         if (!popup) {
//             this.#log.error("Possibly incorrect alert type");
//             return;
//         }
//         popup.show(this.#utils.setup.root);
//     }
//     private validateEvent(event: CuiAlertEvent): boolean {
//         if (!event || !event.id || !event.type || !event.options) {
//             return false;
//         }
//         return true
//     }
// }

// CONCATENATED MODULE: ./src/plugins/click/click.ts


function CuiWindowClickPluginFn() {
    return new CuiPlugin({
        name: 'click-plugin',
        description: "CuiWindowClickPlugin",
        setup: undefined,
        callback: (utils) => {
            function onWindowClick(ev) {
                utils.bus.emit(EVENTS.WINDOW_CLICK, null, {
                    ev: ev,
                    source: "CuiWindowClickPlugin",
                    timestamp: Date.now(),
                    name: EVENTS.WINDOW_CLICK
                });
            }
            window.addEventListener('click', onWindowClick);
            return [
                [],
                () => {
                    window.removeEventListener('click', onWindowClick);
                }
            ];
        }
    });
}
// export class CuiWindowClickPlugin implements ICuiPlugin {
//     description: string;
//     name: string = 'click-plugin';
//     setup: any;
//     #bus: ICuiEventBus | undefined;
//     #boundClick: (ev: MouseEvent) => void;
//     constructor() {
//         this.description = "CuiWindowClickPlugin";
//         this.#bus = undefined;
//         this.#boundClick = this.onWindowClick.bind(this);
//     }
//     init(utils: CuiUtils): void {
//         this.#bus = utils.bus;
//         window.addEventListener('click', this.#boundClick)
//     }
//     destroy(): void {
//         window.removeEventListener('click', this.#boundClick);
//     }
//     onWindowClick(ev: MouseEvent) {
//         if (this.#bus)
//             this.#bus.emit<GlobalClickEvent>(EVENTS.WINDOW_CLICK, null, {
//                 ev: ev,
//                 source: "CuiWindowClickPlugin",
//                 timestamp: Date.now(),
//                 name: EVENTS.WINDOW_CLICK
//             })
//     }
// }

// CONCATENATED MODULE: ./src/plugins/focus/focus.ts

const DEFAULT_FOCUS_VISIBLE = "focus-visible";
const DEFAULT_FOCUS_PRECISE = "focus-precise";
function CuiLightFocusPluginFn(setup) {
    return new CuiPlugin({
        name: "focus-plugin",
        description: "CuiLightFocusPlugin",
        setup: Object.assign({ keybordClass: DEFAULT_FOCUS_VISIBLE, mouseClass: DEFAULT_FOCUS_PRECISE, touchClass: DEFAULT_FOCUS_PRECISE }, setup),
        callback: (utils, setup) => {
            let _currentCls = undefined;
            let _inputType = 'none';
            function update(type) {
                let cls = getClass(type, setup);
                setClasses(cls, _currentCls, () => {
                    _currentCls = cls;
                    _inputType = type;
                });
            }
            function onMouseEvent(ev) {
                if (_inputType === 'mouse') {
                    return;
                }
                update('mouse');
            }
            function onKeyDownEvent(ev) {
                if (_inputType === 'keyboard') {
                    return;
                }
                update('keyboard');
            }
            function onTouchEvent(ev) {
                if (_inputType === 'touch') {
                    return;
                }
                update('touch');
            }
            function setClasses(cls, prevCls, callback) {
                if (!utils.interactions || cls === prevCls) {
                    return;
                }
                utils.interactions.fetch(() => {
                    let hasCls = cls && document.body.classList.contains(cls);
                    let hasPrevCls = prevCls && document.body.classList.contains(prevCls);
                    // @ts-ignore interactions is set
                    utils.interactions.mutate(() => {
                        if (!hasCls)
                            // @ts-ignore cls is set
                            document.body.classList.add(cls);
                        if (hasPrevCls) {
                            // @ts-ignore prevCls is set
                            document.body.classList.remove(prevCls);
                        }
                        callback();
                    }, null);
                }, null);
            }
            document.body.addEventListener('touchstart', onTouchEvent);
            document.body.addEventListener('mousedown', onMouseEvent);
            window.addEventListener('keydown', onKeyDownEvent);
            return [
                [],
                () => {
                    document.body.removeEventListener('touchstart', onTouchEvent);
                    document.body.removeEventListener('mousedown', onMouseEvent);
                    window.removeEventListener('keydown', onKeyDownEvent);
                }
            ];
        }
    });
}
function getClass(type, setup) {
    switch (type) {
        case "keyboard":
            return setup.keybordClass;
        case "mouse":
            return setup.mouseClass;
        case "touch":
            return setup.touchClass;
        default:
            return undefined;
    }
}
// export class CuiLightFocusPlugin implements ICuiPlugin {
//     description: string;
//     name: string;
//     setup: ICuiLightFocusPluginSetup;
//     #interactions: IUIInteractionProvider | undefined;
//     #inputType: FocusInputType;
//     #onMouseListener: any;
//     #onTouchListener: any;
//     #onKeyDownListener: any;
//     #currentCls: string | undefined;
//     constructor(setup: ICuiLightFocusPluginSetup) {
//         this.setup = {
//             keybordClass: DEFAULT_FOCUS_VISIBLE,
//             mouseClass: DEFAULT_FOCUS_PRECISE,
//             touchClass: DEFAULT_FOCUS_PRECISE,
//             ...setup
//         }
//         this.description = "CuiLightFocusPlugin";
//         this.name = "focus-plugin";
//         this.#interactions = undefined;
//         this.#onKeyDownListener = this.onKeyDownEvent.bind(this);
//         this.#onMouseListener = this.onMouseEvent.bind(this);
//         this.#onTouchListener = this.onTouchEvent.bind(this);
//         this.#inputType = 'none';
//         this.#currentCls = undefined;
//     }
//     init(utils: CuiUtils): void {
//         this.#interactions = utils.interactions;
//         document.body.addEventListener('touchstart', this.#onTouchListener);
//         document.body.addEventListener('mousedown', this.#onMouseListener);
//         window.addEventListener('keydown', this.#onKeyDownListener);
//     }
//     private onMouseEvent(ev: MouseEvent) {
//         if (this.#inputType === 'mouse') {
//             return;
//         }
//         this.update('mouse');
//     }
//     private onKeyDownEvent(ev: KeyboardEvent) {
//         if (this.#inputType === 'keyboard') {
//             return;
//         }
//         this.update('keyboard');
//     }
//     private onTouchEvent(ev: TouchEvent) {
//         if (this.#inputType === 'touch') {
//             return;
//         }
//         this.update('touch');
//     }
//     private update(type: FocusInputType) {
//         let cls = this.getClass(type);
//         this.setClasses(cls, this.#currentCls, () => {
//             this.#currentCls = cls
//             this.#inputType = type;
//         })
//     }
//     private getClass(type: FocusInputType): string | undefined {
//         switch (type) {
//             case "keyboard":
//                 return this.setup.keybordClass;
//             case "mouse":
//                 return this.setup.mouseClass;
//             case "touch":
//                 return this.setup.touchClass;
//             default:
//                 return undefined;
//         }
//     }
//     private setClasses(cls: string | undefined, prevCls: string | undefined, callback: () => void) {
//         if (!this.#interactions || cls === prevCls) {
//             return;
//         }
//         this.#interactions.fetch(() => {
//             let hasCls = cls && document.body.classList.contains(cls);
//             let hasPrevCls = prevCls && document.body.classList.contains(prevCls);
//             // @ts-ignore interactions is set
//             this.#interactions.mutate(() => {
//                 if (!hasCls)
//                     // @ts-ignore cls is set
//                     document.body.classList.add(cls);
//                 if (hasPrevCls) {
//                     // @ts-ignore prevCls is set
//                     document.body.classList.remove(prevCls);
//                 }
//                 callback();
//             }, null)
//         }, null)
//     }
//     destroy(): void {
//         document.body.removeEventListener('touchstart', this.#onTouchListener);
//         document.body.removeEventListener('mousedown', this.#onMouseListener);
//         window.removeEventListener('keydown', this.#onKeyDownListener);
//     }
// }

// CONCATENATED MODULE: ./src/plugins/keys/listener.ts
var listener_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var listener_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var listener_callback, _keys, _inProgress, _singleEmit, _isAttached, _onKeyDownBound, _onKeyUpBound;

class listener_CuiKeyPressListener {
    constructor(singleEmit, keys) {
        listener_callback.set(this, void 0);
        _keys.set(this, void 0);
        _inProgress.set(this, void 0);
        _singleEmit.set(this, void 0);
        _isAttached.set(this, void 0);
        _onKeyDownBound.set(this, void 0);
        _onKeyUpBound.set(this, void 0);
        listener_classPrivateFieldSet(this, _inProgress, false);
        listener_classPrivateFieldSet(this, _singleEmit, true);
        listener_classPrivateFieldSet(this, _isAttached, false);
        listener_classPrivateFieldSet(this, listener_callback, undefined);
        listener_classPrivateFieldSet(this, _keys, keys !== null && keys !== void 0 ? keys : []);
        listener_classPrivateFieldSet(this, _onKeyDownBound, this.onKeyDown.bind(this));
        listener_classPrivateFieldSet(this, _onKeyUpBound, this.onKeyUp.bind(this));
    }
    setCallback(callback) {
        listener_classPrivateFieldSet(this, listener_callback, callback);
    }
    isInProgress() {
        return listener_classPrivateFieldGet(this, _inProgress);
    }
    attach() {
        document.addEventListener('keydown', listener_classPrivateFieldGet(this, _onKeyDownBound));
        if (listener_classPrivateFieldGet(this, _singleEmit)) {
            document.addEventListener('keyup', listener_classPrivateFieldGet(this, _onKeyUpBound));
        }
        listener_classPrivateFieldSet(this, _isAttached, true);
    }
    detach() {
        document.removeEventListener('keydown', listener_classPrivateFieldGet(this, _onKeyDownBound));
        if (listener_classPrivateFieldGet(this, _singleEmit)) {
            document.addEventListener('keyup', listener_classPrivateFieldGet(this, _onKeyUpBound));
        }
        listener_classPrivateFieldSet(this, _isAttached, false);
    }
    isAttached() {
        return listener_classPrivateFieldGet(this, _isAttached);
    }
    onKeyDown(ev) {
        if (listener_classPrivateFieldGet(this, _inProgress)) {
            return;
        }
        listener_classPrivateFieldSet(this, _inProgress, true);
        try {
            if ((!is(listener_classPrivateFieldGet(this, _keys)) || listener_classPrivateFieldGet(this, _keys).includes(ev.code)) && listener_classPrivateFieldGet(this, listener_callback)) {
                listener_classPrivateFieldGet(this, listener_callback).call(this, ev);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            if (!listener_classPrivateFieldGet(this, _singleEmit))
                listener_classPrivateFieldSet(this, _inProgress, false);
        }
    }
    onKeyUp(ev) {
        listener_classPrivateFieldSet(this, _inProgress, false);
    }
}
listener_callback = new WeakMap(), _keys = new WeakMap(), _inProgress = new WeakMap(), _singleEmit = new WeakMap(), _isAttached = new WeakMap(), _onKeyDownBound = new WeakMap(), _onKeyUpBound = new WeakMap();

// CONCATENATED MODULE: ./src/plugins/keys/observer.ts
var observer_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var observer_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _listener, _bus;


class observer_CuiKeysObserver {
    constructor(bus) {
        _listener.set(this, void 0);
        _bus.set(this, void 0);
        observer_classPrivateFieldSet(this, _bus, bus);
        observer_classPrivateFieldSet(this, _listener, new listener_CuiKeyPressListener(true));
        observer_classPrivateFieldGet(this, _listener).setCallback(this.onKeyDown.bind(this));
    }
    connect() {
        observer_classPrivateFieldGet(this, _listener).attach();
    }
    disconnect() {
        observer_classPrivateFieldGet(this, _listener).detach();
    }
    onKeyDown(ev) {
        observer_classPrivateFieldGet(this, _bus).emit(EVENTS.KEYDOWN, null, {
            timestamp: Date.now(),
            name: EVENTS.KEYDOWN,
            source: "CuiKeysObserver",
            event: ev
        });
    }
}
_listener = new WeakMap(), _bus = new WeakMap();

// CONCATENATED MODULE: ./src/plugins/keys/keys.ts


function CuiKeysObserverPluginFn(setup) {
    return new CuiPlugin({
        name: 'keys-plugin',
        description: "CuiKeysObserverPlugin",
        setup: setup,
        callback: (utils, setup) => {
            const observer = new observer_CuiKeysObserver(utils.bus);
            observer.connect();
            return [
                [],
                () => { observer.disconnect(); }
            ];
        }
    });
}
// export class CuiKeysObserverPlugin implements ICuiPlugin {
//     description: string;
//     name: string = 'keys-plugin';
//     setup: CuiKeysObserverPluginSetup;
//     #keysObserver: ICuiKeysObserver | undefined;
//     constructor(keySetup: CuiKeysObserverPluginSetup) {
//         this.description = "CuiKeysObserverPlugin";
//         this.setup = keySetup;
//         this.#keysObserver = undefined;
//     }
//     init(utils: CuiUtils): void {
//         this.#keysObserver = new CuiKeysObserver(utils.bus);
//         this.#keysObserver.connect();
//     }
//     destroy(): void {
//         if (this.#keysObserver)
//             this.#keysObserver.disconnect();
//     }
// }

// CONCATENATED MODULE: ./src/core/listeners/media.ts
var media_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var media_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _onEventBound;
class CuiMediaQueryListener {
    constructor(mediaQuery) {
        _onEventBound.set(this, void 0);
        this._mediaQuery = mediaQuery;
        this._isInitialized = false;
        this._callback = undefined;
        this._inProgress = false;
        media_classPrivateFieldSet(this, _onEventBound, this.event.bind(this));
    }
    setCallback(callback) {
        this._callback = callback;
    }
    isInProgress() {
        return this._inProgress;
    }
    attach() {
        if (!window.matchMedia || this._isInitialized || !this._mediaQuery) {
            return;
        }
        window.matchMedia(this._mediaQuery)
            .addEventListener('change', media_classPrivateFieldGet(this, _onEventBound));
        this._isInitialized = true;
    }
    detach() {
        if (this._isInitialized) {
            window.matchMedia(this._mediaQuery).removeEventListener('change', media_classPrivateFieldGet(this, _onEventBound));
            this._isInitialized = false;
        }
    }
    isAttached() {
        return this._isInitialized;
    }
    event(ev) {
        if (this._inProgress || !this._callback) {
            return;
        }
        this._inProgress = true;
        try {
            this._callback(ev);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this._inProgress = false;
        }
    }
}
_onEventBound = new WeakMap();

// CONCATENATED MODULE: ./src/plugins/light/light.ts



function CuiAutoLightModePluginFn(setup) {
    const _description = "CuiAutoLightModePlugin";
    return new CuiPlugin({
        name: 'auto-light',
        description: _description,
        setup: setup,
        callback: (utils, setup) => {
            function onChange(ev) {
                var _a;
                let autoLightSetup = utils.setup.plugins[_description];
                let autoLight = (_a = autoLightSetup === null || autoLightSetup === void 0 ? void 0 : autoLightSetup.autoLight) !== null && _a !== void 0 ? _a : false;
                if (autoLight) {
                    utils.setLightMode(ev.matches ? "dark" : "light");
                }
            }
            if (setup.autoLight && getSystemLightMode() === 'dark') {
                utils.setLightMode('dark');
            }
            const listener = new CuiMediaQueryListener('(prefers-color-scheme: dark)');
            listener.setCallback(onChange);
            return [
                [getPluginListenerExtension({
                        listener: listener
                    })],
                undefined
            ];
        }
    });
}

// CONCATENATED MODULE: ./src/core/listeners/move.ts

class move_CuiMoveEventListener {
    constructor(element) {
        this._isLocked = false;
        this._element = element !== null && element !== void 0 ? element : document.body;
        this._isAttached = false;
        this._preventDefault = false;
        this._onEvent = undefined;
        this._target = undefined;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }
    setCallback(callback) {
        this._onEvent = callback;
    }
    setTarget(element) {
        this._target = element;
    }
    isInProgress() {
        return this._isLocked;
    }
    preventDefault(flag) {
        this._preventDefault = flag;
    }
    attach() {
        if (this._isAttached) {
            return;
        }
        //@ts-ignore
        this._element.addEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        this._element.addEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        this._element.addEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        this._element.addEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        this._element.addEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        this._element.addEventListener('touchmove', this.onTouchMove, { passive: false });
        this._isAttached = true;
    }
    detach() {
        if (!this._isAttached) {
            return;
        }
        //@ts-ignore
        this._element.removeEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        this._element.removeEventListener('touchmove', this.onTouchMove, { passive: false });
        this._isAttached = false;
    }
    isAttached() {
        return this._isAttached;
    }
    onMouseDown(ev) {
        if (this._isLocked) {
            return;
        }
        if (this._target && !this._target.contains(ev.target)) {
            return;
        }
        this._isLocked = true;
        this.publishMouseEvent("down", ev);
    }
    onMouseUp(ev) {
        if (!this._isLocked) {
            return;
        }
        this._isLocked = false;
        this.publishMouseEvent("up", ev);
    }
    onMouseMove(ev) {
        if (this._isLocked) {
            this.publishMouseEvent("move", ev);
        }
    }
    onTouchStart(ev) {
        if (this._isLocked) {
            return;
        }
        if (this._target && !this._target.contains(ev.target)) {
            return;
        }
        this._isLocked = true;
        this.publishTouchEvent('down', ev);
    }
    onTouchEnd(ev) {
        if (!this._isLocked) {
            return;
        }
        this._isLocked = false;
        this.publishTouchEvent('up', ev);
    }
    onTouchMove(ev) {
        if (this._isLocked) {
            this.publishTouchEvent('move', ev);
        }
    }
    publishMouseEvent(type, ev) {
        if (this._preventDefault && ev.cancelable) {
            ev.preventDefault();
        }
        if (!is(this._onEvent)) {
            return;
        }
        // @ts-ignore
        this._onEvent({
            type: type,
            x: ev.clientX,
            y: ev.clientY,
            moveX: ev.movementX,
            moveY: ev.movementY,
            target: ev.target,
            event: ev,
        });
    }
    publishTouchEvent(type, ev) {
        if (this._preventDefault && ev.cancelable)
            ev.preventDefault();
        if (!is(this._onEvent)) {
            return;
        }
        let touch = null;
        if (ev.touches.length > 0) {
            touch = ev.touches[0];
        }
        else if (ev.changedTouches.length > 0) {
            touch = ev.changedTouches[0];
        }
        // @ts-ignore - already checked
        this._onEvent({
            event: ev,
            type: type,
            target: ev.target,
            //@ts-ignore
            x: is(touch) ? touch.clientX : -1,
            //@ts-ignore
            y: is(touch) ? touch.clientY : -1,
            moveX: -1,
            moveY: -1
        });
    }
}

// CONCATENATED MODULE: ./src/plugins/move/observer.ts
var move_observer_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var move_observer_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var observer_bus, _moveListener, _isLocked, _eventId, _firstEvent, _wasFirstEventSend, _gesturesEnabled;


const DEFAULT_GESTURE_TRESHOLD = 0.3;
class observer_CuiMoveObserver {
    constructor(bus, gestures) {
        observer_bus.set(this, void 0);
        _moveListener.set(this, void 0);
        _isLocked.set(this, void 0);
        _eventId.set(this, void 0);
        _firstEvent.set(this, void 0);
        _wasFirstEventSend.set(this, void 0);
        _gesturesEnabled.set(this, void 0);
        move_observer_classPrivateFieldSet(this, observer_bus, bus);
        move_observer_classPrivateFieldSet(this, _moveListener, new move_CuiMoveEventListener());
        move_observer_classPrivateFieldGet(this, _moveListener).setCallback(this.onMove.bind(this));
        move_observer_classPrivateFieldSet(this, _firstEvent, undefined);
        move_observer_classPrivateFieldSet(this, _isLocked, false);
        move_observer_classPrivateFieldSet(this, _eventId, null);
        move_observer_classPrivateFieldSet(this, _wasFirstEventSend, false);
        move_observer_classPrivateFieldSet(this, _gesturesEnabled, gestures);
    }
    attach() {
        if (!move_observer_classPrivateFieldGet(this, _moveListener).isAttached()) {
            move_observer_classPrivateFieldGet(this, _moveListener).attach();
            move_observer_classPrivateFieldSet(this, _eventId, move_observer_classPrivateFieldGet(this, observer_bus).on(EVENTS.MOVE_LOCK, this.onMoveLock.bind(this)));
        }
    }
    detach() {
        if (move_observer_classPrivateFieldGet(this, _moveListener).isAttached()) {
            move_observer_classPrivateFieldGet(this, _moveListener).detach();
            move_observer_classPrivateFieldGet(this, _eventId) != null && move_observer_classPrivateFieldGet(this, observer_bus).detach(EVENTS.MOVE_LOCK, move_observer_classPrivateFieldGet(this, _eventId));
        }
    }
    isAttached() {
        return move_observer_classPrivateFieldGet(this, _moveListener).isAttached();
    }
    onMove(data) {
        if (move_observer_classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        switch (data.type) {
            case "down":
                move_observer_classPrivateFieldSet(this, _firstEvent, data);
                move_observer_classPrivateFieldSet(this, _wasFirstEventSend, false);
                break;
            case "move":
                if (move_observer_classPrivateFieldGet(this, _firstEvent) && !move_observer_classPrivateFieldGet(this, _wasFirstEventSend)) {
                    this.pushMoveEvent(move_observer_classPrivateFieldGet(this, _firstEvent));
                    move_observer_classPrivateFieldSet(this, _wasFirstEventSend, true);
                }
                this.pushMoveEvent(data);
                break;
            case "up":
                this.pushMoveEvent(data);
                if (move_observer_classPrivateFieldGet(this, _firstEvent)) {
                    if (move_observer_classPrivateFieldGet(this, _gesturesEnabled)) {
                        const { diffX, diffY } = this.getGestureDiff(move_observer_classPrivateFieldGet(this, _firstEvent), data);
                        const gesture = this.calculateGesture(diffX, diffY);
                        this.pushGestureEvent(gesture, diffX, diffY);
                    }
                    move_observer_classPrivateFieldSet(this, _firstEvent, undefined);
                }
                break;
        }
    }
    pushMoveEvent(data) {
        move_observer_classPrivateFieldGet(this, observer_bus).emit(EVENTS.GLOBAL_MOVE, null, Object.assign(Object.assign({}, data), { source: "CuiMoveObserver", timestamp: Date.now(), name: EVENTS.GLOBAL_MOVE }));
    }
    onMoveLock(flag) {
        move_observer_classPrivateFieldSet(this, _isLocked, flag);
    }
    getGestureDiff(firstEvent, lastEvent) {
        return {
            diffX: lastEvent.x - firstEvent.x,
            diffY: lastEvent.y - firstEvent.y
        };
    }
    calculateGesture(diffX, diffY) {
        const tresholdX = window.innerWidth * DEFAULT_GESTURE_TRESHOLD;
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);
        if (absDiffX > absDiffY && absDiffX > tresholdX) {
            return diffX > 0 ? "right" : "left";
        }
        const tresholdY = window.innerHeight * DEFAULT_GESTURE_TRESHOLD;
        if (absDiffY > tresholdY) {
            return diffY > 0 ? "down" : 'up';
        }
        return 'none';
    }
    pushGestureEvent(type, diffX, diffY) {
        const eventName = this.getGestureEventName(type);
        if (!eventName) {
            return;
        }
        move_observer_classPrivateFieldGet(this, observer_bus).emit(eventName, null, {
            timespstamp: Date.now(),
            changeX: diffX,
            changeY: diffY,
            name: eventName,
            source: "CuiMoveObserver"
        });
    }
    getGestureEventName(type) {
        switch (type) {
            case "up":
                return EVENTS.GESTURE_UP;
            case 'down':
                return EVENTS.GESTURE_DOWN;
            case "left":
                return EVENTS.GESTURE_LEFT;
            case "right":
                return EVENTS.GESTURE_RIGHT;
            default:
                return null;
        }
    }
}
observer_bus = new WeakMap(), _moveListener = new WeakMap(), _isLocked = new WeakMap(), _eventId = new WeakMap(), _firstEvent = new WeakMap(), _wasFirstEventSend = new WeakMap(), _gesturesEnabled = new WeakMap();

// CONCATENATED MODULE: ./src/plugins/move/move.ts


function CuiMoveObserverPluginFn(gestures) {
    return new CuiPlugin({
        name: 'move-observer-plugin',
        description: "CuiMoveObserverPlugin",
        setup: gestures === true,
        callback: (utils, gestures) => {
            const observer = new observer_CuiMoveObserver(utils.bus, gestures);
            observer.attach();
            return [
                [],
                () => {
                    if (observer.isAttached()) {
                        observer.detach();
                    }
                }
            ];
        }
    });
}

// CONCATENATED MODULE: ./src/plugins/notification/helpers.ts

function validateNotificationData(data) {
    return is(data) && are(data.id, data.title);
}

// CONCATENATED MODULE: ./src/core/builders/icon.ts

class icon_IconBuilder {
    constructor(svgString) {
        this._element = svgString;
        this._scale = 1;
        this._appender = new icon_IconScaleAppender();
    }
    setScale(scale) {
        this._scale = scale;
        return this;
    }
    build() {
        let created = createElementFromString(this._element);
        if (is(created) && this._scale) {
            // @ts-ignore created is checked already
            this._appender.append(created, this._scale);
        }
        return created;
    }
}
class icon_IconScaleAppender {
    append(element, value) {
        let width = getIntOrDefault(element.getAttribute("width"), 20);
        let height = getIntOrDefault(element.getAttribute("height"), 20);
        element.setAttribute("width", (width * value).toString());
        element.setAttribute("height", (height * value).toString());
    }
}

// CONCATENATED MODULE: ./src/plugins/notification/builder.ts
var builder_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const closeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 3,3 17,17\"></path><path d=\"M 17,3 3,17\"></path></svg>";
function getNotification(data, utils, cache, onClose) {
    return builder_awaiter(this, void 0, void 0, function* () {
        let prefix = utils.setup.prefix;
        if (!are(data.title, data.id)) {
            return undefined;
        }
        const parts = [getHeader(data.title, cache, onClose)];
        if (is(data.message)) {
            //@ts-ignore message is defined
            parts.push(getBody(data.message, cache));
        }
        if (is(data.actions)) {
            //@ts-ignore actions is defined
            parts.push(getFooter(data.actions, cache, onClose));
        }
        return new element_ElementBuilder('div').setClasses(cache.NOTIFICATION_CLS, cache.MARGIN_SMALL_VERTICAL, getClassByType(prefix, data.type)).setId(data.id).setRawChildren(...parts).build();
    });
}
function getHeader(title, cache, onClose) {
    const titleElement = new element_ElementBuilder('span').setClasses(cache.NOTIFICATION_TITLE_CLS).setTextContent(title);
    const iconCloseElement = new icon_IconBuilder(closeIcon).build();
    const closeElement = new element_ElementBuilder('a').setClasses(cache.ICON_CLS, cache.NOTIFICATION_CLOSE_CLS).onEvent('click', onClose);
    if (iconCloseElement) {
        closeElement.setChildren(iconCloseElement);
    }
    const header = new element_ElementBuilder('div').setClasses(cache.NOTIFICATION_HEADER_CLS).setRawChildren(titleElement, closeElement);
    return header;
}
function getBody(message, cache) {
    return new element_ElementBuilder('div').setClasses(cache.NOTIFICATION_BODY_CLS).setRawChildren(new element_ElementBuilder('div').setTextContent(message));
}
function getFooter(actions, cache, onClose) {
    return new element_ElementBuilder('div').setClasses(cache.NOTIFICATION_FOOTER_CLS).setRawChildren(getActionsList(actions, onClose));
}
function getActionsList(actions, onClose) {
    return new element_ElementBuilder('ul').setRawChildren(...actions.map(action => {
        return new element_ElementBuilder('li').setRawChildren(new element_ElementBuilder('a').onEvent('click', () => {
            try {
                action.callback();
            }
            catch (e) {
                const log = factory_CuiDevtoolFactory.get("Notifications");
                log.exception(e, "OnActionClick");
            }
            finally {
                onClose();
            }
        }).setTextContent(action.name));
    }));
}
function getClassByType(prefix, type) {
    return `${prefix}-${type !== null && type !== void 0 ? type : 'default'}`;
}

// CONCATENATED MODULE: ./src/plugins/notification/notification.ts
var notification_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const CONTAINER_ID = "notifications-container";
const CONTAINER_CLS = "{prefix}-notification-container";
const NOTIFICATION_CLS = '{prefix}-notification';
const NOTIFICATION_HEADER_CLS = '{prefix}-notification-header';
const NOTIFICATION_TITLE_CLS = '{prefix}-notification-title';
const NOTIFICATION_BODY_CLS = '{prefix}-notification-body';
const NOTIFICATION_FOOTER_CLS = '{prefix}-notification-footer';
const NOTIFICATION_ACTIVE_CLS = '{prefix}-active';
const NOTIFICATION_ICON_CLS = "{prefix}-notification-icon";
const NOTIFICATION_CLOSE_CLS = "{prefix}-notification-close";
const ICON_CLS = "{prefix}-icon";
const NOTIFICATION_ANIMATION_IN = "{prefix}-notification-animation-in";
const NOTIFICATION_ANIMATION_OUT = "{prefix}-notification-animation-out";
const MARGIN_SMALL_VERTICAL = "{prefix}-margin-small-vertical";
function CuiNotificationPluginFn(setup) {
    const pluginName = 'notification-plugin';
    function createCache(prefix) {
        return {
            "NOTIFICATION_CLS": replacePrefix(NOTIFICATION_CLS, prefix),
            "NOTIFICATION_HEADER_CLS": replacePrefix(NOTIFICATION_HEADER_CLS, prefix),
            "NOTIFICATION_TITLE_CLS": replacePrefix(NOTIFICATION_TITLE_CLS, prefix),
            "NOTIFICATION_BODY_CLS": replacePrefix(NOTIFICATION_BODY_CLS, prefix),
            "NOTIFICATION_FOOTER_CLS": replacePrefix(NOTIFICATION_FOOTER_CLS, prefix),
            "NOTIFICATION_ACTIVE_CLS": replacePrefix(NOTIFICATION_ACTIVE_CLS, prefix),
            "NOTIFICATION_ANIMATION_IN": replacePrefix(NOTIFICATION_ANIMATION_IN, prefix),
            "NOTIFICATION_ANIMATION_OUT": replacePrefix(NOTIFICATION_ANIMATION_OUT, prefix),
            "NOTIFICATION_ICON_CLS": replacePrefix(NOTIFICATION_ICON_CLS, prefix),
            "NOTIFICATION_CLOSE_CLS": replacePrefix(NOTIFICATION_CLOSE_CLS, prefix),
            "ICON_CLS": replacePrefix(ICON_CLS, prefix),
            "MARGIN_SMALL_VERTICAL": replacePrefix(MARGIN_SMALL_VERTICAL, prefix),
        };
    }
    return new CuiPlugin({
        name: pluginName,
        description: "CuiNotificationPlugin",
        setup: setup,
        callback: (core, setup) => {
            var _a;
            const _cache = createCache(core.setup.prefix);
            const _actionsHelper = new helpers_CuiActionsHelper(core.interactions);
            const _timeout = (_a = setup.timeout) !== null && _a !== void 0 ? _a : 5000;
            let _holder = {};
            let _container = null;
            function getOrCreateContainer(core, root) {
                _container = document.getElementById(CONTAINER_ID);
                if (!_container) {
                    _container = new element_ElementBuilder('div').setClasses(replacePrefix(CONTAINER_CLS, core.setup.prefix)).build();
                    root.appendChild(_container);
                }
            }
            function setAutoClose(data) {
                return setTimeout(() => {
                    onNotificationClose(data, true, false);
                }, _timeout);
            }
            function addNotificationToTree(notifiactionElement) {
                //@ts-ignore utils is defined
                core.interactions.mutate(() => {
                    // Add to DOM treee
                    //@ts-ignore container is defined
                    if (_container.children.length === 0) {
                        //@ts-ignore container is defined
                        _container.appendChild(notifiactionElement);
                    }
                    else {
                        //@ts-ignore container is defined
                        _container.insertBefore(notifiactionElement, _container.firstChild);
                    }
                }, null);
            }
            function onNotificationClose(notification, fromTimeout, dissmissed) {
                if (!notification) {
                    return;
                }
                const holder = _holder[notification.id];
                if (!holder) {
                    return;
                }
                if (!fromTimeout) {
                    clearTimeout(holder.timeoutId);
                }
                act(holder.element, _cache.NOTIFICATION_ANIMATION_OUT).then(() => {
                    // @ts-ignore utils is defined
                    core.bus.emit(EVENTS.NOTIFIED, null, Object.assign(Object.assign({}, notification), { dissmissed: dissmissed }));
                    holder.element.remove();
                    delete _holder[notification.id];
                });
            }
            function act(element, animationClass, timeout) {
                return notification_awaiter(this, void 0, void 0, function* () {
                    //@ts-ignore utils is ignored
                    const delay = timeout !== null && timeout !== void 0 ? timeout : core.setup.animationTime;
                    const action = new actions_CuiClassAction(animationClass);
                    //@ts-ignore actionsHelper is defined
                    return _actionsHelper.performAction(element, action, delay !== null && delay !== void 0 ? delay : 0);
                });
            }
            function onEvent(data) {
                if (!validateNotificationData(data) || !_container) {
                    return;
                }
                if (_holder[data.id]) {
                    return;
                }
                // Create element
                getNotification(data, core, _cache, () => {
                    onNotificationClose(data, false, true);
                }).then(notificationEl => {
                    if (!notificationEl) {
                        return;
                    }
                    addNotificationToTree(notificationEl);
                    // Set timeout function
                    let timeoutId = null;
                    //  If auto option is not specifically set to false
                    if (!(data.auto === false)) {
                        timeoutId = setAutoClose(data);
                    }
                    // Setup holder
                    _holder[data.id] = {
                        element: notificationEl,
                        timeoutId: timeoutId
                    };
                    // Call open
                    act(notificationEl, _cache.NOTIFICATION_ANIMATION_IN).then(() => {
                        notificationEl.classList.add(_cache.NOTIFICATION_ACTIVE_CLS);
                    });
                });
            }
            getOrCreateContainer(core, document.body);
            return [
                [getPluginEventExtension({
                        name: EVENTS.NOTIFY,
                        id: pluginName,
                        callback: onEvent
                    })],
                () => {
                    if (_container)
                        _container.remove();
                }
            ];
        }
    });
}
// export class CuiNotificationPlugin implements ICuiPlugin {
//     description: string;
//     name: string = 'notification-plugin';
//     setup: any;
//     private _utils: CuiUtils | undefined;
//     private _container: HTMLElement | null;
//     private _handleId: string | null;
//     private _cache: any;
//     private _holder: ElementsHolder;
//     private _actionsHelper: CuiActionsHelper | undefined;
//     private _timeout: number;
//     constructor(setup: ICuiNotificationPluginSetup) {
//         this.description = "CuiNotificationPlugin";
//         this._container = null;
//         this._utils = undefined;
//         this._handleId = null;
//         this._cache = {};
//         this._holder = {};
//         this._actionsHelper = undefined;
//         this._timeout = setup.timeout ?? 5000;
//     }
//     init(utils: CuiUtils): void {
//         this.createCache(utils.setup.prefix);
//         this.getOrCreateContainer(utils, document.body);
//         this._actionsHelper = new CuiActionsHelper(utils.interactions);
//         this._utils = utils
//         this._handleId = this._utils.bus.on(EVENTS.NOTIFY, this.onEvent.bind(this), { $cuid: this.name });
//     }
//     destroy(): void {
//         if (this._container)
//             this._container.remove();
//         if (this._handleId && this._utils) {
//             this._utils.bus.detach(EVENTS.NOTIFY, this._handleId);
//         }
//     }
//     private onEvent(data: ICuiNotification) {
//         if (!validateNotificationData(data) || !this._utils || !this._actionsHelper || !this._container) {
//             return;
//         }
//         if (this._holder[data.id]) {
//             return;
//         }
//         // Create element
//         getNotification(data, this._utils, this._cache, () => {
//             this.onNotificationClose(data, false, true);
//         }).then(notificationEl => {
//             if (!notificationEl) {
//                 return;
//             }
//             this.addNotificationToTree(notificationEl)
//             // Set timeout function
//             let timeoutId = null;
//             //  If auto option is not specifically set to false
//             if (!(data.auto === false)) {
//                 timeoutId = this.setAutoClose(data);
//             }
//             // Setup holder
//             this._holder[data.id] = {
//                 element: notificationEl,
//                 timeoutId: timeoutId
//             }
//             // Call open
//             this.act(notificationEl, this._cache.NOTIFICATION_ANIMATION_IN).then(() => {
//                 notificationEl.classList.add(this._cache.NOTIFICATION_ACTIVE_CLS);
//             });
//         });
//     }
//     private setAutoClose(data: ICuiNotification): any {
//         return setTimeout(() => {
//             this.onNotificationClose(data, true, false);
//         }, this._timeout);
//     }
//     private addNotificationToTree(notifiactionElement: HTMLElement) {
//         //@ts-ignore utils is defined
//         this._utils.interactions.mutate(() => {
//             // Add to DOM treee
//             //@ts-ignore container is defined
//             if (this._container.children.length === 0) {
//                 //@ts-ignore container is defined
//                 this._container.appendChild(notifiactionElement)
//             } else {
//                 //@ts-ignore container is defined
//                 this._container.insertBefore(notifiactionElement, this._container.firstChild);
//             }
//         }, null)
//     }
//     private onNotificationClose(notification: ICuiNotification, fromTimeout: boolean, dissmissed: boolean) {
//         if (!notification || !this._actionsHelper || !this._utils) {
//             return;
//         }
//         const holder = this._holder[notification.id];
//         if (!holder) {
//             return;
//         }
//         if (!fromTimeout) {
//             clearTimeout(holder.timeoutId);
//         }
//         this.act(holder.element, this._cache.NOTIFICATION_ANIMATION_OUT).then(() => {
//             // @ts-ignore utils is defined
//             this._utils.bus.emit(EVENTS.NOTIFIED, null, { ...notification, dissmissed: dissmissed })
//             holder.element.remove();
//             delete this._holder[notification.id];
//         })
//     }
//     private getOrCreateContainer(utils: CuiUtils, root: HTMLElement) {
//         this._container = document.getElementById(CONTAINER_ID);
//         if (!this._container) {
//             this._container = new ElementBuilder('div').setClasses(replacePrefix(CONTAINER_CLS, utils.setup.prefix)).build();
//             root.appendChild(this._container);
//         }
//     }
//     private createCache(prefix: string) {
//         this._cache = {
//             "NOTIFICATION_CLS": replacePrefix(NOTIFICATION_CLS, prefix),
//             "NOTIFICATION_HEADER_CLS": replacePrefix(NOTIFICATION_HEADER_CLS, prefix),
//             "NOTIFICATION_TITLE_CLS": replacePrefix(NOTIFICATION_TITLE_CLS, prefix),
//             "NOTIFICATION_BODY_CLS": replacePrefix(NOTIFICATION_BODY_CLS, prefix),
//             "NOTIFICATION_FOOTER_CLS": replacePrefix(NOTIFICATION_FOOTER_CLS, prefix),
//             "NOTIFICATION_ACTIVE_CLS": replacePrefix(NOTIFICATION_ACTIVE_CLS, prefix),
//             "NOTIFICATION_ANIMATION_IN": replacePrefix(NOTIFICATION_ANIMATION_IN, prefix),
//             "NOTIFICATION_ANIMATION_OUT": replacePrefix(NOTIFICATION_ANIMATION_OUT, prefix),
//             "NOTIFICATION_ICON_CLS": replacePrefix(NOTIFICATION_ICON_CLS, prefix),
//             "NOTIFICATION_CLOSE_CLS": replacePrefix(NOTIFICATION_CLOSE_CLS, prefix),
//             "ICON_CLS": replacePrefix(ICON_CLS, prefix),
//             "MARGIN_SMALL_VERTICAL": replacePrefix(MARGIN_SMALL_VERTICAL, prefix),
//         }
//     }
//     async act(element: HTMLElement, animationClass: string, timeout?: number): Promise<boolean> {
//         //@ts-ignore utils is ignored
//         const delay = timeout ?? this._utils.setup.animationTime;
//         const action = new CuiClassAction(animationClass);
//         //@ts-ignore actionsHelper is defined
//         return this._actionsHelper.performAction(element, action, delay ?? 0);
//     }
// }

// CONCATENATED MODULE: ./src/plugins/print/print.ts



function CuiAutoPrintModePluginFn(autoPrintInit) {
    const desc = "CuiAutoPrintModePlugin";
    return new CuiPlugin({
        name: 'auto-print',
        description: desc,
        setup: autoPrintInit,
        callback: (utils, setup) => {
            const listener = new CuiMediaQueryListener('print');
            listener.setCallback((t) => {
                var _a;
                setup = utils.setup.plugins[desc];
                let autoPrint = (_a = setup === null || setup === void 0 ? void 0 : setup.autoPrint) !== null && _a !== void 0 ? _a : false;
                if (autoPrint) {
                    if (t.matches) {
                        utils.setPrintMode(true);
                    }
                    else {
                        utils.setPrintMode(false);
                    }
                }
            });
            if (setup.autoPrint && getSystemPrintMode()) {
                utils.setPrintMode(true);
            }
            return [[getPluginListenerExtension({
                        listener: listener
                    })], undefined];
        }
    });
}

// CONCATENATED MODULE: ./src/plugins/resize/observer.ts
var resize_observer_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var resize_observer_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _items, _promises, _prevYValue, observer_inProgress, _previousSize, _threshold, resize_observer_bus, _listenerBoundCall;


class observer_CuiResizeObserver {
    constructor(bus, threshold) {
        _items.set(this, void 0);
        _promises.set(this, void 0);
        _prevYValue.set(this, void 0);
        observer_inProgress.set(this, void 0);
        _previousSize.set(this, void 0);
        _threshold.set(this, void 0);
        resize_observer_bus.set(this, void 0);
        _listenerBoundCall.set(this, void 0);
        resize_observer_classPrivateFieldSet(this, _items, []);
        resize_observer_classPrivateFieldSet(this, _promises, []);
        resize_observer_classPrivateFieldSet(this, _prevYValue, window.innerWidth);
        resize_observer_classPrivateFieldSet(this, observer_inProgress, false);
        resize_observer_classPrivateFieldSet(this, _previousSize, calcWindowSize(window.innerWidth));
        resize_observer_classPrivateFieldSet(this, _threshold, threshold !== null && threshold !== void 0 ? threshold : 0);
        resize_observer_classPrivateFieldSet(this, resize_observer_bus, bus);
        resize_observer_classPrivateFieldSet(this, _listenerBoundCall, this.listener.bind(this));
    }
    observe(target) {
        let idx = resize_observer_classPrivateFieldGet(this, _items).findIndex(x => x === target);
        if (idx < 0) {
            resize_observer_classPrivateFieldGet(this, _items).push(target);
        }
    }
    unobserve(target) {
        let idx = resize_observer_classPrivateFieldGet(this, _items).findIndex(x => x === target);
        if (idx >= 0) {
            resize_observer_classPrivateFieldGet(this, _items).splice(idx, 1);
        }
    }
    connect() {
        window.addEventListener('resize', resize_observer_classPrivateFieldGet(this, _listenerBoundCall));
    }
    disconnect() {
        window.removeEventListener('resize', resize_observer_classPrivateFieldGet(this, _listenerBoundCall));
    }
    pushUpdateToItems(resizeData) {
        if (resize_observer_classPrivateFieldGet(this, _items).length < 1) {
            return;
        }
        resize_observer_classPrivateFieldSet(this, _promises, []);
        resize_observer_classPrivateFieldGet(this, _items).forEach(x => {
            resize_observer_classPrivateFieldGet(this, _promises).push(x.resize(resizeData));
        });
        Promise.all(resize_observer_classPrivateFieldGet(this, _promises));
        resize_observer_classPrivateFieldSet(this, _promises, []);
    }
    listener(ev) {
        if (resize_observer_classPrivateFieldGet(this, observer_inProgress)) {
            return;
        }
        resize_observer_classPrivateFieldSet(this, observer_inProgress, true);
        const diff = window.innerWidth - resize_observer_classPrivateFieldGet(this, _prevYValue);
        if (Math.abs(diff) >= resize_observer_classPrivateFieldGet(this, _threshold)) {
            const currentSize = calcWindowSize(window.innerWidth);
            if (currentSize !== resize_observer_classPrivateFieldGet(this, _previousSize)) {
                const resizeData = {
                    current: currentSize,
                    previous: resize_observer_classPrivateFieldGet(this, _previousSize),
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: Date.now(),
                    name: EVENTS.RESIZE,
                    source: "CuiResizeObserver"
                };
                resize_observer_classPrivateFieldGet(this, resize_observer_bus).emit(EVENTS.RESIZE, "", resizeData);
                this.pushUpdateToItems(resizeData);
                resize_observer_classPrivateFieldSet(this, _previousSize, currentSize);
            }
        }
        resize_observer_classPrivateFieldSet(this, observer_inProgress, false);
    }
}
_items = new WeakMap(), _promises = new WeakMap(), _prevYValue = new WeakMap(), observer_inProgress = new WeakMap(), _previousSize = new WeakMap(), _threshold = new WeakMap(), resize_observer_bus = new WeakMap(), _listenerBoundCall = new WeakMap();

// CONCATENATED MODULE: ./src/plugins/resize/resize.ts


function CuiResizeObserverPluginFn(setup) {
    return new CuiPlugin({
        name: 'resize-observer-plugin',
        description: "CuiResizeObserverPlugin",
        setup: Object.assign({ resizeThreshold: 20 }, setup),
        callback: (utils, setup) => {
            const resizeObserver = new observer_CuiResizeObserver(utils.bus, setup.resizeThreshold);
            resizeObserver.connect();
            return [
                [], () => { resizeObserver.disconnect(); }
            ];
        }
    });
}

// CONCATENATED MODULE: ./src/plugins/toast/handler.ts
var toast_handler_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var toast_handler_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var toast_handler_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _interactions, _selector, _className, _activeCls, _animationTime, _lock, _animClsIn, _animClsOut;


class handler_CuiToastHandler {
    constructor(interaction, prefix, animationTime) {
        _interactions.set(this, void 0);
        _selector.set(this, void 0);
        _className.set(this, void 0);
        _activeCls.set(this, void 0);
        _animationTime.set(this, void 0);
        _lock.set(this, void 0);
        _animClsIn.set(this, void 0);
        _animClsOut.set(this, void 0);
        toast_handler_classPrivateFieldSet(this, _interactions, interaction);
        toast_handler_classPrivateFieldSet(this, _selector, `.${prefix}-toast`);
        toast_handler_classPrivateFieldSet(this, _className, `${prefix}-toast`);
        toast_handler_classPrivateFieldSet(this, _activeCls, `${prefix}-active`);
        toast_handler_classPrivateFieldSet(this, _animationTime, animationTime);
        toast_handler_classPrivateFieldSet(this, _lock, false);
        toast_handler_classPrivateFieldSet(this, _animClsIn, `${prefix}-toast-animation-in`);
        toast_handler_classPrivateFieldSet(this, _animClsOut, `${prefix}-toast-animation-out`);
    }
    show(message) {
        return toast_handler_awaiter(this, void 0, void 0, function* () {
            if (toast_handler_classPrivateFieldGet(this, _lock)) {
                return false;
            }
            toast_handler_classPrivateFieldSet(this, _lock, true);
            let toastElement = document.querySelector(toast_handler_classPrivateFieldGet(this, _selector));
            if (!is(toastElement)) {
                toastElement = document.createElement('div');
                toastElement.classList.add(toast_handler_classPrivateFieldGet(this, _className));
                document.body.appendChild(toastElement);
                yield sleep(10);
            }
            toast_handler_classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.textContent = message;
                //@ts-ignore
                toastElement.classList.add(CLASSES.animProgress);
                //@ts-ignore
                toastElement.classList.add(toast_handler_classPrivateFieldGet(this, _animClsIn));
            }, this);
            yield sleep(toast_handler_classPrivateFieldGet(this, _animationTime));
            toast_handler_classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.classList.remove(CLASSES.animProgress);
                //@ts-ignore
                toastElement.classList.remove(toast_handler_classPrivateFieldGet(this, _animClsIn));
                //@ts-ignore
                toastElement.classList.add(toast_handler_classPrivateFieldGet(this, _activeCls));
            }, this);
            yield sleep(3000);
            toast_handler_classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.classList.add(CLASSES.animProgress);
                //@ts-ignore
                toastElement.classList.add(toast_handler_classPrivateFieldGet(this, _animClsOut));
            }, this);
            setTimeout(() => {
                toast_handler_classPrivateFieldGet(this, _interactions).mutate(() => {
                    //@ts-ignore
                    toastElement.classList.remove(CLASSES.animProgress);
                    //@ts-ignore
                    toastElement.classList.remove(toast_handler_classPrivateFieldGet(this, _animClsOut));
                    //@ts-ignore
                    toastElement.classList.remove(toast_handler_classPrivateFieldGet(this, _activeCls));
                }, this);
                toast_handler_classPrivateFieldSet(this, _lock, false);
            }, toast_handler_classPrivateFieldGet(this, _animationTime));
            return true;
        });
    }
}
_interactions = new WeakMap(), _selector = new WeakMap(), _className = new WeakMap(), _activeCls = new WeakMap(), _animationTime = new WeakMap(), _lock = new WeakMap(), _animClsIn = new WeakMap(), _animClsOut = new WeakMap();

// CONCATENATED MODULE: ./src/plugins/toast/toast.ts



function CuiToastPlugin(setup) {
    const name = "toast-plugin";
    return new CuiPlugin({
        name: name,
        description: "CuiToastPlugin",
        setup: setup !== null && setup !== void 0 ? setup : {},
        callback: (utils) => {
            var _a;
            const toastHandler = new handler_CuiToastHandler(utils.interactions, utils.setup.prefix, (_a = utils.setup.animationTime) !== null && _a !== void 0 ? _a : 300);
            function onToast(message) {
                if (!toastHandler) {
                    return;
                }
                utils.bus.emit(EVENTS.TOAST_SHOW, null, []);
                toastHandler.show(message).then(() => {
                    if (utils)
                        utils.bus.emit(EVENTS.TOAST_HIDDEN, null, []);
                });
            }
            return [
                [
                    getPluginEventExtension({
                        name: EVENTS.TOAST,
                        id: name,
                        callback: onToast,
                    }),
                ],
                undefined,
            ];
        },
    });
}

// CONCATENATED MODULE: ./src/plugins/module.ts








//import { CuiCSSVariablesPlugin } from "./properties/properties";


function GetPlugins(init) {
    var _a;
    let light = init ? init.autoLight : true;
    let print = init ? init.autoPrint : true;
    return [
        CuiAutoLightModePluginFn({ autoLight: light }),
        CuiAutoPrintModePluginFn({ autoPrint: print }),
        CuiKeysObserverPluginFn({}),
        CuiWindowClickPluginFn(),
        //  new CuiCSSVariablesPlugin({}),
        CuiMoveObserverPluginFn(),
        CuiResizeObserverPluginFn({}),
        CuiToastPlugin({}),
        CuiAlertsPluginFn(),
        CuiNotificationPluginFn({ timeout: init.notifcationTimeout }),
        CuiLightFocusPluginFn((_a = init.focusSetup) !== null && _a !== void 0 ? _a : {})
    ];
}

// CONCATENATED MODULE: ./src/core/utils/dictionary.ts


class dictionary_CuiDictionary {
    constructor(init) {
        this._keys = [];
        this._values = [];
        this._lock = false;
        if (init) {
            init.forEach(x => {
                if (!is(x.key)) {
                    this._keys = [];
                    this._values = [];
                    throw new ArgumentError("Key is empty");
                }
                this.add(x.key, x.value);
            });
        }
    }
    add(key, value) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            if (this.containsKey(key))
                throw new Error("Key already exists");
            this._keys.push(key);
            this._values.push(value);
        });
    }
    remove(key) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = this._keys.indexOf(key);
            if (index < 0) {
                return;
            }
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
        });
    }
    get(key) {
        this.throwOnEmptyKey(key);
        let value = undefined;
        this.lock(() => {
            let index = this.indexOf(key);
            if (index >= 0) {
                value = this._values[index];
            }
        });
        return value;
    }
    containsKey(key) {
        return is(key) && this.indexOf(key) >= 0;
    }
    keys() {
        return [...this._keys];
    }
    values() {
        return [...this._values];
    }
    indexOf(key) {
        return is(key) ? this._keys.indexOf(key) : -1;
    }
    update(key, value) {
        this.throwOnEmptyKey(key);
        this.lock(() => {
            let index = this.indexOf(key);
            if (index < 0) {
                throw new ItemNotFoundError(`Item with key [${key}] not found`);
            }
            this._values[index] = value;
        });
    }
    clear() {
        this.lock(() => {
            this._values = [];
            this._keys = [];
        });
    }
    forEach(callback) {
        this.lock(() => {
            let len = this._keys.length;
            for (let index = 0; index < len; index++) {
                callback(this._keys[index], this._values[index]);
            }
        });
    }
    checkLock() {
        if (this._lock) {
            throw new Error("You cannot alter dictionary when is locked!");
        }
    }
    lock(callback) {
        this.checkLock();
        this._lock = true;
        try {
            callback();
        }
        catch (e) {
            throw e;
        }
        finally {
            this._lock = false;
        }
    }
    throwOnEmptyKey(key) {
        if (!is(key)) {
            throw new ArgumentError("Key is empty");
        }
    }
}

// CONCATENATED MODULE: ./src/core/handlers/extensions/handler.ts
var extensions_handler_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var extensions_handler_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var extensions_handler_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _dict;

class handler_CuiExtensionsHandler {
    constructor() {
        _dict.set(this, void 0);
        extensions_handler_classPrivateFieldSet(this, _dict, new dictionary_CuiDictionary());
    }
    add(module) {
        extensions_handler_classPrivateFieldGet(this, _dict).add(module.type, module);
    }
    remove(type) {
        extensions_handler_classPrivateFieldGet(this, _dict).remove(type);
    }
    init(args) {
        return extensions_handler_awaiter(this, void 0, void 0, function* () {
            let promises = [];
            extensions_handler_classPrivateFieldGet(this, _dict).forEach((name, module) => {
                if (module.init)
                    promises.push(module.init(args));
            });
            yield Promise.all(promises);
            return true;
        });
    }
    update(args) {
        return extensions_handler_awaiter(this, void 0, void 0, function* () {
            let promises = [];
            extensions_handler_classPrivateFieldGet(this, _dict).forEach((name, module) => {
                if (module.update) {
                    promises.push(module.update(args));
                }
            });
            yield Promise.all(promises);
            return true;
        });
    }
    destroy() {
        return extensions_handler_awaiter(this, void 0, void 0, function* () {
            let promises = [];
            extensions_handler_classPrivateFieldGet(this, _dict).forEach((name, module) => {
                if (module.destroy) {
                    promises.push(module.destroy());
                }
            });
            yield Promise.all(promises);
            return true;
        });
    }
}
_dict = new WeakMap();

// CONCATENATED MODULE: ./src/core/handlers/extensions/facades.ts
var facades_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getEventBusFacade(cuid, bus, target) {
    const _emittedEvents = [];
    return {
        emit: (event, data, source) => facades_awaiter(this, void 0, void 0, function* () {
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
function getCuiHandlerInteractions(interactions, ctx) {
    return {
        mutate: (callback, ...args) => {
            interactions.mutate(callback, ctx !== null && ctx !== void 0 ? ctx : null, ...args);
        },
        fetch: (callback, ...args) => {
            interactions.fetch(callback, ctx !== null && ctx !== void 0 ? ctx : null, ...args);
        }
    };
}
function cuiHandlerAsyncInteractions(interactions, ctx) {
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
class ClassesHelper {
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
class CuiClassesAsyncHelper {
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
class CuiAttributeHelper {
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
class CuiStyleHelper {
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
class CuiStyleAsyncHelper {
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

// CONCATENATED MODULE: ./src/core/handlers/base.ts
var handlers_base_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class base_CuiComponentHandlerProps {
    constructor(componentName, element, utils) {
        this.log = factory_CuiDevtoolFactory.get(componentName);
        this.core = utils;
        this.element = element;
        this.cuid = element.$cuid;
        this.activeClassName = getActiveClass(utils.setup.prefix);
        this.componentName = componentName;
    }
}
class CuiComponentBase extends base_CuiComponentHandlerProps {
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
class base_CuiHandlerBase extends CuiComponentBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, utils);
        this.args = args;
        this.classes = new ClassesHelper();
        this.asyncClasses = new CuiClassesAsyncHelper(utils.interactions, this.classes);
        this.prevArgs = undefined;
        this.isInitialized = false;
        this.attribute = attribute;
        this._extensionHandler = new handler_CuiExtensionsHandler();
        this.activeAction = actions_CuiActionsFactory.get(this.activeClassName);
    }
    handle(args) {
        return handlers_base_awaiter(this, void 0, void 0, function* () {
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
        return handlers_base_awaiter(this, void 0, void 0, function* () {
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
        return handlers_base_awaiter(this, void 0, void 0, function* () {
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
        return handlers_base_awaiter(this, void 0, void 0, function* () {
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

// CONCATENATED MODULE: ./src/core/utils/arguments.ts

const parserCallbacks = {
    "string": (value) => value.trim().toLowerCase(),
    'boolean': isStringTrue,
    "number": (value) => {
        const num = value.includes('.') ? parseFloat(value) : parseInt(value);
        return isNaN(num) ? undefined : num;
    }
};
class arguments_CuiAutoParseArgs {
    constructor(options) {
        this._options = options !== null && options !== void 0 ? options : {};
        this._parser = new TypeParser(this._options.props);
        this._defaults = {};
        this._defaultsLength = 0;
    }
    parse(args) {
        this.fillDefaultValues();
        if (!args) {
            return;
        }
        if (typeof args === 'string' && this._options.main) {
            const currentType = typeof this[this._options.main];
            this[this._options.main] = this._parser.parseValue(this._options.main, args, currentType);
            return;
        }
        enumerateObject(this, (thisProp, thisValue) => {
            const currentType = typeof thisValue;
            // In case args doesn't have property, set default value set during object construction
            if (!args[thisProp]) {
                this[thisProp] = this._defaults[thisProp];
                return;
            }
            // Case that value is in args, parse and adjust
            const newVal = this._parser.parseValue(thisProp, args[thisProp], currentType);
            if (newVal) {
                this[thisProp] = newVal;
            }
        });
    }
    fillDefaultValues() {
        if (this._defaultsLength === 0) {
            enumerateObject(this, (prperty, value) => {
                this._defaults[prperty] = value;
            });
            this._defaultsLength = Object.keys(this._defaults).length;
        }
    }
}
class TypeParser {
    constructor(props) {
        this._props = props !== null && props !== void 0 ? props : {};
    }
    parseValue(name, value, type) {
        var _a, _b, _c;
        let prop = this._props[name];
        let callback = parserCallbacks[(_a = prop === null || prop === void 0 ? void 0 : prop.type) !== null && _a !== void 0 ? _a : type];
        let newVal = callback === null || callback === void 0 ? void 0 : callback(value);
        if (!newVal) {
            return prop === null || prop === void 0 ? void 0 : prop.default;
        }
        return (_c = (_b = prop === null || prop === void 0 ? void 0 : prop.corrector) === null || _b === void 0 ? void 0 : _b.call(prop, newVal)) !== null && _c !== void 0 ? _c : newVal;
    }
}

// CONCATENATED MODULE: ./src/components/extensions/click/click.ts
var click_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiClickModule {
    constructor(element, args, performer) {
        this.type = 'click';
        this.description = "";
        this._perfromer = performer;
        this.element = element;
        this.onElementClick = this.onElementClick.bind(this);
    }
    init(args) {
        return click_awaiter(this, void 0, void 0, function* () {
            this.element.addEventListener('click', this.onElementClick);
            return true;
        });
    }
    destroy() {
        return click_awaiter(this, void 0, void 0, function* () {
            this.element.removeEventListener('click', this.onElementClick);
            return true;
        });
    }
    onElementClick(ev) {
        this._perfromer.perform(ev);
    }
}
function clickExtension(setup) {
    var _a;
    function onClick(ev) {
        setup.performer.perform(ev);
    }
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : 'click',
        init: () => click_awaiter(this, void 0, void 0, function* () {
            setup.element.addEventListener('click', onClick);
            return true;
        }),
        destroy: () => click_awaiter(this, void 0, void 0, function* () {
            setup.element.removeEventListener('click', onClick);
            return true;
        })
    };
}

// CONCATENATED MODULE: ./src/components/base.ts
function CuiComponentBaseHook(setup) {
    var _a;
    const _prefix = (_a = setup.prefix) !== null && _a !== void 0 ? _a : 'cui';
    const _attribute = _prefix + "-" + setup.name;
    return {
        attribute: _attribute,
        get: (element, utils) => setup.create(element, utils, _prefix, _attribute),
        style: setup.style
    };
}

// CONCATENATED MODULE: ./src/core/utils/aria.ts
class AriaAttributes {
    static setLabel(element, label) {
        if (!element.hasAttribute('aria-label')) {
            element.setAttribute('aria-label', label);
        }
    }
    static setAria(element, attr, value) {
        if (!element.hasAttribute(attr)) {
            element.setAttribute(attr, value);
        }
    }
    static removeAria(element, attr) {
        if (element.hasAttribute(attr)) {
            element.removeAttribute(attr);
        }
    }
}

// CONCATENATED MODULE: ./src/components/extensions/move/performer.ts
var performer_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function moveExtensionPerformer(setup) {
    return getBaseMovePerformer({
        onStart: (ev) => performer_awaiter(this, void 0, void 0, function* () {
            if (setup.onDown) {
                setup.onDown(ev);
            }
            return true;
        }),
        onMove: setup.onMove,
        onEnd: setup.onUp,
    });
}
function getDragMovePerformer(setup) {
    let dragStartTimeout = 100;
    let timeoutId = null;
    function cancelTimeout() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }
    function call(ev, callback) {
        cancelTimeout();
        if (callback) {
            callback(ev);
        }
    }
    return Object.assign(Object.assign({}, getBaseMovePerformer({
        onStart: (ev) => performer_awaiter(this, void 0, void 0, function* () {
            cancelTimeout();
            console.log("sssss");
            return new Promise((resolve) => {
                timeoutId = setTimeout(() => {
                    timeoutId = null;
                    console.log("start");
                    setup.onStart(ev).then((status) => {
                        resolve(status);
                    });
                    //resolve(setup.onStart(ev));
                }, dragStartTimeout);
            });
        }),
        onMove: (ev) => call(ev, setup.onMove),
        onEnd: (ev) => call(ev, setup.onEnd),
    })), { setTimeout: (value) => {
            dragStartTimeout = value;
        } });
}
function getBaseMovePerformer(setup) {
    let _isTracking = false;
    let _isEnabled = true;
    let _waiting = false;
    return {
        perform: (ev) => {
            if (!_isEnabled) {
                _isTracking = false;
                return;
            }
            switch (ev.type) {
                case "down":
                    console.log("down");
                    if (_isTracking) {
                        return;
                    }
                    _waiting = true;
                    setup.onStart(ev).then((status) => {
                        _waiting = false;
                        if (status)
                            _isTracking = true;
                    });
                    break;
                case "move":
                    if (!_isTracking)
                        return;
                    if (setup.onMove) {
                        setup.onMove(ev);
                    }
                    break;
                case "up":
                    if (!_isTracking && !_waiting)
                        return;
                    if (setup.onEnd) {
                        setup.onEnd(ev);
                    }
                    _isTracking = false;
                    break;
            }
        },
        setEnabled: (flag) => {
            _isEnabled = flag;
        },
    };
}

// CONCATENATED MODULE: ./src/components/extensions/performers.ts




function callbackPerformer(callback, setup) {
    return {
        perform: (val) => {
            if (setup && setup.ignoreEmpty === true && !is(val)) {
                return;
            }
            callback(val);
        }
    };
}
function getActionsPerformer(helper, callbacks, setup) {
    let _setup = setup !== null && setup !== void 0 ? setup : {};
    let localLock = false;
    function onAfter() {
        if (callbacks.onAfter)
            callbacks.onAfter();
        localLock = false;
    }
    return {
        perform: (arg) => {
            var _a, _b;
            if (!_setup || !_setup.element || (callbacks.onBefore && !callbacks.onBefore(arg)) || localLock) {
                return;
            }
            localLock = true;
            let performResult = false;
            helper.performActions(_setup.element, (_a = _setup.actions) !== null && _a !== void 0 ? _a : [], (_b = _setup.timeout) !== null && _b !== void 0 ? _b : 0, onAfter).then((result) => {
                performResult = result;
            }).finally(() => {
                if (performResult && callbacks.onFinish) {
                    callbacks.onFinish(arg);
                }
            });
        },
        updateSetup: (setup) => {
            _setup = Object.assign(Object.assign({}, _setup), setup);
        }
    };
}
function openActionsPerformer(helper, bus, callbacks, setup) {
    const newCallbacks = Object.assign(Object.assign({}, callbacks), { onBefore: (arg) => {
            if (callbacks.isActive()) {
                return false;
            }
            return !callbacks.onBefore || callbacks.onBefore(arg);
        }, onAfter: () => {
            if (setup.element) {
                if (setup.active)
                    setup.active.add(setup.element);
                AriaAttributes.setAria(setup.element, 'aria-hidden', "false");
            }
            if (callbacks.onAfter) {
                callbacks.onAfter();
                return false;
            }
        }, onFinish: (arg) => {
            bus.emit(EVENTS.OPENED, {
                state: arg,
            });
            if (callbacks.onFinish)
                callbacks.onFinish(arg);
        } });
    return getActionsPerformer(helper, newCallbacks, setup);
}
function closeActionsPerformer(helper, bus, callbacks, setup) {
    const newCallbacks = Object.assign(Object.assign({}, callbacks), { onBefore: (arg) => {
            if (!callbacks.isActive()) {
                return false;
            }
            return !callbacks.onBefore || callbacks.onBefore(arg);
        }, onAfter: () => {
            if (setup.element) {
                if (setup.active)
                    setup.active.remove(setup.element);
                AriaAttributes.setAria(setup.element, 'aria-hidden', "true");
            }
            if (callbacks.onAfter) {
                callbacks.onAfter();
                return false;
            }
        }, onFinish: (arg) => {
            bus.emit(EVENTS.CLOSED, {
                state: arg,
            });
            if (callbacks.onFinish)
                callbacks.onFinish(arg);
        } });
    return getActionsPerformer(helper, newCallbacks, setup);
}
function sliderPerformer(classeHelper, setup) {
    var _a;
    let startX = 0;
    let swipeRatio = 0;
    const threshold = (_a = setup.moveThreshold) !== null && _a !== void 0 ? _a : 0.01;
    const preventDefault = setup.prevent === true;
    let canMove = false;
    let velocity = 0;
    let lastTime = 0;
    function passesThreshold(ratio) {
        return ratio >= threshold;
    }
    function canPerformMove(ratio) {
        return canMove && passesThreshold(Math.abs(ratio - swipeRatio));
    }
    function preventEventDefault(ev) {
        if (preventDefault && ev.event.cancelable) {
            ev.event.preventDefault();
        }
    }
    function calculateVelocity(distance, time) {
        return Math.abs(distance / time);
    }
    function calculateAcceleration(prev, current, time) {
        return Math.abs((current - prev) / time);
    }
    return moveExtensionPerformer({
        onDown: (ev) => {
            if (!setup.element.contains(ev.target)) {
                return;
            }
            if (!setup.start()) {
                canMove = false;
                return;
            }
            canMove = true;
            startX = ev.x;
            lastTime = performance.now();
            classeHelper.setClasses(document.body, CLASSES.swipingOn);
            preventEventDefault(ev);
        },
        onMove: (ev) => {
            const distance = (ev.x - startX);
            const ratio = distance / setup.element.offsetWidth;
            if (!canPerformMove(ratio)) {
                return;
            }
            const dt = performance.now() - lastTime;
            const newVelo = calculateVelocity((swipeRatio - ratio), dt);
            const acceleration = calculateAcceleration(velocity, newVelo, dt);
            swipeRatio = setup.adjustRatio ? setup.adjustRatio(ratio) : ratio;
            setup.progress({ ratio: swipeRatio, velocity, acceleration });
            lastTime = performance.now();
            velocity = newVelo;
            preventEventDefault(ev);
        },
        onUp: (ev) => {
            if (!canMove)
                return;
            const distance = (ev.x - startX);
            const dt = performance.now() - lastTime;
            const newVelo = calculateVelocity(distance, dt);
            const acceleration = calculateAcceleration(velocity, newVelo, dt);
            setup.end({ ratio: swipeRatio, velocity, acceleration });
            startX = 0;
            swipeRatio = 0;
            velocity = 0;
            lastTime = 0;
            canMove = false;
            classeHelper.removeClasses(document.body, CLASSES.swipingOn);
            preventEventDefault(ev);
        }
    });
}

// CONCATENATED MODULE: ./src/components/extensions/event/event.ts
var event_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiEventExtension {
    constructor(busFacade, setup) {
        var _a;
        this.type = (_a = setup.type) !== null && _a !== void 0 ? _a : setup.eventName;
        this.description = "";
        this._eventId = null;
        this._setup = setup;
        this._busFacade = busFacade;
    }
    init(args) {
        return event_awaiter(this, void 0, void 0, function* () {
            this._eventId = this._busFacade.on(this._setup.eventName, this.onEvent.bind(this));
            return true;
        });
    }
    destroy() {
        return event_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detach(this._setup.eventName, this._eventId);
            return true;
        });
    }
    onEvent(arg) {
        this._setup.performer.perform(arg);
    }
}
function eventExtension(bus, setup) {
    var _a;
    let eventId = null;
    function onEvent(arg) {
        setup.performer.perform(arg);
    }
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : setup.eventName,
        description: "",
        init: (arg) => event_awaiter(this, void 0, void 0, function* () {
            eventId = bus.on(setup.eventName, onEvent);
            return true;
        }),
        destroy: () => event_awaiter(this, void 0, void 0, function* () {
            bus.detach(setup.eventName, eventId);
            return true;
        })
    };
}

// CONCATENATED MODULE: ./src/components/accordion/accordion.ts
var accordion_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









const ACCORDION_TITLE_CLS = '> * > .{prefix}-accordion-title';
const ACCORDION_ITEMS_CLS = '> *';
class accordion_CuiAccordionArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "items": { corrector: joinWithScopeSelector },
            }
        });
        this.animation = false;
        this.single = false;
        this.selector = joinWithScopeSelector(replacePrefix(ACCORDION_TITLE_CLS, prefix));
        this.items = joinWithScopeSelector(replacePrefix(ACCORDION_ITEMS_CLS, prefix));
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.prevent = false;
        this.stopPropagation = false;
    }
}
function CuiAccordionComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "accordion",
        create: (element, utils, prefix, attribute) => {
            return new accordion_CuiAccordionHandler(element, utils, attribute, prefix);
        }
    });
}
class accordion_CuiAccordionHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiAccordionHandler", element, attribute, new accordion_CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        //   this._items = [];
        this._currentIndex = -1;
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, this.element);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onElementClick.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.SWITCH,
            performer: callbackPerformer(this.switch.bind(this), { ignoreEmpty: true })
        }));
    }
    onHandle() {
        return accordion_awaiter(this, void 0, void 0, function* () {
            this._currentIndex = this.getOpenedIndex(this.queryItems());
            return true;
        });
    }
    onRefresh() {
        return accordion_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRemove() {
        return accordion_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    switch(index) {
        return accordion_awaiter(this, void 0, void 0, function* () {
            if (!this.lock()) {
                return false;
            }
            this.log.debug("Switch to: " + index);
            const items = this.queryItems();
            const nextIdx = calculateNextIndex(index, this._currentIndex, items.length);
            if (nextIdx < 0) {
                return false;
            }
            const current = items[nextIdx];
            this._interactions.mutate(this.updateTargets, nextIdx, current, items);
            this._currentIndex = nextIdx;
            this._busFacade.emit(EVENTS.SWITCHED, {
                index: index,
                currentTarget: current,
                previousTarget: null,
                previous: -1
            });
            this.unlock();
            return true;
        });
    }
    /**
     * Toggles target and closes not needed is setup allows for that
     * @param index - current index to remain opened
     * @param target - target to toggle
     * @param targets - all targets
     */
    updateTargets(index, target, targets) {
        if (this.toggleTarget(target) && this.args.single) {
            this.closeAllExcept(index, targets);
        }
    }
    /**
     * Sets or remove active class on target
     * @param target target to toggle
     * @returns Whethet target was opened or not
     */
    toggleTarget(target) {
        if (this.classes.hasClass(this.activeClassName, target)) {
            this.classes.removeClass(this.activeClassName, target);
            return false;
        }
        this.classes.setClass(this.activeClassName, target);
        return true;
    }
    /**
     * Closes all targets except the one that should remain opened
     * @param currentIndex index of current target - to remain opened
     * @param targets - list of targets to operate on
     */
    closeAllExcept(currentIndex, targets) {
        targets.forEach((item, index) => {
            if (currentIndex !== index && this.classes.hasClass(this.activeClassName, item)) {
                item.classList.remove(this.activeClassName);
            }
        });
    }
    /**
     * Handles element click
     * @param ev
     */
    onElementClick(ev) {
        const target = ev.target;
        const selector = getChildSelectorFromScoped(this.args.selector);
        if (target.matches(selector)) {
            this._interactions.fetch(() => {
                const foundIdx = this.findMatchingTrigger(target);
                if (foundIdx > -1) {
                    this.switch(foundIdx);
                }
            });
        }
    }
    /**
     * Finds match
     * @param target
     * @returns index of matching element or -1
     */
    findMatchingTrigger(target) {
        let triggers = queryAll(this.element, this.args.selector);
        return triggers.findIndex(trigger => trigger === target);
    }
    queryItems() {
        return queryAll(this.element, this.args.items);
    }
    getOpenedIndex(items) {
        return items.findIndex(item => { this.classes.hasClass(this.activeClassName, item); });
    }
}

// CONCATENATED MODULE: ./src/core/animation/animators.ts
var animators_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var animators_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _from, _to, _x, _y, animators_id;


/**
 * Changes the opacity of the element from 0 to 1
 */
class animators_OpacityAnimator {
    constructor() {
        this.prop = { from: 0, to: 0 };
    }
    setProperty(prop) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[OpacityAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }
    perform(element, progress, factor) {
        if (this.prop.to < 0) {
            return;
        }
        if (element["style"]) {
            element.style.opacity = calcUnitValue(this.prop, progress);
        }
    }
}
/**
 * Changes any style property of the element
 */
class animators_PropertyAnimator {
    constructor(property) {
        if (!is(property)) {
            throw new AnimatorError("[PropertyAnimator] Valid property is required");
        }
        this.property = property;
        this.prop = {
            from: 0,
            to: 0
        };
    }
    setProperty(prop) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[PropertyAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }
    perform(element, progress, factor) {
        if (!this.property) {
            return;
        }
        if (element["style"]) {
            element.style[this.property] = calcUnitValue(this.prop, progress);
        }
    }
}
/**
 * Changes transform property of the element. Supports mulitple properties at the time
 */
class animators_TransformAnimator {
    constructor() {
        this.prop = undefined;
    }
    setProperty(prop) {
        if (!prop) {
            throw new AnimatorError("[TransformAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }
    build(progress) {
        let props = [];
        for (let name in this.prop) {
            let cur = this.prop[name];
            props.push(this.buildSingle(name, calcNewValue(cur.from, cur.to, progress), cur.unit));
        }
        return props.join(" ");
    }
    buildSingle(name, value, unit) {
        return `${name}(${prepUnitValue(value, unit)})`;
    }
    perform(element, progress) {
        if (!this.prop) {
            return;
        }
        if (element["style"]) {
            element.style.transform = this.build(progress);
        }
    }
}
class ColorAnimator {
    constructor(id) {
        _from.set(this, void 0);
        _to.set(this, void 0);
        animators_classPrivateFieldSet(this, _from, { red: 0, green: 0, blue: 0, alpha: 0 });
        animators_classPrivateFieldSet(this, _to, { red: 0, green: 0, blue: 0, alpha: 0 });
        this.id = id;
    }
    perform(element, progress, factor) {
        const newColor = {
            red: calcNewValue(animators_classPrivateFieldGet(this, _from).red, animators_classPrivateFieldGet(this, _to).red, progress),
            blue: calcNewValue(animators_classPrivateFieldGet(this, _from).blue, animators_classPrivateFieldGet(this, _to).blue, progress),
            green: calcNewValue(animators_classPrivateFieldGet(this, _from).green, animators_classPrivateFieldGet(this, _to).green, progress),
            alpha: calcNewValue(animators_classPrivateFieldGet(this, _from).alpha, animators_classPrivateFieldGet(this, _to).alpha, progress),
        };
        element.style[this.id] = `rgba(${newColor.red},${newColor.green},${newColor.blue},${newColor.alpha})`;
    }
    setProperty(prop) {
        animators_classPrivateFieldSet(this, _from, adjustColor(prop.from));
        animators_classPrivateFieldSet(this, _to, adjustColor(prop.to));
    }
}
_from = new WeakMap(), _to = new WeakMap();
class animators_FilterAnimator {
    constructor() {
        this.property = {};
    }
    perform(element, progress, factor) {
        let filters = [];
        enumerateObject(this.property, (filterName, setup) => {
            filters.push(`${filterName}(${calcUnitValue(setup, progress)})`);
        });
        element.style['filter'] = filters.join(' ');
    }
    setProperty(prop) {
        this.property = prop;
    }
}
class PositionAnimator {
    constructor(id) {
        _x.set(this, void 0);
        _y.set(this, void 0);
        animators_id.set(this, void 0);
        animators_classPrivateFieldSet(this, _x, {
            from: 0,
            to: 0,
        });
        animators_classPrivateFieldSet(this, _y, {
            from: 0,
            to: 0,
        });
        animators_classPrivateFieldSet(this, animators_id, id !== null && id !== void 0 ? id : 'backgroundPosition');
    }
    perform(element, progress, factor) {
        let newX = calcUnitValue(animators_classPrivateFieldGet(this, _x), progress);
        let newY = calcUnitValue(animators_classPrivateFieldGet(this, _y), progress);
        element.style[animators_classPrivateFieldGet(this, animators_id)] = newX + " " + newY;
    }
    setProperty(prop) {
        const { x, y } = prop;
        if (x) {
            animators_classPrivateFieldSet(this, _x, x);
        }
        if (y) {
            animators_classPrivateFieldSet(this, _y, y);
        }
    }
}
_x = new WeakMap(), _y = new WeakMap(), animators_id = new WeakMap();
function adjustColor(color) {
    return {
        red: getRangeValueOrDefault(color.red, 0, 255, 0),
        green: getRangeValueOrDefault(color.green, 0, 255, 0),
        blue: getRangeValueOrDefault(color.blue, 0, 255, 0),
        alpha: getRangeValueOrDefault(color.alpha, 0, 1, 1),
    };
}
function calcNewValue(from, to, progress) {
    return from + (to - from) * progress;
}
function prepUnitValue(value, unit) {
    return value + (unit !== null && unit !== void 0 ? unit : "");
}
function calcUnitValue(prop, progress) {
    return prepUnitValue(calcNewValue(prop.from, prop.to, progress), prop.unit);
}

// CONCATENATED MODULE: ./src/core/animation/factory.ts



class factory_AnimatorFactory {
    static get(id) {
        if (!is(id)) {
            return undefined;
        }
        if (id.includes('color')) {
            return new ColorAnimator(id);
        }
        switch (id) {
            case "opacity":
                return new animators_OpacityAnimator();
            case "transform":
                return new animators_TransformAnimator();
            case "filter":
                return new animators_FilterAnimator();
            default:
                return new animators_PropertyAnimator(id);
        }
    }
}
class factory_CuiTimeAnimationEngines {
    static get(timingFunction) {
        return new engine_CuiTimeAnimationEngine(timingFunction);
    }
}

// CONCATENATED MODULE: ./src/core/animation/engine.ts
var engine_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class engine_CuiTimeAnimationEngine {
    constructor(calculator) {
        this._lock = false;
        this._animationStart = null;
        this._currentTimestamp = null;
        this._timingFunction = calculator;
    }
    animate(element, animators, setup) {
        return new Promise((resolve, reject) => {
            if (this._lock) {
                resolve(false);
                return;
            }
            this._lock = true;
            this._animationStart = setup.progress * setup.timeout + 0.0001;
            //@ts-ignore
            CuiRAF(this.performAsync.bind(this, element, animators, setup, resolve, reject));
        });
    }
    update(progress, element, animators) {
        const progressValue = this._timingFunction.calculateProgress(progress);
        this.setValues(progressValue, element, animators);
    }
    finish(element, resolve) {
        this._animationStart = null;
        this._currentTimestamp = null;
        this._lock = false;
        resolve(true);
    }
    setValues(progress, element, animators) {
        animators.forEach(animator => animator.perform(element, progress, 1));
    }
    performAsync(element, animators, setup, resolve, reject, timestamp) {
        if (this._animationStart === null) {
            this.finish(element, resolve);
            return;
        }
        if (!this._currentTimestamp) {
            this._currentTimestamp = timestamp;
        }
        const diff = timestamp - this._currentTimestamp;
        this._animationStart = setup.revert ? this._animationStart - diff : this._animationStart + diff;
        const timingprogress = this._animationStart / setup.timeout;
        const progressValue = this._timingFunction.calculateProgress(timingprogress);
        // Adjust progress value in case if calculator did not do it
        const progress = getRangeValue(progressValue, 0, 1);
        try {
            this.setValues(progress, element, animators);
        }
        catch (e) {
            reject(e);
        }
        if (timingprogress > 0 && timingprogress < 1) {
            this._currentTimestamp = timestamp;
            //@ts-ignore
            CuiRAF(this.performAsync.bind(this, element, animators, setup, resolve, reject));
            return;
        }
        this.finish(element, resolve);
    }
}
class engine_CuiSwipeAnimationEngine {
    constructor(animationEngine, shouldCleanOnFinish) {
        this._element = undefined;
        this._animators = [];
        this._animationEngine = animationEngine;
    }
    move(progress) {
        if (!this._element || this._animators.length === 0) {
            return;
        }
        this._animationEngine.update(progress, this._element, this._animators);
    }
    setElement(element) {
        this._element = element;
    }
    setProps(props) {
        if (!is(props)) {
            return;
        }
        this._animators = [];
        for (let prop in props) {
            let animator = factory_AnimatorFactory.get(prop);
            if (!animator)
                return;
            animator.setProperty(props[prop]);
            this._animators.push(animator);
        }
    }
    /**
     * Perform single update on animators in RAF
     * @param progress - progress value to be set to animators 0..1
     */
    updateAsync(progress) {
        CuiRAF(this.move.bind(this, progress));
    }
    /**
     * Finish swipe animation using animation engine
     * @param progress - initial progress value 0..1
     * @param timeout - time for animation to perform
     * @param revert - whether animation should return back to 0 or progress to the end
     */
    finish(setup) {
        return engine_awaiter(this, void 0, void 0, function* () {
            if (!this._element || this._animators.length === 0) {
                return false;
            }
            return this._animationEngine.animate(this._element, this._animators, setup);
        });
    }
}

// CONCATENATED MODULE: ./src/core/animation/calculators.ts
/**
 * Forward: y = x
 * Backward: y = -x + 1
 */
function getLinearTimingFunction() {
    return {
        calculateProgress: (currentTimeProgress) => {
            return currentTimeProgress;
        }
    };
}
/**
 *
 * @returns
 */
function getSquareCalculator() {
    return {
        calculateProgress: (currentTimeProgress) => {
            return currentTimeProgress;
        }
    };
}
/**
 *
 * y = 2x - x^2
 */
function getEaseTimingFunction() {
    return {
        calculateProgress: (currentTimeProgress) => {
            return (2 * currentTimeProgress) - Math.pow(currentTimeProgress, 2);
        }
    };
}
// export function getEaseOutCalculator(): ICuiTimingFunction {
//     function calculate(start: number, progress: number): number {
//         const a = (1 - start);
//         return -(a * getParentSqaure(progress)) + 1;
//     }
//     function calcRevert(start: number, progress: number): number {
//         return start * getParentSqaure(progress)
//     }
//     function getParentSqaure(x: number): number {
//         return Math.pow(x, 2) - 2 * x + 1;
//     }
//     return {
//         calculateProgress: (dt: number, data: ICuiAnimationPerform) => {
//             let startDist = data.velocity * data.timeout;
//             const progress = data.revert ? calcRevert(startDist, data.animationProgress) : calculate(startDist, data.animationProgress)
//             return {
//                 ...data,
//                 progress: progress + 0.0001
//             };
//         }
//     }
// }

// CONCATENATED MODULE: ./src/components/banner/banner.ts
var banner_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














//const BANNER_OPEN_ANIMATION: string = ".{prefix}-animation-fade-in";
const BANNER_CLOSE_ANIMATION = ".{prefix}-animation-fade-out";
class banner_CuiBannerArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super();
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.swipe = false;
        this.closeAct = replacePrefix(BANNER_CLOSE_ANIMATION, prefix);
    }
}
function CuiBannerComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "banner",
        create: (element, utils, prefix, attribute) => {
            return new banner_CuiBannerHandler(element, utils, attribute, prefix);
        }
    });
}
class banner_CuiBannerHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiBannerHandler", element, attribute, new banner_CuiBannerArgs(prefix, utils.setup.animationTime), utils);
        this._swipeEngine = new engine_CuiSwipeAnimationEngine(new engine_CuiTimeAnimationEngine(getLinearTimingFunction()));
        this._swipeEngine.setElement(this.element);
        this._swipeAnimation = SWIPE_ANIMATIONS_DEFINITIONS["fade"];
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._busFacade = getEventBusFacade(this.getId(), utils.bus, element);
        this._movePerformer = sliderPerformer(this.asyncClasses, {
            start: () => { return true; },
            progress: this.onMove.bind(this),
            end: this.onUp.bind(this),
            element: element
        });
        this._closeActionPerformer = closeActionsPerformer(getActionsHelper(utils.interactions), this._busFacade, {
            isActive: this.isActive.bind(this),
            onFinish: () => {
                this._movePerformer.setEnabled(false);
            }
        }, {
            element: element,
            active: this.activeAction
        });
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer,
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.GLOBAL_MOVE,
            performer: this._movePerformer
        }));
    }
    onHandle() {
        return banner_awaiter(this, void 0, void 0, function* () {
            this._interactions.mutate(() => {
                if (!this.classes.hasClass(this.activeClassName, this.element))
                    this.classes.setClass(this.activeClassName, this.element);
                AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
                AriaAttributes.setAria(this.element, 'aria-hidden', 'false');
            });
            this.updateSetup();
            return true;
        });
    }
    onRefresh() {
        return banner_awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            return true;
        });
    }
    onRemove() {
        return banner_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    updateSetup() {
        this._movePerformer.setEnabled(this.args.swipe);
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.closeAct)
        });
    }
    onMove(data) {
        this._swipeEngine.setProps(data.ratio > 0 ? this._swipeAnimation.current.right : this._swipeAnimation.current.left);
        this._interactions.mutate(() => {
            this._swipeEngine.move(Math.abs(data.ratio));
        });
    }
    onUp(data) {
        let absRatio = Math.abs(data.ratio);
        let back = absRatio <= 0.4;
        // Lock component until animation is finished
        const minVelo = 1 / this.args.timeout;
        const v = data.velocity > minVelo ? data.velocity : minVelo;
        this._swipeEngine.finish({ progress: absRatio, acceleration: data.acceleration, velocity: v, timeout: this.args.timeout, revert: back }).then(status => {
            if (!status || back) {
                return;
            }
            this.asyncClasses.removeClasses(this.element, this.activeClassName);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
            AriaAttributes.setAria(this.element, 'aria-hidden', 'true');
            this._movePerformer.setEnabled(false);
        });
    }
}

// CONCATENATED MODULE: ./src/components/circle/circle.ts
var circle_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









class circle_CuiCircleArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super();
        this.progress = 0;
    }
}
function CuiCircleComponent(prefix) {
    ICONS['special_circle_progress'] = "<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"circle-progress\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-progress-path\" d=\"M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047\"></path></svg>";
    return CuiComponentBaseHook({
        name: 'circle-progress',
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new circle_CuiCircleHandler(element, utils, attribute);
        }
    });
}
class circle_CuiCircleHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiCircleHandler", element, attribute, new circle_CuiCircleArgs(), utils);
        this._factor = this._full = 0;
        this._path = null;
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.PROGRESS_CHANGE,
            performer: callbackPerformer(this.onSetProgress.bind(this))
        }));
    }
    onHandle() {
        return circle_awaiter(this, void 0, void 0, function* () {
            const iconSvg = new icon_IconBuilder(ICONS['special_circle_progress']).build();
            if (!is(iconSvg)) {
                this.logError("SVG circle was not created", "onInit");
                return false;
            }
            const svg = this.element.querySelector('svg');
            if (is(svg)) {
                //@ts-ignore svg checked
                svg.remove();
            }
            //@ts-ignore iconSvg checked
            this.element.appendChild(iconSvg);
            this._path = this.element.querySelector('.circle-progress-path');
            this._full = this._path.getTotalLength();
            this._factor = this._full / 100;
            this._interactions.fetch(this.readStyle);
            return true;
        });
    }
    onRefresh() {
        return circle_awaiter(this, void 0, void 0, function* () {
            this._interactions.fetch(this.readStyle);
            this._busFacade.emit(EVENTS.PROGRESS_CHANGED, {
                timestamp: Date.now(),
                progress: this.args.progress
            });
            return true;
        });
    }
    onRemove() {
        return circle_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onSetProgress(val) {
        if (is(val)) {
            this.element.setAttribute(this.attribute, val);
        }
    }
    updateStyle(value) {
        this._path.style.strokeDashoffset = value;
    }
    readStyle() {
        if (this.prevArgs && this.args.progress === this.prevArgs.progress) {
            return;
        }
        const progress = getRangeValue(this.args.progress, 0, 100);
        this._interactions.mutate(this.updateStyle, this._full - this._factor * progress);
    }
}

// CONCATENATED MODULE: ./src/components/close/close.ts
var close_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











class close_CuiCloseArgs extends arguments_CuiAutoParseArgs {
    constructor(timeout) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
    }
}
function CuiCloseComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "close",
        create: (element, utils, prefix, attribute) => {
            return new close_CuiCloseHandler(element, utils, attribute);
        }
    });
}
class close_CuiCloseHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiCloseHandler", element, attribute, new close_CuiCloseArgs(utils.setup.animationTime), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._actionsHelper = new helpers_CuiActionsHelper(utils.interactions);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onClose.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: callbackPerformer(() => this.onClose(null))
        }));
    }
    onHandle() {
        return close_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRefresh() {
        return close_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRemove() {
        return close_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onClose(ev) {
        if (!this.lock()) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this.log.warning(`Target ${this.args.target} not found`, 'onClick');
            return;
        }
        //@ts-ignore target is checked
        this.run(target).then((result) => {
            if (result)
                this.emitClose(ev);
        }).catch((e) => {
            this.log.exception(e);
        }).finally(() => {
            this.unlock();
        });
    }
    run(target) {
        return close_awaiter(this, void 0, void 0, function* () {
            let cuiId = target.$cuid;
            if (is(cuiId)) {
                yield this.core.bus.emit(EVENTS.CLOSE, cuiId, this.args.state);
                return false;
            }
            else if (are(this.args.action, this.args.timeout)) {
                let actions = actions_CuiActionsListFactory.get(this.args.action);
                return this._actionsHelper.performActions(target, actions, this.args.timeout, () => {
                    this.classes.removeClass(this.activeClassName, target);
                });
            }
            else {
                this.asyncClasses.removeClasses(target, this.activeClassName);
                return true;
            }
        });
    }
    getTarget() {
        var _a;
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : getParentCuiElement(this.element);
    }
    emitClose(ev) {
        this._busFacade.emit(EVENTS.CLOSED, {
            state: this.args.state,
            event: ev
        });
    }
}

// CONCATENATED MODULE: ./src/components/extensions/keys/keys.ts
var keys_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class ICuiKeysExtensionOptions {
}
class keys_CuiKeysHandlerExtension {
    constructor(element, busFacade, performer, options) {
        var _a, _b;
        this.type = "keys";
        this.description = "";
        this._busFacade = busFacade;
        this._performer = performer;
        this._eventId = null;
        this._element = element;
        this._options = {
            allowRepeatedEvent: (_a = options === null || options === void 0 ? void 0 : options.allowRepeatedEvent) !== null && _a !== void 0 ? _a : false,
            onlyWhenInViewport: (_b = options === null || options === void 0 ? void 0 : options.onlyWhenInViewport) !== null && _b !== void 0 ? _b : true,
        };
    }
    init(args) {
        return keys_awaiter(this, void 0, void 0, function* () {
            this._eventId = this._busFacade.on(EVENTS.KEYDOWN, this.onKeyDown.bind(this));
            return true;
        });
    }
    update(args) {
        return keys_awaiter(this, void 0, void 0, function* () {
            //  this.args = args;
            return true;
        });
    }
    destroy() {
        return keys_awaiter(this, void 0, void 0, function* () {
            if (this._eventId)
                this._busFacade.detach(EVENTS.KEYDOWN, this._eventId);
            this._eventId = null;
            return true;
        });
    }
    onKeyDown(ev) {
        if (!(this._options.onlyWhenInViewport && isInViewport(this._element)) || (this._options.allowRepeatedEvent && !ev.event.repeat)) {
            return;
        }
        this._performer.perform(ev);
    }
}

// CONCATENATED MODULE: ./src/components/extensions/keys/performer.ts

function getCuiKeyActionPerformer(callback) {
    let _keyCombos = [];
    let _callback = callback;
    return {
        perform: (ev) => {
            for (const combo of _keyCombos) {
                if (matchesKeyCombo(ev.event, combo.value)) {
                    _callback(combo.key, ev);
                    return;
                }
            }
        },
        setKeyCombos(combo) {
            _keyCombos = combo;
        },
        setCallback: (callback) => {
            _callback = callback;
        }
    };
}

// CONCATENATED MODULE: ./src/components/extensions/helpers/helpers.ts
function getScrollFreezeHelper(style) {
    let _scrollY = 0;
    return {
        getScroll: () => {
            _scrollY = window.pageYOffset;
        },
        freeze: () => {
            style.setStyle('top', `-${_scrollY}px`, document.body);
        },
        release: () => {
            style.removeStyle('top', document.body);
            window.scrollTo(0, (_scrollY || 0) * -1);
            _scrollY = 0;
        }
    };
}
function getKeyCloseCombos(parser, escClose, ...combos) {
    const comboList = [];
    if (escClose) {
        comboList.push({ key: "close", value: parser.parse("Escape") });
    }
    if (combos) {
        combos.forEach(c => {
            if (c) {
                comboList.push({ key: "close", value: parser.parse(c) });
            }
        });
    }
    return comboList;
}
function getDefaultSwitchKeyCombo(key) {
    return {
        isAlt: true,
        isCtrl: true,
        isShift: false,
        key: key
    };
}

// CONCATENATED MODULE: ./src/core/utils/parsers/keys.ts

// export class CuiKeysComboParser implements ICuiParser<string, ICuiKeysCombo> {
//     private _splitBy: string;
//     private _handlers: ICuiParserCallbacks<ICuiKeysCombo, string>;
//     constructor(handlers: ICuiParserCallbacks<ICuiKeysCombo, string>, splitBy?: string) {
//         this._splitBy = splitBy ?? "+";
//         this._handlers = handlers;
//     }
//     parse(value: string): ICuiKeysCombo {
//         return splitText(value, this._splitBy).reduce((result: ICuiKeysCombo, item: string) => {
//             return this.getResult(result, item);
//         }, { isCtrl: false, isAlt: false, isShift: false });
//     }
//     private getResult(input: ICuiKeysCombo, item: string): ICuiKeysCombo {
//         let itemPrep = item.trim();
//         const handler = this._handlers[itemPrep.toLowerCase()];
//         if (handler) {
//             input = handler(input, itemPrep);
//         } else {
//             input.key = itemPrep;
//         }
//         return input;
//     }
// }
function getCuiKeysComboParser(splitBy) {
    let _handlers = KeyComboParsers;
    let _splitBy = splitBy !== null && splitBy !== void 0 ? splitBy : "+";
    function getResult(input, item) {
        let itemPrep = item.trim();
        const handler = _handlers[itemPrep.toLowerCase()];
        if (handler) {
            input = handler(input, itemPrep);
        }
        else {
            input.key = itemPrep;
        }
        return input;
    }
    return {
        parse: (value) => {
            return splitText(value, _splitBy).reduce((result, item) => {
                return getResult(result, item);
            }, { isCtrl: false, isAlt: false, isShift: false });
        }
    };
}
function AltParser(input, item) {
    input.isAlt = true;
    return input;
}
function CtrlParser(input, item) {
    input.isCtrl = true;
    return input;
}
function ShiftParser(input, item) {
    input.isShift = true;
    return input;
}
const KeyComboParsers = {
    'ctrl': CtrlParser,
    'alt': AltParser,
    'shift': ShiftParser
};

// CONCATENATED MODULE: ./src/components/cover/cover.ts
var cover_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};















const COVER_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const COVER_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-cover-open';
class cover_CuiCoverArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, defTimeout) {
        super();
        this.escClose = false;
        this.timeout = defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300;
        this.openAct = replacePrefix(COVER_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(COVER_CLOSE_ANIMATION_CLASS, prefix);
        this.keyClose = "";
    }
}
function CuiCoverComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "cover",
        create: (element, utils, prefix, attribute) => {
            return new cover_CuiCoverHandler(element, utils, attribute, prefix);
        }
    });
}
class cover_CuiCoverHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiCoverHandler", element, attribute, new cover_CuiCoverArgs(prefix, utils.setup.animationTimeLong), utils);
        this._bodyClass = replacePrefix(bodyClass, prefix);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        const actionsHelper = getActionsHelper(utils.interactions);
        this._openActionPerformer = openActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onBefore: this.onBeforeOpen.bind(this),
            onAfter: this.onAfterOpen.bind(this),
        }, {
            element: element,
            active: this.activeAction
        });
        this._closeActionPerformer = closeActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onAfter: this.onAfterClose.bind(this),
        }, {
            active: this.activeAction,
            element: element
        });
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer
        }));
        // this.extend(eventExtension(this._busFacade, {
        //     eventName: EVENTS.WINDOW_CLICK,
        //     performer: callbackPerformer(this.closeOutside.bind(this))
        // }))
        this.extend(new keys_CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer));
    }
    onHandle() {
        return cover_awaiter(this, void 0, void 0, function* () {
            AriaAttributes.setAria(this.element, 'aria-modal', "");
            this.updateSetup();
            return true;
        });
    }
    onRefresh() {
        return cover_awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            return true;
        });
    }
    onRemove() {
        return cover_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    updateSetup() {
        this._openActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.openAct)
        });
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.closeAct)
        });
        this._keysPerformer.setKeyCombos(getKeyCloseCombos(this._keyComboParser, this.args.escClose, this.args.keyClose));
    }
    closeOutside() {
        this._closeActionPerformer.perform(null);
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        this._freezeHelper.getScroll();
        return true;
    }
    onAfterOpen() {
        this.classes.setClass(this._bodyClass, document.body);
        this._freezeHelper.freeze();
        this.classes.setClass(this.activeClassName, this.element);
        AriaAttributes.setAria(this.element, 'aria-hidden', "false");
        AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
    }
    onAfterClose() {
        this._freezeHelper.release();
        this.classes.removeClass(this._bodyClass, document.body);
        AriaAttributes.setAria(this.element, 'aria-hidden', "true");
        AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
    }
    isAnyActive() {
        return this.classes.hasClass(this._bodyClass, document.body);
    }
}

// CONCATENATED MODULE: ./src/components/extensions/window/performer.ts
function getCuiWindowClickPerformer(callback) {
    let _isEnabled = false;
    return {
        perform: (arg) => {
            if (!_isEnabled) {
                return;
            }
            callback(arg);
        },
        setEnabled: (flag) => {
            _isEnabled = flag;
        }
    };
}
function getAdvancedCuiWindowClickPerformer(callback, target) {
    function nodeCallback(arg) {
        if (!target || !target.contains(arg.ev.target)) {
            callback(arg);
        }
    }
    return getCuiWindowClickPerformer(nodeCallback);
}

// CONCATENATED MODULE: ./src/components/dialog/dialog.ts
var dialog_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
















const DIALOG_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const DIALOG_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const dialog_bodyClass = '{prefix}-dialog-open';
const CONTAINER = '.{prefix}-dialog-container';
class dialog_CuiDialogArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, defTimeout) {
        super();
        this.escClose = false;
        this.outClose = false;
        this.timeout = defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300;
        this.openAct = replacePrefix(DIALOG_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(DIALOG_CLOSE_ANIMATION_CLASS, prefix);
        this.keyClose = "";
    }
}
function CuiDialogComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "dialog",
        create: (element, utils, prefix, attribute) => {
            return new dialog_CuiDialogHandler(element, utils, attribute, prefix);
        }
    });
}
class dialog_CuiDialogHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiDialogHandler", element, attribute, new dialog_CuiDialogArgs(prefix, utils.setup.animationTimeLong), utils);
        this._bodyClass = replacePrefix(dialog_bodyClass, prefix);
        const container = element.querySelector(replacePrefix(CONTAINER, prefix));
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const actionsHelper = getActionsHelper(utils.interactions);
        this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(this.closeOutside.bind(this), container !== null && container !== void 0 ? container : undefined);
        this._openActionPerformer = openActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onBefore: this.onBeforeOpen.bind(this),
            onAfter: this.onAfterOpen.bind(this),
        }, {
            element: element,
            active: this.activeAction
        });
        this._closeActionPerformer = closeActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onAfter: this.onAfterClose.bind(this),
        }, {
            element: element,
            active: this.activeAction
        });
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.WINDOW_CLICK,
            performer: this._windowClickPerformer
        }));
        this.extend(new keys_CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer));
    }
    onHandle() {
        return dialog_awaiter(this, void 0, void 0, function* () {
            this._interactions.mutate(() => {
                AriaAttributes.setAria(this.element, 'aria-modal', "");
            });
            this.updateSetup();
            return true;
        });
    }
    onRefresh() {
        return dialog_awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            return true;
        });
    }
    onRemove() {
        return dialog_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    updateSetup() {
        this._openActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.openAct)
        });
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.closeAct)
        });
        this._keysPerformer.setKeyCombos(getKeyCloseCombos(this._keyComboParser, this.args.escClose, this.args.keyClose));
        this._windowClickPerformer.setEnabled(this.args.outClose);
    }
    closeOutside() {
        this._closeActionPerformer.perform(null);
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        this._freezeHelper.getScroll();
        return true;
    }
    onAfterOpen() {
        this._freezeHelper.freeze();
        this.asyncClasses.setClasses(document.body, this._bodyClass);
    }
    onAfterClose() {
        this._freezeHelper.release();
        this.asyncClasses.removeClasses(document.body, this._bodyClass);
    }
    onBeforeClose() {
        return true;
    }
    isAnyActive() {
        return this.classes.hasClass(this._bodyClass, document.body);
    }
}

// CONCATENATED MODULE: ./src/core/listeners/hover.ts

class hover_CuiHoverListener {
    constructor(target) {
        this._target = target;
        this._inProgress = false;
        this._isHovering = false;
        this._isAttached = false;
        this._callback = undefined;
        this._onMoveBound = this.onMouseMove.bind(this);
        this._onOutBound = this.onMouseOut.bind(this);
        this._onOverBound = this.onMouseOver.bind(this);
    }
    setCallback(callback) {
        this._callback = callback;
    }
    isInProgress() {
        return this._inProgress;
    }
    attach() {
        // @ts-ignore
        this._target.addEventListener("mouseover", this._onOverBound);
        // @ts-ignore
        this._target.addEventListener("mousemove", this._onMoveBound);
        // @ts-ignore
        this._target.addEventListener("mouseout", this._onOutBound);
        this._isAttached = true;
    }
    detach() {
        // @ts-ignore
        this._target.removeEventListener("mouseover", this._onOverBound);
        // @ts-ignore
        this._target.removeEventListener("mousemove", this._onMoveBound);
        // @ts-ignore
        this._target.removeEventListener("mouseout", this._onOutBound);
        this._isAttached = false;
    }
    emit(mouseEvent, force) {
        if (!are(this._callback)) {
            return;
        }
        if (!force && this._inProgress) {
            return;
        }
        this._inProgress = true;
        window.requestAnimationFrame(this.invoke.bind(this, {
            isHovering: this._isHovering,
            event: mouseEvent,
            timestamp: Date.now()
        }));
    }
    isAttached() {
        return this._isAttached;
    }
    invoke(ev) {
        if (this._callback)
            this._callback(ev);
        this._inProgress = false;
    }
    onMouseOver(ev) {
        this._isHovering = true;
        this.emit(ev, true);
    }
    onMouseOut(ev) {
        this._isHovering = false;
        this.emit(ev, true);
    }
    onMouseMove(ev) {
        this.emit(ev, false);
    }
}

// CONCATENATED MODULE: ./src/core/position/evaluator.ts


class evaluator_CuiBasePositionEvaluator {
    constructor() {
        this._targetHeight = -1;
        this._targetWidth = -1;
        this._box = undefined;
        this._margin = 0;
    }
    setElementBox(box) {
        this._box = box;
    }
    setTarget(targetBox) {
        this._targetWidth = targetBox.width;
        this._targetHeight = targetBox.height;
    }
    setMargin(value) {
        this._margin = value;
    }
    getVerticalPosition(value) {
        switch (value) {
            case 'top':
                return this.getTopPosition();
            case "bottom":
                return this.getBottomPosition();
            case "middle":
                return this.getMiddlePosition();
            default:
                return -1;
        }
    }
    getHorizontalPosition(value) {
        switch (value) {
            case 'left':
                return this.getLeftPosition();
            case "right":
                return this.getRightPosition();
            case "center":
                return this.getCenterPosition();
            default:
                return -1;
        }
    }
    getAutoVerticalPosition(initial) {
        let innerHeight = window.innerHeight;
        let number = this.getVerticalPosition(initial);
        if ((initial === 'top' || initial === "middle") && number < 0) {
            return [this.getVerticalPosition("bottom"), "bottom"];
        }
        else if ((initial === "bottom" || initial === "middle") && number + this._targetHeight > innerHeight) {
            return [this.getVerticalPosition("top"), "top"];
        }
        return [number, initial];
    }
    getAutoHorizontalPosition(initial) {
        let innerWidth = window.innerWidth;
        let number = this.getHorizontalPosition(initial);
        if ((initial === 'right' || initial === "center") && number < 0) {
            return [this.getHorizontalPosition("left"), "left"];
        }
        else if ((initial === 'left' || initial === "center") && number + this._targetWidth > innerWidth) {
            return [this.getHorizontalPosition("right"), "right"];
        }
        return [number, initial];
    }
    getTopPosition() {
        this.throwIfNotValid("getTopPosition");
        // @ts-ignore - already checked in validate
        return this._box.top - this._margin - this._targetHeight;
    }
    getBottomPosition() {
        this.throwIfNotValid("getBottomPosition");
        // @ts-ignore - already checked in validate
        return this._box.top + this._box.height + this._margin;
    }
    getMiddlePosition() {
        this.throwIfNotValid("getMiddlePosition");
        // @ts-ignore - already checked in validate
        return (this._box.top + this._box.height / 2) - this._targetHeight / 2;
    }
    getLeftPosition() {
        this.throwIfNotValid("getLeftPosition");
        // @ts-ignore - already checked in validate
        return this._box.left;
    }
    getRightPosition() {
        this.throwIfNotValid("getRightPosition");
        // @ts-ignore - already checked in validate
        return this._box.left + this._box.width - this._targetWidth;
    }
    getCenterPosition() {
        this.throwIfNotValid("getCenterPosition");
        // @ts-ignore - already checked in validate
        return (this._box.left + this._box.width / 2) - this._targetWidth / 2;
    }
    validate() {
        return is(this._box) && this._targetHeight > 0 && this._targetWidth > 0;
    }
    throwIfNotValid(method) {
        if (!this.validate()) {
            throw new CuiPositionError(`[${method}] Position cannot be calculated: missing data [width: ${this._targetWidth}][height: ${this._targetHeight}]`);
        }
    }
}

// CONCATENATED MODULE: ./src/core/position/calculator.ts



class calculator_CuiBasePositionCalculator {
    constructor(evaluator) {
        this._preferred = "top-center";
        this._static = "";
        this._evaluator = evaluator !== null && evaluator !== void 0 ? evaluator : new evaluator_CuiBasePositionEvaluator();
        this._log = factory_CuiDevtoolFactory.get("CuiBasePositionCalculator");
    }
    setMargin(value) {
        this._evaluator.setMargin(value);
    }
    setPreferred(position) {
        this._preferred = position;
    }
    setStatic(position) {
        this._static = position;
    }
    //targetWidth: number, targetHeight: number
    calculate(elementBox, targetBox) {
        this._evaluator.setElementBox(elementBox);
        this._evaluator.setTarget(targetBox);
        if (is(this._static)) {
            this._log.debug("Evaluating static position");
            const [vertical, horizontal] = this.parse(this._static);
            return [this._evaluator.getHorizontalPosition(horizontal), this._evaluator.getVerticalPosition(vertical), this._static];
        }
        let [vertical, horizontal] = ["", ""];
        if (is(this._preferred)) {
            this._log.debug("Evaluating auto position");
            [vertical, horizontal] = this.parse(this._preferred);
        }
        vertical = vertical !== null && vertical !== void 0 ? vertical : "top";
        horizontal = horizontal !== null && horizontal !== void 0 ? horizontal : "center";
        this._log.debug("Calculating position: " + vertical + "-" + horizontal);
        const [outVNum, outVPos] = this._evaluator.getAutoVerticalPosition(vertical);
        const [outHNum, outHPos] = this._evaluator.getAutoHorizontalPosition(horizontal);
        this._log.debug("Calculated position: " + outVPos + "-" + outHPos);
        return [outHNum, outVNum, outVPos + "-" + outHPos];
    }
    parse(position) {
        return position.split("-");
    }
}

// CONCATENATED MODULE: ./src/core/utils/task.ts

class task_CuiTaskRunner {
    constructor(timeout, autoRenew, callback) {
        this._autoRenew = autoRenew;
        this._timeout = timeout;
        this._callback = callback;
    }
    start() {
        if (!this.canRun()) {
            return;
        }
        this.stop();
        this._taskId = setTimeout(() => {
            //@ts-ignore - already checked in canRun
            this._callback();
            this._taskId = null;
            if (this._autoRenew) {
                this.start();
            }
        }, this._timeout);
    }
    stop() {
        if (this._taskId) {
            clearTimeout(this._taskId);
            this._taskId = null;
        }
    }
    getId() {
        return this._taskId;
    }
    canRun() {
        return is(this._callback) && this._timeout > 0;
    }
    setCallback(callback) {
        this._callback = callback;
    }
    setTimeout(timeout) {
        this._timeout = timeout;
    }
}

// CONCATENATED MODULE: ./src/components/extensions/hover/hover.ts
var hover_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class hover_CuiHoverModule {
    constructor(element, onHover) {
        this.type = 'hover';
        this.description = "";
        this._onHover = onHover;
        this._hoverListener = new hover_CuiHoverListener(element);
        this._hoverListener.setCallback(this.onHover.bind(this));
    }
    init(args) {
        return hover_awaiter(this, void 0, void 0, function* () {
            this._hoverListener.attach();
            return true;
        });
    }
    destroy() {
        return hover_awaiter(this, void 0, void 0, function* () {
            this._hoverListener.detach();
            return true;
        });
    }
    onHover(ev) {
        this._onHover(ev);
    }
}
function hoverExtension(setup) {
    var _a;
    const _hoverListener = new hover_CuiHoverListener(setup.element);
    function onHover(arg) {
        setup.performer.perform(arg);
    }
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : 'hover',
        init: () => hover_awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            _hoverListener.setCallback(onHover);
            _hoverListener.attach();
            return true;
        }),
        destroy: () => hover_awaiter(this, void 0, void 0, function* () {
            _hoverListener.detach();
            return true;
        })
    };
}

// CONCATENATED MODULE: ./src/components/drop/drop.ts
var drop_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};















const drop_bodyClass = "{prefix}-drop-open";
const DROP_POSITION = "{prefix}-drop-position-";
const DROP_TRIGGER = "{prefix}-drop-trigger";
const DROP_DEFAULT_TRIGGER = "> a, button";
const DROP_DEFAULT_ANIMATION_CLS = "{prefix}-drop-animation-in";
class drop_CuiDropArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix) {
        super({
            props: {
                trigger: { corrector: joinWithScopeSelector },
            },
        });
        this.mode = "click";
        this.trigger = joinWithScopeSelector(DROP_DEFAULT_TRIGGER);
        this.autoClose = false;
        this.outClose = true;
        this.prevent = false;
        this.pos = "";
        this.action = replacePrefix(DROP_DEFAULT_ANIMATION_CLS, prefix);
        this.timeout = 3000;
        this.margin = 8;
    }
}
function CuiDropComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "drop",
        create: (element, utils, prefix, attribute) => {
            return new drop_CuiDropHandler(element, utils, attribute, prefix);
        },
    });
}
class drop_CuiDropHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiDropHandler", element, attribute, new drop_CuiDropArgs(prefix), utils);
        this._prefix = prefix;
        this._bodyClass = replacePrefix(drop_bodyClass, prefix);
        this.onTriggerClick = this.onTriggerClick.bind(this);
        this._positionCalculator = new calculator_CuiBasePositionCalculator();
        this._positionCalculator.setMargin(8);
        this._positionCalculator.setPreferred("bottom-left");
        this._posClass = "";
        this._triggerHoverListener = undefined;
        this._trigger = this.element;
        this._actions = [];
        this._autoTask = new task_CuiTaskRunner(this.args.timeout, false, this.close.bind(this));
        this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(this.close.bind(this), element);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("Window click plugin is not available: outClose will not work");
        }
        this.extend(new hover_CuiHoverModule(this.element, this.onElementHover.bind(this)));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.WINDOW_CLICK,
            performer: this._windowClickPerformer,
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: callbackPerformer(this.open.bind(this)),
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: callbackPerformer(this.close.bind(this)),
        }));
    }
    onHandle() {
        return drop_awaiter(this, void 0, void 0, function* () {
            this._trigger = this.acquireTrigger();
            this._triggerHoverListener = new hover_CuiHoverListener(this._trigger);
            this._triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
            this._triggerHoverListener.attach();
            //@ts-ignore
            this._trigger.addEventListener("click", this.onTriggerClick);
            // this.setTriggerEvent();
            this.setDataFromArgs();
            this._interactions.mutate(() => {
                AriaAttributes.setAria(this.element, "aria-dropdown", "");
            });
            return true;
        });
    }
    onRefresh() {
        return drop_awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs && this.args.trigger !== this.prevArgs.trigger) {
                if (this._triggerHoverListener &&
                    this._triggerHoverListener.isAttached()) {
                    this._triggerHoverListener.detach();
                }
                else if (this.prevArgs && this.prevArgs.mode === "click") {
                    //@ts-ignore
                    this._trigger.removeEventListener("click", this.onTriggerClick);
                }
                this._trigger = this.acquireTrigger();
                this._triggerHoverListener = new hover_CuiHoverListener(this._trigger);
                this._triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
                this._triggerHoverListener.attach();
                //@ts-ignore
                this._trigger.addEventListener("click", this.onTriggerClick);
            }
            this.setDataFromArgs();
            return true;
        });
    }
    onRemove() {
        return drop_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    setDataFromArgs() {
        this._positionCalculator.setStatic(this.args.pos);
        this._positionCalculator.setMargin(this.args.margin);
        this._autoTask.setTimeout(this.args.timeout);
        this._actions = actions_CuiActionsListFactory.get(this.args.action);
        this._windowClickPerformer.setEnabled(this.args.outClose);
    }
    /**
     * Api Method open
     */
    open() {
        return drop_awaiter(this, void 0, void 0, function* () {
            if (this.isActive()) {
                return this.close();
            }
            if (this.isAnyActive()) {
                yield this.findAndCloseOpenedDrop();
            }
            if (!this.lock("open")) {
                return false;
            }
            this.log.debug(`Drop ${this.cuid}`, "open");
            this.onOpen();
            return true;
        });
    }
    /**
     * Api Method close
     */
    close() {
        return drop_awaiter(this, void 0, void 0, function* () {
            if (!this.isActive()) {
                return false;
            }
            if (!this.lock("close")) {
                return false;
            }
            this.logInfo(`Drop ${this.cuid}`, "close");
            this.onClose();
            this._busFacade.emit(EVENTS.CLOSED, {
                timestamp: Date.now(),
            });
            return true;
        });
    }
    /**
     * Set of actions performed during drop open
     */
    onOpen() {
        this.classes.setClass(this.activeClassName, this.element);
        this._interactions.mutate(() => {
            const box = this._trigger.getBoundingClientRect();
            try {
                const [x, y, pos] = this._positionCalculator.calculate(box, this.element.getBoundingClientRect());
                this.element.style.top = `${y - box.top}px`;
                this.element.style.left = `${x - box.left}px`;
                this._posClass = replacePrefix(DROP_POSITION + pos, this._prefix);
                this.toggleActions();
                this.classes.setClass(this._posClass, this.element);
                this.classes.setClass(this._bodyClass, document.body);
                AriaAttributes.setAria(this.element, "aria-expanded", "true");
            }
            catch (e) {
                this.log.exception(e);
            }
            finally {
                this.unlock();
                this._busFacade.emit(EVENTS.OPENED, {
                    timestamp: Date.now(),
                });
                this.runAutoCloseTask();
            }
        });
    }
    /**
     * Set of actions performed during drop close
     */
    onClose() {
        this._interactions.mutate(() => {
            this.classes.removeClass(this.activeClassName, this.element);
            this.classes.removeClass(this._bodyClass, document.body);
            this.toggleActions();
            this.classes.removeClass(this._posClass, this.element);
            AriaAttributes.setAria(this.element, "aria-expanded", "false");
            this.unlock();
        });
    }
    isAnyActive() {
        return this.classes.hasClass(this._bodyClass, document.body);
    }
    /**
     * Finds and opens other active drop element
     */
    findAndCloseOpenedDrop() {
        return drop_awaiter(this, void 0, void 0, function* () {
            const opened = document.querySelector(`[${this.attribute}].${this.activeClassName}`);
            if (!is(opened)) {
                this.log.warning("Opened drop was not found");
                return false;
            }
            //@ts-ignore opened checked
            const handler = opened.$handlers[this.attribute];
            if (!is(handler)) {
                this.log.warning("Drop handler was not found in the element");
                return false;
            }
            return handler.close();
        });
    }
    /**
     * Invoked when trigger button is clicked
     * @param ev
     */
    onTriggerClick(ev) {
        if (this.args.mode !== "click") {
            return;
        }
        if (this.isActive()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Invoked when trigger button is hovered on
     * @param ev
     */
    onHoverEvent(ev) {
        if (this.args.mode !== "hover") {
            return;
        }
        if (ev.isHovering && !this.isActive()) {
            this.open();
        }
    }
    /**
     * Method triggered when opened element is hovered on
     * @param ev
     */
    onElementHover(ev) {
        if (ev.isHovering) {
            this._autoTask.stop();
        }
        else if (!ev.isHovering && this.args.autoClose) {
            this.runAutoCloseTask();
        }
    }
    /**
     * Runs auto-close task on opened element
     */
    runAutoCloseTask() {
        if (!this.args.autoClose) {
            return;
        }
        this._autoTask.start();
    }
    toggleActions() {
        this._actions.forEach((action) => {
            action.toggle(this.element);
        });
    }
    acquireTrigger() {
        let ret = null;
        if (!this.element.parentElement) {
            ret = document.querySelector(this.args.trigger);
        }
        else
            ret = this.element.parentElement.querySelector(this.args.trigger);
        return ret !== null && ret !== void 0 ? ret : this.element;
    }
}

// CONCATENATED MODULE: ./src/components/float/helpers.ts
var helpers_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var helpers_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _element, _element_1, _element_2;
class BasePositionCalculator {
    calculate(x, y, diffX, diffY) {
        return [x, y];
    }
}
class OptionalPositionCalculator {
    constructor(element) {
        _element.set(this, void 0);
        helpers_classPrivateFieldSet(this, _element, element);
    }
    calculate(x, y, diffX, diffY) {
        let newX = helpers_classPrivateFieldGet(this, _element).offsetLeft + diffX;
        let newY = helpers_classPrivateFieldGet(this, _element).offsetTop + diffY;
        return [newX, newY];
    }
}
_element = new WeakMap();
class BaseResizeCalculator {
    constructor(element) {
        _element_1.set(this, void 0);
        helpers_classPrivateFieldSet(this, _element_1, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = x - helpers_classPrivateFieldGet(this, _element_1).offsetLeft;
        let height = y - helpers_classPrivateFieldGet(this, _element_1).offsetTop;
        return [width, height];
    }
}
_element_1 = new WeakMap();
class OptionalResizeCalculator {
    constructor(element) {
        _element_2.set(this, void 0);
        helpers_classPrivateFieldSet(this, _element_2, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = helpers_classPrivateFieldGet(this, _element_2).offsetWidth + diffX;
        let height = helpers_classPrivateFieldGet(this, _element_2).offsetHeight + diffY;
        return [width, height];
    }
}
_element_2 = new WeakMap();
function getMoveAction(type, calculator, element, interactions, styles) {
    const callback = floatCallbacks[type];
    if (!callback) {
        return undefined;
    }
    return floatActionBase(calculator, element, callback(interactions, styles));
}
function fitsWindow(top, left, width, height) {
    return (top + height < window.innerHeight - 10) &&
        (top > 10) && (left > 10) &&
        (left + width < window.innerWidth - 10);
}
const floatCallbacks = {
    'resize': onResizeSwipe,
    'move': onMoveSwipe
};
function floatActionBase(calculator, element, onMove) {
    return {
        init: (ev) => {
            ev.event.preventDefault();
        },
        move: (x, y, diffX, diffY) => {
            const [newX, newY] = calculator.calculate(x, y, diffX, diffY);
            if (fitsWindow(newY, newX, element.offsetWidth, element.offsetHeight)) {
                onMove(newX, newY, element);
            }
        }
    };
}
function onResizeSwipe(interactions, styles) {
    return (x, y, element) => {
        interactions.mutate(() => {
            styles.setStyle('width', x + "px", element);
            styles.setStyle('height', y + "px", element);
        });
    };
}
function onMoveSwipe(_interactions, styles) {
    return (x, y, element) => {
        _interactions.mutate(() => {
            styles.setStyle('left', x + "px", element);
            styles.setStyle('top', y + "px", element);
        });
    };
}

// CONCATENATED MODULE: ./src/components/extensions/listener/listener.ts
var listener_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function listenerExtension(setup) {
    return {
        type: setup.type,
        init: () => listener_awaiter(this, void 0, void 0, function* () {
            if (!setup.listener.isAttached())
                setup.listener.attach();
            return true;
        }),
        destroy: () => listener_awaiter(this, void 0, void 0, function* () {
            if (setup.listener.isAttached())
                setup.listener.detach();
            return true;
        })
    };
}

// CONCATENATED MODULE: ./src/components/extensions/move/move.ts


function moveExtension(setup) {
    const listener = new move_CuiMoveEventListener(setup.root);
    listener.setTarget(setup.target);
    listener.preventDefault(setup.preventDefault === true);
    listener.setCallback((ev) => {
        setup.performer.perform(ev);
    });
    return listenerExtension({
        type: "move",
        listener: listener
    });
}

// CONCATENATED MODULE: ./src/components/float/float.ts
var float_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


















const FLOAT_OPEN_ANIMATION_CLASS = '.{prefix}-float-default-in';
const FLOAT_CLOSE_ANIMATION_CLASS = '.{prefix}-float-default-out';
const MOVE = '.{prefix}-float-move';
const RESIZE = '.{prefix}-float-resize';
class float_CuiFloatArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, defTimeout) {
        super();
        this.escClose = false;
        this.keyClose = "";
        this.openAct = replacePrefix(FLOAT_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(FLOAT_CLOSE_ANIMATION_CLASS, prefix);
        this.timeout = defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300;
    }
}
function CuiFloatComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "float",
        create: (element, utils, prefix, attribute) => {
            return new float_CuiFloatHandler(element, utils, attribute, prefix);
        }
    });
}
class float_CuiFloatHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiFloatHandler", element, attribute, new float_CuiFloatArgs(prefix, utils.setup.animationTime), utils);
        this._prevX = 0;
        this._prevY = 0;
        this._positionCalculator = new BasePositionCalculator();
        this._resizeCalculator = new BaseResizeCalculator(element);
        this._prefix = prefix;
        this._moveBtn = null;
        this._resizeBtn = null;
        this._currentAction = undefined;
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._styles = new CuiStyleHelper();
        this._busFacade = getEventBusFacade(this.getId(), utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.onCloseAction.bind(this));
        this._keyComboParser = getCuiKeysComboParser();
        this._movePerformer = moveExtensionPerformer({
            onDown: this.onMouseDown.bind(this),
            onMove: this.onMouseMove.bind(this),
            onUp: this.onMouseUp.bind(this),
        });
        this._movePerformer.setEnabled(false);
        const actionsHelper = getActionsHelper(utils.interactions);
        this._openActionPerformer = openActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onFinish: () => {
                this._movePerformer.setEnabled(true);
            }
        }, {
            active: this.activeAction,
            element: element
        });
        this._closeActionPerformer = closeActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onFinish: () => {
                this._movePerformer.setEnabled(false);
            }
        }, {
            active: this.activeAction,
            element: element
        });
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
        this.extend(moveExtension({
            performer: this._movePerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer,
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer,
        }));
        this.extend(new keys_CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer));
    }
    onHandle() {
        return float_awaiter(this, void 0, void 0, function* () {
            AriaAttributes.setAria(this.element, 'aria-modal', "");
            this._moveBtn = this.element.querySelector(replacePrefix(MOVE, this._prefix));
            this._resizeBtn = this.element.querySelector(replacePrefix(RESIZE, this._prefix));
            this.updateSetups();
            return true;
        });
    }
    onRefresh() {
        return float_awaiter(this, void 0, void 0, function* () {
            this.updateSetups();
            return true;
        });
    }
    onRemove() {
        return float_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    updateSetups() {
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.closeAct)
        });
        this._openActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.openAct)
        });
        this._keysPerformer.setKeyCombos(getKeyCloseCombos(this._keyComboParser, this.args.escClose, this.args.keyClose));
    }
    onMouseDown(ev) {
        let type = "";
        let calculator = undefined;
        if (ev.target === this._moveBtn) {
            type = 'move';
            calculator = this._positionCalculator;
        }
        else if (ev.target === this._resizeBtn) {
            type = "resize";
            calculator = this._resizeCalculator;
        }
        else {
            return;
        }
        this._currentAction = getMoveAction(type, calculator, this.element, this._interactions, this._styles);
        if (this._currentAction) {
            this._currentAction.init(ev);
        }
        this._prevX = ev.x;
        this._prevY = ev.y;
        this.asyncClasses.setClasses(document.body, CLASSES.swipingOn);
        // Lock global move handler
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, true);
    }
    onMouseMove(ev) {
        if (this._currentAction) {
            this._currentAction.move(ev.x, ev.y, (ev.x - this._prevX), (ev.y - this._prevY));
        }
        this._prevX = ev.x;
        this._prevY = ev.y;
        ev.event.preventDefault();
    }
    onMouseUp(ev) {
        this._currentAction = undefined;
        this.asyncClasses.removeClasses(document.body, CLASSES.swipingOn);
        // Unlock global handler
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, false);
    }
    onCloseAction() {
        this._closeActionPerformer.perform("keys");
    }
}

// CONCATENATED MODULE: ./src/components/icon/icon.ts
var icon_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







class icon_CuiIconArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super({
            main: "icon",
        });
        this.icon = "";
        this.scale = 1;
    }
}
function CuiIconComponent(prefix) {
    return CuiComponentBaseHook({
        name: "icon",
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new icon_CuiIconHandler(element, utils, attribute);
        },
    });
}
class icon_CuiIconHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiIconHandler", element, attribute, new icon_CuiIconArgs(), utils);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
    }
    onHandle() {
        return icon_awaiter(this, void 0, void 0, function* () {
            this.addIcon(this.args.icon);
            return true;
        });
    }
    onRefresh() {
        return icon_awaiter(this, void 0, void 0, function* () {
            if (!this.prevArgs || this.args.icon === this.prevArgs.icon) {
                return false;
            }
            this.addIcon(this.args.icon);
            return true;
        });
    }
    onRemove() {
        return icon_awaiter(this, void 0, void 0, function* () {
            const svg = this.element.querySelectorAll("svg");
            if (is(svg)) {
                //@ts-ignore checked
                svg.remove();
            }
            return true;
        });
    }
    addIcon(icon) {
        const iconStr = icon ? ICONS[icon] : null;
        if (!iconStr) {
            return;
        }
        const iconSvg = new icon_IconBuilder(iconStr)
            .setScale(this.args.scale)
            .build();
        if (!iconSvg) {
            return;
        }
        const svgs = this.element.querySelectorAll("svg");
        this._interactions.mutate(() => {
            for (let svg of svgs) {
                svg.remove();
            }
            if (this.element.childNodes.length > 0) {
                this.insertBefore(iconSvg);
                return;
            }
            this.appendChild(iconSvg);
        });
    }
    insertBefore(iconElement) {
        this.element.insertBefore(iconElement, this.element.firstChild);
    }
    appendChild(iconElement) {
        this.element.appendChild(iconElement);
    }
}

// CONCATENATED MODULE: ./src/components/offcanvas/offcanvas.ts
var offcanvas_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var offcanvas_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var offcanvas_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prefix_1;
















const OFFCANVAS_RIGHT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-right-in";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-right-out";
const OFFCANVAS_LEFT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-left-in";
const OFFCANVAS_LEFT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-left-out";
const OFFCANVAS_BODY = "{prefix}-off-canvas-open";
const OFFCANVAS_CONTAINER_CLS = '.{prefix}-off-canvas-container';
class offcanvas_CuiOffCanvasArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super();
        _prefix_1.set(this, void 0);
        offcanvas_classPrivateFieldSet(this, _prefix_1, prefix);
        this.escClose = false;
        this.position = 'right';
        this.openAct = this.getDefaultOpenClass();
        this.closeAct = this.getDefaultCloseClass();
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.outClose = false;
        this.keyClose = "";
    }
    getDefaultOpenClass() {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_IN : OFFCANVAS_LEFT_ANIM_DEFAULT_IN, offcanvas_classPrivateFieldGet(this, _prefix_1));
    }
    getDefaultCloseClass() {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT : OFFCANVAS_LEFT_ANIM_DEFAULT_OUT, offcanvas_classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
function CuiOffCanvasComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "off-canvas",
        create: (element, utils, prefix, attribute) => {
            return new offcanvas_CuiOffCanvasHandler(element, utils, attribute, prefix);
        }
    });
}
class offcanvas_CuiOffCanvasHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiOffCanvasHandler", element, attribute, new offcanvas_CuiOffCanvasArgs(prefix, utils.setup.animationTime), utils);
        this._prefix = prefix;
        const container = element.querySelector(replacePrefix(OFFCANVAS_CONTAINER_CLS, prefix));
        this._bodyClass = replacePrefix(OFFCANVAS_BODY, prefix);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        const actionsHelper = getActionsHelper(utils.interactions);
        this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(this.closeOutside.bind(this), container !== null && container !== void 0 ? container : undefined);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("WindowClick plugin is not available, outClose will not work");
        }
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
        this._openActionPerformer = openActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onBefore: this.onBeforeOpen.bind(this),
            onAfter: this.onAfterOpen.bind(this),
        }, {
            element: element,
            active: this.activeAction
        });
        this._closeActionPerformer = closeActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onAfter: this.onAfterClose.bind(this),
        }, {
            element: element,
            active: this.activeAction
        });
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.WINDOW_CLICK,
            performer: this._windowClickPerformer
        }));
        this.extend(new keys_CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer));
    }
    onHandle() {
        return offcanvas_awaiter(this, void 0, void 0, function* () {
            this._interactions.mutate(() => {
                this.setPositionLeft();
                AriaAttributes.setAria(this.element, 'aria-modal', "");
            });
            this.updateSetup();
            return true;
        });
    }
    onRefresh() {
        return offcanvas_awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            return true;
        });
    }
    onRemove() {
        return offcanvas_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    updateSetup() {
        this._openActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.openAct)
        });
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: actions_CuiActionsListFactory.get(this.args.closeAct)
        });
        this._keysPerformer.setKeyCombos(getKeyCloseCombos(this._keyComboParser, this.args.escClose, this.args.keyClose));
        this._windowClickPerformer.setEnabled(this.args.outClose);
    }
    closeOutside() {
        this._closeActionPerformer.perform(null);
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        this._freezeHelper.getScroll();
        return true;
    }
    onAfterOpen() {
        this._freezeHelper.freeze();
        this.asyncClasses.setClasses(document.body, this._bodyClass);
    }
    onAfterClose() {
        this._freezeHelper.release();
        this.asyncClasses.removeClasses(document.body, this._bodyClass);
    }
    onBeforeClose() {
        return true;
    }
    isAnyActive() {
        return this.classes.hasClass(this._bodyClass, document.body);
    }
    setPositionLeft() {
        let cls = getName(this._prefix, 'left');
        if (this.args.position === 'left' && !this.classes.hasClass(cls, this.element)) {
            this.classes.setClass(cls, this.element);
        }
        else if (this.args.position == 'right' && this.classes.hasClass(cls, this.element)) {
            this.classes.removeClass(cls, this.element);
        }
    }
}

// CONCATENATED MODULE: ./src/components/offset/modes.ts
var modes_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var modes_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _pointLeft, _pointTop, _prevDiffY, _prevDiffX, _wasTriggeredX, _wasTriggeredY, modes_threshold;
class CuiOffsetStaticMode {
    matches(top, left, offsetX, offsetY) {
        return (offsetX > 0 && left >= offsetX) ||
            (offsetY > 0 && top >= offsetY);
    }
}
/**
 * Dynamically calculates whether to trigger or untrigger an action.
 * If current value exceedes offset and threshold action is triggered.
 * If action was triggered and current move is lower than threshold action is untriggered
 *
 * Example: If offsetY is 100, then first after 100 action is set on. It is kept when scrolling down.
 * If user decides to scroll up and difference between turning point and current is bigger than threshold then action is set off.
 *
 * Example usage is with navbar - it shall disappear after offset and return back when user scrolls up.
 */
class CuiOffsetDynamicMode {
    constructor() {
        _pointLeft.set(this, void 0);
        _pointTop.set(this, void 0);
        _prevDiffY.set(this, void 0);
        _prevDiffX.set(this, void 0);
        _wasTriggeredX.set(this, void 0);
        _wasTriggeredY.set(this, void 0);
        modes_threshold.set(this, void 0);
        modes_classPrivateFieldSet(this, _pointLeft, 0);
        modes_classPrivateFieldSet(this, _pointTop, 0);
        modes_classPrivateFieldSet(this, _prevDiffX, 0);
        modes_classPrivateFieldSet(this, _prevDiffY, 0);
        modes_classPrivateFieldSet(this, modes_threshold, 100);
        modes_classPrivateFieldSet(this, _wasTriggeredX, false);
        modes_classPrivateFieldSet(this, _wasTriggeredY, false);
    }
    matches(top, left, offsetX, offsetY) {
        return this.fitsOffsetY(top, offsetY) || this.fitsOffsetX(left, offsetX);
    }
    fitsOffsetX(left, offsetX) {
        if (offsetX <= 0)
            return false;
        let diffX = left - modes_classPrivateFieldGet(this, _pointLeft);
        if (left >= offsetX && diffX > modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredX, true);
        }
        else if (modes_classPrivateFieldGet(this, _wasTriggeredX) && diffX < -modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredX, false);
        }
        if (diffX < 0 && modes_classPrivateFieldGet(this, _prevDiffX) < diffX || diffX >= 0 && modes_classPrivateFieldGet(this, _prevDiffX) > diffX) {
            modes_classPrivateFieldSet(this, _pointLeft, left);
        }
        modes_classPrivateFieldSet(this, _prevDiffX, diffX);
        return modes_classPrivateFieldGet(this, _wasTriggeredX);
    }
    fitsOffsetY(top, offsetY) {
        if (offsetY <= 0) {
            return false;
        }
        let diffY = top - modes_classPrivateFieldGet(this, _pointTop);
        if (top >= offsetY && diffY > modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredY, true);
        }
        else if (modes_classPrivateFieldGet(this, _wasTriggeredY) && diffY < -modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredY, false);
        }
        if (diffY < 0 && modes_classPrivateFieldGet(this, _prevDiffY) < diffY || diffY >= 0 && modes_classPrivateFieldGet(this, _prevDiffY) > diffY) {
            modes_classPrivateFieldSet(this, _pointTop, top);
        }
        modes_classPrivateFieldSet(this, _prevDiffY, diffY);
        return modes_classPrivateFieldGet(this, _wasTriggeredY);
    }
}
_pointLeft = new WeakMap(), _pointTop = new WeakMap(), _prevDiffY = new WeakMap(), _prevDiffX = new WeakMap(), _wasTriggeredX = new WeakMap(), _wasTriggeredY = new WeakMap(), modes_threshold = new WeakMap();
class CuiOffsetModeFactory {
    static get(mode) {
        if (mode === 'dynamic') {
            return new CuiOffsetDynamicMode();
        }
        return new CuiOffsetStaticMode();
    }
}

// CONCATENATED MODULE: ./src/core/models/elements.ts
class CuiElementBoxFactory {
    static get(element) {
        if (element instanceof Window) {
            return new WindowElementBox();
        }
        else if (element instanceof HTMLElement) {
            return new HTMLElementBox(element);
        }
        return new ElementBox(element);
    }
}
class ElementBox {
    constructor(element) {
        this._element = element;
        this._box = element.getBoundingClientRect();
    }
    getHeight() {
        return this._box.height;
    }
    getWidth() {
        return this._box.width;
    }
    getTop() {
        return this._box.top;
    }
    getLeft() {
        return this._box.left;
    }
    getScrollHeight() {
        return this._element.scrollHeight;
    }
    getScrollWidth() {
        return this._element.scrollWidth;
    }
    getScrollTop() {
        return this._element.scrollTop;
    }
    getScrollLeft() {
        return this._element.scrollLeft;
    }
    queryAll(selector) {
        return [...this._element.querySelectorAll(selector)];
    }
    get() {
        return this._element;
    }
    scrollTo(options) {
        this._element.scrollTo(options);
    }
}
class HTMLElementBox {
    constructor(element) {
        this._element = element;
    }
    getHeight() {
        return this._element.offsetHeight;
    }
    getWidth() {
        return this._element.offsetWidth;
    }
    getTop() {
        return this._element.offsetTop;
    }
    getLeft() {
        return this._element.offsetLeft;
    }
    getScrollHeight() {
        return this._element.scrollHeight;
    }
    getScrollWidth() {
        return this._element.scrollWidth;
    }
    getScrollTop() {
        return this._element.scrollTop;
    }
    getScrollLeft() {
        return this._element.scrollLeft;
    }
    queryAll(selector) {
        return [...this._element.querySelectorAll(selector)];
    }
    get() {
        return this._element;
    }
    scrollTo(options) {
        this._element.scrollTo(options);
    }
}
class WindowElementBox {
    getHeight() {
        return window.innerHeight;
    }
    getWidth() {
        return window.innerWidth;
    }
    getTop() {
        return 0;
    }
    getLeft() {
        return 0;
    }
    getScrollHeight() {
        return window.innerHeight;
    }
    getScrollWidth() {
        return window.innerWidth;
    }
    getScrollTop() {
        return window.pageYOffset;
    }
    getScrollLeft() {
        return window.pageXOffset;
    }
    queryAll(selector) {
        return [...document.querySelectorAll(selector)];
    }
    get() {
        return window;
    }
    scrollTo(options) {
        window.scrollTo(options);
    }
}

// CONCATENATED MODULE: ./src/core/listeners/scroll.ts



const DEFAULT_SCROLL_END_TIMEOUT = 50;
class scroll_CuiScrollListener {
    constructor(target, threshold) {
        this._target = target;
        this._box = CuiElementBoxFactory.get(target);
        this._inProgress = false;
        this._threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
        this._prevX = this._prevY = 0;
        this._isAttached = false;
        this._callback = undefined;
        this._task = new task_CuiTaskRunner(DEFAULT_SCROLL_END_TIMEOUT, false, this.onScrollFinish.bind(this));
        this._listener = this.listener.bind(this);
    }
    setCallback(callback) {
        this._callback = callback;
    }
    attach() {
        this._target.addEventListener('scroll', this._listener);
        this._isAttached = true;
        this.listener(undefined, true, "init");
    }
    detach() {
        this._target.removeEventListener('scroll', this._listener);
        this._task.stop();
        this._isAttached = false;
    }
    setTarget(target) {
        if (target !== this._target) {
            this.detach();
            this._target = target;
            this.attach();
        }
    }
    setThreshold(threshold) {
        this._threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
    }
    isInProgress() {
        return this._inProgress;
    }
    isAttached() {
        return this._isAttached;
    }
    listener(ev, initial, source) {
        if (!is(this._callback)) {
            return;
        }
        let left = this._box.getScrollLeft();
        let top = this._box.getScrollTop();
        this._prevX += left;
        this._prevY += top;
        if (this._inProgress || (!this.passedThreshold() && is(ev))) {
            return;
        }
        this._inProgress = true;
        // @ts-ignore - callback already checked
        this._callback({
            base: ev,
            top: top,
            left: left,
            initial: initial !== null && initial !== void 0 ? initial : false,
            scrolling: is(ev),
            source: source !== null && source !== void 0 ? source : "event"
        });
        if (is(ev))
            this._task.start();
        this._inProgress = false;
        this._prevX = 0;
        this._prevY = 0;
    }
    passedThreshold() {
        return this._threshold <= 0 || (this._prevX >= this._threshold || this._prevY >= this._threshold);
    }
    onScrollFinish() {
        this.listener(undefined, false, "task");
    }
}

// CONCATENATED MODULE: ./src/components/extensions/scroll/scroll.ts


function getCuiScrollExtension(setup) {
    var _a;
    const _scrollListener = new scroll_CuiScrollListener(setup.element, setup.threshold);
    _scrollListener.setCallback(onScroll);
    function onScroll(ev) {
        setup.performer.perform(ev);
    }
    return listenerExtension({
        listener: _scrollListener,
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : 'scroll'
    });
}

// CONCATENATED MODULE: ./src/components/extensions/scroll/performers.ts


function getBaseScrollPerformer(options) {
    return {
        perform: (ev) => {
            options.callback(ev);
        }
    };
}
function getCuiIntersectionPerformer(setup) {
    let _children = [];
    let _box = CuiElementBoxFactory.get(setup.element);
    function onScroll(ev) {
        if (!is(_children)) {
            return;
        }
        setup.callback(prepareCallbackResult(ev));
    }
    function prepareCallbackResult(ev) {
        var _a, _b;
        let parentBottom = ev.top + _box.getHeight();
        let parentRight = ev.left + _box.getWidth();
        let result = {
            ev: ev.base,
            top: ev.top,
            left: ev.left,
            scrolling: (_a = ev.scrolling) !== null && _a !== void 0 ? _a : false,
            initial: (_b = ev.initial) !== null && _b !== void 0 ? _b : false,
            source: ev.source,
            items: _children.map((child, index) => {
                let verticalRatio = calcChildVerticalRatio(child, ev.top, parentBottom);
                let horizontalRatio = calcChildHorizontalRatio(child, ev.left, parentRight);
                return {
                    verticalRatio: verticalRatio,
                    horizontalRatio: horizontalRatio,
                    element: child
                };
            })
        };
        return result;
    }
    function calcChildVerticalRatio(child, currentTop, currentBottom) {
        let childBottom = child.offsetTop + child.offsetHeight;
        // Simulated top if view top is outside of parent then takes parent top
        let symTop = currentTop > child.offsetTop ? currentTop : child.offsetTop;
        // Simulated bottom if view bottom is outside of parent then takes parent bottom
        let symBottom = currentBottom < childBottom ? currentBottom : childBottom;
        // Calculates amount of pixels that are in view
        let diff = symBottom - symTop;
        // Calculates ratio - how much of a child is in parent view
        let ratio = diff / child.offsetHeight;
        return getRangeValue(ratio, 0, 1);
    }
    function calcChildHorizontalRatio(child, currentLeft, currentRight) {
        let childRight = child.offsetLeft + child.offsetWidth;
        // Simulated top if view left is outside of parent then takes parent left
        let symLeft = currentLeft > child.offsetLeft ? currentLeft : child.offsetLeft;
        // Simulated bottom if view right is outside of parent then takes parent right
        let symRight = currentRight < childRight ? currentRight : childRight;
        // Calculates amount of pixels that are in view
        let diff = symRight - symLeft;
        // Calculates ratio - how much of a child is in parent view
        let ratio = diff / child.offsetWidth;
        return getRangeValue(ratio, 0, 1);
    }
    return Object.assign(Object.assign({}, getBaseScrollPerformer({
        callback: onScroll
    })), { setChildren: (children) => {
            _children = children;
        }, callInitialEvent: () => {
            onScroll({
                base: undefined,
                initial: true,
                scrolling: false,
                left: _box.getScrollLeft(),
                top: _box.getScrollTop(),
                source: "performer"
            });
        } });
}

// CONCATENATED MODULE: ./src/components/offset/performer.ts

function getOffsetPerformer(setup) {
    let _prevX = 0;
    let _prevY = 0;
    function onScroll(ev) {
        if (_exceededThreshold(ev.left, ev.top)) {
            setup.callback(ev);
            _prevX = ev.left;
            _prevY = ev.top;
            return;
        }
    }
    function _exceededThreshold(x, y) {
        return Math.abs(x - _prevX) > setup.threshold || Math.abs(y - _prevY) > setup.threshold;
    }
    return getBaseScrollPerformer({
        callback: onScroll
    });
}

// CONCATENATED MODULE: ./src/components/offset/offset.ts
var offset_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











class offset_CuiOffsetArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super();
        this.offsetX = -1;
        this.offsetY = -1;
        this.target = "";
        this.action = "";
        this.mode = 'static';
    }
}
function CuiOffsetComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "offset",
        create: (element, utils, prefix, attribute) => {
            return new offset_CuiOffsetHandler(element, utils, attribute);
        }
    });
}
class offset_CuiOffsetHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiOffsetHandler", element, attribute, new offset_CuiOffsetArgs(), utils);
        this._targets = [this.element];
        this._matched = false;
        this._actions = [];
        this._modeHandler = CuiOffsetModeFactory.get(this.args.mode);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const root = this.element.hasAttribute(ATTRIBUTES.root) ? window : element;
        this._root = CuiElementBoxFactory.get(root);
        this._performer = getOffsetPerformer({
            callback: this.checkAndPerformActions.bind(this),
            threshold: 20,
        });
        this.extend(getCuiScrollExtension({
            element: root,
            threshold: 5,
            performer: this._performer
        }));
    }
    onHandle() {
        return offset_awaiter(this, void 0, void 0, function* () {
            this.parseAttribute();
            // Perform initial call to performer to settle up component - if it is scrolled or just matching conditions then actions will be set
            this._performer.perform({
                base: undefined,
                initial: true,
                left: this._root.getScrollLeft(),
                top: this._root.getScrollTop(),
                scrolling: false,
                source: "CuiOffsetHandler"
            });
            return true;
        });
    }
    onRefresh() {
        return offset_awaiter(this, void 0, void 0, function* () {
            this.parseAttribute();
            return true;
        });
    }
    onRemove() {
        return offset_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    parseAttribute() {
        this._targets = this.getTargets();
        this._actions = actions_CuiActionsListFactory.get(this.args.action);
        this._modeHandler = CuiOffsetModeFactory.get(this.args.mode);
    }
    checkAndPerformActions(ev) {
        // @ts-ignore modehandler
        let matchesOffset = this._modeHandler.matches(ev.top, ev.left, this.args.offsetX, this.args.offsetY);
        /**
         * Act and emit event when offset has been reached
         */
        if (matchesOffset !== this._matched) {
            this.act(matchesOffset);
            this._matched = matchesOffset;
        }
        this.callEvent(this._matched, ev.left, ev.top, ev.scrolling, ev.source, ...this.calcaRatio(ev.left, ev.top));
    }
    act(matching) {
        if (!are(this._actions, this._targets)) {
            return;
        }
        this._interactions.mutate(() => {
            this._actions.forEach(action => {
                this.actForTargets(matching ? action.add.bind(action) : action.remove.bind(action));
            });
        });
    }
    actForTargets(callback) {
        this._targets.forEach(target => callback(target));
    }
    callEvent(matches, x, y, scrolling, source, ratioX, ratioY) {
        this._busFacade.emit(EVENTS.OFFSET, {
            matches: this._matched,
            offsetX: x,
            offsetY: y,
            ratioX: ratioX,
            ratioY: ratioY,
            scrolling: scrolling,
            source: source,
            timestamp: Date.now()
        });
    }
    calcaRatio(x, y) {
        let ratY = parseFloat(((this._root.getHeight() + y) / this._root.getScrollHeight()).toFixed(2));
        let ratX = parseFloat(((this._root.getWidth() + x) / this._root.getScrollWidth()).toFixed(2));
        return [getRangeValue(ratX, 0, 1), getRangeValue(ratY, 0, 1)];
    }
    getTargets() {
        return this.args.target ? this._root.queryAll(this.args.target) : [this.element];
    }
}

// CONCATENATED MODULE: ./src/components/open/open.ts
var open_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











class open_CuiOpenArgs extends arguments_CuiAutoParseArgs {
    constructor(timeout) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";
    }
}
function CuiOpenComponent(prefix) {
    return CuiComponentBaseHook({
        name: 'open',
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new open_CuiOpenHandler(element, utils, attribute);
        }
    });
}
class open_CuiOpenHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiOpenHandler", element, attribute, new open_CuiOpenArgs(utils.setup.animationTime), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._actionsHelper = new helpers_CuiActionsHelper(utils.interactions);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onOpen.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            type: "open",
            performer: callbackPerformer(this.onOpen.bind(this))
        }));
    }
    onHandle() {
        return open_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRefresh() {
        return open_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRemove() {
        return open_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onOpen(ev) {
        if (!this.lock()) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this.log.warning(`Target ${this.args.target} not found`, 'onClick');
            return;
        }
        //@ts-ignore - target checked
        this.run(target).then((result) => {
            //@ts-ignore - target checked
            if (result)
                this.emitOpen(ev);
        }).catch((e) => {
            this.log.exception(e);
        }).finally(() => {
            this.unlock();
        });
    }
    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    run(target) {
        return open_awaiter(this, void 0, void 0, function* () {
            console.log(target);
            let cuiId = target.$cuid;
            if (is(cuiId)) {
                this.handleClickCui(cuiId);
                return false;
            }
            else {
                this.log.debug("Open html component");
                if (are(this.args.timeout, this.args.action)) {
                    this.log.debug("Perfrom an action");
                    let actions = actions_CuiActionsListFactory.get(this.args.action);
                    return this._actionsHelper.performActions(target, actions, this.args.timeout, () => {
                        this.classes.setClass(this.activeClassName, target);
                    });
                }
                this.asyncClasses.setClasses(target, this.activeClassName);
                return true;
            }
        });
    }
    handleClickCui(cuid) {
        this.log.debug("Open cUI component");
        this.core.bus.emit(EVENTS.OPEN, cuid, this.args.state);
        return false;
    }
    emitOpen(ev) {
        this._busFacade.emit(EVENTS.OPENED, {
            event: ev,
            state: this.args.state
        });
    }
    getTarget() {
        var _a;
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : getParentCuiElement(this.element);
    }
}

// CONCATENATED MODULE: ./src/components/parallax/animator.ts
var animator_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var animator_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _animators;


class animator_ParallaxAnimatorsHandler {
    constructor(name, setup) {
        _animators.set(this, void 0);
        this.name = name;
        animator_classPrivateFieldSet(this, _animators, []);
        enumerateObject(setup, (propName, prop) => {
            let animator = factory_AnimatorFactory.get(propName);
            if (!animator) {
                return;
            }
            animator.setProperty(prop);
            animator_classPrivateFieldGet(this, _animators).push(animator);
        });
    }
    perform(element, progress) {
        if (animator_classPrivateFieldGet(this, _animators).length === 0) {
            return;
        }
        animator_classPrivateFieldGet(this, _animators).forEach(animator => animator.perform(element, progress, 1));
    }
}
_animators = new WeakMap();

// CONCATENATED MODULE: ./src/components/extensions/mutations/mutations.ts
var mutations_mutations_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiComponentMutationExtension {
    constructor(element, performer, options) {
        this.type = 'mutations';
        this.description = "";
        this._element = element;
        this._performer = performer;
        this._disabled = true;
        this._isObserving = false;
        this._options = options !== null && options !== void 0 ? options : {
            childList: true,
            subtree: true,
        };
        this._observer = new MutationObserver(this.onMutation.bind(this));
    }
    init(args) {
        return mutations_mutations_awaiter(this, void 0, void 0, function* () {
            this.observe();
            return true;
        });
    }
    destroy() {
        return mutations_mutations_awaiter(this, void 0, void 0, function* () {
            this.unobserve();
            return true;
        });
    }
    observe() {
        if (!this._isObserving && !this._disabled) {
            this._observer.observe(this._element, this._options);
            this._isObserving = true;
        }
    }
    unobserve() {
        if (this._isObserving) {
            this._observer.disconnect();
            this._isObserving = false;
        }
    }
    disable(flag) {
        this._disabled = flag;
        if (this._disabled) {
            this.unobserve();
        }
    }
    onMutation(record) {
        this._performer.perform(record);
    }
}

// CONCATENATED MODULE: ./src/components/extensions/mutations/performer.ts
function getCuiMutationPerformer(callback) {
    let _selector = null;
    const _callback = callback;
    function matchesSelector(record) {
        if (record.addedNodes.length > 0) {
            return isAnyItemMatching([...record.addedNodes]);
        }
        if (record.removedNodes.length > 0) {
            return isAnyItemMatching([...record.removedNodes]);
        }
        return false;
    }
    function isAnyItemMatching(array) {
        //@ts-ignore
        return (array.find((node) => node.matches(_selector)) !== null);
    }
    function filterRecordsBySelector(record) {
        return record.reduce((result, record) => {
            if (_selector && record.type === 'childList') {
                if (matchesSelector(record)) {
                    result.push(record);
                }
            }
            else {
                result.push(record);
            }
            return result;
        }, []);
    }
    return {
        perform: (record) => {
            let out = record;
            if (_selector) {
                out = filterRecordsBySelector(record);
            }
            if (out.length > 0) {
                _callback(out);
            }
        },
        setSelector: (selector) => {
            _selector = selector;
        }
    };
}

// CONCATENATED MODULE: ./src/components/parallax/parallax.ts
var parallax_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











const PARALLAX_ATTRIBUTE_ANIMATTION = 'data-parallax-animation';
const PARALLAX_ATTRIBUTE_START = 'data-parallax-start-ratio';
const PARALLAX_ATTRIBUTE_STOP = 'data-parallax-stop-ratio';
class parallax_CuiParallaxArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                "targets": { corrector: joinWithScopeSelector }
            }
        });
        this.targets = joinWithScopeSelector("> *");
        this.startRatio = 0;
        this.stopRatio = 1;
        this.animation = "";
    }
}
function CuiParallaxComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: 'parallax',
        create: (element, utils, prefix, attribute) => {
            return new parallax_CuiParallaxHandler(element, utils, attribute);
        }
    });
}
class parallax_CuiParallaxHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiParallaxHandler", element, attribute, new parallax_CuiParallaxArgs(), utils);
        this._defaultAnimator = undefined;
        this._targetSetup = [];
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const root = element.hasAttribute(ATTRIBUTES.root) ? window : element;
        this._styles = new CuiStyleHelper();
        this._intersectionPerformer = getCuiIntersectionPerformer({
            element: root,
            callback: this.onIntersection.bind(this)
        });
        this._mutationPerformer = getCuiMutationPerformer(this.onMutation.bind(this));
        this.extend(getCuiScrollExtension({
            element: root,
            performer: this._intersectionPerformer,
            threshold: 5
        }));
        this.extend(new CuiComponentMutationExtension(element, this._mutationPerformer));
    }
    onHandle() {
        return parallax_awaiter(this, void 0, void 0, function* () {
            this.updateArguments();
            this._intersectionPerformer.callInitialEvent();
            return true;
        });
    }
    onRefresh() {
        return parallax_awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs && this.prevArgs.targets !== this.args.targets) {
                this.clean();
                this.updateArguments();
            }
            return true;
        });
    }
    onRemove() {
        return parallax_awaiter(this, void 0, void 0, function* () {
            this.clean();
            return true;
        });
    }
    updateArguments() {
        this._mutationPerformer.setSelector(this.args.targets);
        this._defaultAnimator = new animator_ParallaxAnimatorsHandler(this.args.animation, this.core.setup.parallaxAnimations[this.args.animation]);
        this._targetSetup = this.getTargets();
        this._intersectionPerformer.setChildren(this._targetSetup.map(item => item.element));
    }
    onIntersection(ev) {
        this._interactions.mutate(() => {
            ev.items.forEach((item, index) => {
                if (index >= this._targetSetup.length) {
                    return;
                }
                const setup = this._targetSetup[index];
                if (setup.animator)
                    setup.animator.perform(item.element, calculateRatio(setup.start, setup.stop, item.verticalRatio));
            });
        });
    }
    onMutation(record) {
        this._targetSetup = this.getTargets();
        this._intersectionPerformer.setChildren(this._targetSetup.map(item => item.element));
    }
    getTargets() {
        const targetSetup = [];
        this.element.querySelectorAll(this.args.targets).forEach(target => {
            var _a;
            targetSetup.push({
                element: target,
                animator: (_a = this.getTargetAnimator(target)) !== null && _a !== void 0 ? _a : this._defaultAnimator,
                start: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_START), this.args.startRatio),
                stop: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_STOP), this.args.stopRatio),
            });
        });
        return targetSetup;
    }
    getTargetAnimator(target) {
        if (!target.hasAttribute(PARALLAX_ATTRIBUTE_ANIMATTION)) {
            return undefined;
        }
        const name = target.getAttribute(PARALLAX_ATTRIBUTE_ANIMATTION);
        //@ts-ignore name was checked already
        let setup = this.core.setup.parallaxAnimations[name];
        if (!setup) {
            return undefined;
        }
        //@ts-ignore name was checked already
        return new animator_ParallaxAnimatorsHandler(name, setup);
    }
    clean() {
        this._targetSetup.forEach(setup => {
            this.core.interactions.mutate(this._styles.clean, null, setup.element);
        });
    }
}
function calculateRatio(startRatio, stopRatio, current) {
    let spread = stopRatio - startRatio;
    let start = current - startRatio;
    if (start < 0) {
        start = 0;
    }
    let curr = start / spread;
    return Math.min(curr, 1);
}

// CONCATENATED MODULE: ./src/core/observers/intersection.ts
class CuiIntersectionEntry {
    constructor() {
        this.isInView = false;
        this.ratio = 0;
    }
}
/**
 * Creates a wrapper for intersection observer
 * Constructor gets a root element for observer and optional array of threshold values [0...1]
 */
class CuiIntersectionObserver {
    constructor(root, threshold) {
        this._root = root;
        this._threshold = threshold !== null && threshold !== void 0 ? threshold : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
        this._callback = undefined;
        this._observer = undefined;
    }
    setCallback(callback) {
        this._callback = callback;
    }
    connect() {
        if (!this._callback) {
            return;
        }
        this._observer = new IntersectionObserver(this._callback, {
            root: this._root,
            rootMargin: '0px',
            threshold: this._threshold
        });
    }
    observe(target) {
        if (this._observer)
            this._observer.observe(target);
    }
    unobserve(target) {
        if (this._observer)
            this._observer.unobserve(target);
    }
    disconnect() {
        if (this._observer)
            this._observer.disconnect();
    }
}

// CONCATENATED MODULE: ./src/components/extensions/observer/observer.ts
var observer_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiObserverExtension {
    constructor(element, observer) {
        this.type = 'observer';
        this.description = "";
        this._observer = observer;
        this._element = element;
    }
    init(args) {
        return observer_awaiter(this, void 0, void 0, function* () {
            this._observer.connect();
            this._observer.observe(this._element);
            return true;
        });
    }
    destroy() {
        return observer_awaiter(this, void 0, void 0, function* () {
            this._observer.unobserve(this._element);
            this._observer.disconnect();
            return true;
        });
    }
}
function cuiObserverExtension(setup) {
    var _a;
    return {
        type: (_a = setup.type) !== null && _a !== void 0 ? _a : "observer",
        init: () => observer_awaiter(this, void 0, void 0, function* () {
            setup.observer.connect();
            setup.observer.observe(setup.element);
            return true;
        }),
        destroy: () => observer_awaiter(this, void 0, void 0, function* () {
            setup.observer.unobserve(setup.element);
            setup.observer.disconnect();
            return true;
        })
    };
}

// CONCATENATED MODULE: ./src/components/resize/calculator.ts
const SmartResizeSteps = [
    { key: "none", value: (args) => args.default },
    { key: "small", value: (args) => args.small },
    { key: "medium", value: (args) => args.medium },
    { key: "large", value: (args) => args.large },
    { key: "xlarge", value: (args) => args.xlarge },
];
class SimpleResizeCalculator {
    constructor(replace) {
        this._replace = replace === true;
    }
    get(args, size) {
        let value = args[size];
        return (this._replace && !value) ? args.default : value !== null && value !== void 0 ? value : "";
    }
}
class SmartResizeCalculator {
    constructor() {
        this._steps = SmartResizeSteps;
    }
    get(args, size) {
        var _a;
        let value = args.default;
        for (let step of this._steps) {
            value = (_a = step.value(args)) !== null && _a !== void 0 ? _a : value;
            if (size === step.key) {
                return value;
            }
        }
        return value;
    }
}
function getResizeCalculator(mode) {
    if (mode === 'smart') {
        return new SmartResizeCalculator();
    }
    return new SimpleResizeCalculator();
}

// CONCATENATED MODULE: ./src/components/resize/resize.ts
var resize_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};













class resize_CuiResizeArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super();
        this.mode = "simple";
        this.default = "";
        this.small = this.medium = this.large = this.xlarge = "";
        this.delay = 1;
    }
}
function CuiResizeComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "resize",
        create: (element, utils, prefix, attribute) => {
            return new resize_CuiResizeHandler(element, utils, attribute);
        },
    });
}
class resize_CuiResizeHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiResizeHandler", element, attribute, new resize_CuiResizeArgs(), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._lastValue = "";
        this._currentValue = "";
        this._isIntersecting = false;
        this._currentAction = undefined;
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._resizeValueCalculator = getResizeCalculator(this.args.mode);
        this._task = new task_CuiTaskRunner(this.args.delay, false, this.updateAction.bind(this));
        const intersectionObserver = new CuiIntersectionObserver(document.documentElement, [0, 0.1]);
        intersectionObserver.setCallback(this.onIntersection.bind(this));
        this.extend(cuiObserverExtension({
            type: "intersection",
            element: element,
            observer: intersectionObserver,
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.RESIZE,
            performer: callbackPerformer(this.resize.bind(this)),
        }));
    }
    onHandle() {
        return resize_awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRefresh() {
        return resize_awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRemove() {
        return resize_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    handleUpdate() {
        this._resizeValueCalculator = getResizeCalculator(this.args.mode);
        this._isIntersecting = isInViewport(this.element);
        this._task.setTimeout(this.args.delay);
        this.setNewValue(calcWindowSize(window.innerWidth));
        this.updateElement();
    }
    resize(data) {
        this.setNewValue(data.current);
        this.updateElement();
    }
    onIntersection(entries) {
        if (entries.length > 0) {
            this._isIntersecting = entries[0].isIntersecting;
        }
        this.updateElement();
    }
    setNewValue(size) {
        let newValue = this._resizeValueCalculator.get(this.args, size);
        if (newValue !== this._currentValue) {
            this._currentValue = newValue;
        }
    }
    updateElement() {
        if (this.cannotUpdate()) {
            //this.logInfo("Not intersecting")
            return;
        }
        if (!this._currentValue || this._lastValue === this._currentValue) {
            //this.logWarning("Not eligible to set value: " + this._currentValue)
            return;
        }
        this._lastValue = this._currentValue;
        this._task.start();
    }
    /**
     * Checks whether element can be updated
     * @returns
     */
    cannotUpdate() {
        return !this._isIntersecting && this.args.mode === "smart";
    }
    /**
     * Used for task to update action on the element after receiving resize
     */
    updateAction() {
        //@ts-ignore already checked
        let newAction = actions_CuiActionsFactory.get(this._currentValue);
        this._interactions.mutate(() => {
            if (this._currentAction) {
                this._currentAction.remove(this.element);
            }
            newAction.add(this.element);
            this._currentAction = newAction;
        });
    }
}

// CONCATENATED MODULE: ./src/components/extensions/click/performer.ts
class CuiClickPerformer {
    constructor() {
        this._preventDefault = false;
        this._stopPropagation = false;
        this._callback = undefined;
    }
    setCallback(callback) {
        this._callback = callback;
    }
    perform(arg) {
        if (!this._callback) {
            return;
        }
        this._callback(arg);
        if (this._preventDefault) {
            arg.preventDefault();
        }
        if (this._stopPropagation) {
            arg.stopPropagation();
        }
    }
    preventDefault(flag) {
        this._preventDefault = flag;
    }
    stopPropagation(flag) {
        this._stopPropagation = flag;
    }
}
function clickPerformer(callback) {
    let _prevent = false;
    let _stopPropagation = false;
    return {
        perform: (ev) => {
            callback(ev);
            if (_prevent)
                ev.preventDefault();
            if (_stopPropagation)
                ev.stopPropagation();
        },
        stopPropagation: flag => _stopPropagation = flag,
        preventDefault: flag => _prevent = flag,
    };
}

// CONCATENATED MODULE: ./src/components/scroll/scroll.ts
var scroll_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








/**
 * Component scrolls to specified target in the document
 * Arguments:
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 *
 */
class scroll_CuiScrollArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                "behavior": { corrector: (value) => getEnumOrDefault(value, 'auto', 'smooth') }
            }
        });
        this.target = "";
        this.parent = "";
        this.behavior = 'auto';
        this.stopPropagation = false;
        this.prevent = false;
    }
}
function CuiScrollComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scroll",
        create: (element, utils, prefix, attribute) => {
            return new scroll_CuiScrollHandler(element, utils, attribute);
        }
    });
}
class scroll_CuiScrollHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiScrollHandler", element, attribute, new scroll_CuiScrollArgs(), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._clickPerformer = clickPerformer(this.onClick.bind(this));
        this.extend(clickExtension({
            element: element,
            performer: this._clickPerformer
        }));
    }
    onHandle() {
        return scroll_awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRefresh() {
        return scroll_awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRemove() {
        return scroll_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    handleUpdate() {
        this._clickPerformer.preventDefault(this.args.prevent);
        this._clickPerformer.stopPropagation(this.args.stopPropagation);
    }
    onClick(ev) {
        const target = this.getTarget();
        const parent = this.getTargetsParent(target);
        if (!target || !parent) {
            return;
        }
        let to = getOffsetTop(target) - parent.offsetTop;
        let from = parent.scrollTop;
        let by = to - from;
        parent.scrollBy({
            top: by,
            behavior: this.args.behavior
        });
        this._busFacade.emit(EVENTS.ON_SCROLL, {
            to: to,
            by: by,
            target: target,
            parent: parent
        });
    }
    getTarget() {
        return is(this.args.target) ? document.querySelector(this.args.target) : null;
    }
    getTargetsParent(target) {
        return is(this.args.parent) ? document.querySelector(this.args.parent) : target ? target.parentElement : null;
    }
}

// CONCATENATED MODULE: ./src/components/extensions/switch/switch.ts
var switch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class switch_CuiSwitchExtension {
    constructor(busFacade, callback) {
        this.type = 'switch';
        this.description = "";
        this._busFacade = busFacade;
        this._switchEventId = null;
        this._callback = callback;
    }
    init(args) {
        return switch_awaiter(this, void 0, void 0, function* () {
            this._switchEventId = this._busFacade.on(EVENTS.SWITCH, this.onSwitch.bind(this));
            return true;
        });
    }
    // update?(args: any): Promise<boolean> {
    //     return true;
    // }
    destroy() {
        return switch_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detach(EVENTS.SWITCH, this._switchEventId);
            return true;
        });
    }
    onSwitch(value) {
        if (!value) {
            return;
        }
        this._callback(value);
    }
}

// CONCATENATED MODULE: ./src/components/scroll/helper.ts

function getScrollHelper(direction, box, behavior) {
    return direction === 'x' ? ScrollXHelper(box, behavior) : ScrollYHelper(box, behavior);
}
function ScrollYHelper(box, behavior) {
    function scroll(position) {
        box.scrollTo({
            left: 0,
            top: position,
            behavior: behavior
        });
    }
    return {
        scrollTo: (position) => {
            scroll(position);
        },
        toIndex: (index) => {
            scroll(index * box.getHeight());
        },
        getPagesCount: () => {
            return calcPages(box.getScrollHeight(), box.getHeight());
        },
        getCurrentPage: () => {
            return calcPages(box.getScrollTop(), box.getHeight());
        },
        toLast: () => {
            scroll(box.getScrollHeight() - box.getHeight());
        },
        toPercent: (value) => {
            const ratio = value / 100;
            scroll(ratio * box.getScrollHeight());
        },
        toSelector: (selector) => {
            const found = box.queryAll(selector);
            if (found.length === 0) {
                return false;
            }
            const to = getOffsetTop(found[0]) - box.getTop();
            scroll(to);
            return true;
        }
    };
}
function ScrollXHelper(box, behavior) {
    function scroll(position) {
        box.scrollTo({
            left: position,
            top: 0,
            behavior: behavior
        });
    }
    return {
        scrollTo: (position) => {
            scroll(position);
        },
        toIndex: (index) => {
            scroll(index * box.getWidth());
        },
        getPagesCount: () => {
            return calcPages(box.getScrollWidth(), box.getWidth());
        },
        getCurrentPage: () => {
            return calcPages(box.getScrollLeft(), box.getWidth());
        },
        toLast: () => {
            scroll(box.getScrollWidth() - box.getWidth());
        },
        toPercent: (value) => {
            const ratio = value / 100;
            scroll(ratio * box.getScrollWidth());
        },
        toSelector: (selector) => {
            const found = box.queryAll(selector);
            if (found.length === 0) {
                return false;
            }
            const to = getOffsetLeft(found[0]) - box.getLeft();
            scroll(to);
            return true;
        }
    };
}
function calcPages(scrollSize, size) {
    return Math.ceil(scrollSize / size);
}

// CONCATENATED MODULE: ./src/components/scroll/perform.ts
const ScrollSwitchPerformers = [
    getPercentPerformer(),
    getToIndexPerform(),
    getToFirstPerform(),
    getToLastPerform(),
    getToNextPerform(),
    getToPrevPerform(),
    getTargetPerformer()
];
function getTargetPerformer() {
    return {
        name: "target",
        check: (arg) => {
            return true;
        },
        perform: (arg, helper, options) => {
            return helper.toSelector(arg);
        }
    };
}
function getToLastPerform() {
    return getStringBasedPerformer('last', (helper) => {
        helper.toLast();
        return true;
    });
}
function getToFirstPerform() {
    return getStringBasedPerformer('first', (helper) => {
        helper.scrollTo(0);
        return true;
    });
}
function getToIndexPerform() {
    let num = 0;
    return {
        name: 'index',
        check: (arg) => {
            num = parseInt(arg);
            return !isNaN(num);
        },
        perform: (arg, helper, options) => {
            helper.toIndex(num > 0 ? num - 1 : num);
            return true;
        }
    };
}
function getToNextPerform() {
    return getStringBasedPerformer('next', (helper, options) => {
        const count = helper.getPagesCount();
        const current = helper.getCurrentPage();
        if (current >= count - 1) {
            if (!options.loop) {
                return false;
            }
            helper.scrollTo(0);
        }
        helper.toIndex(current + 1);
        return true;
    });
}
function getToPrevPerform() {
    return getStringBasedPerformer('prev', (helper, options) => {
        const current = helper.getCurrentPage();
        if (current === 0) {
            if (!options.loop) {
                return false;
            }
            helper.toLast();
        }
        helper.toIndex(current - 1);
        return true;
    });
}
function getPercentPerformer() {
    let num = -1;
    return {
        name: 'percent',
        check: (arg) => {
            if (!arg.match('%')) {
                return false;
            }
            const strValue = arg.substring(0, arg.length - 1);
            num = parseInt(strValue);
            return !isNaN(num);
        },
        perform: (arg, helper, options) => {
            helper.toPercent(num);
            return true;
        }
    };
}
function getStringBasedPerformer(name, callback) {
    return {
        name: name,
        check: (arg) => {
            return arg === name;
        },
        perform: (arg, helper, options) => {
            return callback(helper, options);
        }
    };
}

// CONCATENATED MODULE: ./src/components/scroll/switch.ts
var scroll_switch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










class switch_CuiScrollSwitchArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super();
        this.mode = 'auto';
        this.direction = "y";
        this.loop = false;
        this.switch = "";
    }
}
function CuiScrollSwitchComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scroll-switch",
        create: (element, core, prefix, attribute) => {
            return new switch_CuiScrollSwitchHandler(element, attribute, core);
        }
    });
}
class switch_CuiScrollSwitchHandler extends base_CuiHandlerBase {
    constructor(element, attribute, core) {
        super("CuiScrollSwitchHandler", element, attribute, new switch_CuiScrollSwitchArgs(), core);
        this._busFacade = getEventBusFacade(this.cuid, core.bus, element);
        this._root = CuiElementBoxFactory.get(element);
        this._scrollPerformers = ScrollSwitchPerformers;
        this.setArgs();
        this.extend(new switch_CuiSwitchExtension(this._busFacade, this.switch.bind(this)));
    }
    onHandle() {
        return scroll_switch_awaiter(this, void 0, void 0, function* () {
            this.setArgs();
            return true;
        });
    }
    onRefresh() {
        return scroll_switch_awaiter(this, void 0, void 0, function* () {
            this.setArgs();
            return true;
        });
    }
    onRemove() {
        return scroll_switch_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    switch(arg) {
        if (!arg) {
            return;
        }
        const performer = this._scrollPerformers.find(p => p.check(arg));
        if (!performer) {
            this.logWarning("Cannot find matching performer", 'switch');
            return;
        }
        const result = performer.perform(arg, this._helper, {
            behavior: this.args.mode,
            loop: this.args.loop
        });
        if (!result) {
            this.logWarning("Switch " + performer.name + " was not performed", 'switch');
            return;
        }
        this.emitSwitch(arg);
        this._busFacade.emit(EVENTS.SWITCHED, {
            timestamp: Date.now(),
            index: arg
        });
    }
    setArgs() {
        this._helper = getScrollHelper(this.args.direction, this._root, this.args.mode);
    }
    emitSwitch(arg) {
        return scroll_switch_awaiter(this, void 0, void 0, function* () {
            if (!is(this.args.switch)) {
                return false;
            }
            const elements = getCuiElementsBySelector(this.args.switch);
            const promises = [];
            elements.forEach(element => {
                promises.push(this.core.bus.emit(EVENTS.SWITCH, element.$cuid, arg));
            });
            yield Promise.all(promises);
            return true;
        });
    }
}

// CONCATENATED MODULE: ./src/components/scrollspy/mode.ts

class CuiScrollSpyModeHandlerFactory {
    static get(mode) {
        if (mode === "multi") {
            return new mode_CuiMultiModeHandler();
        }
        return new mode_CuiSingleModeHandler();
    }
}
class mode_CuiModeHandlerBase {
    constructor(init) {
        this.previous = init;
    }
    getMatching(ratio, items) {
        return items.reduce((result, item, index) => {
            if (item.verticalRatio > ratio) {
                result.push(index);
            }
            return result;
        }, []);
    }
    addActions(actions, ...elements) {
        this.forEachAction(actions, elements, (action, element) => {
            action.add(element);
        });
    }
    removeActions(actions, ...elements) {
        this.forEachAction(actions, elements, (action, element) => {
            action.remove(element);
        });
    }
    forEachAction(actions, elements, callback) {
        if (!are(actions, elements, callback)) {
            return;
        }
        actions.forEach(action => {
            elements.forEach(element => {
                if (is(element))
                    callback(action, element);
            });
        });
    }
}
class mode_CuiSingleModeHandler extends mode_CuiModeHandlerBase {
    constructor() {
        super(-1);
    }
    update(items, ratio, actions, links, linksActions) {
        let matching = this.getMatching(ratio, items);
        let len = matching.length;
        let last = len > 0 ? matching[len - 1] : -1;
        let result = {
            changed: false
        };
        if (!this.matches(last)) {
            if (this.previous > -1)
                this.removeActions(actions, items[this.previous].element);
            if (last > -1) {
                let lastElement = items[last].element;
                result.intersecting = [lastElement];
                this.addActions(actions, lastElement);
            }
            if (are(links, linksActions)) {
                if (this.previous > -1)
                    this.removeActions(linksActions, links[this.previous]);
                if (last > -1)
                    this.addActions(linksActions, links[last]);
            }
            this.previous = last;
            result.changed = true;
            result.intersecting = [];
            return result;
        }
        return result;
    }
    matches(item) {
        return item === this.previous;
    }
}
class mode_CuiMultiModeHandler extends mode_CuiModeHandlerBase {
    constructor() {
        super([]);
    }
    update(items, ratio, actions, links, linksActions) {
        let matching = this.getMatching(ratio, items);
        let result = {
            changed: false
        };
        if (!this.matches(matching)) {
            let intersecting = matching.map(idx => { return items[idx].element; });
            this.removeActions(actions, ...this.previous.map(idx => { return items[idx].element; }));
            this.addActions(actions, ...intersecting);
            result.intersecting = intersecting;
            if (are(links, linksActions)) {
                this.removeActions(linksActions, ...this.previous.map(idx => { return links[idx]; }));
                this.addActions(linksActions, ...matching.map(idx => { return links[idx]; }));
            }
            this.previous = matching;
            result.changed = true;
            return result;
        }
        return result;
    }
    matches(item) {
        let len = item.length;
        if (len !== this.previous.length) {
            return false;
        }
        let i = 0;
        for (i = 0; i < len; i++) {
            if (!this.previous.includes(item[i])) {
                return false;
            }
        }
        return true;
    }
}

// CONCATENATED MODULE: ./src/components/scrollspy/scrollspy.ts
var scrollspy_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











const DEFAULT_SELECTOR = "> *";
class scrollspy_CuiScrollSpyArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "ratio": { corrector: (value) => getRangeValueOrDefault(value, 0, 1, 0) },
                'mode': { corrector: (value) => getEnumOrDefault(value, 'single', "multi") }
            }
        });
        this.ratio = 0;
        this.mode = "single";
        this.threshold = -1;
        this.selector = joinWithScopeSelector(DEFAULT_SELECTOR);
        this.action = "";
        this.link = "";
        this.linkAction = "";
    }
}
function CuiScrollspyComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scrollspy",
        create: (element, utils, prefix, attribute) => {
            return new scrollspy_CuiScrollspyHandler(element, utils, attribute);
        }
    });
}
class scrollspy_CuiScrollspyHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiScrollspyHandler", element, attribute, new scrollspy_CuiScrollSpyArgs(), utils);
        this._links = [];
        this._actions = [];
        this._linkActions = [];
        this._modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        const root = element.hasAttribute(ATTRIBUTES.root) ? window : element;
        this._root = CuiElementBoxFactory.get(root);
        this._intersectionPerformer = getCuiIntersectionPerformer({
            callback: this.onIntersection.bind(this),
            element: root
        });
        this.extend(getCuiScrollExtension({
            element: root,
            performer: this._intersectionPerformer,
            threshold: 5
        }));
    }
    onHandle() {
        return scrollspy_awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            this._intersectionPerformer.callInitialEvent();
            return true;
        });
    }
    onRefresh() {
        return scrollspy_awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            return true;
        });
    }
    onRemove() {
        return scrollspy_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onIntersection(ev) {
        let timestamp = Date.now();
        this._interactions.mutate(() => {
            //@ts-ignore - modeHandler checked
            let updateResult = this._modeHandler.update(ev.items, this.args.ratio, this._actions, this._links, this._linkActions);
            if (updateResult.changed) {
                this._busFacade.emit(EVENTS.TARGET_CHANGE, {
                    intersecting: updateResult.intersecting,
                    timestamp: timestamp
                });
            }
        });
        this._busFacade.emit(EVENTS.ON_SCROLL, {
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling,
            initial: ev.initial
        });
    }
    updateSetup() {
        let targets = this.args.selector ? this._root.queryAll(this.args.selector) : [];
        this._intersectionPerformer.setChildren(targets);
        this._links = this.args.link ? [...document.querySelectorAll(this.args.link)] : [];
        this._actions = actions_CuiActionsListFactory.get(this.args.action);
        this._linkActions = actions_CuiActionsListFactory.get(this.args.linkAction);
        this._modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);
    }
}

// CONCATENATED MODULE: ./src/core/handlers/drag/detectors.ts

/**
 * threshold keeps a outside margin value to extend box outside of an element
 */
class detectors_CuiSimpleDragOverDetector {
    constructor() {
        this._elements = [];
        this._count = 0;
        this._threshold = 5;
    }
    setElements(elements) {
        this._elements = elements;
        this._count = this._elements.length;
    }
    setThreshold(value) {
        this._threshold = value;
    }
    detect(x, y) {
        if (!is(this._elements)) {
            return [-1, undefined];
        }
        let idx = -1;
        let found = undefined;
        for (let i = 0; i < this._count; i++) {
            if (this.isInBounds(this._elements[i], x, y)) {
                if (i === 0) {
                    idx = i;
                    found = this._elements[i];
                    //break;
                }
                else if (i < this._count - 1) {
                    idx = i + 1;
                    found = this._elements[i + 1];
                    //break;
                }
                break;
            }
        }
        return [idx, found];
    }
    isInBounds(element, x, y) {
        const box = element.getBoundingClientRect();
        return x > box.left - this._threshold && x < box.left + box.width + this._threshold &&
            y > box.top - this._threshold && y < box.top + box.height + this._threshold;
    }
}

// CONCATENATED MODULE: ./src/components/sortable/sortable.ts
var sortable_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};













const SORTABLE_IS_MOVING = "{prefix}-moving";
const sortable_DEFAULT_SELECTOR = " > *";
const SORTABLE_PREVIEW_CLS = "{prefix}-sortable-preview";
const SORTABLE_LOCKED = "{prefix}-locked";
class sortable_CuiSortableArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                target: { corrector: joinWithScopeSelector },
                trigger: { corrector: joinWithScopeSelector },
            },
        });
        this.target = joinWithScopeSelector(sortable_DEFAULT_SELECTOR);
        this.trigger = joinWithScopeSelector(sortable_DEFAULT_SELECTOR);
        this.timeout = 150;
        this.threshold = 5;
    }
}
function CuiSortableComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "sortable",
        create: (element, utils, prefix, attribute) => {
            return new sortable_CuiSortableHandler(element, attribute, utils, prefix);
        },
    });
}
class sortable_CuiSortableHandler extends base_CuiHandlerBase {
    constructor(element, attribute, utils, prefix) {
        super("CuiSortableHandler", element, attribute, new sortable_CuiSortableArgs(), utils);
        this._targets = [];
        this._triggers = [];
        this._currentIdx = -1;
        this._currentTarget = null;
        this._currentBefore = null;
        this._preview = null;
        this._movingCls = replacePrefix(SORTABLE_IS_MOVING, prefix);
        this._previewCls = replacePrefix(SORTABLE_PREVIEW_CLS, prefix);
        this._lockedCls = replacePrefix(SORTABLE_LOCKED, prefix);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._dragPerformer = getDragMovePerformer({
            onStart: this.onDragStart.bind(this),
            onMove: this.onDragOver.bind(this),
            onEnd: this.onDragEnd.bind(this),
        });
        this._detector = new detectors_CuiSimpleDragOverDetector();
        this._animation = new engine_CuiSwipeAnimationEngine(factory_CuiTimeAnimationEngines.get(getEaseTimingFunction()));
        this.extend(moveExtension({
            target: element,
            performer: this._dragPerformer,
        }));
    }
    onHandle() {
        return sortable_awaiter(this, void 0, void 0, function* () {
            this.getTargetsAndTrggers();
            this._detector.setThreshold(this.args.threshold);
            this._dragPerformer.setTimeout(this.args.timeout);
            return true;
        });
    }
    onRefresh() {
        return sortable_awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs &&
                (this.args.target !== this.prevArgs.target ||
                    this.args.trigger !== this.prevArgs.trigger)) {
                this.getTargetsAndTrggers();
            }
            this._dragPerformer.setTimeout(this.args.timeout);
            return true;
        });
    }
    onRemove() {
        return sortable_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    getTargetsAndTrggers() {
        this._targets = [...this.element.querySelectorAll(this.args.target)];
        this._triggers = [...this.element.querySelectorAll(this.args.trigger)];
        if (this._triggers.length !== this._targets.length) {
            this.log.error("Incorrect trigger or target selector");
            this._targets = [];
            this._triggers = [];
        }
        this._detector.setElements(this._targets);
    }
    onDragStart(data) {
        return sortable_awaiter(this, void 0, void 0, function* () {
            this._currentIdx = this.getPressedElementIdx(data.target);
            this._currentTarget =
                this._currentIdx > -1
                    ? this._targets[this._currentIdx]
                    : null;
            if (!is(this._currentTarget)) {
                return false;
            }
            this.core.bus.emit(EVENTS.MOVE_LOCK, null, true);
            this.startMovementPrep(data);
            this._busFacade.emit(EVENTS.SORT_START, {
                target: this._currentTarget,
                index: this._currentIdx,
            });
            return true;
        });
    }
    onDragOver(data) {
        this.move(data);
        data.event.preventDefault();
    }
    onDragEnd(data) {
        if (!is(this._preview)) {
            return;
        }
        //@ts-ignore preview
        this._animation.setElement(this._preview);
        this._animation.setProps(this.getFinishAnimation());
        this._animation
            .finish({ progress: 0, timeout: 100, revert: false })
            .then((status) => {
            if (status)
                this.onSortAnimationFinish();
        });
    }
    getPressedElementIdx(target) {
        return this._triggers.findIndex((trigger) => {
            return trigger.contains(target);
        });
    }
    startMovementPrep(data) {
        this._interactions.mutate(() => {
            this.createPreview();
            if (is(this._currentTarget))
                //@ts-ignore currentTarget
                this.classes.setClass(this._movingCls, this._currentTarget);
            this.classes.setClass(this._lockedCls, this.element);
            this.classes.setClass(CLASSES.swipingOn, document.body);
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    stopMovementPrep() {
        this._interactions.mutate(() => {
            if (is(this._currentTarget))
                //@ts-ignore currentTarget
                this.classes.removeClass(this._movingCls, this._currentTarget);
            this.classes.removeClass(CLASSES.swipingOn, document.body);
            this.classes.removeClass(this._lockedCls, this.element);
            this.removePreview();
            this._currentTarget = null;
            this._currentBefore = null;
            this.getTargetsAndTrggers();
        });
    }
    move(data) {
        this._interactions.mutate(() => {
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    createPreview() {
        if (!is(this._currentTarget)) {
            this.logError("Cannot create preview - current target does not exist", "createPreview");
            return;
        }
        this._preview = new element_ElementBuilder("div")
            .setClasses(this._previewCls)
            .build();
        //@ts-ignore currentTarget
        this._preview.style.width = `${this._currentTarget.offsetWidth}px`;
        //@ts-ignore currentTarget
        this._preview.style.height = `${this._currentTarget.offsetHeight}px`;
        document.body.appendChild(this._preview);
    }
    removePreview() {
        if (is(this._preview)) {
            //@ts-ignore currentTarget
            this._preview.remove();
            this._preview = null;
        }
    }
    setPreviewPosition(data) {
        if (!is(this._preview)) {
            return;
        }
        //@ts-ignore preview
        this._preview.style.top = `${data.y}px`;
        //@ts-ignore preview
        this._preview.style.left = `${data.x}px`;
    }
    setCurrentPosition(data) {
        if (!this._currentTarget) {
            return;
        }
        let [idx, detected] = this._detector.detect(data.x, data.y);
        if (idx !== this._currentIdx &&
            detected &&
            this._currentBefore !== detected) {
            let el = detected;
            this.insertElement(this._currentTarget, el);
            this._currentBefore = el;
            this.getTargetsAndTrggers();
            this._currentIdx = idx;
        }
    }
    insertElement(source, destination) {
        if (is(destination)) {
            this.element.insertBefore(source, destination);
        }
        else {
            this.element.appendChild(source);
        }
    }
    getFinishAnimation() {
        if (!are(this._currentTarget, this._preview)) {
            return {
                opacity: {
                    from: 1,
                    to: 0,
                },
            };
        }
        //@ts-ignore currentTarget
        const box = this._currentTarget.getBoundingClientRect();
        return {
            opacity: {
                from: 1,
                to: 0,
            },
            top: {
                //@ts-ignore preview
                from: this._preview.offsetTop,
                //@ts-ignore preview
                to: box.top > 0 ? box.top : this._preview.offsetTop,
                unit: "px",
            },
            left: {
                //@ts-ignore preview
                from: this._preview.offsetLeft,
                //@ts-ignore preview
                to: box.left > 0 ? box.left : this._preview.offsetLeft,
                unit: "px",
            },
        };
    }
    onSortAnimationFinish() {
        this.stopMovementPrep();
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, false);
        this._busFacade.emit(EVENTS.SORTED, {
            target: this._currentTarget,
            index: this._currentIdx,
        });
    }
}

// CONCATENATED MODULE: ./src/components/spinner/spinner.ts
var spinner_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









class spinner_CuiSpinnerArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super({
            main: "spinner"
        });
        this.spinner = "circle";
        this.scale = 1;
    }
}
function CuiSpinnerComponent(prefix) {
    ICONS['spinner_circle'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 7.800378,1.7908996 A 8.4986862,8.4986862 0 0 1 18.2091,7.8003784 8.4986862,8.4986862 0 0 1 12.199621,18.209101 8.4986862,8.4986862 0 0 1 1.7908995,12.199622 8.4986862,8.4986862 0 0 1 7.800378,1.7908996 Z\"></path></svg>";
    ICONS['spinner_circle_double'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 10,1.5000006 A 8.4999997,8.4999997 0 0 1 18.5,10 8.4999997,8.4999997 0 0 1 10,18.499999 8.4999997,8.4999997 0 0 1 1.5000005,10 8.4999997,8.4999997 0 0 1 10,1.5000006 Z\"></path><path d=\"M 10,3.4999997 A 6.5000002,6.5000002 0 0 1 16.5,10 6.5000002,6.5000002 0 0 1 10,16.5 6.5000002,6.5000002 0 0 1 3.5,9.9999993 6.5000002,6.5000002 0 0 1 10,3.4999997 Z\"></path></svg>";
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "spinner",
        create: (element, utils, prefix, attribute) => {
            return new spinner_CuiSpinnerHandler(element, utils, attribute, prefix);
        }
    });
}
class spinner_CuiSpinnerHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiSpinnerHandler", element, attribute, new spinner_CuiSpinnerArgs(), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._animationPauseClass = replacePrefix("{prefix}-animation-pause", prefix);
        this._interactionFacade = getCuiHandlerInteractions(utils.interactions, this);
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.PAUSE,
            type: "pause",
            performer: callbackPerformer(this.onPause.bind(this))
        }));
    }
    onHandle() {
        return spinner_awaiter(this, void 0, void 0, function* () {
            this.add();
            return true;
        });
    }
    onRefresh() {
        return spinner_awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs && this.args.spinner !== this.prevArgs.spinner) {
                this.add();
            }
            return true;
        });
    }
    onRemove() {
        return spinner_awaiter(this, void 0, void 0, function* () {
            this.removeIfAnyExisists();
            return true;
        });
    }
    addSpinner(iconElement, name) {
        this.element.appendChild(iconElement);
        this.element.classList.add(`animation-spinner-${name}`);
    }
    add() {
        const svgIcon = is(this.args.spinner) ? ICONS[`spinner_${this.args.spinner}`] : null;
        if (!is(svgIcon)) {
            this.log.warning("Incorrect spinner name: " + this.args.spinner);
            return;
        }
        this.removeIfAnyExisists();
        const iconElement = new icon_IconBuilder(svgIcon).setScale(this.args.scale).build();
        this._interactionFacade.mutate(this.addSpinner, iconElement, this.args.spinner);
    }
    removeIfAnyExisists() {
        let existing = this.element.querySelector("svg");
        if (existing) {
            existing.remove();
        }
    }
    onPause(flag) {
        this._interactionFacade.fetch(() => {
            if (flag && !this.classes.hasClass(this._animationPauseClass, this.element)) {
                this.asyncClasses.setClasses(this.element, this._animationPauseClass);
            }
            else {
                this.asyncClasses.removeClasses(this.element, this._animationPauseClass);
            }
        });
        this._busFacade.emit(EVENTS.PAUSED, {
            paused: flag
        });
    }
}

// CONCATENATED MODULE: ./src/components/switch/slider.ts
var slider_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


















/**
 *
 *   targets: string - slider elements
 *   timeout: number - animation timeout
 *   links: string; - link to switcher (indicator, tab, etc)
 *   autoTimeout: number - if defined, slider will switch item automatically
 *   height: 'auto' | string - element height
 *   animation: string - animation name
 *   loop: boolean - allows to slide elements in loop
 */
const SWITCH_DEFAULT_TARGETS = " > li";
class slider_CuiSliderArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super({
            props: {
                "targets": { corrector: joinWithScopeSelector },
                'swipeRatio': { corrector: (value) => getRangeValueOrDefault(value, 0.1, 0.9, 0.4) }
            }
        });
        this.targets = joinWithScopeSelector(SWITCH_DEFAULT_TARGETS);
        this.links = "";
        this.autoTimeout = -1;
        this.height = "";
        this.animation = "slide";
        this.loop = false;
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.swipeRatio = 0.3;
        this.keyChange = false;
    }
}
function CuiSliderComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "slider",
        create: (element, utils, prefix, attribute) => {
            return new slider_CuiSliderHandler(element, utils, attribute);
        }
    });
}
class slider_CuiSliderHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiSliderHandler", element, attribute, new slider_CuiSliderArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this._targets = [];
        this._currentIdx = -1;
        this._nextIdx = -1;
        this._links = [];
        this._current = undefined;
        this._nextElement = null;
        this._currSlider = new engine_CuiSwipeAnimationEngine(new engine_CuiTimeAnimationEngine(getEaseTimingFunction()));
        this._nextSlider = new engine_CuiSwipeAnimationEngine(new engine_CuiTimeAnimationEngine(getEaseTimingFunction()));
        this._targetsCount = 0;
        this._task = new task_CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this._animationDef = SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation];
        this._keysPerformer = getCuiKeyActionPerformer(this.switch.bind(this));
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, this.element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._task = new task_CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this._styles = new CuiStyleHelper();
        this._mutationPerformer = getCuiMutationPerformer(this.onMutation.bind(this));
        this._movePerformer = sliderPerformer(this.asyncClasses, {
            element: element,
            prevent: true,
            start: this.onDown.bind(this),
            progress: this.onMove.bind(this),
            end: this.onUp.bind(this),
            adjustRatio: this.adjustMoveRatio.bind(this)
        });
        this.extend(new switch_CuiSwitchExtension(this._busFacade, this.switch.bind(this)));
        this.extend(new keys_CuiKeysHandlerExtension(this.element, this._busFacade, this._keysPerformer));
        this.extend(eventExtension(this._busFacade, {
            type: "global-move",
            eventName: EVENTS.GLOBAL_MOVE,
            performer: this._movePerformer
        }));
        this.extend(new CuiComponentMutationExtension(element, this._mutationPerformer));
    }
    onHandle() {
        return slider_awaiter(this, void 0, void 0, function* () {
            this.getTargets();
            this.getLinks();
            this.getActiveIndex();
            this.setLinkActive(-1, this._currentIdx);
            this.setElementHeight();
            this.handleUpdate();
            return true;
        });
    }
    onRefresh() {
        return slider_awaiter(this, void 0, void 0, function* () {
            this.setElementHeight();
            this.handleUpdate();
            return true;
        });
    }
    onRemove() {
        return slider_awaiter(this, void 0, void 0, function* () {
            this._task.stop();
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onMutation(record) {
        this.getTargets();
        this.getLinks();
    }
    handleUpdate() {
        this._animationDef = SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation];
        this._mutationPerformer.setSelector(this.args.targets);
        this.setKeyCombo(this.args.keyChange);
        this.startTask();
    }
    setElementHeight() {
        this._interactions.mutate(() => {
            this._styles.setStyle('height', this.getElementHeight(this._targets[this._currentIdx]), this.element);
        });
    }
    onDown() {
        if (!this.lock()) {
            return false;
        }
        this._current = this._targets[this._currentIdx];
        this._currSlider.setElement(this._current);
        return true;
    }
    onMove(data) {
        if (!this._current) {
            return;
        }
        const direction = data.ratio > 0 ? "right" : "left";
        const absRatio = Math.abs(data.ratio);
        let nextIdx = calculateNextIndex(direction === 'left' ? "next" : "prev", this._currentIdx, this._targetsCount);
        if (nextIdx !== this._nextIdx) {
            this._nextElement && this.classes.removeClass(CLASSES.animProgress, this._nextElement);
            this._nextElement = this._targets[nextIdx];
            this._nextIdx = nextIdx;
            this._nextSlider.setElement(this._nextElement);
            this._nextSlider.setProps(this._animationDef.previous[direction]);
            this._currSlider.setProps(this._animationDef.current[direction]);
            this._interactions.mutate(() => {
                this._nextElement && this.classes.setClass(CLASSES.animProgress, this._nextElement);
            });
        }
        this._interactions.mutate(() => {
            this._currSlider.move(Math.abs(absRatio));
            this._nextSlider.move(Math.abs(absRatio));
        });
    }
    onUp(data) {
        let absRatio = Math.abs(data.ratio);
        const minVelo = 1 / this.args.timeout;
        const v = data.velocity > minVelo ? data.velocity : minVelo;
        let back = absRatio <= this.args.swipeRatio;
        //  const timeout = absRatio * this.args.timeout;
        Promise.all([
            this._currSlider.finish({ progress: absRatio, acceleration: data.acceleration, velocity: v, timeout: this.args.timeout, revert: back }),
            this._nextSlider.finish({ progress: absRatio, acceleration: data.acceleration, velocity: v, timeout: this.args.timeout, revert: back })
        ]).then((status) => {
            if (status)
                this.onAnimationFinish(this._current, back, false);
        }).catch((e) => {
            this.logError("An error", "onUp", e);
            this.onAnimationFinish(this._current, back, true);
        });
    }
    adjustMoveRatio(ratio) {
        if (this.args.loop) {
            return ratio;
        }
        if (this._currentIdx === 0 && ratio > 0) {
            return 0;
        }
        if (this._currentIdx === this._targetsCount - 1 && ratio < 0) {
            return 0;
        }
        return ratio;
    }
    /**
     * Api method to switch childrens
     * @param index - index to switch to
     */
    switch(index) {
        return slider_awaiter(this, void 0, void 0, function* () {
            if (!this.lock()) {
                return false;
            }
            this.onPushSwitch(index);
            return true;
        });
    }
    /**
     *
     * @param element element this animation was perfromed on
     * @param reverted - flag inidicating whether animation was performed to the end or reverted back to start
     * @param errorOccured - tells whether animation was finished with error
     */
    onAnimationFinish(element, reverted, errorOccured) {
        // If not go back or from push then switch, else was go back
        let next = this._targets[this._nextIdx];
        let current = this._targets[this._currentIdx];
        this._interactions.mutate(() => {
            this.classes.removeClass(CLASSES.animProgress, next);
            this._styles.clean(current);
            this._styles.clean(next);
            if (!reverted) {
                this.classes.setClass(this.activeClassName, next);
                this.classes.removeClass(this.activeClassName, current);
                this.setLinkActive(this._currentIdx, this._nextIdx);
                this._busFacade.emit(EVENTS.SWITCHED, {
                    timestamp: Date.now(),
                    index: this._nextIdx
                });
                this._currentIdx = this._nextIdx;
            }
            this.clearSlideData();
            this.unlock();
        });
        this.startTask();
    }
    onPushSwitch(index) {
        if (!is(index) ||
            !this._animationDef ||
            (!this.args.loop && this._currentIdx === 0 && index === 'prev') ||
            (!this.args.loop && this._currentIdx === this._targetsCount - 1 && index === 'next')) {
            this.unlock();
            return;
        }
        let nextIdx = calculateNextIndex(index, this._currentIdx, this._targetsCount);
        if (nextIdx == this._currentIdx || nextIdx < 0 || nextIdx >= this._targets.length) {
            this.log.warning(`Index ${index} is not within the suitable range`);
            return false;
        }
        this._nextIdx = nextIdx;
        let current = this._targets[this._currentIdx];
        let next = this._targets[this._nextIdx];
        this._currSlider.setElement(current);
        this._nextSlider.setElement(next);
        this._currSlider.setProps(index === 'prev' ? this._animationDef.current.left : this._animationDef.current.right);
        this._nextSlider.setProps(index === 'prev' ? this._animationDef.previous.left : this._animationDef.previous.right);
        this._interactions.mutate(() => {
            this.classes.setClass(CLASSES.animProgress, next);
        });
        Promise.all([
            this._currSlider.finish({ progress: 0, acceleration: 1, velocity: 0, timeout: this.args.timeout, revert: false }),
            this._nextSlider.finish({ progress: 0, acceleration: 1, velocity: 0, timeout: this.args.timeout, revert: false })
        ]).then((statuses) => {
            let status = functions_all(statuses, (status) => status === true);
            if (status)
                this.onAnimationFinish(current, false, false);
        }).catch((e) => {
            this.logError("An error", "onUp", e);
            this.onAnimationFinish(current, false, true);
        });
    }
    getActiveIndex() {
        this._currentIdx = is(this._targets) ? this._targets.findIndex(target => this.classes.hasClass(this.activeClassName, target)) : -1;
    }
    clearSlideData() {
        this._nextIdx = -1;
        this._nextElement = null;
    }
    getElementHeight(current) {
        if (!is(this.args.height) || this.args.height === 'auto') {
            return getChildrenHeight(current) + "px";
        }
        else {
            return this.args.height;
        }
    }
    setKeyCombo(flag) {
        if (!flag) {
            this._keysPerformer.setKeyCombos([]);
            return;
        }
        this._keysPerformer.setKeyCombos([{
                key: 'next',
                value: getDefaultSwitchKeyCombo("ArrowRight")
            }, {
                key: "prev",
                value: getDefaultSwitchKeyCombo("ArrowLeft")
            }]);
    }
    /**
     * Queries targets
     */
    getTargets() {
        this._targets = [...this.element.querySelectorAll(this.args.targets)];
        this._targetsCount = this._targets.length;
    }
    /**
     * Get linked switcher elements
     */
    getLinks() {
        this._links = is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : [];
    }
    /**
     * Set active class on linked switcher if set
     * @param current - current index (to remove active from)
     * @param next - next index (to set action on)
     */
    setLinkActive(current, next) {
        if (!is(this._links)) {
            return;
        }
        this._interactions.mutate(() => {
            if (isInRange(current, 0, this._links.length - 1)) {
                this.classes.removeClass(this.activeClassName, this._links[current]);
            }
            if (isInRange(next, 0, this._links.length - 1)) {
                this.classes.setClass(this.activeClassName, this._links[next]);
            }
        });
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        this._task.stop();
        if (this.args.autoTimeout) {
            this._task.start();
        }
    }
}

// CONCATENATED MODULE: ./src/components/switch/switch.ts
var switch_switch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














const SWITCH_DEFAULT_ACTION_IN = ".{prefix}-switch-animation-default-in";
const SWITCH_DEFAULT_ACTION_OUT = ".{prefix}-switch-animation-default-out";
const switch_SWITCH_DEFAULT_TARGETS = " > *";
class switch_CuiSwitchArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super({
            props: {
                "targets": { corrector: joinWithScopeSelector }
            }
        });
        this.targets = joinWithScopeSelector(switch_SWITCH_DEFAULT_TARGETS);
        this.in = replacePrefix(SWITCH_DEFAULT_ACTION_IN, prefix);
        this.out = replacePrefix(SWITCH_DEFAULT_ACTION_OUT, prefix);
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.links = "";
        this.switch = "";
        this.autoTimeout = -1;
        this.height = "auto";
        this.loop = false;
        this.keyChange = false;
    }
}
function CuiSwitchComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "switch",
        create: (element, utils, prefix, attribute) => {
            return new switch_CuiSwitchHandler(element, utils, attribute);
        }
    });
}
class switch_CuiSwitchHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiSwitchHandler", element, attribute, new switch_CuiSwitchArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this._targets = [];
        this._actionsHelper = new helpers_CuiActionsHelper(utils.interactions);
        this._asyncStyles = new CuiStyleAsyncHelper(utils.interactions, new CuiStyleHelper());
        this._task = new task_CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, this.element);
        this._switchPerformer = getCuiKeyActionPerformer(this.switch.bind(this));
        this._mutationPerformer = getCuiMutationPerformer(this.onMutation.bind(this));
        this.extend(new keys_CuiKeysHandlerExtension(this.element, this._busFacade, this._switchPerformer));
        this.extend(new switch_CuiSwitchExtension(this._busFacade, this.switch.bind(this)));
        this.extend(new CuiComponentMutationExtension(element, this._mutationPerformer));
    }
    onHandle() {
        return switch_switch_awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRefresh() {
        return switch_switch_awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRemove() {
        return switch_switch_awaiter(this, void 0, void 0, function* () {
            this._task.stop();
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    handleUpdate() {
        this.parseArguments();
        this.getTargets();
        const currentIndex = this.getActiveIndex();
        this.setSwitchesActive(currentIndex);
        this.setLinkActive(-1, currentIndex);
        this.setTargetHeight(currentIndex);
        this.startTask();
    }
    onMutation(record) {
        this.getTargets();
        const currentIndex = this.getActiveIndex();
        this.setTargetHeight(currentIndex);
    }
    switch(index) {
        return switch_switch_awaiter(this, void 0, void 0, function* () {
            if (!this.lock()) {
                return false;
            }
            const actionsIn = actions_CuiActionsListFactory.get(this.args.in);
            const actionsOut = actions_CuiActionsListFactory.get(this.args.out);
            const activeIndex = this.getActiveIndex();
            const nextIdx = calculateNextIndex(index, activeIndex, this._targets.length);
            if (nextIdx < 0) {
                this.logWarning(`Index ${index} is not within the suitable range`, "switch");
                return false;
            }
            if (!this.args.loop && ((index === "next" && nextIdx === 0) || (index === 'prev' && activeIndex === 0))) {
                this.logInfo("Switch blocked by loop settings", "switch");
                return false;
            }
            this.setSwitchesActive(nextIdx);
            let nextItem = this._targets[nextIdx];
            yield this._actionsHelper.performSwitchAction(nextItem, activeIndex > -1 ? this._targets[activeIndex] : null, actionsIn, actionsOut, () => {
                // Set next element active
                nextItem.classList.add(this.activeClassName);
                // Remove active from current element (if current exists)
                if (activeIndex > -1)
                    this._targets[activeIndex].classList.remove(this.activeClassName);
                // Update linked items
                this.setLinkActive(activeIndex, nextIdx);
                // Update element height - it must be done a parent get height based on current child
                this.setTargetHeight(activeIndex);
                this.startTask();
                this.unlock();
            }, this.args.timeout);
            this._busFacade.emit(EVENTS.SWITCHED, {
                timestamp: Date.now(),
                index: nextIdx
            });
            return true;
        });
    }
    getActiveIndex() {
        return is(this._targets) ? this._targets.findIndex(target => this.classes.hasClass(this.activeClassName, target)) : -1;
    }
    getElementHeight(current) {
        if (!is(this.args.height) || this.args.height === 'auto') {
            return getChildrenHeight(current) + "px";
        }
        else {
            return this.args.height;
        }
    }
    /**
     * Gets attributes value and prepares properties
     */
    parseArguments() {
        this._task.setTimeout(this.args.autoTimeout);
        if (this.args.keyChange) {
            this._switchPerformer.setKeyCombos([{
                    key: 'next',
                    value: { isCtrl: true, isAlt: true, isShift: false, key: "ArrowRight" }
                }, {
                    key: 'prev',
                    value: { isCtrl: true, isAlt: true, isShift: false, key: "ArrowLeft" }
                }]);
        }
        else {
            this._switchPerformer.setKeyCombos([]);
        }
    }
    /**
     * Query target elements
     */
    getTargets() {
        this._targets = is(this.args.targets) ? [...this.element.querySelectorAll(this.args.targets)] : [];
    }
    setLinkActive(current, next) {
        const links = is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : null;
        if (!links) {
            return;
        }
        const linksLen = links.length - 1;
        if (isInRange(current, 0, linksLen)) {
            //@ts-ignore already checked above
            this.classes.removeClass(this.activeClassName, links[current]);
        }
        if (isInRange(next, 0, linksLen)) {
            //@ts-ignore already checked above
            this.classes.setClass(this.activeClassName, links[next]);
        }
    }
    /**
     * Sets propers active state on attached switches
     * @param index
     */
    setSwitchesActive(index) {
        const switches = getCuiElementsBySelector(this.args.switch);
        switches.forEach(sw => {
            this.emitLinkSwitch(sw.$cuid, index);
        });
    }
    /**
     * Emits push event to attached switch to set proper index
     * @param id - cuid of element
     * @param index - index to be set on element
     */
    emitLinkSwitch(id, index) {
        if (is(id))
            this.core.bus.emit(EVENTS.SWITCH, id, index);
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        this._task.stop();
        if (this.args.autoTimeout) {
            this._task.start();
        }
    }
    setTargetHeight(targetIndex) {
        this._asyncStyles.setStyle('height', this.getElementHeight(this._targets[targetIndex]), this.element);
    }
}

// CONCATENATED MODULE: ./src/components/switch/switcher.ts
var switcher_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const SWITCHER_LIST_ITEM_SELECTOR = "li > a";
class switcher_CuiSwitcherArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super();
        this.index = "";
        this.target = "";
        this.prevent = false;
        this.stopPropagation = false;
        this.targets = SWITCHER_LIST_ITEM_SELECTOR;
        this.isList = false;
    }
}
function CuiSwitcherComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "switcher",
        create: (element, utils, prefix, attribute) => {
            return new switcher_CuiSwitcherHandler(element, utils, attribute);
        }
    });
}
class switcher_CuiSwitcherHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiSwitcherHandler", element, attribute, new switcher_CuiSwitcherArgs(), utils);
        this._perfromer = clickPerformer(this.onClickEvent.bind(this));
        this.extend(clickExtension({
            element: element,
            performer: this._perfromer
        }));
    }
    onHandle() {
        return switcher_awaiter(this, void 0, void 0, function* () {
            this.handleArguments();
            return true;
        });
    }
    onRefresh() {
        return switcher_awaiter(this, void 0, void 0, function* () {
            this.handleArguments();
            return true;
        });
    }
    onRemove() {
        return switcher_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    handleArguments() {
        this._perfromer.preventDefault(this.args.prevent);
        this._perfromer.stopPropagation(this.args.stopPropagation);
    }
    /**
     * Sets current switcher target value
     *
     */
    getTargetCuid() {
        let targetId = null;
        if (!is(this.args.target)) {
            targetId = null;
        }
        let target = document.querySelector(this.args.target);
        if (is(target)) {
            targetId = target.$cuid;
        }
        return targetId;
    }
    onClickEvent(ev) {
        const targetId = this.getTargetCuid();
        if (!targetId) {
            return;
        }
        if (this.args.isList || this.element.tagName === 'UL') {
            this.handleListClick(ev, targetId);
            return;
        }
        this.handleItemClick(ev, targetId);
    }
    handleItemClick(ev, targetCuid) {
        if (!this.args.index) {
            this.log.warning("Switch cannot be performed since component doesn't specify index");
            return;
        }
        this.core.bus.emit(EVENTS.SWITCH, targetCuid, this.args.index);
    }
    handleListClick(ev, targetCuid) {
        const currentSelector = getChildSelectorFromScoped(this.args.targets);
        const target = ev.target;
        if (!target.matches(currentSelector)) {
            return;
        }
        const switcherElements = [...this.element.querySelectorAll(this.args.targets)];
        const targetIndex = switcherElements.findIndex(element => element === ev.target);
        if (targetIndex < 0) {
            return;
        }
        this.core.bus.emit(EVENTS.SWITCH, targetCuid, targetIndex);
    }
}

// CONCATENATED MODULE: ./src/components/toggle/toggle.ts
var toggle_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









class toggle_CuiToggleArgs extends arguments_CuiAutoParseArgs {
    constructor() {
        super({
            main: "action"
        });
        this.action = "";
        this.target = "";
        this.prevent = false;
        this.stopPropagation = false;
    }
}
function CuiToggleComponent(prefix) {
    return CuiComponentBaseHook({
        name: 'toggle',
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new toggle_CuiToggleHandler(element, utils, attribute);
        }
    });
}
/**
 * Events: toggle
 * Emits: Toggled
 */
class toggle_CuiToggleHandler extends base_CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiToggleHandler", element, attribute, new toggle_CuiToggleArgs(), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.toggle.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.TOGGLE,
            performer: callbackPerformer(this.toggle.bind(this))
        }));
    }
    onHandle() {
        return toggle_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRefresh() {
        return toggle_awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRemove() {
        return toggle_awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    toggle() {
        const target = this.getTarget();
        if (!target) {
            this.logError("Target in not provided", "toggle");
            return;
        }
        const actions = actions_CuiActionsListFactory.get(this.args.action);
        this._interactions.mutate(() => {
            actions.forEach(action => action.toggle(target, this.core));
            this._busFacade.emit(EVENTS.TOGGLED, {
                action: this.args.action,
                target: target,
                timestamp: Date.now()
            });
        });
    }
    getTarget() {
        var _a;
        if (!this.args.target) {
            return this.element;
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : this.element;
    }
}

// CONCATENATED MODULE: ./src/components/tooltip/tooltip.ts
var tooltip_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const TOOLTIP_ACTION = ".{prefix}-animation-tooltip-in";
const TOOLTIP_DATA = "{prefix}-tooltip-data";
class tooltip_CuiTooltipArgs extends arguments_CuiAutoParseArgs {
    constructor(prefix) {
        super({
            main: "content"
        });
        this.content = "";
        this.width = 150;
        this.margin = 8;
        this.timeout = 2000;
        this.pos = "";
        this.action = replacePrefix(TOOLTIP_ACTION, prefix);
    }
}
function CuiTooltipComponent(prefix) {
    const _prefix = prefix !== null && prefix !== void 0 ? prefix : 'cui';
    const _attribute = `${_prefix}-tooltip`;
    return {
        attribute: _attribute,
        get: (element, utils) => {
            return new tooltip_CuiTooltipHandler(element, _attribute, utils, _prefix);
        }
    };
}
class tooltip_CuiTooltipHandler extends base_CuiHandlerBase {
    constructor(element, attribute, utils, prefix) {
        super("CuiTooltipHandler", element, attribute, new tooltip_CuiTooltipArgs(prefix), utils);
        this._tooltip = undefined;
        this._tooltipDataCls = replacePrefix(TOOLTIP_DATA, prefix);
        this._positionCalculator = new calculator_CuiBasePositionCalculator();
        this._positionCalculator.setPreferred("top-center");
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._task = new task_CuiTaskRunner(this.args.timeout, false, this.removeTooltip.bind(this));
        this.extend(hoverExtension({
            element: element,
            performer: callbackPerformer(this.onHover.bind(this))
        }));
    }
    onHandle() {
        return tooltip_awaiter(this, void 0, void 0, function* () {
            this.getDataFromArgs();
            return true;
        });
    }
    onRefresh() {
        return tooltip_awaiter(this, void 0, void 0, function* () {
            this.getDataFromArgs();
            return true;
        });
    }
    onRemove() {
        return tooltip_awaiter(this, void 0, void 0, function* () {
            this.removeTooltip();
            return true;
        });
    }
    onHover(ev) {
        if (ev.isHovering) {
            this.createTooltip();
        }
        else {
            this.removeTooltip();
        }
    }
    createTooltip() {
        if (is(this._tooltip) || !is(this.args.content)) {
            return;
        }
        const box = this.element.getBoundingClientRect();
        this._tooltip = new element_ElementBuilder("div").setClasses(this._tooltipDataCls).build();
        this._tooltip.textContent = this.args.content;
        this._tooltip.style.maxWidth = `${this.args.width}px`;
        document.body.appendChild(this._tooltip);
        this._interactions.mutate(() => {
            if (!this._tooltip) {
                return;
            }
            const toolbox = this._tooltip.getBoundingClientRect();
            this._positionCalculator.setMargin(this.args.margin);
            try {
                let [x, y] = this._positionCalculator.calculate(box, toolbox);
                this._tooltip.style.top = `${y}px`;
                this._tooltip.style.left = `${x}px`;
                this.toggleActions(this._tooltip);
                this._task.start();
            }
            catch (e) {
                this.logError(e.message, "createTooltip", e);
            }
        });
    }
    removeTooltip() {
        this._task.stop();
        this._interactions.mutate(() => {
            if (!is(this._tooltip)) {
                return;
            }
            //@ts-ignore already checked
            this._tooltip.remove();
            this._tooltip = undefined;
        });
    }
    getDataFromArgs() {
        this._positionCalculator.setMargin(this.args.margin);
        this._positionCalculator.setStatic(this.args.pos);
        this._task.setTimeout(this.args.timeout);
    }
    toggleActions(element) {
        const actions = actions_CuiActionsListFactory.get(this.args.action);
        actions.forEach(action => {
            // @ts-ignore
            action.toggle(element);
        });
    }
}

// CONCATENATED MODULE: ./src/components/module.ts









//import { CuiIntersectionComponent } from "./intersection/intersection";















/**
 * Function that initializes and returns all components available in package
 * @param attributes - object holding data needed for components initialization
 */
function GetComponents(attributes) {
    let prefix = attributes === null || attributes === void 0 ? void 0 : attributes.prefix;
    return [
        CuiIconComponent(prefix),
        CuiTooltipComponent(prefix),
        CuiCircleComponent(prefix),
        CuiSpinnerComponent(prefix),
        CuiScrollComponent(prefix),
        CuiScrollspyComponent(prefix),
        CuiOpenComponent(prefix),
        CuiCloseComponent(prefix),
        CuiToggleComponent(prefix),
        CuiDialogComponent(prefix),
        CuiOffCanvasComponent(prefix),
        CuiAccordionComponent(prefix),
        CuiDropComponent(prefix),
        CuiOffsetComponent(prefix),
        CuiSwitchComponent(prefix),
        CuiSwitcherComponent(prefix),
        CuiFloatComponent(prefix),
        CuiSliderComponent(prefix),
        CuiBannerComponent(prefix),
        CuiCoverComponent(prefix),
        CuiSortableComponent(prefix),
        CuiResizeComponent(prefix),
        CuiParallaxComponent(prefix),
        CuiScrollSwitchComponent(prefix)
    ];
}

// CONCATENATED MODULE: ./src/app/init.ts
var init_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function init_init(data) {
    var _a, _b;
    return init_awaiter(this, void 0, void 0, function* () {
        let pluginList = [];
        try {
            pluginList = GetPlugins({
                autoLight: true,
                autoPrint: true,
            });
        }
        catch (e) {
            console.error("An error occured during download plugin module", e);
            return false;
        }
        let componentList = [];
        try {
            componentList = GetComponents({
                prefix: (_a = data.setup) === null || _a === void 0 ? void 0 : _a.prefix,
            });
        }
        catch (e) {
            console.error("An error occured during download components module", e);
            return false;
        }
        let appPlugins = pluginList;
        if (data.plugins) {
            appPlugins = Object.assign(Object.assign({}, pluginList), data.plugins);
        }
        let result = yield CuiInitializer(Object.assign(Object.assign({}, data), { plugins: appPlugins, components: is(data.components)
                ? // @ts-ignore already checked
                    [...componentList, ...data.components]
                : componentList }));
        if (result.result) {
            return true;
        }
        console.error(`A cUI instance failed to initialize: [${(_b = result.message) !== null && _b !== void 0 ? _b : "#"}]`);
        return false;
    });
}

// CONCATENATED MODULE: ./src/index.ts
const CUI_LIGHT_VERSION = "0.5.0";




/***/ })
/******/ ]);
});
//# sourceMappingURL=cui-light.js.map