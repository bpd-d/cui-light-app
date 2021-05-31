import { CuiSetupInit } from "../core/models/setup";
import { is } from "../core/utils/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "../core/utils/statics";
import { ICuiComponent, ICuiPlugin } from "../core/models/interfaces";
import {
	CuiAnimationsDefinition,
	SWIPE_ANIMATIONS_DEFINITIONS,
} from "../core/animation/definitions";

export interface CuiInitData {
	plugins?: ICuiPlugin[];
	components?: ICuiComponent[];
	setup?: CuiSetupInit;
	icons?: any;
	swipeAnimations?: CuiAnimationsDefinition;
}

export interface CuiInitResult {
	result: boolean;
	message?: string;
}

async function initIcons(setup: CuiInitData): Promise<string | undefined> {
	if (!is(setup.icons)) {
		return;
	}
	for (let icon in setup.icons) {
		ICONS[icon] = setup.icons[icon];
	}
	return;
}

async function initSwipeAnimations(
	setup: CuiInitData
): Promise<string | undefined> {
	if (!is(setup.swipeAnimations)) {
		return;
	}
	for (let animation in setup.swipeAnimations) {
		SWIPE_ANIMATIONS_DEFINITIONS[animation] =
			setup.swipeAnimations[animation];
	}
	return;
}

function initInstance(root: any, settings: CuiSetupInit) {
	return async (setup: CuiInitData): Promise<string | undefined> => {
		try {
			root[settings.app] = new CuiInstance(
				settings,
				setup.plugins ?? [],
				setup.components ?? []
			);
			await root[settings.app].init();
		} catch (e) {
			console.error(e);
			return e.message;
		}
		return;
	};
}

function checkIfExists(root: any, prefix: string) {
	return async () => {
		if (is(root[prefix])) {
			return "Instance is already initialized";
		}
	};
}

export default async function CuiInitializer(
	setup: CuiInitData
): Promise<CuiInitResult> {
	const _window: any = window;
	let settings: CuiSetupInit = { ...new CuiSetupInit(), ...setup.setup };
	const appPrefix: string = settings.app;
	const result: CuiInitResult = {
		result: false,
	};
	const steps = [
		checkIfExists(_window, appPrefix),
		initIcons,
		initSwipeAnimations,
		initInstance(_window, settings),
	];

	for (let step of steps) {
		const errMsg = await step(setup);
		if (errMsg) {
			result.message = errMsg;
			return result;
		}
	}
	result.result = true;
	return result;
}
