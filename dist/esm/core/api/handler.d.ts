import { CuiHTMLElement, ICuiComponent } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
import { ICuiApiHandler } from "./interfaces";
export declare class CuiApiHandler implements ICuiApiHandler {
    #private;
    constructor(components: ICuiComponent[], utils: CuiUtils);
    registerComponent(node: CuiHTMLElement): Promise<boolean>;
    updateComponent(node: CuiHTMLElement, component: string, args?: any): Promise<boolean>;
    destroyComponent(node: CuiHTMLElement): Promise<boolean>;
}
