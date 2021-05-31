var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiSetupInit } from "../core/models/setup";
import { is } from "../core/utils/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "../core/utils/statics";
import { SWIPE_ANIMATIONS_DEFINITIONS, } from "../core/animation/definitions";
function initIcons(setup) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!is(setup.icons)) {
            return;
        }
        for (let icon in setup.icons) {
            ICONS[icon] = setup.icons[icon];
        }
        return;
    });
}
function initSwipeAnimations(setup) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!is(setup.swipeAnimations)) {
            return;
        }
        for (let animation in setup.swipeAnimations) {
            SWIPE_ANIMATIONS_DEFINITIONS[animation] =
                setup.swipeAnimations[animation];
        }
        return;
    });
}
function initInstance(root, settings) {
    return (setup) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            root[settings.app] = new CuiInstance(settings, (_a = setup.plugins) !== null && _a !== void 0 ? _a : [], (_b = setup.components) !== null && _b !== void 0 ? _b : []);
            yield root[settings.app].init();
        }
        catch (e) {
            console.error(e);
            return e.message;
        }
        return;
    });
}
function checkIfExists(root, prefix) {
    return () => __awaiter(this, void 0, void 0, function* () {
        if (is(root[prefix])) {
            return "Instance is already initialized";
        }
    });
}
export default function CuiInitializer(setup) {
    return __awaiter(this, void 0, void 0, function* () {
        const _window = window;
        let settings = Object.assign(Object.assign({}, new CuiSetupInit()), setup.setup);
        const appPrefix = settings.app;
        const result = {
            result: false,
        };
        const steps = [
            checkIfExists(_window, appPrefix),
            initIcons,
            initSwipeAnimations,
            initInstance(_window, settings),
        ];
        for (let step of steps) {
            const errMsg = yield step(setup);
            if (errMsg) {
                result.message = errMsg;
                return result;
            }
        }
        result.result = true;
        return result;
    });
}
