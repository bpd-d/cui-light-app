import { ICuiPlugin, ICuiComponent } from "../core/models/interfaces";
import { is } from "../core/utils/functions";
import { CuiInitData, CuiInitializer } from "./initializer";
import { GetComponents } from "../components/module";
import { GetPlugins } from "../plugins/module"


export class CuiInit {
    #isInitialized: boolean;
    constructor() {
        this.#isInitialized = false;
    }

    async init(data: CuiInitData): Promise<boolean> {
        if (this.#isInitialized) {
            console.log("Module is already initialized")
            return false;
        }
        const initializer = new CuiInitializer();
        const pluginList: ICuiPlugin[] = GetPlugins({
            autoLight: true,
            autoPrint: true
        });

        const componentList: ICuiComponent[] = GetComponents({
            prefix: data.setup?.prefix
        })
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
            this.#isInitialized = true;
            return true;
        } else {
            console.error(`A cUI instance failed to initialize: [${result.message ?? "#"}]`);
        }
        console.log("Cui Light failed to init")
        return false;

    }
}