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
var _tool;
import { is } from "../utils/functions";
export class CuiDevelopmentToolManager {
    constructor(tool) {
        _tool.set(this, void 0);
        __classPrivateFieldSet(this, _tool, tool);
    }
    pushState(cuid, component, type, message, functionName) {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            __classPrivateFieldGet(this, _tool).pushState(cuid, component, type, message, functionName);
        });
    }
    registerElement(element, cuid, component) {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            __classPrivateFieldGet(this, _tool).registerElement(element, cuid, component);
        });
    }
    unregisterElement(cuid, component) {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            __classPrivateFieldGet(this, _tool).unregisterElement(cuid, component);
        });
    }
    setProperty(cuid, component, name, t) {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            __classPrivateFieldGet(this, _tool).setProperty(cuid, component, name, t);
        });
    }
    log(type, message, functionName) {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            __classPrivateFieldGet(this, _tool).log(type, message, functionName);
        });
    }
    checkAndCall(callback) {
        if (!is(__classPrivateFieldGet(this, _tool))) {
            return;
        }
        callback();
    }
}
_tool = new WeakMap();
