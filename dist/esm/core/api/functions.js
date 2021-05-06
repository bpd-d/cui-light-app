var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RegisterElementError } from "../models/errors";
import { generateCUID, are, enumerateObject, parseAttribute } from "../utils/functions";
import { CUID_ATTRIBUTE } from "../utils/statics";
export function getMatchingComponents(node, components) {
    return components.filter(component => {
        return node.hasAttribute && node.hasAttribute(component.attribute);
    });
}
export function createCuiElement(node, components, core) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!are(node, components, core)) {
            return false;
        }
        let element = node;
        if (!element.$cuid) {
            element.$cuid = node.hasAttribute(CUID_ATTRIBUTE) ? node.getAttribute(CUID_ATTRIBUTE) : generateCUID(node.tagName);
            node.setAttribute(CUID_ATTRIBUTE, element.$cuid);
        }
        for (let component of components) {
            yield createComponent(element, component, core, parseAttribute(element, component.attribute));
        }
        return true;
    });
}
export function destroyCuiElement(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = node;
        if (!element.$handlers) {
            return false;
        }
        for (let name in element.$handlers) {
            yield destroyComponent(element, name);
        }
        return true;
    });
}
export function addCuiArgument(element, cuiArg, args) {
    if (!are(cuiArg, args, element)) {
        return false;
    }
    if (element.hasAttribute(cuiArg)) {
        return false;
    }
    let argArr = [];
    enumerateObject(args, (arg, value) => {
        argArr.push(`${arg}: ${value}`);
    });
    element.setAttribute(cuiArg, argArr.join("; "));
    return true;
}
export function createComponent(node, component, core, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node.$handlers) {
            node.$handlers = {};
        }
        // If handler already exists - ignore
        if (node.$handlers[component.attribute]) {
            return false;
        }
        try {
            let handler = component.get(node, core);
            node.$handlers[component.attribute] = handler;
            yield node.$handlers[component.attribute].handle(args);
        }
        catch (e) {
            throw new RegisterElementError(`An error occured during [${component.attribute}] initialization: ${e.message}`);
        }
        return true;
    });
}
export function updateComponent(node, component, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node || !node.$handlers) {
            return false;
        }
        let handler = node.$handlers[component];
        if (!handler) {
            return false;
        }
        try {
            if (handler.refresh)
                yield handler.refresh(args);
        }
        catch (e) {
            throw new RegisterElementError(`An error occured during [${component}] update: ${e.message}`);
        }
        return true;
    });
}
function destroyComponent(node, component) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node || !node.$handlers) {
            return false;
        }
        let handler = node.$handlers[component];
        if (!handler) {
            return false;
        }
        try {
            yield handler.destroy();
        }
        catch (e) {
            throw new RegisterElementError(`An error occured during [${component}] destroy: ${e.message}`);
        }
        return true;
    });
}
