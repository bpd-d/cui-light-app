import { ICuiPlugin, ICuiPluginManager } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
export declare class CuiPluginManager implements ICuiPluginManager {
    private _plugins;
    private _mutated;
    private _log;
    constructor(plugins: ICuiPlugin[]);
    init(core: CuiCore): void;
    get(name: string): ICuiPlugin | undefined;
    has(name: string): boolean;
    onMutation(mutation: MutationRecord): Promise<boolean>;
}
