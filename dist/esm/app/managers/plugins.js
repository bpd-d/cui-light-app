var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiDevtoolFactory } from "../../core/development/factory";
import { is } from "../../core/utils/functions";
export class CuiPluginManager {
    constructor(plugins) {
        this._plugins = plugins !== null && plugins !== void 0 ? plugins : [];
        this._log = CuiDevtoolFactory.get("CuiPluginManager");
        this._mutated = [];
    }
    init(core) {
        this._log.debug("Plugins initialization started: " + this._plugins.length);
        this._mutated = this._plugins.filter((plugin) => {
            return is(plugin.mutation);
        });
        this._plugins.forEach(plugin => {
            plugin.init(core);
            core.setup.plugins[plugin.description] = plugin.setup;
        });
        this._log.debug("Plugins have been initialized");
    }
    get(name) {
        if (!is(name)) {
            return undefined;
        }
        return this._plugins.find(p => p.name === name);
    }
    has(name) {
        return is(this.get(name));
    }
    onMutation(mutation) {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = [];
            this._mutated.forEach((plugin) => {
                tasks.push(plugin.mutation(mutation));
            });
            let result = yield Promise.all(tasks);
            return result.find(val => {
                val === false;
            }) ? false : true;
        });
    }
}
