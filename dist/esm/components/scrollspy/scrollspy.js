var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getRangeValueOrDefault, getEnumOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { ATTRIBUTES, EVENTS } from "../../core/utils/statics";
import { CuiElementBoxFactory } from "../../core/models/elements";
import { CuiScrollSpyModeHandlerFactory } from "./mode";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getEventBusFacade, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { getCuiIntersectionPerformer } from "../extensions/scroll/performers";
import { getCuiScrollExtension } from "../extensions/scroll/scroll";
const DEFAULT_SELECTOR = "> *";
export class CuiScrollSpyArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "ratio": { corrector: (value) => getRangeValueOrDefault(value, 0, 1, 0) },
                'mode': { corrector: (value) => getEnumOrDefault(value, 'single', "multi") }
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
export function CuiScrollspyComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scrollspy",
        create: (element, utils, prefix, attribute) => {
            return new CuiScrollspyHandler(element, utils, attribute);
        }
    });
}
export class CuiScrollspyHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
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
        });
        this.extend(getCuiScrollExtension({
            element: root,
            performer: this._intersectionPerformer,
            threshold: 5
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            this._intersectionPerformer.callInitialEvent();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onIntersection(ev) {
        let timestamp = Date.now();
        this._interactions.mutate(() => {
            //@ts-ignore - modeHandler checked
            let updateResult = this._modeHandler.update(ev.items, this.args.ratio, this._actions, this._links, this._linkActions);
            if (updateResult.changed) {
                this._busFacade.emit(EVENTS.TARGET_CHANGE, {
                    intersecting: updateResult.intersecting,
                    timestamp: timestamp
                });
            }
        });
        this._busFacade.emit(EVENTS.ON_SCROLL, {
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling,
            initial: ev.initial
        });
    }
    updateSetup() {
        let targets = this.args.selector ? this._root.queryAll(this.args.selector) : [];
        this._intersectionPerformer.setChildren(targets);
        this._links = this.args.link ? [...document.querySelectorAll(this.args.link)] : [];
        this._actions = CuiActionsListFactory.get(this.args.action);
        this._linkActions = CuiActionsListFactory.get(this.args.linkAction);
        this._modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);
    }
}
