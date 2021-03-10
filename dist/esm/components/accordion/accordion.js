var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prefix, _items, _switchEventId, _targetSelector;
import { CuiHandlerBase } from "../../core/handlers/base";
import { getIntOrDefault, replacePrefix, joinWithScopeSelector, is, getChildSelectorFromScoped } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickModule } from "../modules/click/click";
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
export class CuiAccordionComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix)}-accordion`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiAccordionHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiAccordionHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiAccordionHandler", element, attribute, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        _items.set(this, void 0);
        _switchEventId.set(this, void 0);
        _targetSelector.set(this, void 0);
        __classPrivateFieldSet(this, _switchEventId, null);
        __classPrivateFieldSet(this, _items, []);
        __classPrivateFieldSet(this, _switchEventId, null);
        __classPrivateFieldSet(this, _targetSelector, "");
        this.addModule(new CuiClickModule(element, this.args, this.onElementClick.bind(this)));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _switchEventId, this.onEvent(EVENTS.SWITCH, this.onSwitch.bind(this)));
            __classPrivateFieldSet(this, _targetSelector, getChildSelectorFromScoped(this.args.selector));
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _targetSelector, getChildSelectorFromScoped(this.args.selector));
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.detachEvent(EVENTS.SWITCH, __classPrivateFieldGet(this, _switchEventId));
            return true;
        });
    }
    switch(index) {
        return __awaiter(this, void 0, void 0, function* () {
            this._log.debug("Switch to: " + index);
            if (index < 0 || this.isLocked || !this.isInitialized) {
                return false;
            }
            __classPrivateFieldSet(this, _items, this.queryItems());
            if (__classPrivateFieldGet(this, _items).length <= index) {
                return false;
            }
            this.isLocked = true;
            const current = __classPrivateFieldGet(this, _items)[index];
            this.openCloseTarget(index, current);
            this.emitEvent(EVENTS.SWITCHED, {
                index: index,
                currentTarget: current,
                previousTarget: null,
                previous: -1
            });
            this.isLocked = false;
            return true;
        });
    }
    openCloseTarget(index, target) {
        if (this.helper.hasClass(this.activeClassName, target)) {
            this.helper.removeClassesAs(target, this.activeClassName);
        }
        else {
            this.mutate(() => {
                if (this.args.single) {
                    this.closeAllExcept(index);
                }
                this.helper.setClass(this.activeClassName, target);
            });
        }
    }
    onSwitch(index) {
        this.switch(getIntOrDefault(index, -1)).then(() => {
            this._log.debug("Switch from event to " + index);
        });
    }
    closeAllExcept(current) {
        __classPrivateFieldGet(this, _items).forEach((item, index) => {
            if (current !== index && this.helper.hasClass(this.activeClassName, item)) {
                item.classList.remove(this.activeClassName);
            }
        });
    }
    onElementClick(ev) {
        let target = ev.target;
        if (target.matches(__classPrivateFieldGet(this, _targetSelector))) {
            this.fetch(() => {
                let triggers = [...this.element.querySelectorAll(this.args.selector)];
                if (!is(triggers)) {
                    return;
                }
                let foundIndex = triggers.findIndex(trigger => trigger === target);
                if (foundIndex >= 0) {
                    this.switch(foundIndex);
                }
            });
        }
    }
    queryItems() {
        return [...this.element.querySelectorAll(this.args.items)];
    }
}
_items = new WeakMap(), _switchEventId = new WeakMap(), _targetSelector = new WeakMap();
