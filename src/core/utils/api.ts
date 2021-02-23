import { RegisterElementError } from "../models/errors";
import { ICuiComponent, CuiHTMLElement } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
import { generateCUID, are, enumerateObject, parseAttribute } from "./functions";
import { CUID_ATTRIBUTE } from "./statics";

export function getMatchingComponents(node: any, components: ICuiComponent[]): ICuiComponent[] {
    return components.filter(component => {
        return node.hasAttribute && node.hasAttribute(component.attribute);
    })
}

export async function createCuiElement(node: any, components: ICuiComponent[], utils: CuiUtils): Promise<boolean> {
    if (!are(node, components, utils)) {
        return false;
    }
    let element = node as CuiHTMLElement;
    if (!element.$cuid) {
        element.$cuid = node.hasAttribute(CUID_ATTRIBUTE) ? node.getAttribute(CUID_ATTRIBUTE) : generateCUID(node.tagName);
        node.setAttribute(CUID_ATTRIBUTE, element.$cuid);
    }
    for (let component of components) {
        await createComponent(element, component, utils, parseAttribute(element, component.attribute))
    }
    return true;
}

export async function destroyCuiElement(node: any): Promise<boolean> {
    const element = node as CuiHTMLElement;
    if (!element.$handlers) {
        return false;
    }
    for (let name in element.$handlers) {
        await destroyComponent(element, name);
    }

    return true;
}

export function addCuiArgument<T extends object>(element: HTMLElement, cuiArg: string, args: T): boolean {
    if (!are(cuiArg, args, element)) {
        return false;
    }
    if (element.hasAttribute(cuiArg)) {
        return false;
    }
    let argArr: string[] = [];
    enumerateObject(args, (arg: string, value: string) => {
        argArr.push(`${arg}: ${value}`);
    })
    element.setAttribute(cuiArg, argArr.join("; "));
    return true;

}


export async function createComponent(node: CuiHTMLElement, component: ICuiComponent, utils: CuiUtils, args?: any): Promise<boolean> {
    if (!node.$handlers) {
        node.$handlers = {};
    }
    try {
        let handler = component.get(node, utils);
        node.$handlers[component.attribute] = handler;
        node.$handlers[component.attribute].handle(args);
    } catch (e) {
        throw new RegisterElementError(`An error occured during [${component.attribute}] initialization: ${e.message}`);
    }
    return true;
}

export async function updateComponent(node: CuiHTMLElement, component: string, args?: any): Promise<boolean> {
    if (!node || !node.$handlers) {
        return false;
    }

    let handler = node.$handlers[component];
    if (!handler) {
        return false;
    }
    try {
        handler.refresh(args);
    } catch (e) {
        throw new RegisterElementError(`An error occured during [${component}] update: ${e.message}`);
    }
    return true;
}

async function destroyComponent(node: CuiHTMLElement, component: string): Promise<boolean> {
    if (!node || !node.$handlers) {
        return false;
    }

    let handler = node.$handlers[component];
    if (!handler) {
        return false;
    }
    try {
        handler.destroy();
    } catch (e) {
        throw new RegisterElementError(`An error occured during [${component}] destroy: ${e.message}`);
    }
    return true;
}