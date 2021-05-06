import { CuiHTMLElement, ICuiComponent } from "../models/interfaces";
import { CuiCore } from "../models/core";
import { ICuiApiHandler } from "./interfaces";
export declare class CuiApiHandler implements ICuiApiHandler {
    private _components;
    private _core;
    constructor(components: ICuiComponent[], core: CuiCore);
    registerComponent(node: CuiHTMLElement): Promise<boolean>;
    updateComponent(node: CuiHTMLElement, component: string, args?: any): Promise<boolean>;
    destroyComponent(node: CuiHTMLElement): Promise<boolean>;
}
