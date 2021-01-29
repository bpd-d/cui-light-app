
import { CuiDevelopmentStateType, ICuiDevelopmentTool } from "../models/interfaces";
import { is } from "../utils/functions";

export class CuiDevelopmentToolManager implements ICuiDevelopmentTool {

    #tool: ICuiDevelopmentTool | undefined;
    constructor(tool?: ICuiDevelopmentTool) {
        this.#tool = tool;
    }

    pushState(cuid: string, component: string, type: CuiDevelopmentStateType, message: string, functionName?: string): void {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            this.#tool.pushState(cuid, component, type, message, functionName);
        })

    }

    registerElement(element: HTMLElement, cuid: string, component: string): void {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            this.#tool.registerElement(element, cuid, component);
        })
    }

    unregisterElement(cuid: string, component: string): void {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            this.#tool.unregisterElement(cuid, component);
        })
    }

    setProperty<T>(cuid: string, component: string, name: string, t: T): void {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            this.#tool.setProperty(cuid, component, name, t);
        })
    }

    log(type: CuiDevelopmentStateType, message: string, functionName?: string): void {
        this.checkAndCall(() => {
            // @ts-ignore - tool already checked
            this.#tool.log(type, message, functionName);
        })
    }

    private checkAndCall(callback: any) {
        if (!is(this.#tool)) {
            return;
        }

        callback();
    }
}