import { ICuiPlugin, ICuiPluginManager } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiPluginManager implements ICuiPluginManager {
    #private;
    constructor(plugins: ICuiPlugin[]);
    init(utils: CuiUtils): void;
    get(name: string): ICuiPlugin | undefined;
    onMutation(mutation: MutationRecord): Promise<boolean>;
}
