import { CuiLightMode, CuiWindowSize } from "./types";
import { CuiElement, CuiHTMLElement, ICuiKeysCombo, ICuiPair } from "../models/interfaces";
/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export declare function is(val: any, typecheck?: boolean): boolean;
/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export declare function isEmpty(val: any): boolean;
export declare function getName(prefix: string, name: string): string;
export declare function sleep(timeout: number): Promise<boolean>;
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export declare function createElementFromString(htmlString: string): Element | null;
export declare function getMatchingAttribute(element: any, attributes: string[]): string | null;
export declare function getRangeValue(value: number, min: number, max: number): number;
export declare function getRangeValueOrDefault(value: number | undefined, min: number, max: number, def: number): number;
export declare function increaseValue(value: number, amount: number): number;
export declare function decreaseValue(value: number, amount: number): number;
export declare function clone(object: any): any;
export declare function getSingleColorRatio(first: number, second: number, max: number): number;
/**
 * Creates string containg css selector for array of attributes
 * @param attributes - attributes values
 */
export declare function joinAttributesForQuery(attributes: string[]): string;
/**
 * Checks light system light mode
 * @returns Light Mode - dark/light
 */
export declare function getSystemLightMode(): CuiLightMode;
/**
 * Check print mode in the browser window
 * @returns true if window is displayed in print mode
 */
export declare function getSystemPrintMode(): boolean;
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export declare function are(...attributes: any[]): boolean;
export declare function calcWindowSize(width: number): CuiWindowSize;
/**
 * Simply splits text by character or returns empty array
 * @param text Text to split
 * @param splitBy character to split by
 * @returns array of split characters
 */
export declare function splitText(text: string, splitBy: string): string[];
export declare function generateSplitText(text: string, splitBy: string): Generator<string, void, unknown>;
/**
 * Creates object from string.
 * Supported syntaxes are:
 * - JSON
 * - single value
 * - key:value,value;key=value
 *
 * @param attribute - attribute value
 */
export declare function parseAttributeString(attribute: string | null): any;
export declare function parseSingleAttribute(value: string): ICuiPair<string, string> | undefined;
/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */
export declare function parseJsonString(attribute: string): any | null;
/**
 * Creates object from JSON string
 * @param attribute - JSON string
 */
export declare function jsonify(attribute: string): any;
export declare function getOffsetTop(element: HTMLElement): number;
export declare function getOffsetLeft(element: HTMLElement): number;
export declare function getIntOrDefault(value: any, def: number): number;
export declare function getStyleValue(target: any, property: string): any;
export declare function prepLogString(message: string, component: string, functionName?: string): string;
export declare function isInRange(value: number, min: number, max: number): boolean;
export declare function getActiveClass(prefix: string): string;
export declare function parseAttribute(element: Element, attribute: string): any;
/**
 *  Checks whether string value contains synonym of true
 * @param value - string to check
 */
export declare function isStringTrue(value: string): boolean;
export declare function boolStringOrDefault(prop: any, def: boolean): boolean;
export declare function getStringOrDefault(value: any, def: string): any;
/**
 * Checks whether device supports touch
 */
export declare function isTouchSupported(): boolean;
/**
 * Checks whether value is type of string
 * @param {any} value - value to be checked
 */
export declare function isString(value: any): boolean;
/**
 * Replaces mask {prefix} with actual value in the string
 * @param {string} value - text containg a mask
 * @param {string} prefix - value to be put in place of mask
 */
export declare function replacePrefix(value: string, prefix: string): string;
/**
 * Generates identifier for Cui element
 *
 * @param element - Cui element selector
 * @returns generated identifier
 */
export declare function generateCUID(element?: string): string;
/**
 * Generates random string
 */
export declare function generateRandomString(): string;
/**
 * Generates random integer
 * @param min - min number
 * @param max - max number
 * @returns random integer
 */
export declare function getRandomInt(min: number, max: number): number;
export declare function counter(): Generator<number, number, number>;
export declare function all<T>(array: T[], condition: (t: T) => boolean): boolean;
export declare function getHandlerExtendingOrNull<T>(target: CuiElement, fName: string): T | null;
/**
 * Checks whether property exists on the object and it is a function
 * @param obj - object
 * @param fName - property name
 */
export declare function hasFunction(obj: any, fName: string): boolean;
/**
 * Gets closest parent element which is a cUI element
 * @param element
 */
export declare function getParentCuiElement(element: Element): Element | undefined;
/**
 * Calculates element height by calculating childerns heights
 * @param element
 */
export declare function getChildrenHeight(element: Element): number;
export declare function enumerateObject<T extends object>(object: T, callback: (property: string, value: any) => void): void;
export declare function round(value: number, decimalPlaces: number): number;
export declare function calculateNextIndex(val: any, currentIndex: number, totalLength: number): number;
export declare function getFirstMatching<T>(array: T[], callback: (t: T, index: number) => boolean): T | undefined;
export declare function mapObject<T, V>(input: T, callback: (t: T) => V): V;
export declare function mapObjectArray<T, V>(input: T[], callback: (t: T) => V): V[];
/**
 * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
 * @param callback - callback to execute
 * @param delayTime - time in ms that execution shall be delayed by
 * @returns Cancel callback
 */
export declare function delay(callback: (...args: any[]) => void, delayTime: number): (...args: any[]) => () => void;
export declare function splitColon(text: string): string[];
export declare function getEnumOrDefault<T>(value: T, defVal: T, ...values: T[]): T;
export declare function joinWithScopeSelector(value: string): string;
export declare function measure(name?: string): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function getChildSelectorFromScoped(scopedSelector: string): string;
export declare function applyMixins(derivedCtor: any, constructors: any[]): void;
export declare function isInViewport(element: HTMLElement): boolean;
export declare function matchesKeyCombo(event: KeyboardEvent, compare: ICuiKeysCombo): boolean;
/**
 * Performs query all and returns result as an array
 * @param root - root element to query from
 * @param selector - query selector
 * @returns list of found elements
 */
export declare function queryAll(root: Document | Element, selector: string): HTMLElement[];
export declare function findMatchingElementIndex<T>(item: T, items: T[]): number;
export declare function getCuiElementsBySelector(selector: string): CuiHTMLElement[];
