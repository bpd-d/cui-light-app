var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { replacePrefix, is } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { hoverExtension } from "../extensions/hover/hover";
import { callbackPerformer } from "../extensions/performers";
import { getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
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
export function CuiTooltipComponent(prefix) {
    const _prefix = prefix !== null && prefix !== void 0 ? prefix : 'cui';
    const _attribute = `${_prefix}-tooltip`;
    return {
        attribute: _attribute,
        get: (element, utils) => {
            return new CuiTooltipHandler(element, _attribute, utils, _prefix);
        }
    };
}
export class CuiTooltipHandler extends CuiHandlerBase {
    constructor(element, attribute, utils, prefix) {
        super("CuiTooltipHandler", element, attribute, new CuiTooltipArgs(prefix), utils);
        this._tooltip = undefined;
        this._tooltipDataCls = replacePrefix(TOOLTIP_DATA, prefix);
        this._positionCalculator = new CuiBasePositionCalculator();
        this._positionCalculator.setPreferred("top-center");
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._task = new CuiTaskRunner(this.args.timeout, false, this.removeTooltip.bind(this));
        this.extend(hoverExtension({
            element: element,
            performer: callbackPerformer(this.onHover.bind(this))
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getDataFromArgs();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getDataFromArgs();
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
        if (is(this._tooltip) || !is(this.args.content)) {
            return;
        }
        const box = this.element.getBoundingClientRect();
        this._tooltip = new ElementBuilder("div").setClasses(this._tooltipDataCls).build();
        this._tooltip.textContent = this.args.content;
        this._tooltip.style.maxWidth = `${this.args.width}px`;
        document.body.appendChild(this._tooltip);
        this._interactions.mutate(() => {
            if (!this._tooltip) {
                return;
            }
            const toolbox = this._tooltip.getBoundingClientRect();
            this._positionCalculator.setMargin(this.args.margin);
            try {
                let [x, y] = this._positionCalculator.calculate(box, toolbox);
                this._tooltip.style.top = `${y}px`;
                this._tooltip.style.left = `${x}px`;
                this.toggleActions(this._tooltip);
                this._task.start();
            }
            catch (e) {
                this.logError(e.message, "createTooltip", e);
            }
        });
    }
    removeTooltip() {
        this._task.stop();
        this._interactions.mutate(() => {
            if (!is(this._tooltip)) {
                return;
            }
            //@ts-ignore already checked
            this._tooltip.remove();
            this._tooltip = undefined;
        });
    }
    getDataFromArgs() {
        this._positionCalculator.setMargin(this.args.margin);
        this._positionCalculator.setStatic(this.args.pos);
        this._task.setTimeout(this.args.timeout);
    }
    toggleActions(element) {
        const actions = CuiActionsListFactory.get(this.args.action);
        actions.forEach(action => {
            // @ts-ignore
            action.toggle(element);
        });
    }
}
