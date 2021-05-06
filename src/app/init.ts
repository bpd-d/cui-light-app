import { ICuiPlugin, ICuiComponent } from "../core/models/interfaces";
import { is } from "../core/utils/functions";
import { CuiInitData, CuiInitializer } from "./initializer";
import { GetPlugins } from "../plugins/module"
import { GetComponents } from "../components/module";


export class CuiInit {
    private _isInitialized: boolean;
    constructor() {
        this._isInitialized = false;
    }

    async init(data: CuiInitData): Promise<boolean> {
        if (this._isInitialized) {
            console.log("Module is already initialized")
            return false;
        }
        const initializer = new CuiInitializer();
        let pluginList: ICuiPlugin[] = []
        try {

            pluginList = GetPlugins({
                autoLight: true,
                autoPrint: true
            });
        } catch (e) {
            console.error("An error occured during download plugin module");
            console.error(e);
            return false;
        }

        let componentList: ICuiComponent[] = []
        try {

            componentList = GetComponents({
                prefix: data.setup?.prefix
            })
        } catch (e) {
            console.error("An error occured during download components module");
            console.error(e);
            return false;
        }

        let appPlugins = pluginList;
        if (data.plugins) {
            appPlugins = { ...pluginList, ...data.plugins }
        }
        let result = await initializer.init({
            ...data,
            plugins: appPlugins,
            // @ts-ignore already checked
            components: is(data.components) ? [...componentList, ...data.components] : componentList,
        })
        if (result.result) {
            this._isInitialized = true;
            return true;
        } else {
            console.error(`A cUI instance failed to initialize: [${result.message ?? "#"}]`);
        }
        console.log("Cui Light failed to init")
        return false;

    }
}