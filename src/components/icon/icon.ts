import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is } from "../../core/utils/functions";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

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

export class CuiIconComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-icon`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiIconHandler(element, utils, this.attribute);
    }
}



export class CuiIconHandler extends CuiHandlerBase<CuiIconArgs> {

    #currentIcon: string | null;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiIconHandler", element, attribute, new CuiIconArgs(), utils);
        this.#currentIcon = null;
    }

    async onHandle(): Promise<boolean> {
        if (this.#currentIcon !== null) {
            this._log.debug("Icon already initialized")
            return false;
        }
        this.#currentIcon = this.args.icon;
        this.addIcon(this.args.icon)

        return true;
    }

    async onRefresh(): Promise<boolean> {
        if (this.args.icon === this.#currentIcon) {
            return false;
        }
        this.#currentIcon = this.args.icon;
        this.addIcon(this.args.icon);
        return true;
    }

    async onRemove(): Promise<boolean> {
        const svg = this.element.querySelector('svg')
        if (is(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        this.#currentIcon = null;
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
            this.mutate(this.insertBefore, iconSvg)
            return;
        }
        this.mutate(this.appendChild, iconSvg)

    }

    private insertBefore(iconElement: Element) {
        this.element.insertBefore(iconElement, this.element.firstChild);
    }

    private appendChild(iconElement: Element) {
        this.element.appendChild(iconElement);
    }
}
