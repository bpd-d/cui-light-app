import { ICuiComponent, ICuiComponentHandler, ICuiOpenable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, are, getFirstMatching, getParentCuiElement } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { CUID_ATTRIBUTE, EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "src/core/models/arguments";
import { CuiClickModule } from "../modules/click/click";
import { InteractionEvent } from "src/core/models/events";

export class CuiOpenArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    stopPropagation: boolean;

    constructor(timeout?: number) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.timeout = timeout ?? 300;
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";

    }

}

export class CuiOpenComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-open`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiOpenHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiOpenHandler extends CuiHandlerBase<CuiOpenArgs> {
    #eventId: string | null;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOpenHandler", element, attribute, new CuiOpenArgs(utils.setup.animationTime), utils);
        this.#eventId = null;
        this.addModule(new CuiClickModule(this.element, this.args, this.onOpen.bind(this)))
    }

    async onHandle(): Promise<boolean> {
        this.#eventId = this.onEvent(EVENTS.OPEN, this.onOpen.bind(this));
        return true;
    }
    async onRefresh(): Promise<boolean> {
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.detachEvent(EVENTS.OPEN, this.#eventId);
        return true;
    }

    private onOpen(ev: MouseEvent) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick')
            return;
        }
        this.isLocked = true;
        //@ts-ignore - target checked
        this.run(target).then((result) => {
            //@ts-ignore - target checked
            if (result)
                this.emitOpen(ev);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        })
    }

    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    private async run(target: Element): Promise<boolean> {
        let cuiId = (target as any).$cuid;
        if (is(cuiId)) {
            this.handleClickCui(cuiId);
            return false;
        } else {
            this._log.debug("Open html component")
            if (are(this.args.timeout, this.args.action)) {
                this._log.debug("Perfrom an action")
                let actions = CuiActionsListFactory.get(this.args.action)
                return this.actionsHelper.performActions(target, actions, this.args.timeout, () => {
                    this.helper.setClass(this.activeClassName, target);
                });
            }
            this.helper.setClassesAs(target, this.activeClassName);
            return true;
        }
    }

    handleClickCui(cuid: string) {
        this._log.debug("Open cUI component")
        this.utils.bus.emit(EVENTS.OPEN, cuid, this.args.state);
        return false;
    }


    private emitOpen(ev: MouseEvent) {
        this.emitEvent<InteractionEvent>(EVENTS.OPENED, {
            event: ev,
            state: this.args.state
        })
    }

    // private getTarget(target: string) {
    //     if (is(target)) {
    //         //@ts-ignore - target checked
    //         return document.querySelector(target);
    //     }
    //     let parent = this.element.parentElement;
    //     //@ts-ignore - parent checked
    //     let result = is(parent) ? parent.querySelectorAll(`[${CUID_ATTRIBUTE}]`) : undefined;
    //     if (!result || result.length < 2) {
    //         return undefined;
    //     }

    //     return getFirstMatching([...result], (el: Element) => {
    //         return el !== this.element;
    //     })
    // }
    private getTarget(): Element | undefined {
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return document.querySelector(this.args.target) ?? getParentCuiElement(this.element);
    }
}