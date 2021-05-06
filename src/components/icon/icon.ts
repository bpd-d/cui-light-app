import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is } from "../../core/utils/functions";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getCuiHandlerInteractions, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";

export class CuiIconArgs extends CuiAutoParseArgs {
    icon: string;
    scale: number;

    constructor() {
        super({
            main: 'icon'
        });
        this.icon = "";
        this.scale = 1;
    }
}

export function CuiIconComponent(prefix?: string) {
    return CuiComponentBaseHook({
        name: 'icon',
        prefix: prefix,
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiIconHandler(element, utils, attribute);
        }
    })
}



export class CuiIconHandler extends CuiHandlerBase<CuiIconArgs> {

    private _interactions: ICuiInteractionsFacade;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiIconHandler", element, attribute, new CuiIconArgs(), utils);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);

    }

    async onHandle(): Promise<boolean> {
        this.addIcon(this.args.icon);
        return true;
    }

    async onRefresh(): Promise<boolean> {
        if (!this.prevArgs || this.args.icon === this.prevArgs.icon) {
            return false;
        }

        this.addIcon(this.args.icon);
        return true;
    }

    async onRemove(): Promise<boolean> {
        const svg = this.element.querySelector('svg')
        if (is(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        return true;
    }

    private addIcon(icon: string) {
        const iconStr = icon ? ICONS[icon] : null;
        if (!iconStr) {
            return;
        }
        const iconSvg = new IconBuilder(iconStr).setScale(this.args.scale).build();
        const svg = this.element.querySelector('svg')
        if (is(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        if (this.element.childNodes.length > 0) {
            this._interactions.mutate(this.insertBefore, iconSvg)
            return;
        }
        this._interactions.mutate(this.appendChild, iconSvg)

    }

    private insertBefore(iconElement: Element) {
        this.element.insertBefore(iconElement, this.element.firstChild);
    }

    private appendChild(iconElement: Element) {
        this.element.appendChild(iconElement);
    }
}
