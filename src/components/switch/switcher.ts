import { ICuiComponent, ICuiComponentHandler, ICuiParsable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { getChildSelectorFromScoped, is } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "src/core/models/arguments";
import { CuiClickModule } from "../modules/click/click";

const SWITCHER_LIST_ITEM_SELECTOR = "li > a";

export class CuiSwitcherArgs extends CuiAutoParseArgs implements CuiClickableArgs {

    target: string;
    index: string;
    prevent: boolean;
    stopPropagation: boolean;
    targets: string;
    isList: boolean;

    constructor() {
        super();
        this.index = "";
        this.target = "";
        this.prevent = false;
        this.stopPropagation = false;
        this.targets = SWITCHER_LIST_ITEM_SELECTOR;
        this.isList = false;
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

    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiSwitcherHandler", element, attribute, new CuiSwitcherArgs(), utils);
        this.onClickEvent = this.onClickEvent.bind(this);
        this.addModule(new CuiClickModule(this.element, this.args, this.onClickEvent.bind(this)))
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

    /**
     * Sets current switcher target value
     * 
     */
    getTargetCuid(): string | null {
        let targetId = null;
        if (!is(this.args.target)) {
            targetId = null;
        }

        let target = <CuiElement>(document.querySelector(this.args.target) as any);
        if (is(target)) {
            targetId = target.$cuid;
        }
        return targetId
    }

    onClickEvent(ev: MouseEvent) {
        const targetId = this.getTargetCuid();
        if (!targetId) {
            return;
        }

        if (this.args.isList || this.element.tagName === 'UL') {
            this.handleListClick(ev, targetId)
            return;
        }
        this.handleItemClick(ev, targetId);
    }

    handleItemClick(ev: MouseEvent, targetCuid: string) {
        if (!this.args.index) {
            this._log.warning("Switch cannot be performed since component doesn't specify index")
            return;
        }
        this.utils.bus.emit(EVENTS.SWITCH, targetCuid, this.args.index);
    }

    handleListClick(ev: MouseEvent, targetCuid: string) {
        const currentSelector = getChildSelectorFromScoped(this.args.targets);
        const target = ev.target as HTMLElement;
        if (!target.matches(currentSelector)) {
            return;
        }
        const switcherElements = [...this.element.querySelectorAll(this.args.targets)]
        const targetIndex = switcherElements.findIndex(element => element === ev.target);
        if (targetIndex < 0) {
            return;
        }

        this.utils.bus.emit(EVENTS.SWITCH, targetCuid, targetIndex);
    }
}

