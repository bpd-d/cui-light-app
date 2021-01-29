import { ICuiComponent, ICuiComponentHandler, ICuiParsable, ICuiSwitchable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiChildMutation, CuiMutableHandler } from "../../core/handlers/base";
import { ICuiTask, CuiTaskRunner } from "../../core/utils/task";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { is, getStringOrDefault, replacePrefix, getIntOrDefault, isStringTrue, calculateNextIndex, getChildrenHeight, isInRange } from "../../core/utils/functions";
import { SCOPE_SELECTOR, EVENTS } from "../../core/utils/statics";

const SWITCH_DEFAULT_ACTION_IN = ".{prefix}-switch-animation-default-in";
const SWITCH_DEFAULT_ACTION_OUT = ".{prefix}-switch-animation-default-out";
const SWITCH_DEFAULT_TARGETS = " > *";

export class CuiSwitchArgs implements ICuiParsable {
    targets: string;
    in: string;
    out: string;
    timeout: number;
    links: string;
    switch: string;
    autoTimeout: number;
    height: 'auto' | string;
    loop: boolean;

    #prefix: string;
    #defTimeout: number;
    constructor(prefix: string, timeout?: number) {
        this.#prefix = prefix;
        this.#defTimeout = timeout ?? 300;

        this.targets = "";
        this.in = "";
        this.out = "";
        this.timeout = this.#defTimeout;
        this.links = "";
        this.switch = "";
        this.autoTimeout = -1;
        this.height = "";
        this.loop = false;
    }

