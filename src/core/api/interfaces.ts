import { CuiHTMLElement } from "../models/interfaces";

export interface ICuiApiHandler {
    registerComponent(node: CuiHTMLElement): Promise<boolean>;
    updateComponent(node: CuiHTMLElement, component: string, args?: any): Promise<boolean>;
    destroyComponent(node: CuiHTMLElement): Promise<boolean>;
}