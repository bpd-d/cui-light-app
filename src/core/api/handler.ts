import { CuiHTMLElement, ICuiComponent } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
import { ICuiApiHandler } from "./interfaces";
import { createCuiElement, destroyCuiElement, getMatchingComponents, updateComponent } from "./functions";

export class CuiApiHandler implements ICuiApiHandler {
    #components: ICuiComponent[];
    #utils: CuiUtils;

    constructor(components: ICuiComponent[], utils: CuiUtils) {
        this.#components = components;
        this.#utils = utils;
    }
    async registerComponent(node: CuiHTMLElement): Promise<boolean> {
        let matching = getMatchingComponents(node, this.#components);
        if (!matching || matching.length === 0) {
            return false;
        }
        return createCuiElement(node, matching, this.#utils);
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