var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _components, _utils;
import { createCuiElement, destroyCuiElement, getMatchingComponents, updateComponent } from "./functions";
export class CuiApiHandler {
    constructor(components, utils) {
        _components.set(this, void 0);
        _utils.set(this, void 0);
        __classPrivateFieldSet(this, _components, components);
        __classPrivateFieldSet(this, _utils, utils);
    }
    registerComponent(node) {
        return __awaiter(this, void 0, void 0, function* () {
            let matching = getMatchingComponents(node, __classPrivateFieldGet(this, _components));
            if (!matching || matching.length === 0) {
                return false;
            }
            return createCuiElement(node, matching, __classPrivateFieldGet(this, _utils));
        });
    }
    updateComponent(node, component, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!node.hasAttribute(component)) {
                return false;
            }
            return updateComponent(node, component, args);
        });
    }
    destroyComponent(node) {
        return __awaiter(this, void 0, void 0, function* () {
            return destroyCuiElement(node);
        });
    }
}
_components = new WeakMap(), _utils = new WeakMap();
