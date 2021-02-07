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
var _defAct, _prefix, _hoverListener, _tooltip, _margin, _positionCalculator, _tooltipDataCls, _actions, _task;
import { ElementBuilder } from "../../core/builders/element";
import { CuiHandler } from "../../core/handlers/base";
import { CuiHoverListener } from "../../core/listeners/hover";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { replacePrefix, isString, getStringOrDefault, getIntOrDefault, is } from "../../core/utils/functions";
const TOOLTIP_ACTION = ".{prefix}-animation-tooltip-in";
const TOOLTIP_DATA = "{prefix}-tooltip-data";
export class CuiTooltipArgs {
    constructor(prefix) {
        _defAct.set(this, void 0);
        __classPrivateFieldSet(this, _defAct, replacePrefix(TOOLTIP_ACTION, prefix));
        this.content = "";
        this.width = 150;
        this.margin = 8;
        this.timeout = 2000;
        this.pos = "";
        this.action = __classPrivateFieldGet(this, _defAct);
    }
    parse(val) {
        if (isString(val)) {
            this.content = getStringOrDefault(val, "");
            return;
        }
        this.content = getStringOrDefault(val.content, "");
        this.width = getIntOrDefault(val.width, 150);
        this.margin = getIntOrDefault(val.margin, 8);
        this.pos = getStringOrDefault(val.pos, "");
        this.action = getStringOrDefault(val.action, __classPrivateFieldGet(this, _defAct));
        this.timeout = getIntOrDefault(val.timeout, 2000);
    }
}
_defAct = new WeakMap();
export class CuiTooltipComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix)}-tooltip`;
    }
    getStyle() {
        return null;
    }
    get(element, sutils) {
        return new CuiTooltipHandler(element, this.attribute, sutils, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiTooltipHandler extends CuiHandler {
    constructor(element, attribute, utils, prefix) {
        super("CuiTooltipHandler", element, attribute, new CuiTooltipArgs(prefix), utils);
        _hoverListener.set(this, void 0);
        _tooltip.set(this, void 0);
        _margin.set(this, void 0);
        _positionCalculator.set(this, void 0);
        _tooltipDataCls.set(this, void 0);
        _actions.set(this, void 0);
        _task.set(this, void 0);
        __classPrivateFieldSet(this, _tooltip, undefined);
        __classPrivateFieldSet(this, _actions, []);
        __classPrivateFieldSet(this, _task, undefined);
        __classPrivateFieldSet(this, _tooltipDataCls, replacePrefix(TOOLTIP_DATA, prefix));
        __classPrivateFieldSet(this, _hoverListener, new CuiHoverListener(element));
        __classPrivateFieldGet(this, _hoverListener).setCallback(this.onHover.bind(this));
        __classPrivateFieldSet(this, _margin, 8);
        __classPrivateFieldSet(this, _positionCalculator, new CuiBasePositionCalculator());
        __classPrivateFieldGet(this, _positionCalculator).setPreferred("top-center");
    }
    onInit() {
        __classPrivateFieldGet(this, _hoverListener).attach();
        this.getDataFromArgs();
        __classPrivateFieldSet(this, _task, new CuiTaskRunner(this.args.timeout, false, this.removeTooltip.bind(this)));
    }
    onUpdate() {
        this.getDataFromArgs();
        if (__classPrivateFieldGet(this, _task))
            __classPrivateFieldGet(this, _task).setTimeout(this.args.timeout);
    }
    onDestroy() {
        this.removeTooltip();
        __classPrivateFieldGet(this, _hoverListener).detach();
    }
    onHover(ev) {
        if (ev.isHovering) {
            this.createTooltip();
        }
        else {
            this.removeTooltip();
        }
    }
    createTooltip() {
        if (is(__classPrivateFieldGet(this, _tooltip)) || !is(this.args.content)) {
            return;
        }
        const box = this.element.getBoundingClientRect();
        __classPrivateFieldSet(this, _tooltip, new ElementBuilder("div").setClasses(__classPrivateFieldGet(this, _tooltipDataCls)).build());
        __classPrivateFieldGet(this, _tooltip).textContent = this.args.content;
        __classPrivateFieldGet(this, _tooltip).style.maxWidth = `${this.args.width}px`;
        document.body.appendChild(__classPrivateFieldGet(this, _tooltip));
        this.mutate(() => {
            if (!__classPrivateFieldGet(this, _tooltip)) {
                return;
            }
            const toolbox = __classPrivateFieldGet(this, _tooltip).getBoundingClientRect();
            __classPrivateFieldGet(this, _positionCalculator).setMargin(__classPrivateFieldGet(this, _margin));
            try {
                let [x, y] = __classPrivateFieldGet(this, _positionCalculator).calculate(box, toolbox);
                __classPrivateFieldGet(this, _tooltip).style.top = `${y}px`;
                __classPrivateFieldGet(this, _tooltip).style.left = `${x}px`;
                this.toggleActions();
                if (__classPrivateFieldGet(this, _task))
                    __classPrivateFieldGet(this, _task).start();
            }
            catch (e) {
                this.logError(e.message, "createTooltip", e);
            }
        });
    }
    removeTooltip() {
        if (__classPrivateFieldGet(this, _task))
            __classPrivateFieldGet(this, _task).stop();
        this.mutate(() => {
            if (is(__classPrivateFieldGet(this, _tooltip))) {
                //@ts-ignore already checked
                __classPrivateFieldGet(this, _tooltip).remove();
                __classPrivateFieldSet(this, _tooltip, undefined);
            }
        });
    }
    getDataFromArgs() {
        __classPrivateFieldGet(this, _positionCalculator).setMargin(this.args.margin);
        __classPrivateFieldGet(this, _positionCalculator).setStatic(this.args.pos);
        __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
    }
    toggleActions() {
        if (!__classPrivateFieldGet(this, _tooltip)) {
            return;
        }
        __classPrivateFieldGet(this, _actions).forEach(action => {
            // @ts-ignore
            action.toggle(__classPrivateFieldGet(this, _tooltip));
        });
    }
}
_hoverListener = new WeakMap(), _tooltip = new WeakMap(), _margin = new WeakMap(), _positionCalculator = new WeakMap(), _tooltipDataCls = new WeakMap(), _actions = new WeakMap(), _task = new WeakMap();
