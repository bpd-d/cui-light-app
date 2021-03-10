import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiChildMutation, CuiHandlerBase, CuiMutableHandler } from "../../core/handlers/base";
import { CuiIntersectionObserver } from "../../core/observers/intersection";
import { CuiActionsListFactory, ICuiComponentAction } from "../../core/utils/actions";
import { is, getRangeValueOrDefault, joinWithScopeSelector, isTouchSupported, getChildSelectorFromScoped } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { IntersectionHandlerEvent } from "src/core/models/events";

const DEFAULT_SELCTOR = "> *";

/**
 * Intersection
 * Toggles action in/out when target is intersecting with the screen
 * 
 * Set this on scrollable element
 * target - children selector
 * offset - 0...1 - tells how much target must intersecting with the screen
 * action - action to trigger
 */

export class CuiIntersectionAttributes extends CuiAutoParseArgs {
    target: string;
    action: string;
    offset: number;
    isRoot: boolean;
    constructor() {
        super({
            props: {
                offset: { corrector: (value: any) => { return getRangeValueOrDefault(value, 0, 1, 0) } },
                target: { corrector: joinWithScopeSelector }
            }
        })
        this.target = joinWithScopeSelector(DEFAULT_SELCTOR);
        this.action = "";
        this.offset = 0;
        this.isRoot = false;
    }
}

export class CuiIntersectionComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-intersection`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiIntersectionHandler(element, utils, this.attribute);
    }
}

export class CuiIntersectionHandler extends CuiMutableHandler<CuiIntersectionAttributes> {

    #observer: CuiIntersectionObserver;
    #targets: Element[];
    #actions: ICuiComponentAction[];
    #childSelector: string;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiIntersectionHandler", element, attribute, new CuiIntersectionAttributes(), utils);
        this.#observer = new CuiIntersectionObserver(this.element);
        this.#targets = [];
        this.#actions = [];
        this.#childSelector = '';

    }

    onMutation(record: CuiChildMutation): void {
        if ((record.added.length > 0 && record.added.find(record => (<HTMLElement>record).matches(this.#childSelector)))
            || (record.added.length > 0 && record.removed.find(record => (<HTMLElement>record).matches(this.#childSelector)))) {
            this._log.debug("Reinitialize targets from mutation", "onMutation");
            this.initializeTargets();

        }
    }

    onInit(): void {
        this.parseArguments();
        this.#observer.setCallback(this.onIntersection.bind(this))
        this.#observer.connect();
        this.#targets.forEach(target => {
            this.#observer.observe(target);
        })
    }

    onUpdate(): void {
        this.parseArguments();
    }

    onDestroy(): void {
        this.#observer.disconnect();
    }

    parseArguments() {
        // @ts-ignore prevArgs is correct
        if (!is(this.prevArgs) || (this.prevArgs.target !== this.args.target)) {
            this.initializeTargets();
        }
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.#childSelector = getChildSelectorFromScoped(this.args.target);
    }

    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        if (!is(this.#targets)) {
            return;
        }
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= this.args.offset) {
                this.addActions(entry.target);
            } else {
                this.removeActions(entry.target);
            }
            this.emitIntersection(entry)
        })
    }

    emitIntersection(entry: IntersectionObserverEntry) {
        this.emitEvent<IntersectionHandlerEvent>(EVENTS.INTERSECTION, {
            entry: entry,
            offset: this.args.offset,
        })
    }

    private initializeTargets() {
        let el = this.args.isRoot ? document.body : this.element;
        this.removeObservables();
        this.#targets = [...el.querySelectorAll(this.args.target)];
        this.setObservables();
    }

    private setObservables() {
        this.#targets.forEach(target => {
            this.#observer.observe(target);
        })
    }

    private removeObservables() {
        if (!is(this.#targets)) {
            return;
        }
        this.#targets.forEach(target => {
            this.#observer.observe(target);
        })
    }

    private addActions(element: Element) {
        this.#actions.forEach(action => action.add(element));
    }

    private removeActions(element: Element) {
        this.#actions.forEach(action => action.remove(element));
    }
}