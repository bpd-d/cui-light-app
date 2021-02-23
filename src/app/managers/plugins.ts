import { CuiDevtoolFactory } from "../../core/development/factory";
import { ICuiDevelopmentTool } from "../../core/development/interfaces";
import { ICuiPlugin, ICuiMutiationPlugin, ICuiPluginManager } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { is } from "../../core/utils/functions";



export class CuiPluginManager implements ICuiPluginManager {
    #plugins: ICuiPlugin[];
    #mutated: ICuiMutiationPlugin[];
    #log: ICuiDevelopmentTool;
    constructor(plugins: ICuiPlugin[]) {
        this.#plugins = plugins ?? [];
        this.#log = CuiDevtoolFactory.get("CuiPluginManager");
        this.#mutated = [];
    }

    init(utils: CuiUtils): void {
        this.#log.debug("Plugins initialization started: " + this.#plugins.length)
        this.#mutated = this.#plugins.filter((plugin: any) => {
            return is(plugin.mutation);
        }) as any;
        this.#plugins.forEach(plugin => {
            plugin.init(utils);
            utils.setup.plugins[plugin.description] = plugin.setup;
        })
        this.#log.debug("Plugins have been initialized");
    }

    get(name: string): ICuiPlugin | undefined {
        if (!is(name)) {
            return undefined;
        }
        return this.#plugins.find(p => p.name === name);
    }

    has(name: string): boolean {
        return is(this.get(name))
    }

    async onMutation(mutation: MutationRecord): Promise<boolean> {
        let tasks: Promise<boolean>[] = [];
        this.#mutated.forEach((plugin: any) => {
            tasks.push(plugin.mutation(mutation))
        })
        let result: boolean[] = await Promise.all(tasks);
        return result.find(val => {
            val === false
        }) ? false : true;
    }

}