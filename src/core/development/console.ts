import { STATICS } from "../utils/statics";
import { CuiLogLevel } from "../utils/types";
import { CuiDevelopmentStateType, ICuiDevelopmentTool } from "./interfaces";

export class CuiConsoleDevelopementTool implements ICuiDevelopmentTool {
    #cuid: string;
    #name: string;
    #level: CuiLogLevel;
    constructor(name: string, logLevel?: CuiLogLevel) {
        this.#name = name;
        this.#cuid = '-';
        this.#level = logLevel ?? STATICS.logLevel;

    }
    registerElement(element: HTMLElement, cuid: string, component: string): void {
        this.#cuid = cuid;
        console.log(this.prepString("Register element: " + cuid, 'debug', component))
    }
    unregisterElement(cuid: string, component: string): void {
        this.#cuid = '-'
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
        if (this.#level === 'debug') {
            console.log(this.prepString(message, "debug", functionName))
        }
    }
    warning(message: string, functionName?: string): void {
        if (this.#level === 'warning' || this.#level === 'debug')
            console.warn(this.prepString(message, "warning", functionName))
    }
    error(message: string, functionName?: string): void {
        if (this.#level === 'error' || this.#level === 'debug' || this.#level === 'warning')
            console.error(this.prepString(message, "error", functionName))
    }
    exception(e: Error, functionName?: string): void {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, "exception", functionName))
        if (this.#level === 'debug')
            console.error(e.stack)
    }

    private prepString(message: string, level: string, functionName?: string) {
        return `[${new Date().toLocaleString()}][${level}][${this.#name}][${functionName ?? '-'}][${this.#cuid}][${message}]`
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