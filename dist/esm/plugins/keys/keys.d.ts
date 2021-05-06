import { ICuiPlugin } from "../../core/models/interfaces";
export interface CuiKeysObserverPluginSetup {
    dummy?: boolean;
}
export declare function CuiKeysObserverPluginFn(setup: CuiKeysObserverPluginSetup): ICuiPlugin;
