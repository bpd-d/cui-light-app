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
var _dict;
import { CuiDictionary } from "../../../core/utils/dictionary";
export class CuiModulesHandler {
    constructor() {
        _dict.set(this, void 0);
        __classPrivateFieldSet(this, _dict, new CuiDictionary());
    }
    add(module) {
        __classPrivateFieldGet(this, _dict).add(module.type, module);
    }
    remove(type) {
        __classPrivateFieldGet(this, _dict).remove(type);
    }
    init(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            __classPrivateFieldGet(this, _dict).forEach((name, module) => promises.push(module.init(args)));
            yield Promise.all(promises);
            return true;
        });
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            __classPrivateFieldGet(this, _dict).forEach((name, module) => {
                if (module.update) {
                    promises.push(module.update(args));
                }
            });
            yield Promise.all(promises);
            return true;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            __classPrivateFieldGet(this, _dict).forEach((name, module) => promises.push(module.destroy()));
            yield Promise.all(promises);
            return true;
        });
    }
}
_dict = new WeakMap();
