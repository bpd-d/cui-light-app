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
var _prefix, _prefix_1, _bodyClass, _attribute, _triggerHoverListener, _hoverListener, _trigger, _windowClickEventId, _openEventId, _closeEventId, _positionCalculator, _posClass, _autoTask, _actions;
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, joinWithScopeSelector, replacePrefix } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHoverListener } from "../../core/listeners/hover";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
const bodyClass = '{prefix}-drop-open';
const DROP_POSITION = "{prefix}-drop-position-";
const DROP_TRIGGER = "{prefix}-drop-trigger";
const DROP_DEFAULT_TRIGGER = "> a, button";
const DROP_DEFAULT_ANIMATION_CLS = '{prefix}-drop-animation-in';
export class CuiDropArgs extends CuiAutoParseArgs {
    constructor(prefix) {
        super({
            props: {
                'trigger': { corrector: joinWithScopeSelector }
            }
        });
        this.mode = "click";
        this.trigger = joinWithScopeSelector(DROP_DEFAULT_TRIGGER);
        this.autoClose = false;
        this.outClose = false;
        this.prevent = false;
        this.pos = "";
        this.action = replacePrefix(DROP_DEFAULT_ANIMATION_CLS, prefix);
        this.timeout = 3000;
        this.margin = 8;
    }
}
export class CuiDropComponenet {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix)}-drop`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiDropHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiDropHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuidropHandler", element, attribute, new CuiDropArgs(prefix), utils);
        _prefix_1.set(this, void 0);
        _bodyClass.set(this, void 0);
        _attribute.set(this, void 0);
        _triggerHoverListener.set(this, void 0);
        _hoverListener.set(this, void 0);
        _trigger.set(this, void 0);
        _windowClickEventId.set(this, void 0);
        _openEventId.set(this, void 0);
        _closeEventId.set(this, void 0);
        _positionCalculator.set(this, void 0);
        _posClass.set(this, void 0);
        _autoTask.set(this, void 0);
        _actions.set(this, void 0);
        __classPrivateFieldSet(this, _attribute, attribute);
        __classPrivateFieldSet(this, _prefix_1, prefix);
        __classPrivateFieldSet(this, _bodyClass, replacePrefix(bodyClass, prefix));
        __classPrivateFieldSet(this, _hoverListener, new CuiHoverListener(this.element));
        __classPrivateFieldGet(this, _hoverListener).setCallback(this.onElementHover.bind(this));
        __classPrivateFieldSet(this, _windowClickEventId, null);
        __classPrivateFieldSet(this, _openEventId, null);
        __classPrivateFieldSet(this, _closeEventId, null);
        this.onTriggerClick = this.onTriggerClick.bind(this);
        __classPrivateFieldSet(this, _positionCalculator, new CuiBasePositionCalculator());
        __classPrivateFieldGet(this, _positionCalculator).setMargin(8);
        __classPrivateFieldGet(this, _positionCalculator).setPreferred("bottom-left");
        __classPrivateFieldSet(this, _posClass, "");
        __classPrivateFieldSet(this, _triggerHoverListener, undefined);
        __classPrivateFieldSet(this, _trigger, this.element);
        __classPrivateFieldSet(this, _actions, []);
        __classPrivateFieldSet(this, _autoTask, new CuiTaskRunner(this.args.timeout, false, this.close.bind(this)));
        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("Window click plugin is not available: outClose will not work");
        }
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _trigger, this.acquireTrigger());
            __classPrivateFieldSet(this, _triggerHoverListener, new CuiHoverListener(__classPrivateFieldGet(this, _trigger)));
            this.setTriggerEvent();
            __classPrivateFieldSet(this, _openEventId, this.onEvent(EVENTS.OPEN, this.open.bind(this)));
            __classPrivateFieldSet(this, _closeEventId, this.onEvent(EVENTS.CLOSE, this.close.bind(this)));
            __classPrivateFieldGet(this, _positionCalculator).setStatic(this.args.pos);
            __classPrivateFieldGet(this, _positionCalculator).setMargin(this.args.margin);
            __classPrivateFieldSet(this, _autoTask, new CuiTaskRunner(this.args.timeout, false, this.close.bind(this)));
            __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
            this.mutate(() => {
                AriaAttributes.setAria(this.element, 'aria-dropdown', "");
            });
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _triggerHoverListener) && __classPrivateFieldGet(this, _triggerHoverListener).isAttached()) {
                __classPrivateFieldGet(this, _triggerHoverListener).detach();
            }
            else if (this.prevArgs && this.prevArgs.mode === 'click') {
                //@ts-ignore 
                __classPrivateFieldGet(this, _trigger).removeEventListener('click', this.onTriggerClick);
            }
            __classPrivateFieldSet(this, _trigger, this.acquireTrigger());
            __classPrivateFieldSet(this, _triggerHoverListener, new CuiHoverListener(__classPrivateFieldGet(this, _trigger)));
            this.setTriggerEvent();
            __classPrivateFieldGet(this, _positionCalculator).setStatic(this.args.pos);
            __classPrivateFieldGet(this, _positionCalculator).setMargin(this.args.margin);
            __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
            __classPrivateFieldGet(this, _autoTask).setTimeout(this.args.timeout);
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.detachEvent(EVENTS.OPEN, __classPrivateFieldGet(this, _openEventId));
            this.detachEvent(EVENTS.CLOSE, __classPrivateFieldGet(this, _closeEventId));
            return true;
        });
    }
    /**
    * Api Method open
    */
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn('open')) {
                return false;
            }
            if (this.isActive()) {
                return this.close();
            }
            if (this.isAnyActive()) {
                yield this.findAndCloseOpenedDrop();
            }
            this.isLocked = true;
            this._log.debug(`Drop ${this.cuid}`, 'open');
            this.onOpen();
            this.isLocked = false;
            return true;
        });
    }
    /**
     * Api Method close
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn("close") || !this.isActive()) {
                return false;
            }
            this.isLocked = true;
            this.logInfo(`Drop ${this.cuid}`, 'close');
            this.onClose();
            this.detachEvent(EVENTS.WINDOW_CLICK, __classPrivateFieldGet(this, _windowClickEventId));
            this.emitEvent(EVENTS.CLOSED, {
                timestamp: Date.now()
            });
            __classPrivateFieldGet(this, _hoverListener).detach();
            this.isLocked = false;
            return true;
        });
    }
    onClose() {
        this.mutate(() => {
            this.helper.removeClass(this.activeClassName, this.element);
            this.helper.removeClass(__classPrivateFieldGet(this, _bodyClass), document.body);
            this.toggleActions();
            this.helper.removeClass(__classPrivateFieldGet(this, _posClass), this.element);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        });
    }
    onOpen() {
        this.helper.setClass(this.activeClassName, this.element);
        this.mutate(() => {
            const box = __classPrivateFieldGet(this, _trigger).getBoundingClientRect();
            try {
                const [x, y, pos] = __classPrivateFieldGet(this, _positionCalculator).calculate(box, this.element.getBoundingClientRect());
                this.element.style.top = `${y - box.top}px`;
                this.element.style.left = `${x - box.left}px`;
                __classPrivateFieldSet(this, _posClass, replacePrefix(DROP_POSITION + pos, __classPrivateFieldGet(this, _prefix_1)));
                this.toggleActions();
                this.helper.setClass(__classPrivateFieldGet(this, _posClass), this.element);
                this.helper.setClass(__classPrivateFieldGet(this, _bodyClass), document.body);
                this.emitEvent(EVENTS.OPENED, {
                    timestamp: Date.now()
                });
                __classPrivateFieldGet(this, _hoverListener).attach();
                this.runAutoCloseTask();
                if (this.args.outClose) {
                    __classPrivateFieldSet(this, _windowClickEventId, this.onEvent(EVENTS.WINDOW_CLICK, this.onWindowClick.bind(this)));
                }
                AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
            }
            catch (e) {
                this._log.exception(e);
            }
        });
    }
    /**
     * Event invoked when window is clicked
     * @param ev
     */
    onWindowClick(ev) {
        if (!this.element.contains(ev.ev.target)) {
            this.close();
        }
    }
    isAnyActive() {
        return this.helper.hasClass(__classPrivateFieldGet(this, _bodyClass), document.body);
    }
    /**
     * Finds and opens other active drop element
     */
    findAndCloseOpenedDrop() {
        return __awaiter(this, void 0, void 0, function* () {
            const opened = document.querySelector(`[${__classPrivateFieldGet(this, _attribute)}].${this.activeClassName}`);
            if (!is(opened)) {
                this._log.warning("Opened drop was not found");
                return false;
            }
            //@ts-ignore opened checked
            const handler = opened.$handlers[__classPrivateFieldGet(this, _attribute)];
            if (!is(handler)) {
                this._log.warning("Drop handler was not found in the element");
                return false;
            }
            return handler.close();
        });
    }
    /**
     * Invoked when trigger button is clicked
     * @param ev
     */
    onTriggerClick(ev) {
        if (this.isActive()) {
            this.close();
        }
        else {
            this.open();
        }
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }
    /**
    * Invoked when trigger button is hovered on
    * @param ev
    */
    onHoverEvent(ev) {
        if (ev.isHovering && !this.isActive()) {
            this.open();
        }
        if (this.args.prevent) {
            ev.event.preventDefault();
        }
    }
    /**
     * Method triggered when opened element is hovered on
     * @param ev
     */
    onElementHover(ev) {
        if (ev.isHovering) {
            __classPrivateFieldGet(this, _autoTask).stop();
        }
        else if (!ev.isHovering && this.args.autoClose) {
            this.runAutoCloseTask();
        }
    }
    /**
     * Sets event on trigger button
     */
    setTriggerEvent() {
        if (this.args.mode === 'hover' && __classPrivateFieldGet(this, _triggerHoverListener)) {
            __classPrivateFieldGet(this, _triggerHoverListener).setCallback(this.onHoverEvent.bind(this));
            __classPrivateFieldGet(this, _triggerHoverListener).attach();
        }
        else {
            //@ts-ignore
            __classPrivateFieldGet(this, _trigger).addEventListener('click', this.onTriggerClick);
        }
    }
    /**
     * Runs auto-close task on opened element
     */
    runAutoCloseTask() {
        if (!this.args.autoClose) {
            return;
        }
        __classPrivateFieldGet(this, _autoTask).start();
    }
    toggleActions() {
        __classPrivateFieldGet(this, _actions).forEach(action => {
            action.toggle(this.element);
        });
    }
    acquireTrigger() {
        let ret = null;
        if (!this.element.parentElement) {
            ret = document.querySelector(this.args.trigger);
        }
        else
            ret = this.element.parentElement.querySelector(this.args.trigger);
        return ret !== null && ret !== void 0 ? ret : this.element;
    }
}
_prefix_1 = new WeakMap(), _bodyClass = new WeakMap(), _attribute = new WeakMap(), _triggerHoverListener = new WeakMap(), _hoverListener = new WeakMap(), _trigger = new WeakMap(), _windowClickEventId = new WeakMap(), _openEventId = new WeakMap(), _closeEventId = new WeakMap(), _positionCalculator = new WeakMap(), _posClass = new WeakMap(), _autoTask = new WeakMap(), _actions = new WeakMap();
