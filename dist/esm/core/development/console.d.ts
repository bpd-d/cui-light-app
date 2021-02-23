import { CuiLogLevel } from "../utils/types";
import { CuiDevelopmentStateType, ICuiDevelopmentTool } from "./interfaces";
export declare class CuiConsoleDevelopementTool implements ICuiDevelopmentTool {
    #private;
    constructor(name: string, logLevel?: CuiLogLevel);
    registerElement(element: HTMLElement, cuid: string, component: string): void;
    unregisterElement(cuid: string, component: string): void;
    setProperty<T>(cuid: string, component: string, name: string, t: T): void;
    pushState(cuid: string, component: string, type: CuiDevelopmentStateType, message: string, functionName?: string): void;
    log(type: CuiDevelopmentStateType, message: string, functionName?: string): void;
    debug(message: string, functionName?: string): void;
    warning(message: string, functionName?: string): void;
    error(message: string, functionName?: string): void;
    exception(e: Error, functionName?: string): void;
    private prepString;
    private logByType;
}
