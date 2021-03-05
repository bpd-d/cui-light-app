import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiHoverEvent, CuiHoverListener } from "../../core/listeners/hover";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { ICuiPositionCalculator } from "../../core/position/interfaces";
import { CuiTaskRunner, ICuiTask } from "../../core/utils/task";
import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { replacePrefix, is } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

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

export class CuiTooltipComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;

    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-tooltip`;
    }


    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler {
        return new CuiTooltipHandler(element, this.attribute, sutils, this.#prefix);
    }
}

export class CuiTooltipHandler extends CuiHandlerBase<CuiTooltipArgs> {

    #hoverListener: CuiHoverListener;
    #tooltip: HTMLElement | undefined;
    #margin: number;
    #positionCalculator: ICuiPositionCalculator;
    #tooltipDataCls: string;
    #actions: ICuiComponentAction[];
    #task: ICuiTask | undefined;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string) {
        super("CuiTooltipHandler", element, attribute, new CuiTooltipArgs(prefix), utils);
        this.#tooltip = undefined;
        this.#actions = [];
        this.#task = undefined;
        this.#tooltipDataCls = replacePrefix(TOOLTIP_DATA, prefix);
        this.#hoverListener = new CuiHoverListener(element);
        this.#hoverListener.setCallback(this.onHover.bind(this));
        this.#margin = 8;
        this.#positionCalculator = new CuiBasePositionCalculator();
        this.#positionCalculator.setPreferred("top-center");
    }

    async onHandle(): Promise<boolean> {
        this.#hoverListener.attach();
        this.getDataFromArgs();
        this.#task = new CuiTaskRunner(this.args.timeout, false, this.removeTooltip.bind(this));
        return true;
    }

    async onRefresh(): Promise<boolean> {
        this.getDataFromArgs();
        if (this.#task)
            this.#task.setTimeout(this.args.timeout);
        return true;
    }

    async onRemove(): Promise<boolean> {
        this.removeTooltip();
        this.#hoverListener.detach();
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
        if (is(this.#tooltip) || !is(this.args.content)) {
            return;
        }
        const box = this.element.getBoundingClientRect();
        this.#tooltip = new ElementBuilder("div").setClasses(this.#tooltipDataCls).build();
        this.#tooltip.textContent = this.args.content;
        this.#tooltip.style.maxWidth = `${this.args.width}px`;
        document.body.appendChild(this.#tooltip);
        this.mutate(() => {
            if (!this.#tooltip) {
                return;
            }
            const toolbox = this.#tooltip.getBoundingClientRect();
            this.#positionCalculator.setMargin(this.#margin);
            try {
                let [x, y] = this.#positionCalculator.calculate(box, toolbox);
                this.#tooltip.style.top = `${y}px`;
                this.#tooltip.style.left = `${x}px`;
                this.toggleActions();
                if (this.#task)
                    this.#task.start();
            } catch (e) {
                this.logError(e.message, "createTooltip", e);
            }

        })
    }

    private removeTooltip() {
        if (this.#task)
            this.#task.stop();
        this.mutate(() => {
            if (is(this.#tooltip)) {
                //@ts-ignore already checked
                this.#tooltip.remove();
                this.#tooltip = undefined;
            }
        })
    }

    private getDataFromArgs() {
        this.#positionCalculator.setMargin(this.args.margin);
        this.#positionCalculator.setStatic(this.args.pos);
        this.#actions = CuiActionsListFactory.get(this.args.action);
    }

    private toggleActions() {
        if (!this.#tooltip) {
            return;
        }
        this.#actions.forEach(action => {
            // @ts-ignore
            action.toggle(this.#tooltip);
        })
    }
}