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
var _prefix, _tooltip, _margin, _positionCalculator, _tooltipDataCls, _actions, _task;
import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { replacePrefix, is } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiHoverModule } from "../modules/hover/hover";
const TOOLTIP_ACTION = ".{prefix}-animation-tooltip-in";
const TOOLTIP_DATA = "{prefix}-tooltip-data";
export class CuiTooltipArgs extends CuiAutoParseArgs {
    constructor(prefix) {
        super({
            main: "content"
        });
        this.content = "";
        this.width = 150;
        this.margin = 8;
        this.timeout = 2000;
        this.pos = "";
        this.action = replacePrefix(TOOLTIP_ACTION, prefix);
    }
}
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
export class CuiTooltipHandler extends CuiHandlerBase {
    constructor(element, attribute, utils, prefix) {
        super("CuiTooltipHandler", element, attribute, new CuiTooltipArgs(prefix), utils);
        _tooltip.set(this, void 0);
        _margin.set(this, void 0);
        _positionCalculator.set(this, void 0);
        _tooltipDataCls.set(this, void 0);
        _actions.set(this, void 0);
        _task.set(this, void 0);
        __classPrivateFieldSet(this, _tooltip, undefined);
        __classPrivateFieldSet(this, _actions, []);
        __classPrivateFieldSet(this, _tooltipDataCls, replacePrefix(TOOLTIP_DATA, prefix));
        __classPrivateFieldSet(this, _margin, 8);
        __classPrivateFieldSet(this, _positionCalculator, new CuiBasePositionCalculator());
        __classPrivateFieldGet(this, _positionCalculator).setPreferred("top-center");
        __classPrivateFieldSet(this, _task, new CuiTaskRunner(this.args.timeout, false, this.removeTooltip.bind(this)));
        this.addModule(new CuiHoverModule(this.element, this.onHover.bind(this)));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getDataFromArgs();
            __classPrivateFieldGet(this, _task).setTimeout(this.args.timeout);
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getDataFromArgs();
            __classPrivateFieldGet(this, _task).setTimeout(this.args.timeout);
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.removeTooltip();
            return true;
        });
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
                __classPrivateFieldGet(this, _task).start();
            }
            catch (e) {
                this.logError(e.message, "createTooltip", e);
            }
        });
    }
    removeTooltip() {
        __classPrivateFieldGet(this, _task).stop();
        if (!is(__classPrivateFieldGet(this, _tooltip))) {
            return;
        }
        this.mutate(() => {
            //@ts-ignore already checked
            __classPrivateFieldGet(this, _tooltip).remove();
            __classPrivateFieldSet(this, _tooltip, undefined);
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
_tooltip = new WeakMap(), _margin = new WeakMap(), _positionCalculator = new WeakMap(), _tooltipDataCls = new WeakMap(), _actions = new WeakMap(), _task = new WeakMap();
