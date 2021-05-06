import { ICuiComponent, CuiHTMLElement } from "../models/interfaces";
import { CuiCore } from "../models/core";
export declare function getMatchingComponents(node: any, components: ICuiComponent[]): ICuiComponent[];
export declare function createCuiElement(node: any, components: ICuiComponent[], core: CuiCore): Promise<boolean>;
export declare function destroyCuiElement(node: any): Promise<boolean>;
export declare function addCuiArgument<T extends object>(element: HTMLElement, cuiArg: string, args: T): boolean;
export declare function createComponent(node: CuiHTMLElement, component: ICuiComponent, core: CuiCore, args?: any): Promise<boolean>;
export declare function updateComponent(node: CuiHTMLElement, component: string, args?: any): Promise<boolean>;
