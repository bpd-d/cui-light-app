import { ICuiComponent, ICuiComponentHandler, ICuiOpenable, ICuiClosable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, joinWithScopeSelector, replacePrefix } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHoverListener, CuiHoverEvent } from "../../core/listeners/hover";
import { ICuiPositionCalculator } from "../../core/position/interfaces";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { CuiTaskRunner, ICuiTask } from "../../core/utils/task";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { GlobalClickEvent } from "src/core/models/events";
import { CuiHoverModule } from "../modules/hover/hover";

const bodyClass = '{prefix}-drop-open';
const DROP_POSITION = "{prefix}-drop-position-";
const DROP_TRIGGER = "{prefix}-drop-trigger";
const DROP_DEFAULT_TRIGGER = "> a, button";
const DROP_DEFAULT_ANIMATION_CLS = '{prefix}-drop-animation-in';


export interface CuiDropEvent {
    timestamp: number;
}

export class CuiDropArgs extends CuiAutoParseArgs {
    mode: "click" | "hover";
    trigger: string;
    prevent: boolean;
    autoClose: boolean;
    outClose: boolean;
    pos: string;
    action: string;
    timeout: number;
    margin: number;

    constructor(prefix: string) {
        super({
            props: {
                'trigger': { corrector: joinWithScopeSelector }
            }
        });
        this.mode = "click";
        this.trigger = joinWithScopeSelector(DROP_DEFAULT_TRIGGER);
        this.autoClose = false;
        this.outClose = true;
        this.prevent = false;
        this.pos = "";
        this.action = replacePrefix(DROP_DEFAULT_ANIMATION_CLS, prefix);
        this.timeout = 3000;
        this.margin = 8;
    }
}

