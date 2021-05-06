import { CuiHTMLElement, ICuiComponent } from "../models/interfaces";
import { CuiCore } from "../models/core";
import { ICuiApiHandler } from "./interfaces";
import { createCuiElement, destroyCuiElement, getMatchingComponents, updateComponent } from "./functions";

export class CuiApiHandler implements ICuiApiHandler {
    private _components: ICuiComponent[];
    private _core: CuiCore;

    constructor(components: ICuiComponent[], core: CuiCore) {
        this._components = components;
        this._core = core;
    }
    async registerComponent(node: CuiHTMLElement): Promise<boolean> {
        let matching = getMatchingComponents(node, this._components);
        if (!matching || matching.length === 0) {
            return false;
        }
        return createCuiElement(node, matching, this._core);
    }
    async updateComponent(node: CuiHTMLElement, component: string, args?: any): Promise<boolean> {
        if (!node.hasAttribute(component)) {
            return false;
        }
        return updateComponent(node, component, args);
    }
    async destroyComponent(node: CuiHTMLElement): Promise<boolean> {
        return destroyCuiElement(node);
    }

}