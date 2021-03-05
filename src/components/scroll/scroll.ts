import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { is, getOffsetTop, are, getEnumOrDefault } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

export class CuiScrollArgs extends CuiAutoParseArgs implements ICuiParsable {
    target: string;
    parent: string;
    behavior: 'auto' | 'smooth';

    constructor() {
        super({
            props: {
                "behavior": { corrector: (value: string) => getEnumOrDefault(value, 'auto', 'smooth') }
            }
        });
        this.target = "";
        this.parent = "";
        this.behavior = 'auto';
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
    #parent: HTMLElement | null;
    #target: HTMLElement | null;

    #onClickBound: (ev: MouseEvent) => void;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiScrollHandler", element, attribute, new CuiScrollArgs(), utils);
        this.element = element;
        this.#parent = null;
        this.#target = null;

        this.#onClickBound = this.onClick.bind(this);
    }

    async onHandle(): Promise<boolean> {
        this.element.addEventListener('click', this.#onClickBound);
        this.setTargets();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.setTargets();
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.element.removeEventListener('click', this.#onClickBound);
        return true;
    }

    onClick(ev: MouseEvent) {
        if (!are(this.#target, this.#parent)) {
            return;
        }
        //@ts-ignore
        let to = getOffsetTop(this.#target) - this.#parent.offsetTop;
        //@ts-ignore
        let from = this.#parent.scrollTop;
        let by = to - from;
        //@ts-ignore
        this.#parent.scrollBy({
            top: by,
            behavior: this.args.behavior
        });
        this.emitEvent(EVENTS.ON_SCROLL, {
            to: to,
            by: by,
            //@ts-ignore
            target: this.#target,
            //@ts-ignore
            parent: this.#parent,
            timestamp: Date.now(),
        })
        ev.preventDefault();
    }

    private setTargets(): void {
        this.#target = is(this.args.target) ? document.querySelector(this.args.target) as HTMLElement : null;
        if (is(this.#target)) {
            // @ts-ignore target is set
            this.#parent = is(this.args.parent) ? document.querySelector(this.args.parent) : this.#target.parentElement;
        }
    }
}

