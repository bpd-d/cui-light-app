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
import { replacePrefix, joinWithScopeSelector, getChildSelectorFromScoped, calculateNextIndex, queryAll } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { clickExtension } from "../extensions/click/click";
import { getCuiHandlerInteractions, getEventBusFacade } from "../../core/handlers/extensions/facades";
import { CuiComponentBaseHook } from "../base";
import { callbackPerformer } from "../extensions/performers";
import { eventExtension } from "../extensions/event/event";
const ACCORDION_TITLE_CLS = '> * > .{prefix}-accordion-title';
const ACCORDION_ITEMS_CLS = '> *';
export class CuiAccordionArgs extends CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "items": { corrector: joinWithScopeSelector },
            }
        });
        this.animation = false;
        this.single = false;
        this.selector = joinWithScopeSelector(replacePrefix(ACCORDION_TITLE_CLS, prefix));
        this.items = joinWithScopeSelector(replacePrefix(ACCORDION_ITEMS_CLS, prefix));
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.prevent = false;
        this.stopPropagation = false;
    }
}
export function CuiAccordionComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "accordion",
        create: (element, utils, prefix, attribute) => {
            return new CuiAccordionHandler(element, utils, attribute, prefix);
        }
    });
}
export class CuiAccordionHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiAccordionHandler", element, attribute, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        //   this._items = [];
        this._currentIndex = -1;
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, this.element);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
        this.extend(clickExtension({
            element: element,
            performer: callbackPerformer(this.onElementClick.bind(this))
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.SWITCH,
            performer: callbackPerformer(this.switch.bind(this), { ignoreEmpty: true })
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this._currentIndex = this.getOpenedIndex(this.queryItems());
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    switch(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lock()) {
                return false;
            }
            this.log.debug("Switch to: " + index);
            const items = this.queryItems();
            const nextIdx = calculateNextIndex(index, this._currentIndex, items.length);
            if (nextIdx < 0) {
                return false;
            }
            const current = items[nextIdx];
            this._interactions.mutate(this.updateTargets, nextIdx, current, items);
            this._currentIndex = nextIdx;
            this._busFacade.emit(EVENTS.SWITCHED, {
                index: index,
                currentTarget: current,
                previousTarget: null,
                previous: -1
            });
            this.unlock();
            return true;
        });
    }
    /**
     * Toggles target and closes not needed is setup allows for that
     * @param index - current index to remain opened
     * @param target - target to toggle
     * @param targets - all targets
     */
    updateTargets(index, target, targets) {
        if (this.toggleTarget(target) && this.args.single) {
            this.closeAllExcept(index, targets);
        }
    }
    /**
     * Sets or remove active class on target
     * @param target target to toggle
     * @returns Whethet target was opened or not
     */
    toggleTarget(target) {
        if (this.classes.hasClass(this.activeClassName, target)) {
            this.classes.removeClass(this.activeClassName, target);
            return false;
        }
        this.classes.setClass(this.activeClassName, target);
        return true;
    }
    /**
     * Closes all targets except the one that should remain opened
     * @param currentIndex index of current target - to remain opened
     * @param targets - list of targets to operate on
     */
    closeAllExcept(currentIndex, targets) {
        targets.forEach((item, index) => {
            if (currentIndex !== index && this.classes.hasClass(this.activeClassName, item)) {
                item.classList.remove(this.activeClassName);
            }
        });
    }
    /**
     * Handles element click
     * @param ev
     */
    onElementClick(ev) {
        const target = ev.target;
        const selector = getChildSelectorFromScoped(this.args.selector);
        if (target.matches(selector)) {
            this._interactions.fetch(() => {
                const foundIdx = this.findMatchingTrigger(target);
                if (foundIdx > -1) {
                    this.switch(foundIdx);
                }
            });
        }
    }
    /**
     * Finds match
     * @param target
     * @returns index of matching element or -1
     */
    findMatchingTrigger(target) {
        let triggers = queryAll(this.element, this.args.selector);
        return triggers.findIndex(trigger => trigger === target);
    }
    queryItems() {
        return queryAll(this.element, this.args.items);
    }
    getOpenedIndex(items) {
        return items.findIndex(item => { this.classes.hasClass(this.activeClassName, item); });
    }
}
