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
import { getChildSelectorFromScoped, is } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { clickExtension } from "../extensions/click/click";
import { clickPerformer } from "../extensions/click/performer";
import { CuiComponentBaseHook } from "../base";
const SWITCHER_LIST_ITEM_SELECTOR = "li > a";
export class CuiSwitcherArgs extends CuiAutoParseArgs {
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
export function CuiSwitcherComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "switcher",
        create: (element, utils, prefix, attribute) => {
            return new CuiSwitcherHandler(element, utils, attribute);
        }
    });
}
export class CuiSwitcherHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiSwitcherHandler", element, attribute, new CuiSwitcherArgs(), utils);
        this._perfromer = clickPerformer(this.onClickEvent.bind(this));
        this.extend(clickExtension({
            element: element,
            performer: this._perfromer
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleArguments();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleArguments();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    handleArguments() {
        this._perfromer.preventDefault(this.args.prevent);
        this._perfromer.stopPropagation(this.args.stopPropagation);
    }
    /**
     * Sets current switcher target value
     *
     */
    getTargetCuid() {
        let targetId = null;
        if (!is(this.args.target)) {
            targetId = null;
        }
        let target = document.querySelector(this.args.target);
        if (is(target)) {
            targetId = target.$cuid;
        }
        return targetId;
    }
    onClickEvent(ev) {
        const targetId = this.getTargetCuid();
        if (!targetId) {
            return;
        }
        if (this.args.isList || this.element.tagName === 'UL') {
            this.handleListClick(ev, targetId);
            return;
        }
        this.handleItemClick(ev, targetId);
    }
    handleItemClick(ev, targetCuid) {
        if (!this.args.index) {
            this.log.warning("Switch cannot be performed since component doesn't specify index");
            return;
        }
        this.core.bus.emit(EVENTS.SWITCH, targetCuid, this.args.index);
    }
    handleListClick(ev, targetCuid) {
        const currentSelector = getChildSelectorFromScoped(this.args.targets);
        const target = ev.target;
        if (!target.matches(currentSelector)) {
            return;
        }
        const switcherElements = [...this.element.querySelectorAll(this.args.targets)];
        const targetIndex = switcherElements.findIndex(element => element === ev.target);
        if (targetIndex < 0) {
            return;
        }
        this.core.bus.emit(EVENTS.SWITCH, targetCuid, targetIndex);
    }
}
