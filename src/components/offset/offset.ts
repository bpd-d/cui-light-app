import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiScrollEvent } from "../../core/listeners/scroll";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { are, getRangeValue } from "../../core/utils/functions";
import { CuiOffsetModeFactory, ICuiOffsetMode } from "./modes";
import { ATTRIBUTES, EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getEventBusFacade, getCuiHandlerInteractions, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { getCuiScrollExtension } from "../extensions/scroll/scroll";
import { CuiElementBoxFactory, ICuiElementBox } from "../../core/models/elements";
import { getOffsetPerformer } from "./performer";
import { ICuiExtensionPerformer } from "../extensions/interfaces";

/**
 * Toggles an action after specified offset is reached in relation to the element or document
 * 
 * target?: string - target which action shall be triggered on
 * action?: string - action to trigger
 * offsetY?: number - vertical offset
 * offsetX?: number - horizontal offset
 * root?: boolean - set true if scroll listener shall be set on document element
 * mode?: string - static/dynamic 
 */

export interface CuiOffsetEvent {
    matches: boolean;
    offsetX: number;
    offsetY: number;
    ratioY: number;
    ratioX: number;
    scrolling: boolean;

    timestamp: number;
}

export interface CuiOffsetAttribute {
    target?: string;
    action?: string;
    offsetY?: number;
    offsetX?: number;
    root?: boolean;
}

export class CuiOffsetArgs extends CuiAutoParseArgs {
    target: string;
    action: string;
    offsetY: number;
    offsetX: number
    mode: "static" | "dynamic";
    constructor() {
        super();
        this.offsetX = -1;
        this.offsetY = -1;
        this.target = "";
        this.action = "";
        this.mode = 'static';
    }
}

export function CuiOffsetComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "offset",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiOffsetHandler(element, utils, attribute)
        }
    })
}

export class CuiOffsetHandler extends CuiHandlerBase<CuiOffsetArgs> {
    private _targets: HTMLElement[];
    private _matched: boolean;
    private _actions: ICuiComponentAction[];

    private _root: ICuiElementBox;
    private _modeHandler: ICuiOffsetMode;


    private _busFacade: ICuiEventBusFacade;
    private _interactions: ICuiInteractionsFacade;
    private _performer: ICuiExtensionPerformer<CuiScrollEvent>;

    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiOffsetHandler", element, attribute, new CuiOffsetArgs(), utils);

        this._targets = [this.element];
        this._matched = false;
        this._actions = [];
        this._modeHandler = CuiOffsetModeFactory.get(this.args.mode);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const root = this.element.hasAttribute(ATTRIBUTES.root) ? window : element
        this._root = CuiElementBoxFactory.get(root);
        this._performer = getOffsetPerformer({
            callback: this.checkAndPerformActions.bind(this),
            threshold: 20,
        })

        this.extend(getCuiScrollExtension({
            element: root,
            threshold: 5,
            performer: this._performer
        }))


    }

    async onHandle(): Promise<boolean> {
        this.parseAttribute();
        // Perform initial call to performer to settle up component - if it is scrolled or just matching conditions then actions will be set
        this._performer.perform({
            base: undefined,
            initial: true,
            left: this._root.getScrollLeft(),
            top: this._root.getScrollTop(),
            scrolling: false,
            source: "CuiOffsetHandler"
        })
        return true;
    }

    async onRefresh(): Promise<boolean> {
        this.parseAttribute();
        return true;
    }

    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
    }

    private parseAttribute() {
        this._targets = this.getTargets();
        this._actions = CuiActionsListFactory.get(this.args.action);
        this._modeHandler = CuiOffsetModeFactory.get(this.args.mode);

    }

    private checkAndPerformActions(ev: CuiScrollEvent) {
        // @ts-ignore modehandler
        let matchesOffset = this._modeHandler.matches(ev.top, ev.left, this.args.offsetX, this.args.offsetY);
        /**
         * Act and emit event when offset has been reached
         */
        if (matchesOffset !== this._matched) {
            this.act(matchesOffset);
            this._matched = matchesOffset;
        }
        this.callEvent(this._matched, ev.left, ev.top, ev.scrolling, ev.source, ...this.calcaRatio(ev.left, ev.top));
    }


    private act(matching: boolean) {
        if (!are(this._actions, this._targets)) {
            return;
        }

        this._interactions.mutate(() => {
            this._actions.forEach(action => {
                this.actForTargets(matching ? action.add.bind(action) : action.remove.bind(action))
            })
        })
    }

    private actForTargets(callback: (target: Element) => void) {
        this._targets.forEach(target => callback(target))
    }

    private callEvent(matches: boolean, x: number, y: number, scrolling: boolean, source: string, ratioX: number, ratioY: number) {
        this._busFacade.emit(EVENTS.OFFSET, {
            matches: this._matched,
            offsetX: x,
            offsetY: y,
            ratioX: ratioX,
            ratioY: ratioY,
            scrolling: scrolling,
            source: source,
            timestamp: Date.now()
        })
    }


    private calcaRatio(x: number, y: number): [number, number] {
        let ratY = parseFloat(((this._root.getHeight() + y) / this._root.getScrollHeight()).toFixed(2))
        let ratX = parseFloat(((this._root.getWidth() + x) / this._root.getScrollWidth()).toFixed(2))
        return [getRangeValue(ratX, 0, 1), getRangeValue(ratY, 0, 1)];
    }

    private getTargets(): HTMLElement[] {
        return this.args.target ? this._root.queryAll(this.args.target) : [this.element];
    }
}