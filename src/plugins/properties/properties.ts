import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiColor } from "../../core/models/colors";
import { is } from "../../core/utils/functions";
import { CuiPropertiesHandler } from "./handler";
import { ICuiDevelopmentTool } from "../../core/development/interfaces";
import { CuiDevtoolFactory } from "../../core/development/factory";
export interface CssChangeEvent {
    method: string,
    arg: any
}
export interface CuiCSSVariablesPluginSetup {

}

export class CuiCSSVariablesPlugin implements ICuiPlugin {
    description: string;
    name: string = 'css-variables-plugin';
    setup: CuiCSSVariablesPluginSetup;
    handler: CuiPropertiesHandler | undefined;
    #log: ICuiDevelopmentTool;
    constructor(keySetup: CuiCSSVariablesPluginSetup) {
        this.description = "CuiCSSVariablesPlugin";
        this.setup = keySetup;
        //@ts-ignore
        this.#log = null;
        this.handler = undefined;

    }

    init(utils: CuiUtils): void {
        this.handler = new CuiPropertiesHandler(utils);
        this.#log = CuiDevtoolFactory.get("CuiCSSVariablesPlugin");
        utils.bus.on("csschange", this.onCssChange.bind(this))
    }

    destroy(): void {

    }

    onCssChange(event: CssChangeEvent) {
        if (!this.handler) {
            return;
        }
        let setter = null;
        let accentSetter = null;

        switch (event.method) {
            case "baseFontSize":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setBaseFontSize(event.arg.value, event.arg.unit);
                break;
            case "baseLineHeight":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setBaseLineHeight(event.arg.value, event.arg.unit);
                break;
            case "animationTime":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setAnimationTime(event.arg.value, event.arg.unit);
                break;
            case "animationTimeLong":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setAnimationTimeLong(event.arg.value, event.arg.unit);
                break;
            case "animationTimeShort":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setAnimationTimeShort(event.arg.value, event.arg.unit);
                break;
            case "margin":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setBaseMargin(event.arg.value, event.arg.unit);
                break;
            case "padding":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setBasePadding(event.arg.value, event.arg.unit);
                break;
            case "borderRadius":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setBaseBorderRadius(event.arg.value, event.arg.unit);
                break;
            case "componentSpace":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setComponentSpace(event.arg.value, event.arg.unit);
                break;
            case "scrollbarWidth":
                if (!this.isArgNumber(event.arg)) return;
                this.handler.setScrollbarWidth(event.arg.value, event.arg.unit);
                break;
            case "accordionIcon":
                if (!is(event.arg)) return;
                this.handler.setAccordionIcon(event.arg);
                break;
            case "appLightBackground":
                if (!is(event.arg)) return;
                this.handler.setAppBackgroundColor(CuiColor.create(event.arg));
                break;
            case "appDarkBackground":
                if (!is(event.arg)) return;
                this.handler.setDarkAppBackgroundColor(CuiColor.create(event.arg));
                break;
            case "appDarkBackground":
                if (!is(event.arg)) return;
                this.handler.setDarkAppBackgroundColor(CuiColor.create(event.arg));
                break;
            case "mainColorBackground":
                if (!this.isArgColor(event.arg)) return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setBackgroundColor(CuiColor.create(event.arg.color))
                break;
            case "mainColor":
                if (!this.isArgColor(event.arg)) return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setBaseColor(CuiColor.create(event.arg.color))
                break;
            case "mainColorMuted":
                if (!this.isArgColor(event.arg)) return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setMutedColor(CuiColor.create(event.arg.color))
                break;
            case "mainColorActive":
                if (!this.isArgColor(event.arg)) return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setActiveColor(CuiColor.create(event.arg.color))
                break;
            case "themeAutoColor":
                if (!this.isArgColor(event.arg)) return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setAutoColors(CuiColor.create(event.arg.color))
            case "themeBaseColor":
                if (!this.isArgColor(event.arg)) return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setAutoColors(CuiColor.create(event.arg.color))
            case "themeMutedColor":
                if (!this.isArgColor(event.arg)) return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setMutedColor(CuiColor.create(event.arg.color))
            case "themeActiveColor":
                if (!this.isArgColor(event.arg)) return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setActiveColor(CuiColor.create(event.arg.color))

            case "themeShadeColor":
                if (!this.isArgColor(event.arg)) return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setShadeColor(CuiColor.create(event.arg.color))
            case "themeShadeDarkColor":
                if (!this.isArgColor(event.arg)) return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setShadeDarkColor(CuiColor.create(event.arg.color))
            default:
                this.#log.warning("Unknown event method", "onCssChange");
        }
    }

    private isArgNumber(arg: any): boolean {
        return is(arg) && is(arg.value);
    }

    private isArgColor(arg: any) {
        return is(arg) && is(arg.palette) && is(arg.color);
    }

    private getBaseColorSetter(pallete: string) {
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

    private getAccentColorSetter(pallete: string) {
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