    parse(args: any): void {
        this.targets = is(args.targets) ? SCOPE_SELECTOR + args.targets : SCOPE_SELECTOR + SWITCH_DEFAULT_TARGETS
        this.in = getStringOrDefault(args.in, replacePrefix(SWITCH_DEFAULT_ACTION_IN, this.#prefix));
        this.out = getStringOrDefault(args.out, replacePrefix(SWITCH_DEFAULT_ACTION_OUT, this.#prefix));
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.links = getStringOrDefault(args.links, "");
        this.switch = getStringOrDefault(args.switch, "");
        this.autoTimeout = getIntOrDefault(args.autoTimeout, -1);
        this.height = getStringOrDefault(args.height, 'auto');
        this.loop = isStringTrue(args.loop);
    }

}

export class CuiSwitchComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-switch`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSwitchHandler(element, utils, this.attribute);
    }
}

export class CuiSwitchHandler extends CuiMutableHandler<CuiSwitchArgs> implements ICuiSwitchable {
    #targets: Element[];
    #currentIdx: number;
    #links: Element[];
    #switches: CuiElement[];
    #task: ICuiTask;
    #switchEventId: string | null;
    #actionsIn: ICuiComponentAction[];
    #actionsOut: ICuiComponentAction[];
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiSwitchHandler", element, attribute, new CuiSwitchArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this.#targets = [];
        this.#currentIdx = -1;
        this.#links = [];
        this.#switches = [];
        this.#switchEventId = null;
        this.#actionsIn = this.#actionsOut = [];
        this.#task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));

    }

    onInit(): void {
        this.#switchEventId = this.onEvent(EVENTS.SWITCH, this.onPushSwitch.bind(this))
        this.parseArguments();
        this.getTargets();
        this.getActiveIndex();
        this.getSwitches();
        this.setSwitchesActive(this.#currentIdx);
        this.setLinkActive(-1, this.#currentIdx);
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })
        this.#task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this.startTask();
    }

    onUpdate(): void {
        this.parseArguments();
        this.getTargets();
        this.getSwitches();
        this.setSwitchesActive(this.#currentIdx);
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })
        this.startTask();
    }

    onDestroy(): void {
        this.#task.stop();
        this.detachEvent(EVENTS.SWITCH, this.#switchEventId)
    }

    onMutation(record: CuiChildMutation): void {
        this.getTargets();
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })

    }

    async switch(index: any): Promise<boolean> {
        if (this.isLocked) {
            return false;
        }
        this.getSwitches();
        this.getActiveIndex();
        let nextIdx = calculateNextIndex(index, this.#currentIdx, this.#targets.length);
        if (!this.args.loop && ((index === "next" && nextIdx === 0) || (index === 'prev' && this.#currentIdx === 0))) {
            this.logInfo("Switch blocked by loop settings", "switch");
            return false;
        }
        if (nextIdx == this.#currentIdx || nextIdx < 0 || nextIdx >= this.#targets.length) {
            this.logWarning(`Index ${index} is not within the suitable range`, "switch");
            return false;
        }
        this.isLocked = true;
        this.setSwitchesActive(nextIdx);
        let nextItem = this.#targets[nextIdx];
        await this.actionsHelper.performSwitchAction(nextItem,
            this.#currentIdx > -1 ? this.#targets[this.#currentIdx] : null,
            this.#actionsIn,
            this.#actionsOut,
            () => {
                // Set next element active
                nextItem.classList.add(this.activeClassName);
                // Remove active from current element (if current exists)
                if (this.#currentIdx > -1)
                    this.#targets[this.#currentIdx].classList.remove(this.activeClassName);
                // Update linked items
                this.setLinkActive(this.#currentIdx, nextIdx);
                // Update element height - it must be done a parent get height based on current child
                this.helper.setStyle(this.element, 'height', this.getElementHeight(nextItem))
                this.startTask();
                this.isLocked = false;
            },
            this.args.timeout,
        )
        this.emitEvent(EVENTS.SWITCHED, {
            timestamp: Date.now(),
            index: nextIdx
        })
        return true;
    }


    private onPushSwitch(index: string) {
        this.switch(index);
    }

    private getActiveIndex(): void {
        this.#currentIdx = is(this.#targets) ? this.#targets.findIndex(target => this.helper.hasClass(this.activeClassName, target)) : -1;
    }

    private getElementHeight(current: Element): string {
        if (!is(this.args.height) || this.args.height === 'auto') {
            return getChildrenHeight(current) + "px";
        } else {
            return this.args.height;
        }
    }

    /**
     * Gets attributes value and prepares properties
     */
    private parseArguments() {
        this.#actionsIn = CuiActionsListFactory.get(this.args.in);
        this.#actionsOut = CuiActionsListFactory.get(this.args.out);
        this.#links = is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : []
    }

    /**
     * Query target elements
     */
    private getTargets() {
        let t = this.element.querySelectorAll(this.args.targets);
        this.#targets = t.length > 0 ? [...t] : [];
    }

    private getSwitches() {
        let switches = is(this.args.switch) ? document.querySelectorAll(this.args.switch) : null;
        this.#switches = [];
        if (switches) {
            switches.forEach(sw => {
                this.#switches.push(<CuiElement>(sw as any))
            })
        }
    }

    private setLinkActive(current: number, next: number) {
        if (!is(this.#links)) {
            return
        }
        if (isInRange(current, 0, this.#links.length - 1)) {
            this.helper.removeClass(this.activeClassName, this.#links[current])
        }
        if (isInRange(next, 0, this.#links.length - 1)) {
            this.helper.setClass(this.activeClassName, this.#links[next])
        }
    }

    /**
     * Sets propers active state on attached switches
     * @param index 
     */

    private setSwitchesActive(index: number) {
        this.#switches.forEach(sw => {
            this.emitLinkSwitch(sw.$cuid, index)
        })
    }

    /**
     * Emits push event to attached switch to set proper index
     * @param id - cuid of element
     * @param index - index to be set on element
     */
    private emitLinkSwitch(id: string | null, index: number) {
        if (is(id))
            this.utils.bus.emit(EVENTS.SWITCH, id, index);
    }

    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true 
     */
    private startTask() {
        this.#task.stop();
        if (this.args.autoTimeout) {
            this.#task.start();
        }
    }

}