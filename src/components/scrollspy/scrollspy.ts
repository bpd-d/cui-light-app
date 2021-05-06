import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { getRangeValueOrDefault, getEnumOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { ATTRIBUTES, EVENTS } from "../../core/utils/statics";
import { CuiIntersectionResult } from "../../core/intersection/interfaces";
import { CuiElementBoxFactory, ICuiElementBox } from "../../core/models/elements";
import { CuiScrollSpyModeHandlerFactory, CuiScrollspyUpdateResult, ICuiScrollspyModeHandler } from "./mode";
import { CuiScrollspyScrollEvent } from "../../core/models/events";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getEventBusFacade, getCuiHandlerInteractions, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { getCuiIntersectionPerformer, ICuiIntersectionPerformer } from "../extensions/scroll/performers";
import { getCuiScrollExtension } from "../extensions/scroll/scroll";

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
        this.link = "";
        this.linkAction = "";
    }
}


export function CuiScrollspyComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scrollspy",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiScrollspyHandler(element, utils, attribute)
        }
    })
}

export class CuiScrollspyHandler extends CuiHandlerBase<CuiScrollSpyArgs> {
    private _links: HTMLElement[];
    private _actions: ICuiComponentAction[];
    private _linkActions: ICuiComponentAction[];
    private _modeHandler: ICuiScrollspyModeHandler;

    private _busFacade: ICuiEventBusFacade;
    private _interactions: ICuiInteractionsFacade;
    private _intersectionPerformer: ICuiIntersectionPerformer;
    private _root: ICuiElementBox;


    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiScrollspyHandler", element, attribute, new CuiScrollSpyArgs(), utils);
        this._links = [];
        this._actions = [];
        this._linkActions = [];
        this._modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        const root = element.hasAttribute(ATTRIBUTES.root) ? window : element;
        this._root = CuiElementBoxFactory.get(root);
        this._intersectionPerformer = getCuiIntersectionPerformer({
            callback: this.onIntersection.bind(this),
            element: root
        })
        this.extend(getCuiScrollExtension({
            element: root,
            performer: this._intersectionPerformer,
            threshold: 5
        }))
    }

    async onHandle(): Promise<boolean> {
        this.updateSetup();
        this._intersectionPerformer.callInitialEvent();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.updateSetup();
        return true;
    }
    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
    }

    private onIntersection(ev: CuiIntersectionResult): void {
        let timestamp = Date.now();
        this._interactions.mutate(() => {
            //@ts-ignore - modeHandler checked
            let updateResult: CuiScrollspyUpdateResult = this._modeHandler.update(ev.items, this.args.ratio, this._actions, this._links, this._linkActions)
            if (updateResult.changed) {
                this._busFacade.emit(EVENTS.TARGET_CHANGE, {
                    intersecting: updateResult.intersecting,
                    timestamp: timestamp
                })
            }
        })
        this._busFacade.emit<CuiScrollspyScrollEvent>(EVENTS.ON_SCROLL, {
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling,
            initial: ev.initial
        })
    }

    private updateSetup() {
        let targets = this.args.selector ? this._root.queryAll(this.args.selector) : [];
        this._intersectionPerformer.setChildren(targets);
        this._links = this.args.link ? [...document.querySelectorAll<HTMLElement>(this.args.link)] : [];
        this._actions = CuiActionsListFactory.get(this.args.action);
        this._linkActions = CuiActionsListFactory.get(this.args.linkAction);
        this._modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);

    }
}