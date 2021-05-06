import { ICuiComponent, ICuiComponentHandler } from "src/core/models/interfaces";
import { CuiCore } from "src/core/models/core";
export interface CuiComponentBaseHookSetup {
    name: string;
    create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => ICuiComponentHandler;
    style?: () => string;
    prefix?: string;
}
export declare function CuiComponentBaseHook(setup: CuiComponentBaseHookSetup): ICuiComponent;
