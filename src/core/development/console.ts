import { STATICS } from "../utils/statics";
import { CuiLogLevel } from "../utils/types";
import { CuiDevelopmentStateType, ICuiDevelopmentTool } from "./interfaces";

export class CuiConsoleDevelopementTool implements ICuiDevelopmentTool {
    private _cuid: string;
    private _name: string;
    private _level: CuiLogLevel;
    constructor(name: string, logLevel?: CuiLogLevel) {
        this._name = name;
        this._cuid = '-';
        this._level = logLevel ?? STATICS.logLevel;

    }
    registerElement(element: HTMLElement, cuid: string, component: string): void {
        this._cuid = cuid;
        console.log(this.prepString("Register element: " + cuid, 'debug', component))
    }
    unregisterElement(cuid: string, component: string): void {
        this._cuid = '-'
        console.log(this.prepString("Unregister element: " + cuid, 'debug', component))
    }

    setProperty<T>(cuid: string, component: string, name: string, t: T): void {
        //throw new Error("Method not implemented.");
    }

    pushState(cuid: string, component: string, type: CuiDevelopmentStateType, message: string, functionName?: string): void {
        this.logByType(type, message, functionName);
    }

    log(type: CuiDevelopmentStateType, message: string, functionName?: string): void {
        this.logByType(type, message, functionName);
    }

    debug(message: string, functionName?: string): void {
        if (this._level === 'debug') {
            console.log(this.prepString(message, "debug", functionName))
        }
    }
    warning(message: string, functionName?: string): void {
        if (this._level === 'warning' || this._level === 'debug')
            console.warn(this.prepString(message, "warning", functionName))
    }
    error(message: string, functionName?: string): void {
        if (this._level === 'error' || this._level === 'debug' || this._level === 'warning')
            console.error(this.prepString(message, "error", functionName))
    }
    exception(e: Error, functionName?: string): void {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, "exception", functionName))
        if (this._level === 'debug')
            console.error(e.stack)
    }

    setId(id: string) {
        if (id)
            this._cuid = id;
    }

    private prepString(message: string, level: string, functionName?: string) {
        return `[${new Date().toLocaleString()}][${level}][${this._name}][${functionName ?? '-'}][${this._cuid}][${message}]`
    }

    private logByType(type: CuiDevelopmentStateType, message: string, functionName?: string) {
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