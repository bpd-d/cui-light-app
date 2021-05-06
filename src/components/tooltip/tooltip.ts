import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiHoverEvent } from "../../core/listeners/hover";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { ICuiPositionCalculator } from "../../core/position/interfaces";
import { CuiTaskRunner, ICuiTask } from "../../core/utils/task";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { replacePrefix, is } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { hoverExtension } from "../extensions/hover/hover";
import { callbackPerformer } from "../extensions/performers";
import { getCuiHandlerInteractions, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";

const TOOLTIP_ACTION = ".{prefix}-animation-tooltip-in";
const TOOLTIP_DATA = "{prefix}-tooltip-data";

export class CuiTooltipArgs extends CuiAutoParseArgs {
    content: string;
    width: number;
    pos: string;
    margin: number;
    action: string;
    timeout: number;
    constructor(prefix: string) {
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

export function CuiTooltipComponent(prefix?: string): ICuiComponent {
    const _prefix = prefix ?? 'cui';
    const _attribute = `${_prefix}-tooltip`;
    return {
        attribute: _attribute,
        get: (element: HTMLElement, utils: CuiCore) => {
            return new CuiTooltipHandler(element, _attribute, utils, _prefix)
        }
    }
}

export class CuiTooltipHandler extends CuiHandlerBase<CuiTooltipArgs> {

    private _tooltip: HTMLElement | undefined;
    private _positionCalculator: ICuiPositionCalculator;
    private _tooltipDataCls: string;
    private _task: ICuiTask;
    private _interactions: ICuiInteractionsFacade;

    constructor(element: HTMLElement, attribute: string, utils: CuiCore, prefix: string) {
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
        }))
    }

    async onHandle(): Promise<boolean> {
        this.getDataFromArgs();
        return true;
    }

    async onRefresh(): Promise<boolean> {
        this.getDataFromArgs();

        return true;
    }

    async onRemove(): Promise<boolean> {
        this.removeTooltip();
        return true;
    }

    private onHover(ev: CuiHoverEvent) {
        if (ev.isHovering) {
            this.createTooltip();
        } else {
            this.removeTooltip();
        }
    }

    private createTooltip() {
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
            } catch (e) {
                this.logError(e.message, "createTooltip", e);
            }

        })
    }

    private removeTooltip() {
        this._task.stop();
        this._interactions.mutate(() => {
            if (!is(this._tooltip)) {
                return
            }
            //@ts-ignore already checked
            this._tooltip.remove();
            this._tooltip = undefined;
        })
    }

    private getDataFromArgs() {
        this._positionCalculator.setMargin(this.args.margin);
        this._positionCalculator.setStatic(this.args.pos);
        this._task.setTimeout(this.args.timeout);
    }

    private toggleActions(element: HTMLElement) {
        const actions = CuiActionsListFactory.get(this.args.action);
        actions.forEach(action => {
            // @ts-ignore
            action.toggle(element);
        })
    }
}