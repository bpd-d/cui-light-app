import { EVENTS } from "../../core/utils/statics";
import { CuiCore } from "../../core/models/core";
import { CuiToastHandler } from "./handler";
import { CuiPlugin, getPluginEventExtension } from "../base";
import { ICuiPlugin } from "src/core/models/interfaces";

export interface CuiToastPluginSetup {}

export function CuiToastPlugin(setup?: CuiToastPluginSetup): ICuiPlugin {
	const name: string = "toast-plugin";

	return new CuiPlugin({
		name: name,
		description: "CuiToastPlugin",
		setup: setup ?? {},
		callback: (utils: CuiCore) => {
			const toastHandler = new CuiToastHandler(
				utils.interactions,
				utils.setup.prefix,
				utils.setup.animationTime ?? 300
			);

			function onToast(message: string) {
				if (!toastHandler) {
					return;
				}
				utils.bus.emit(EVENTS.TOAST_SHOW, null, []);
				toastHandler.show(message).then(() => {
					if (utils) utils.bus.emit(EVENTS.TOAST_HIDDEN, null, []);
				});
			}

			return [
				[
					getPluginEventExtension({
						name: EVENTS.TOAST,
						id: name,
						callback: onToast,
					}),
				],
				undefined,
			];
		},
	});
}
