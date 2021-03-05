import { ICuiComponent, ICuiComponentHandler, ICuiParsable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { is } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

const SWITCHER_LIST_ITEM_SELECTOR = "li > a";

export class CuiSwitcherArgs extends CuiAutoParseArgs implements ICuiParsable {

    target: string;
    index: string;

    constructor() {
        super();
        this.index = "";
        this.target = "";
    }

}

export class CuiSwitcherComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-switcher`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSwitcherHandler(element, utils, this.attribute);
    }
}

export class CuiSwitcherHandler extends CuiHandlerBase<CuiSwitcherArgs>  {
    #targetId: string | null;
    #isList: boolean;
    #listeners: ((ev: MouseEvent) => void)[];
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiSwitcherHandler", element, attribute, new CuiSwitcherArgs(), utils);
        this.#targetId = null;
        this.#isList = element.tagName === 'UL';
        this.onClickEvent = this.onClickEvent.bind(this);
        this.#listeners = [];
    }

    async onHandle(): Promise<boolean> {
        this.setEvents();
        this.getTarget();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.getTarget();
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.removeEvents();
        return true;
    }

    getTarget() {
        if (!is(this.args.target)) {
            this.#targetId = null;
        }

        let target = <CuiElement>(document.querySelector(this.args.target) as any);
        if (is(target)) {
            this.#targetId = target.$cuid;
        }
    }

    setEvents() {
        if (this.#isList) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el: Element, index: number) => {
                let list = this.onListItemClick.bind(this, index)
                this.#listeners.push(list)
                //@ts-ignore
                el.addEventListener('click', list)
            })
        } else {
            this.element.addEventListener('click', this.onClickEvent)
        }
    }

    removeEvents() {
        if (this.#isList) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el: Element, index: number) => {
                if (this.#listeners.length > index)
                    //@ts-ignore
                    el.removeEventListener('click', this.#listeners[index])
            })
            this.#listeners = [];
        } else {
            this.element.removeEventListener('click', this.onClickEvent);
        }
    }

    onClickEvent(ev: MouseEvent) {
        this.getTarget();
        if (!is(this.args.index)) {
            return;
        }
        this.onClick(this.args.index.trim());
    }

    onListItemClick(index: number, ev: MouseEvent) {
        this.getTarget();
        this.onClick(index);
    }

    onClick(index: any) {
        if (!is(this.#targetId)) {
            return;
        }
        //@ts-ignore  targetId checked already
        this.utils.bus.emit(EVENTS.SWITCH, this.#targetId, index);
    }

}