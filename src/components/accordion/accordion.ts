import { ICuiComponent, ICuiComponentHandler, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiChildMutation, CuiMutableHandler } from "../../core/handlers/base";
import { getIntOrDefault, is, isStringTrue, replacePrefix, getStringOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { EVENTS, SCOPE_SELECTOR } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";


/**
 * 
 */

export interface CuiAccordionEvent {
    index: number;
    previous: number;
    currentTarget: Element;
    previousTarget: Element;
    timestamp: number;
}

interface CuiAccordionTarget {
    element: Element,
    listener?: any
}

const ACCORDION_TITLE_CLS = '> * > .{prefix}-accordion-title';
const ACCORDION_ITEMS_CLS = '> *';


export class CuiAccordionArgs extends CuiAutoParseArgs {
    single: boolean;
    selector: string;
    items: string;
    timeout: number;
    animation: boolean;

    constructor(prefix: string, timeout?: number) {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "items": { corrector: joinWithScopeSelector },
            }
        });
        this.animation = false;
        this.single = false;
        this.selector = joinWithScopeSelector(replacePrefix(ACCORDION_TITLE_CLS, prefix));
        this.items = joinWithScopeSelector(replacePrefix(ACCORDION_ITEMS_CLS, prefix));
        this.timeout = timeout ?? 300;
    }
}

export class CuiAccordionComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-accordion`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiAccordionHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiAccordionHandler extends CuiMutableHandler<CuiAccordionArgs> implements ICuiSwitchable {
    #items: Element[];
    #targets: CuiAccordionTarget[];
    #switchEventId: string | null;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiAccordionHandler", element, attribute, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        this.#switchEventId = null;
        this.#items = [];
        this.#targets = [];
        this.#switchEventId = null;
    }

    onInit(): void {
        try {
            this.initTargets();
            this.#switchEventId = this.onEvent(EVENTS.SWITCH, this.onSwitch.bind(this))
        } catch (e) {
            this._log.exception(e, 'handle')
        }
    }

    onUpdate(): void {
        try {
            this.initTargets();
        } catch (e) {
            this._log.exception(e, 'handle')
        }
    }

    onDestroy(): void {
        this.detachEvent(EVENTS.SWITCH, this.#switchEventId)
    }

    onMutation(mutations: CuiChildMutation) {
        if (mutations.added.length > 0 || mutations.removed.length > 0)
            this.initTargets();
    }

    async switch(index: number): Promise<boolean> {
        this._log.debug("Switch to: " + index);
        if (index < 0 || this.isLocked || !this.isInitialized) {
            return false;
        }

        this.#items = this.queryItems();
        if (this.#items.length <= index) {
            return false;
        }
        this.isLocked = true;
        const current = this.#items[index]
        if (this.helper.hasClass(this.activeClassName, current)) {
            this.helper.removeClassesAs(current, this.activeClassName)
        } else {
            this.mutate(() => {
                if (this.args.single) {
                    this.closeAllExcept(index)
                }
                this.helper.setClass(this.activeClassName, current)
            })
        }
        this.emitEvent(EVENTS.SWITCHED, {
            index: index,
            currentTarget: current,
            timestamp: Date.now()
        })
        this.isLocked = false;
        return true;
    }

    onSwitch(index: any): void {
        this.switch(getIntOrDefault(index, -1)).then(() => {
            this._log.debug("Switch from event to " + index);
        });
    }

    initTargets() {
        this.#items = this.queryItems();
        const t = this.element.querySelectorAll(this.args.selector);
        this.#targets = [];
        t.forEach((item: Element, index: number) => {
            let target: CuiAccordionTarget = { element: item };
            this.setListener(target, index)
            this.#targets.push(target);
        })
    }

    closeAllExcept(current: number) {
        this.#items.forEach((item: Element, index: number) => {
            if (current !== index && this.helper.hasClass(this.activeClassName, item)) {
                item.classList.remove(this.activeClassName)
            }
        })
    }

    setListener(target: CuiAccordionTarget, index: number) {
        target.listener = () => {
            this.switch(index);
        }
        target.element.addEventListener('click', target.listener)
    }

    removeListener(target: CuiAccordionTarget) {
        if (target.listener) {
            target.element.removeEventListener('click', target.listener);
        }
    }

    queryItems(): Element[] {
        return [...this.element.querySelectorAll(this.args.items)]
    }
}