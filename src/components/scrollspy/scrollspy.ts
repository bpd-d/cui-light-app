import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { getRangeValueOrDefault, getEnumOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiIntersectionListener } from "../../core/intersection/intersection";
import { CuiIntersectionResult } from "../../core/intersection/interfaces";
import { CuiElementBoxFactory, CuiElementBoxType, ICuiElementBox } from "../../core/models/elements";
import { CuiScrollSpyModeHandlerFactory, CuiScrollspyUpdateResult, ICuiScrollspyModeHandler } from "./mode";
import { CuiScrollspyScrollEvent } from "../../core/models/events";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

const DEFAULT_SELECTOR = "> *";

export interface CuiScrollspyTargetChangeEvent {
    intersecting: HTMLElement[];
    timestamp: number;
}

export interface CuiScrollSpyAttribute {
    selector?: string;
    action?: string;
    link?: string;
    linkAction?: string;
    ratio: number;
    threshold: number;
}


export class CuiScrollSpyArgs extends CuiAutoParseArgs {
    selector: string; // Child selector
    action: string; // Action to be performed on intersecting elements
    link: string; // Link selector
    linkAction: string; //Actions to be triggered on link
    ratio: number; // Value 0..1 telling how much of a child view must be in view to be added to intersecting items
    isRoot: boolean; // Attach to window or element
    mode: "single" | "multi"; // Action is triggered on single (last) intersecting item or all intersecting items
    threshold: number; // Threshold value (in px) for scroll listener

    constructor() {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "ratio": { corrector: (value: any) => getRangeValueOrDefault(value, 0, 1, 0) },
                'mode': { corrector: (value: string) => getEnumOrDefault(value, 'single', "multi") }
            }
        });
        this.ratio = 0;
        this.mode = "single";
        this.threshold = -1;
        this.selector = joinWithScopeSelector(DEFAULT_SELECTOR);
        this.action = "";
        this.isRoot = false;
        this.link = "";
        this.linkAction = "";
    }
}
export class CuiScrollspyComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-scrollspy`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiScrollspyHandler(element, utils, this.attribute);
    }
}

export class CuiScrollspyHandler extends CuiHandlerBase<CuiScrollSpyArgs> {
    #listener: CuiIntersectionListener;
    #links: HTMLElement[];
    #actions: ICuiComponentAction[];
    #linkActions: ICuiComponentAction[];
    #root: CuiElementBoxType | undefined;
    #rootBox: ICuiElementBox | undefined;
    #modeHandler: ICuiScrollspyModeHandler | undefined;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiScrollspyHandler", element, attribute, new CuiScrollSpyArgs(), utils);
        this.element = element as HTMLElement;
        this.#listener = new CuiIntersectionListener(this.element, { threshold: this.utils.setup.scrollThreshold });
        this.#links = [];
        this.#actions = [];
        this.#linkActions = [];
        this.#root = undefined;
        this.#rootBox = undefined;
        this.#modeHandler = undefined;
    }

    async onHandle(): Promise<boolean> {
        this.init();
        this.#listener.setCallback(this.onIntersection.bind(this));
        this.#listener.attach();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.update();
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.#listener.detach();
        return true;
    }

    private onIntersection(ev: CuiIntersectionResult): void {
        if (!this.#modeHandler) {
            this.logError("Cannot perform - mode handler not initialized", "OnIntersection")
            return;
        }
        let timestamp = Date.now();
        this.mutate(() => {
            //@ts-ignore - modeHandler checked
            let updateResult: CuiScrollspyUpdateResult = this.#modeHandler.update(ev.items, this.args.ratio, this.#actions, this.#links, this.#linkActions)
            if (updateResult.changed) {
                this.emitEvent(EVENTS.TARGET_CHANGE, {
                    intersecting: updateResult.intersecting,
                    timestamp: timestamp
                })
            }
        })
        this.emitEvent<CuiScrollspyScrollEvent>(EVENTS.ON_SCROLL, {
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling,
            initial: ev.initial,
            source: ev.source,
            timestamp: timestamp,
            name: EVENTS.ON_SCROLL
        })
    }

    private init() {
        this.#root = this.args.isRoot ? window : this.element;
        this.#rootBox = CuiElementBoxFactory.get(this.#root);
        let targets = this.args.selector ? this.#rootBox.queryAll(this.args.selector) : [];
        this.#listener.setChildren(targets);
        this.#listener.setThreshold(this.args.threshold);
        this.#links = this.args.link ? [...document.querySelectorAll<HTMLElement>(this.args.link)] : [];
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.#linkActions = CuiActionsListFactory.get(this.args.linkAction);
        this.#modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);

    }

    private update() {
        if (this.prevArgs && this.args.isRoot !== this.prevArgs.isRoot) {
            this.#root = this.args.isRoot ? window : this.element;
            this.#rootBox = CuiElementBoxFactory.get(this.#root);
            this.#listener.setParent(this.#root);
        }
        if (this.prevArgs && this.#rootBox && this.args.selector !== this.prevArgs.selector) {
            let targets = this.args.selector ? this.#rootBox.queryAll(this.args.selector) : [];
            this.#listener.setChildren(targets);
        }
        this.#listener.setThreshold(this.args.threshold);
        this.#links = this.args.link ? [...document.querySelectorAll<HTMLElement>(this.args.link)] : [];
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.#linkActions = CuiActionsListFactory.get(this.args.linkAction);
        this.#modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);

    }
}