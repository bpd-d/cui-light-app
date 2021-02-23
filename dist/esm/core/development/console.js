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
var _cuid, _name, _level;
import { STATICS } from "../utils/statics";
export class CuiConsoleDevelopementTool {
    constructor(name, logLevel) {
        _cuid.set(this, void 0);
        _name.set(this, void 0);
        _level.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
        __classPrivateFieldSet(this, _cuid, '-');
        __classPrivateFieldSet(this, _level, logLevel !== null && logLevel !== void 0 ? logLevel : STATICS.logLevel);
    }
    registerElement(element, cuid, component) {
        __classPrivateFieldSet(this, _cuid, cuid);
        console.log(this.prepString("Register element: " + cuid, 'debug', component));
    }
    unregisterElement(cuid, component) {
        __classPrivateFieldSet(this, _cuid, '-');
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
        if (__classPrivateFieldGet(this, _level) === 'debug') {
            console.log(this.prepString(message, "debug", functionName));
        }
    }
    warning(message, functionName) {
        if (__classPrivateFieldGet(this, _level) === 'warning' || __classPrivateFieldGet(this, _level) === 'debug')
            console.warn(this.prepString(message, "warning", functionName));
    }
    error(message, functionName) {
        if (__classPrivateFieldGet(this, _level) === 'error' || __classPrivateFieldGet(this, _level) === 'debug' || __classPrivateFieldGet(this, _level) === 'warning')
            console.error(this.prepString(message, "error", functionName));
    }
    exception(e, functionName) {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, "exception", functionName));
        if (__classPrivateFieldGet(this, _level) === 'debug')
            console.error(e.stack);
    }
    prepString(message, level, functionName) {
        return `[${new Date().toLocaleString()}][${level}][${__classPrivateFieldGet(this, _name)}][${functionName !== null && functionName !== void 0 ? functionName : '-'}][${__classPrivateFieldGet(this, _cuid)}][${message}]`;
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
_cuid = new WeakMap(), _name = new WeakMap(), _level = new WeakMap();
