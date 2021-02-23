var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _log;
import { CuiColor } from "../../core/models/colors";
import { is } from "../../core/utils/functions";
import { CuiPropertiesHandler } from "./handler";
import { CuiDevtoolFactory } from "../../core/development/factory";
export class CuiCSSVariablesPlugin {
    constructor(keySetup) {
        this.name = 'css-variables-plugin';
        _log.set(this, void 0);
        this.description = "CuiCSSVariablesPlugin";
        this.setup = keySetup;
        //@ts-ignore
        __classPrivateFieldSet(this, _log, null);
        this.handler = undefined;
    }
    init(utils) {
        this.handler = new CuiPropertiesHandler(utils);
        __classPrivateFieldSet(this, _log, CuiDevtoolFactory.get("CuiCSSVariablesPlugin"));
        utils.bus.on("csschange", this.onCssChange.bind(this));
    }
    destroy() {
    }
    onCssChange(event) {
        if (!this.handler) {
            return;
        }
        let setter = null;
        let accentSetter = null;
        switch (event.method) {
            case "baseFontSize":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseFontSize(event.arg.value, event.arg.unit);
                break;
            case "baseLineHeight":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseLineHeight(event.arg.value, event.arg.unit);
                break;
            case "animationTime":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setAnimationTime(event.arg.value, event.arg.unit);
                break;
            case "animationTimeLong":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setAnimationTimeLong(event.arg.value, event.arg.unit);
                break;
            case "animationTimeShort":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setAnimationTimeShort(event.arg.value, event.arg.unit);
                break;
            case "margin":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseMargin(event.arg.value, event.arg.unit);
                break;
            case "padding":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBasePadding(event.arg.value, event.arg.unit);
                break;
            case "borderRadius":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseBorderRadius(event.arg.value, event.arg.unit);
                break;
            case "componentSpace":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setComponentSpace(event.arg.value, event.arg.unit);
                break;
            case "scrollbarWidth":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setScrollbarWidth(event.arg.value, event.arg.unit);
                break;
            case "accordionIcon":
                if (!is(event.arg))
                    return;
                this.handler.setAccordionIcon(event.arg);
                break;
            case "appLightBackground":
                if (!is(event.arg))
                    return;
                this.handler.setAppBackgroundColor(CuiColor.create(event.arg));
                break;
            case "appDarkBackground":
                if (!is(event.arg))
                    return;
                this.handler.setDarkAppBackgroundColor(CuiColor.create(event.arg));
                break;
            case "appDarkBackground":
                if (!is(event.arg))
                    return;
                this.handler.setDarkAppBackgroundColor(CuiColor.create(event.arg));
                break;
            case "mainColorBackground":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setBackgroundColor(CuiColor.create(event.arg.color));
                break;
            case "mainColor":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setBaseColor(CuiColor.create(event.arg.color));
                break;
            case "mainColorMuted":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setMutedColor(CuiColor.create(event.arg.color));
                break;
            case "mainColorActive":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setActiveColor(CuiColor.create(event.arg.color));
                break;
            case "themeAutoColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setAutoColors(CuiColor.create(event.arg.color));
            case "themeBaseColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setAutoColors(CuiColor.create(event.arg.color));
            case "themeMutedColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setMutedColor(CuiColor.create(event.arg.color));
            case "themeActiveColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setActiveColor(CuiColor.create(event.arg.color));
            case "themeShadeColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setShadeColor(CuiColor.create(event.arg.color));
            case "themeShadeDarkColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setShadeDarkColor(CuiColor.create(event.arg.color));
            default:
                __classPrivateFieldGet(this, _log).warning("Unknown event method", "onCssChange");
        }
    }
    isArgNumber(arg) {
        return is(arg) && is(arg.value);
    }
    isArgColor(arg) {
        return is(arg) && is(arg.palette) && is(arg.color);
    }
    getBaseColorSetter(pallete) {
        if (!this.handler) {
            return undefined;
        }
        let prerp = pallete.trim().toLowerCase();
        switch (prerp) {
            case "light":
                return this.handler.getBaseColorsSetter();
            case "dark":
                return this.handler.getDarkBaseColorsSetter();
        }
    }
    getAccentColorSetter(pallete) {
        if (!this.handler) {
            return undefined;
        }
        let prerp = pallete.trim().toLowerCase();
        switch (prerp) {
            case "accent":
                return this.handler.getAccentThemeColorsSetter();
            case "secondary":
                return this.handler.getSecondaryThemeColorsSetter();
            case "error":
                return this.handler.getErrorThemeColorsSetter();
            case "warning":
                return this.handler.getWarningThemeColorsSetter();
            case "success":
                return this.handler.getSuccessThemeColorsSetter();
            default:
                return undefined;
        }
    }
}
_log = new WeakMap();