export class CuiDropComponenet implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-drop`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiDropHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiDropHandler extends CuiHandlerBase<CuiDropArgs> implements ICuiOpenable, ICuiClosable {
    #prefix: string;
    #bodyClass: string;
    #attribute: string;
    #triggerHoverListener: CuiHoverListener | undefined;

    #trigger: Element;
    #windowClickEventId: string | null;
    #openEventId: string | null;
    #closeEventId: string | null;
    #positionCalculator: ICuiPositionCalculator;
    #posClass: string;
    #autoTask: ICuiTask;
    #actions: ICuiComponentAction[];
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuidropHandler", element, attribute, new CuiDropArgs(prefix), utils);
        this.#attribute = attribute;
        this.#prefix = prefix;
        this.#bodyClass = replacePrefix(bodyClass, prefix);
        this.#windowClickEventId = null;
        this.#openEventId = null;
        this.#closeEventId = null;
        this.onTriggerClick = this.onTriggerClick.bind(this)
        this.#positionCalculator = new CuiBasePositionCalculator();
        this.#positionCalculator.setMargin(8);
        this.#positionCalculator.setPreferred("bottom-left");
        this.#posClass = ""
        this.#triggerHoverListener = undefined;
        this.#trigger = this.element;
        this.#actions = [];
        this.#autoTask = new CuiTaskRunner(this.args.timeout, false, this.close.bind(this));

        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("Window click plugin is not available: outClose will not work")
        }

        this.addModule(new CuiHoverModule(this.element, this.onElementHover.bind(this)));
    }

    async onHandle(): Promise<boolean> {
        this.#trigger = this.acquireTrigger();
        this.#triggerHoverListener = new CuiHoverListener(this.#trigger);
        this.#triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
        this.#triggerHoverListener.attach();
        //@ts-ignore
        this.#trigger.addEventListener('click', this.onTriggerClick)
        // this.setTriggerEvent();
        this.#openEventId = this.onEvent(EVENTS.OPEN, this.open.bind(this));
        this.#closeEventId = this.onEvent(EVENTS.CLOSE, this.close.bind(this));

        this.setDataFromArgs();

        this.mutate(() => {
            AriaAttributes.setAria(this.element, 'aria-dropdown', "");
        })

        return true;
    }
    async onRefresh(): Promise<boolean> {
        if (this.prevArgs && this.args.trigger !== this.prevArgs.trigger) {
            if (this.#triggerHoverListener && this.#triggerHoverListener.isAttached()) {
                this.#triggerHoverListener.detach();
            } else if (this.prevArgs && this.prevArgs.mode === 'click') {
                //@ts-ignore 
                this.#trigger.removeEventListener('click', this.onTriggerClick)
            }
            this.#trigger = this.acquireTrigger();
            this.#triggerHoverListener = new CuiHoverListener(this.#trigger);
            this.#triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
            this.#triggerHoverListener.attach();
            //@ts-ignore
            this.#trigger.addEventListener('click', this.onTriggerClick)
        }


        this.setDataFromArgs();
        return true;
    }
    async onRemove(): Promise<boolean> {

        this.detachEvent(EVENTS.OPEN, this.#openEventId);
        this.detachEvent(EVENTS.CLOSE, this.#closeEventId);
        return true;
    }

    private setDataFromArgs() {
        this.#positionCalculator.setStatic(this.args.pos);
        this.#positionCalculator.setMargin(this.args.margin);
        this.#autoTask.setTimeout(this.args.timeout);
        this.#actions = CuiActionsListFactory.get(this.args.action);
    }
    /**
    * Api Method open
    */
    async open(): Promise<boolean> {
        if (this.checkLockAndWarn('open')) {
            return false;
        }
        if (this.isActive()) {
            return this.close();
        }
        if (this.isAnyActive()) {
            await this.findAndCloseOpenedDrop();
        }

        this._log.debug(`Drop ${this.cuid}`, 'open');
        this.onOpen();

        return true
    }

    /**
     * Api Method close
     */
    async close(): Promise<boolean> {
        if (this.checkLockAndWarn("close") || !this.isActive()) {
            return false;
        }
        this.logInfo(`Drop ${this.cuid}`, 'close');
        this.onClose();
        this.emitEvent(EVENTS.CLOSED, {
            timestamp: Date.now()
        })
        return true;
    }

    /**
     * Set of actions performed during drop open
     */
    onOpen() {
        this.isLocked = true;
        this.helper.setClass(this.activeClassName, this.element);
        this.mutate(() => {
            const box = this.#trigger.getBoundingClientRect();
            try {
                const [x, y, pos] = this.#positionCalculator.calculate(box, this.element.getBoundingClientRect());
                this.element.style.top = `${y - box.top}px`;
                this.element.style.left = `${x - box.left}px`;
                this.#posClass = replacePrefix(DROP_POSITION + pos, this.#prefix);
                this.toggleActions();
                this.helper.setClass(this.#posClass, this.element);
                this.helper.setClass(this.#bodyClass, document.body)

                this.emitEvent(EVENTS.OPENED, {
                    timestamp: Date.now()
                })

                this.runAutoCloseTask();

                AriaAttributes.setAria(this.element, 'aria-expanded', 'true')
                this.#windowClickEventId = this.onEvent(EVENTS.WINDOW_CLICK, this.onWindowClick.bind(this));
            } catch (e) {
                this._log.exception(e)
            } finally {
                this.isLocked = false;
            }
        })
    }

    /**
        * Set of actions performed during drop close
        */
    onClose() {
        this.isLocked = true;
        this.mutate(() => {
            this.helper.removeClass(this.activeClassName, this.element)
            this.helper.removeClass(this.#bodyClass, document.body)
            this.toggleActions();
            this.helper.removeClass(this.#posClass, this.element);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false')
            this.detachEvent(EVENTS.WINDOW_CLICK, this.#windowClickEventId);
            this.isLocked = false;
        })
    }

    /**
     * Event invoked when window is clicked
     * @param ev 
     */
    private onWindowClick(ev: GlobalClickEvent) {
        if (!this.args.outClose) {
            return;
        }
        if (!this.element.contains((ev.ev.target as Node))) {
            this.close();
        }
    }

    private isAnyActive(): boolean {
        return this.helper.hasClass(this.#bodyClass, document.body);
    }

    /**
     * Finds and opens other active drop element
     */
    async findAndCloseOpenedDrop(): Promise<boolean> {
        const opened = document.querySelector(`[${this.#attribute}].${this.activeClassName}`);
        if (!is(opened)) {
            this._log.warning("Opened drop was not found");
            return false;
        }
        //@ts-ignore opened checked
        const handler = (<CuiElement>(opened as any)).$handlers[this.#attribute] as any;
        if (!is(handler)) {
            this._log.warning("Drop handler was not found in the element");
            return false;
        }
        return handler.close();
    }

    /**
     * Invoked when trigger button is clicked
     * @param ev 
     */
    private onTriggerClick(ev: MouseEvent) {
        if (this.args.mode !== 'click') {
            return;
        }
        if (this.isActive()) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
    * Invoked when trigger button is hovered on
    * @param ev
    */
    private onHoverEvent(ev: CuiHoverEvent) {
        if (this.args.mode !== 'hover') {
            return;
        }
        if (ev.isHovering && !this.isActive()) {
            this.open();
        }
    }


    /**
     * Method triggered when opened element is hovered on
     * @param ev 
     */
    private onElementHover(ev: CuiHoverEvent) {
        if (ev.isHovering) {
            this.#autoTask.stop();
        } else if (!ev.isHovering && this.args.autoClose) {
            this.runAutoCloseTask();
        }
    }

    // /**
    //  * Sets event on trigger button
    //  */
    // private setTriggerEvent() {
    //     if (this.args.mode === 'hover' && this.#triggerHoverListener) {
    //         this.#triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
    //         this.#triggerHoverListener.attach();
    //     } else {
    //         //@ts-ignore
    //         this.#trigger.addEventListener('click', this.onTriggerClick)
    //     }
    // }

    /**
     * Runs auto-close task on opened element
     */
    private runAutoCloseTask() {
        if (!this.args.autoClose) {
            return
        }
        this.#autoTask.start();
    }

    private toggleActions() {
        this.#actions.forEach(action => {
            action.toggle(this.element);
        })
    }

    private acquireTrigger(): Element {
        let ret = null;
        if (!this.element.parentElement) {
            ret = document.querySelector(this.args.trigger)
        } else
            ret = this.element.parentElement.querySelector(this.args.trigger);
        return ret ?? this.element;
    }
}