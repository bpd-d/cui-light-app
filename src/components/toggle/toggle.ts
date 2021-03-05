import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

export class CuiToggleArgs extends CuiAutoParseArgs {
    target: string;
    action: string;
    constructor() {
        super({
            main: "action"
        });
        this.action = "";
        this.target = "";
    }
}

export class CuiToggleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? "cui"}-toggle`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiToggleHandler(element, utils, this.attribute);
    }
}

export class CuiToggleHandler extends CuiHandlerBase<CuiToggleArgs> {

    #target: Element;
    #utils: CuiUtils;
    #toggleEventId: string | null;
    #actions: ICuiComponentAction[];
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiToggleHandler", element, attribute, new CuiToggleArgs(), utils);
        this.#target = this.element;
        this.#utils = utils;
        this.#toggleEventId = null;
        this.#actions = [];
        this.onClick = this.onClick.bind(this);
    }

    async onHandle(): Promise<boolean> {
        this.#target = this.getTarget();
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.element.addEventListener('click', this.onClick);
        this.#toggleEventId = this.onEvent(EVENTS.TOGGLE, this.toggle.bind(this));
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.#target = this.getTarget();
        this.#actions = CuiActionsListFactory.get(this.args.action);
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.element.removeEventListener('click', this.onClick);
        this.detachEvent(EVENTS.TOGGLE, this.#toggleEventId);
        return true;
    }

    toggle() {
        if (!this.#target) {
            this.logError("Target in not provided", "toggle");
            return;
        }
        this.#actions.forEach(action => action.toggle(this.#target, this.#utils));
        this.emitEvent(EVENTS.TOGGLED, {
            action: this.args.action,
            target: this.#target,
            timestamp: Date.now()
        })
    }

    onClick(ev: MouseEvent) {
        this.toggle();
        ev.preventDefault();
    }

    getTarget(): Element {
        if (!this.args.target) {
            return this.element;
        }
        return document.querySelector(this.args.target) ?? this.element;
    }
}