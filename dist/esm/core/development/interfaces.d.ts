export interface ICuiDevelopmentTool {
    registerElement(element: HTMLElement, cuid: string, component: string): void;
    unregisterElement(cuid: string, component: string): void;
    setProperty<T>(cuid: string, component: string, name: string, t: T): void;
    pushState(cuid: string, component: string, type: CuiDevelopmentStateType, message: string, functionName?: string): void;
    log(type: CuiDevelopmentStateType, message: string, functionName?: string): void;
    debug(message: string, functionName?: string): void;
    warning(message: string, functionName?: string): void;
    error(message: string, functionName?: string): void;
    exception(e: Error, functionName?: string): void;
    setId(id: string): void;
}
export declare type CuiDevelopmentStateType = "info" | "error" | "warning" | "debug";
export interface ICuiDevelopmentToolFactory {
    get(name: string): ICuiDevelopmentTool;
}
export interface ICuiDevelopmentToolApi {
    getProperty<T>(cuid: string, component: string, name: string): T;
    getElement<T>(cuid: string): CuiDevelopmentElement<T>;
}
export interface CuiDevelopmentElement<T> {
    element: HTMLElement;
    cuid: string;
    components: CuiDevelopmentComponents<T>;
    properties: CuiDevelopmentProperties<T>;
}
export interface CuiDevelopmentProperties<T> {
    [name: string]: T;
}
export interface CuiDevelopmentComponents<T> {
    [name: string]: CuiDevelopmentComponent<T>;
}
export interface CuiDevelopmentComponent<T> {
    name: string;
    registerDt: number;
    properties: CuiDevelopmentProperties<T>;
    state: CuiDevelopmentState[];
}
export interface CuiDevelopmentState {
    message: string;
    function: string;
    timestamp: number;
    type: CuiDevelopmentStateType;
}
