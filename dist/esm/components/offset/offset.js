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
import { are, getRangeValue } from "../../core/utils/functions";
import { CuiOffsetModeFactory } from "./modes";
import { ATTRIBUTES, EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getEventBusFacade, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { getCuiScrollExtension } from "../extensions/scroll/scroll";
import { CuiElementBoxFactory } from "../../core/models/elements";
import { getOffsetPerformer } from "./performer";
export class CuiOffsetArgs extends CuiAutoParseArgs {
    constructor() {
        super();
        this.offsetX = -1;
        this.offsetY = -1;
        this.target = "";
        this.action = "";
        this.mode = 'static';
    }
}
export function CuiOffsetComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "offset",
        create: (element, utils, prefix, attribute) => {
            return new CuiOffsetHandler(element, utils, attribute);
        }
    });
}
export class CuiOffsetHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiOffsetHandler", element, attribute, new CuiOffsetArgs(), utils);
        this._targets = [this.element];
        this._matched = false;
        this._actions = [];
        this._modeHandler = CuiOffsetModeFactory.get(this.args.mode);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const root = this.element.hasAttribute(ATTRIBUTES.root) ? window : element;
        this._root = CuiElementBoxFactory.get(root);
        this._performer = getOffsetPerformer({
            callback: this.checkAndPerformActions.bind(this),
            threshold: 20,
        });
        this.extend(getCuiScrollExtension({
            element: root,
            threshold: 5,
            performer: this._performer
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.parseAttribute();
            // Perform initial call to performer to settle up component - if it is scrolled or just matching conditions then actions will be set
            this._performer.perform({
                base: undefined,
                initial: true,
                left: this._root.getScrollLeft(),
                top: this._root.getScrollTop(),
                scrolling: false,
                source: "CuiOffsetHandler"
            });
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.parseAttribute();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    parseAttribute() {
        this._targets = this.getTargets();
        this._actions = CuiActionsListFactory.get(this.args.action);
        this._modeHandler = CuiOffsetModeFactory.get(this.args.mode);
    }
    checkAndPerformActions(ev) {
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
    act(matching) {
        if (!are(this._actions, this._targets)) {
            return;
        }
        this._interactions.mutate(() => {
            this._actions.forEach(action => {
                this.actForTargets(matching ? action.add.bind(action) : action.remove.bind(action));
            });
        });
    }
    actForTargets(callback) {
        this._targets.forEach(target => callback(target));
    }
    callEvent(matches, x, y, scrolling, source, ratioX, ratioY) {
        this._busFacade.emit(EVENTS.OFFSET, {
            matches: this._matched,
            offsetX: x,
            offsetY: y,
            ratioX: ratioX,
            ratioY: ratioY,
            scrolling: scrolling,
            source: source,
            timestamp: Date.now()
        });
    }
    calcaRatio(x, y) {
        let ratY = parseFloat(((this._root.getHeight() + y) / this._root.getScrollHeight()).toFixed(2));
        let ratX = parseFloat(((this._root.getWidth() + x) / this._root.getScrollWidth()).toFixed(2));
        return [getRangeValue(ratX, 0, 1), getRangeValue(ratY, 0, 1)];
    }
    getTargets() {
        return this.args.target ? this._root.queryAll(this.args.target) : [this.element];
    }
}
