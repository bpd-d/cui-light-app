import { CuiSetupInit } from "../core/models/setup";
import { is } from "../core/utils/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "../core/utils/statics";
import { ICuiComponent, ICuiPlugin } from "../core/models/interfaces";
import { CuiAnimationsDefinition, SWIPE_ANIMATIONS_DEFINITIONS } from "../core/animation/definitions";

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

export class CuiInitializer {
    private _window: any;
    constructor() {
        this._window = window;
    }

    async init(setup: CuiInitData): Promise<CuiInitResult> {
        let settings: CuiSetupInit = { ... new CuiSetupInit(), ...setup.setup }
        const appPrefix: string = settings.app;
        const result: CuiInitResult = {
            result: false
        }
        if (is(this._window[appPrefix])) {
            result.message = "Instance is already initialized";
            return result;
        }
        if (is(setup.icons)) {
            for (let icon in setup.icons) {
                ICONS[icon] = setup.icons[icon];
            }
        }
        if (is(setup.swipeAnimations)) {
            for (let animation in setup.swipeAnimations) {
                SWIPE_ANIMATIONS_DEFINITIONS[animation] = setup.swipeAnimations[animation];
            }

        }
        try {
            this._window[appPrefix] = new CuiInstance(settings, setup.plugins ?? [], setup.components ?? [])
            await this._window[appPrefix].init();
        } catch (e) {
            console.error(e);
            result.message = "An error occured during initialization";
            return result;
        }
        result.result = true;
        return result;
    }
}