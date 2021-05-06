import { ICuiComponent, ICuiComponentHandler, ICuiParsable, CuiElement } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { getChildSelectorFromScoped, is } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "src/core/models/arguments";
import { clickExtension, CuiClickModule } from "../extensions/click/click";
import { clickPerformer, ICuiClickPerfromerHook } from "../extensions/click/performer";
import { CuiComponentBaseHook } from "../base";

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

export function CuiSwitcherComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "switcher",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiSwitcherHandler(element, utils, attribute)
        }
    })
}

export class CuiSwitcherHandler extends CuiHandlerBase<CuiSwitcherArgs>  {
    _perfromer: ICuiClickPerfromerHook;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiSwitcherHandler", element, attribute, new CuiSwitcherArgs(), utils);
        this._perfromer = clickPerformer(this.onClickEvent.bind(this));
        this.extend(clickExtension({
            element: element,
            performer: this._perfromer
        }))
    }

    async onHandle(): Promise<boolean> {
        this.handleArguments();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.handleArguments();
        return true;
    }
    async onRemove(): Promise<boolean> {
        return true;
    }

    private handleArguments() {
        this._perfromer.preventDefault(this.args.prevent);
        this._perfromer.stopPropagation(this.args.stopPropagation);
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
            this.log.warning("Switch cannot be performed since component doesn't specify index")
            return;
        }
        this.core.bus.emit(EVENTS.SWITCH, targetCuid, this.args.index);
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

        this.core.bus.emit(EVENTS.SWITCH, targetCuid, targetIndex);
    }
}

