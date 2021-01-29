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
var _defTitleSelector, _defItemsSelector, _defTimeout, _prefix, _items, _targets, _switchEventId;
import { CuiMutableHandler } from "../../core/handlers/base";
import { getIntOrDefault, is, isStringTrue, replacePrefix, getStringOrDefault } from "../../core/utils/functions";
import { EVENTS, SCOPE_SELECTOR } from "../../core/utils/statics";
const ACCORDION_TITLE_CLS = '> * > .{prefix}-accordion-title';
const ACCORDION_ITEMS_CLS = '> *';
export class CuiAccordionArgs {
    constructor(prefix, timeout) {
        _defTitleSelector.set(this, void 0);
        _defItemsSelector.set(this, void 0);
        _defTimeout.set(this, void 0);
        __classPrivateFieldSet(this, _defTitleSelector, replacePrefix(ACCORDION_TITLE_CLS, prefix));
        __classPrivateFieldSet(this, _defItemsSelector, replacePrefix(ACCORDION_ITEMS_CLS, prefix));
        this.animation = false;
        __classPrivateFieldSet(this, _defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        this.single = false;
        this.selector = SCOPE_SELECTOR + __classPrivateFieldGet(this, _defTitleSelector);
        this.items = SCOPE_SELECTOR + __classPrivateFieldGet(this, _defItemsSelector);
        this.timeout = __classPrivateFieldGet(this, _defTimeout);
    }
    parse(args) {
        if (is(args)) {
            this.single = isStringTrue(args.single);
            this.selector = SCOPE_SELECTOR + getStringOrDefault(args.selector, __classPrivateFieldGet(this, _defTitleSelector));
            this.items = SCOPE_SELECTOR + getStringOrDefault(args.content, __classPrivateFieldGet(this, _defItemsSelector));
            this.timeout = getIntOrDefault(args.timeout, __classPrivateFieldGet(this, _defTimeout));
            this.animation = isStringTrue(args.animation);
            return;
        }
    }
    isValid() {
        return true;
    }
}
_defTitleSelector = new WeakMap(), _defItemsSelector = new WeakMap(), _defTimeout = new WeakMap();
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
export class CuiAccordionHandler extends CuiMutableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiAccordionHandler", element, attribute, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        _items.set(this, void 0);
        _targets.set(this, void 0);
        _switchEventId.set(this, void 0);
        __classPrivateFieldSet(this, _switchEventId, null);
        __classPrivateFieldSet(this, _items, []);
        __classPrivateFieldSet(this, _targets, []);
        __classPrivateFieldSet(this, _switchEventId, null);
    }
    onInit() {
        if (this.args.isValid()) {
            try {
                this.initTargets();
                __classPrivateFieldSet(this, _switchEventId, this.onEvent(EVENTS.SWITCH, this.onSwitch.bind(this)));
            }
            catch (e) {
                this._log.exception(e, 'handle');
            }
            this._log.debug("Initialized", "handle");
        }
    }
    onUpdate() {
        try {
            this.initTargets();
        }
        catch (e) {
            this._log.exception(e, 'handle');
        }
    }
    onDestroy() {
        this.detachEvent(EVENTS.SWITCH, __classPrivateFieldGet(this, _switchEventId));
    }
    onMutation(mutations) {
        if (mutations.added.length > 0 || mutations.removed.length > 0)
            this.initTargets();
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
            if (this.helper.hasClass(this.activeClassName, current)) {
                this.helper.removeClassesAs(current, this.activeClassName);
            }
            else {
                if (this.args.single) {
                    this.closeAllExcept(index);
                }
                this.helper.setClassesAs(current, this.activeClassName);
            }
            this.emitEvent(EVENTS.SWITCHED, {
                index: index,
                currentTarget: current,
                timestamp: Date.now()
            });
            this.isLocked = false;
            return true;
        });
    }
    onSwitch(index) {
        this.switch(getIntOrDefault(index, -1)).then(() => {
            this._log.debug("Switch from event to " + index);
        });
    }
    initTargets() {
        __classPrivateFieldSet(this, _items, this.queryItems());
        const t = this.element.querySelectorAll(this.args.selector);
        __classPrivateFieldSet(this, _targets, []);
        t.forEach((item, index) => {
            let target = { element: item };
            this.setListener(target, index);
            __classPrivateFieldGet(this, _targets).push(target);
        });
    }
    closeAllExcept(current) {
        this.mutate(() => {
            __classPrivateFieldGet(this, _items).forEach((item, index) => {
                if (current !== index && this.helper.hasClass(this.activeClassName, item)) {
                    item.classList.remove(this.activeClassName);
                }
            });
        });
    }
    setListener(target, index) {
        target.listener = () => {
            this.switch(index);
        };
        target.element.addEventListener('click', target.listener);
    }
    removeListener(target) {
        if (target.listener) {
            target.element.removeEventListener('click', target.listener);
        }
    }
    queryItems() {
        return [...this.element.querySelectorAll(this.args.items)];
    }
}
_items = new WeakMap(), _targets = new WeakMap(), _switchEventId = new WeakMap();
