var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { is } from "../core/utils/functions";
import CuiInitializer from "./initializer";
import { GetPlugins } from "../plugins/module";
import { GetComponents } from "../components/module";
export function init(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let pluginList = [];
        try {
            pluginList = GetPlugins({
                autoLight: true,
                autoPrint: true,
            });
        }
        catch (e) {
            console.error("An error occured during download plugin module", e);
            return false;
        }
        let componentList = [];
        try {
            componentList = GetComponents({
                prefix: (_a = data.setup) === null || _a === void 0 ? void 0 : _a.prefix,
            });
        }
        catch (e) {
            console.error("An error occured during download components module", e);
            return false;
        }
        let appPlugins = pluginList;
        if (data.plugins) {
            appPlugins = Object.assign(Object.assign({}, pluginList), data.plugins);
        }
        let result = yield CuiInitializer(Object.assign(Object.assign({}, data), { plugins: appPlugins, components: is(data.components)
                ? // @ts-ignore already checked
                    [...componentList, ...data.components]
                : componentList }));
        if (result.result) {
            return true;
        }
        console.error(`A cUI instance failed to initialize: [${(_b = result.message) !== null && _b !== void 0 ? _b : "#"}]`);
        return false;
    });
}
