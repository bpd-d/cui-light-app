import { ICuiComponent, ICuiComponentHandler, ICuiOpenable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
import { getStringOrDefault, getIntOrDefault, is, isString, isStringTrue, are, getFirstMatching } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { CUID_ATTRIBUTE, EVENTS } from "../../core/utils/statics";

export class CuiOpenArgs {
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;

    #defTimeout: number;
    constructor(timeout?: number) {
        this.#defTimeout = timeout ?? 300;
        this.target = "";
        this.action = "";
        this.timeout = 0;
        this.prevent = false;
        this.state = "";

    }

    parse(args: any) {
        if (is(args) && isString(args)) {
            this.target = args;
            this.action = "";
            this.timeout = this.#defTimeout;
            this.prevent = false;
            this.state = "";
            return;
        }
        this.target = getStringOrDefault(args.target, "");
        this.action = args.action;
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.prevent = isStringTrue(args.prevent)
        this.state = args.state;
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

export class CuiOpenHandler extends CuiHandler<CuiOpenArgs> {
    #eventId: string | null;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOpenHandler", element, attribute, new CuiOpenArgs(utils.setup.animationTime), utils);
        this.#eventId = null;
        this.onClick = this.onClick.bind(this);
    }

    onInit(): void {
        this.element.addEventListener('click', this.onClick)
        this.#eventId = this.onEvent(EVENTS.OPEN, this.onOpen.bind(this));
    }

    onUpdate(): void {
        //
    }

    onDestroy(): void {
        this.element.removeEventListener('click', this.onClick)
        this.detachEvent(EVENTS.OPEN, this.#eventId);
    }

    onClick(ev: MouseEvent) {
        this.onOpen(ev);
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }

    onOpen(ev: MouseEvent) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget(this.args.target);
        if (!is(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick')
            return;
        }
        this.isLocked = true;
        //@ts-ignore - target checked
        this.run(target).then((result) => {
            //@ts-ignore - target checked
            this.activateTarget(ev, target, result);
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
            this._log.debug("Open cUI component")
            await this.utils.bus.emit(EVENTS.OPEN, cuiId, this.args.state);
            return false;
        } else {
            this._log.debug("Open html component")
            if (are(this.args.timeout, this.args.action)) {
                this._log.debug("Perfrom an action")
                let actions = CuiActionsListFactory.get(this.args.action)
                await this.actionsHelper.performActions(target, actions, this.args.timeout, () => {
                    this.setActiveClass(target)
                });
                return true;
            }
            this.setActiveClassAsync(target);
            return true;
        }
    }

    private setActiveClass(target: Element) {
        if (is(target) && !this.helper.hasClass(this.activeClassName, target)) {
            this.helper.setClass(this.activeClassName, target);
        }
    }

    private setActiveClassAsync(target: Element) {
        this.fetch(() => {
            if (is(target) && !this.helper.hasClass(this.activeClassName, target)) {
                this.helper.setClassesAs(target, this.activeClassName);
            }
        })

    }

    private activateTarget(ev: MouseEvent, target: Element, shouldEmit: boolean): void {
        if (is(target) && !this.helper.hasClass(this.activeClassName, target)) {
            this.helper.setClassesAs(target, this.activeClassName);
        }
        if (shouldEmit)
            this.emitOpen(ev);
    }

    private emitOpen(ev: MouseEvent) {
        this.emitEvent(EVENTS.OPENED, {
            event: ev,
            state: this.args.state,
            timestamp: Date.now()
        })
    }

    private getTarget(target: string) {
        if (is(target)) {
            //@ts-ignore - target checked
            return document.querySelector(target);
        }
        let parent = this.element.parentElement;
        //@ts-ignore - parent checked
        let result = is(parent) ? parent.querySelectorAll(`[${CUID_ATTRIBUTE}]`) : undefined;
        if (!result || result.length < 2) {
            return undefined;
        }

        return getFirstMatching([...result], (el: Element) => {
            return el !== this.element;
        })
    }
}