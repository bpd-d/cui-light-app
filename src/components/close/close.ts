import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, getParentCuiElement, are } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "src/core/models/arguments";
import { CuiClickModule } from "../modules/click/click";
import { InteractionEvent } from "src/core/models/events";

export class CuiCloseArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    action: string;
    timeout: number;
    state: string;
    prevent: boolean;
    stopPropagation: boolean;

    constructor(timeout?: number) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";
        this.timeout = timeout ?? 300;
    }

}

export class CuiCloseComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;

    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-close`;

    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiCloseHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiCloseHandler extends CuiHandlerBase<CuiCloseArgs> {
    #eventId: string | null;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiCloseHandler", element, attribute, new CuiCloseArgs(utils.setup.animationTime), utils);
        this.#eventId = null;
        this.addModule(new CuiClickModule(this.element, this.args, this.onClose.bind(this)));
    }

    async onHandle(): Promise<boolean> {
        this.#eventId = this.onEvent(EVENTS.CLOSE, this.onClose.bind(this));
        return true;
    }

    async onRefresh(): Promise<boolean> {
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.detachEvent(EVENTS.CLOSE, this.#eventId);
        return true;
    }


    onClose(ev: MouseEvent) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick')
            return;
        }
        this.isLocked = true;
        //@ts-ignore target is checked
        this.run(target).then((result) => {
            if (result)
                this.emitClose(ev);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        })
    }

    private async run(target: Element): Promise<boolean> {
        let cuiId = (target as any).$cuid;
        if (is(cuiId)) {
            await this.utils.bus.emit(EVENTS.CLOSE, cuiId, this.args.state);
            return false;
        } else if (are(this.args.action, this.args.timeout)) {
            let actions = CuiActionsListFactory.get(this.args.action);
            return this.actionsHelper.performActions(target, actions, this.args.timeout, () => {
                this.helper.removeClass(this.activeClassName, target)
            });
        } else {
            this.helper.removeClassesAs(target, this.activeClassName);
            return true;
        }
    }

    // private removeActiveClass(target: Element) {
    //     if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
    //         this.helper.removeClass(this.activeClassName, target);
    //     }
    // }

    // private removeActiveClassAsync(target: Element) {
    //     this.fetch(() => {
    //         if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
    //             this.helper.removeClassesAs(target, this.activeClassName);
    //         }
    //     })

    // }
    // private onActionFinish(ev: MouseEvent, shouldEmit: boolean) {
    //     if (shouldEmit)
    //         this.emitClose(ev);
    // }

    private getTarget(): Element | undefined {
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return document.querySelector(this.args.target) ?? getParentCuiElement(this.element);
    }

    private emitClose(ev: MouseEvent) {
        this.emitEvent<InteractionEvent>(EVENTS.CLOSED, {
            state: this.args.state,
            event: ev
        })
    }
}