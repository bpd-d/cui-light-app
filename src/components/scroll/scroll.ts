import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { is, getOffsetTop, getEnumOrDefault } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { clickExtension } from "../extensions/click/click";
import { CuiClickableArgs } from "../../core/models/arguments";
import { CuiScrollByEvent } from "../../core/models/events";
import { getEventBusFacade, ICuiEventBusFacade } from "../../core/handlers/extensions/facades";
import { clickPerformer, ICuiClickPerfromerHook } from "../extensions/click/performer";
import { CuiComponentBaseHook } from "../base";


/**
 * Component scrolls to specified target in the document
 * Arguments:
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 *
 */

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


export function CuiScrollComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scroll",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiScrollHandler(element, utils, attribute);
        }
    })
}

export class CuiScrollHandler extends CuiHandlerBase<CuiScrollArgs> {

    private _busFacade: ICuiEventBusFacade;
    private _clickPerformer: ICuiClickPerfromerHook;

    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiScrollHandler", element, attribute, new CuiScrollArgs(), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._clickPerformer = clickPerformer(this.onClick.bind(this));
        this.extend(clickExtension({
            element: element,
            performer: this._clickPerformer
        }));
    }

    async onHandle(): Promise<boolean> {
        this.handleUpdate();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.handleUpdate();
        return true;
    }
    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
    }

    handleUpdate() {
        this._clickPerformer.preventDefault(this.args.prevent);
        this._clickPerformer.stopPropagation(this.args.stopPropagation);
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

        this._busFacade.emit<CuiScrollByEvent>(EVENTS.ON_SCROLL, {
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

