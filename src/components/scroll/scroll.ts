import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { is, getOffsetTop, are, getEnumOrDefault } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickModule } from "../modules/click/click";
import { CuiClickableArgs } from "src/core/models/arguments";
import { CuiScrollByEvent } from "src/core/models/events";

export class CuiScrollArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    parent: string;
    behavior: 'auto' | 'smooth';
    prevent: boolean;
    stopPropagation: boolean;

    constructor() {
        super({
            props: {
                "behavior": { corrector: (value: string) => getEnumOrDefault(value, 'auto', 'smooth') }
            }
        });
        this.target = "";
        this.parent = "";
        this.behavior = 'auto';
        this.stopPropagation = false;
        this.prevent = false;
    }

}


/**
 * Component scrolls to specified target in the document
 * Arguments: 
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 * 
 */

export class CuiScrollComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = is(prefix) ? prefix + 'scroll' : 'cui-scroll';
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiScrollHandler(element, utils, this.attribute);
    }
}

export interface CuiScrollAttribute {
    target?: string;
    parent?: string;
    behavior?: 'auto' | 'smooth';
}



export class CuiScrollHandler extends CuiHandlerBase<CuiScrollArgs> {

    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiScrollHandler", element, attribute, new CuiScrollArgs(), utils);

        this.addModule(new CuiClickModule(this.element, this.args, this.onClick.bind(this)));
    }

    async onHandle(): Promise<boolean> {
        return true;
    }
    async onRefresh(): Promise<boolean> {
        return true;
    }
    async onRemove(): Promise<boolean> {
        return true;
    }

    onClick(ev: MouseEvent) {
        const target = this.getTarget();
        const parent = this.getTargetsParent(target);

        if (!target || !parent) {
            return;
        }

        let to = getOffsetTop(target) - parent.offsetTop;
        let from = parent.scrollTop;
        let by = to - from;

        parent.scrollBy({
            top: by,
            behavior: this.args.behavior
        });

        this.emitEvent<CuiScrollByEvent>(EVENTS.ON_SCROLL, {
            to: to,
            by: by,
            target: target,
            parent: parent
        })
    }

    private getTarget(): HTMLElement | null {
        return is(this.args.target) ? document.querySelector<HTMLElement>(this.args.target) : null;
    }

    private getTargetsParent(target: HTMLElement | null): HTMLElement | null {
        return is(this.args.parent) ? document.querySelector(this.args.parent) : target ? target.parentElement : null;
    }
}

