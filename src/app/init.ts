import { ICuiPlugin, ICuiComponent } from "../core/models/interfaces";
import { is } from "../core/utils/functions";
import CuiInitializer, { CuiInitData } from "./initializer";
import { GetPlugins } from "../plugins/module";
import { GetComponents } from "../components/module";

export async function init(data: CuiInitData): Promise<boolean> {
	let pluginList: ICuiPlugin[] = [];
	try {
		pluginList = GetPlugins({
			autoLight: true,
			autoPrint: true,
		});
	} catch (e) {
		console.error("An error occured during download plugin module", e);
		return false;
	}

	let componentList: ICuiComponent[] = [];
	try {
		componentList = GetComponents({
			prefix: data.setup?.prefix,
		});
	} catch (e) {
		console.error("An error occured during download components module", e);
		return false;
	}

	let appPlugins = pluginList;
	if (data.plugins) {
		appPlugins = { ...pluginList, ...data.plugins };
	}
	let result = await CuiInitializer({
		...data,
		plugins: appPlugins,

		components: is(data.components)
			? // @ts-ignore already checked
			  [...componentList, ...data.components]
			: componentList,
	});
	if (result.result) {
		return true;
	}
	console.error(
		`A cUI instance failed to initialize: [${result.message ?? "#"}]`
	);
	return false;
}
