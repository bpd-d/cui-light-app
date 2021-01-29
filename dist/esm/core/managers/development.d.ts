import { CuiDevelopmentStateType, ICuiDevelopmentTool } from "../models/interfaces";
export declare class CuiDevelopmentToolManager implements ICuiDevelopmentTool {
    #private;
    constructor(tool?: ICuiDevelopmentTool);
    pushState(cuid: string, component: string, type: CuiDevelopmentStateType, message: string, functionName?: string): void;
    registerElement(element: HTMLElement, cuid: string, component: string): void;
    unregisterElement(cuid: string, component: string): void;
    setProperty<T>(cuid: string, component: string, name: string, t: T): void;
    log(type: CuiDevelopmentStateType, message: string, functionName?: string): void;
    private checkAndCall;
}
