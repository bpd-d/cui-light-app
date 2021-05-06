import { STATICS } from "../utils/statics";
export class CuiConsoleDevelopementTool {
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
