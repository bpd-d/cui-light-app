var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is } from "../../core/utils/functions";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
export class CuiIconArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            main: 'icon'
        });
        this.icon = "";
        this.scale = 1;
    }
}
export function CuiIconComponent(prefix) {
    return CuiComponentBaseHook({
        name: 'icon',
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new CuiIconHandler(element, utils, attribute);
        }
    });
}
export class CuiIconHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiIconHandler", element, attribute, new CuiIconArgs(), utils);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addIcon(this.args.icon);
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.prevArgs || this.args.icon === this.prevArgs.icon) {
                return false;
            }
            this.addIcon(this.args.icon);
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            const svg = this.element.querySelector('svg');
            if (is(svg)) {
                //@ts-ignore checked
                svg.remove();
            }
            return true;
        });
    }
    addIcon(icon) {
        const iconStr = icon ? ICONS[icon] : null;
        if (!iconStr) {
            return;
        }
        const iconSvg = new IconBuilder(iconStr).setScale(this.args.scale).build();
        const svg = this.element.querySelector('svg');
        if (is(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        if (this.element.childNodes.length > 0) {
            this._interactions.mutate(this.insertBefore, iconSvg);
            return;
        }
        this._interactions.mutate(this.appendChild, iconSvg);
    }
    insertBefore(iconElement) {
        this.element.insertBefore(iconElement, this.element.firstChild);
    }
    appendChild(iconElement) {
        this.element.appendChild(iconElement);
    }
}
