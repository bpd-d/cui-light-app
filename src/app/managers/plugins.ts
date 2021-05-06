import { CuiDevtoolFactory } from "../../core/development/factory";
import { ICuiDevelopmentTool } from "../../core/development/interfaces";
import { ICuiPlugin, ICuiMutiationPlugin, ICuiPluginManager } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { is } from "../../core/utils/functions";



export class CuiPluginManager implements ICuiPluginManager {
    private _plugins: ICuiPlugin[];
    private _mutated: ICuiMutiationPlugin[];
    private _log: ICuiDevelopmentTool;
    constructor(plugins: ICuiPlugin[]) {
        this._plugins = plugins ?? [];
        this._log = CuiDevtoolFactory.get("CuiPluginManager");
        this._mutated = [];
    }

    init(core: CuiCore): void {
        this._log.debug("Plugins initialization started: " + this._plugins.length)
        this._mutated = this._plugins.filter((plugin: any) => {
            return is(plugin.mutation);
        }) as any;
        this._plugins.forEach(plugin => {
            plugin.init(core);
            core.setup.plugins[plugin.description] = plugin.setup;
        })
        this._log.debug("Plugins have been initialized");
    }

    get(name: string): ICuiPlugin | undefined {
        if (!is(name)) {
            return undefined;
        }
        return this._plugins.find(p => p.name === name);
    }

    has(name: string): boolean {
        return is(this.get(name))
    }

    async onMutation(mutation: MutationRecord): Promise<boolean> {
        let tasks: Promise<boolean>[] = [];
        this._mutated.forEach((plugin: any) => {
            tasks.push(plugin.mutation(mutation))
        })
        let result: boolean[] = await Promise.all(tasks);
        return result.find(val => {
            val === false
        }) ? false : true;
    }

}