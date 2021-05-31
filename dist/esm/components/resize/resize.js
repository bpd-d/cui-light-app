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
import { EVENTS } from "../../core/utils/statics";
import { calcWindowSize, isInViewport } from "../../core/utils/functions";
import { CuiIntersectionObserver } from "../../core/observers/intersection";
import { CuiActionsFactory, } from "../../core/utils/actions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiTaskRunner } from "../../core/utils/task";
import { cuiObserverExtension } from "../extensions/observer/observer";
import { eventExtension } from "../extensions/event/event";
import { getEventBusFacade, getCuiHandlerInteractions, } from "../../core/handlers/extensions/facades";
import { getResizeCalculator } from "./calculator";
import { callbackPerformer } from "../extensions/performers";
import { CuiComponentBaseHook } from "../base";
export class CuiResizeArgs extends CuiAutoParseArgs {
    constructor() {
        super();
        this.mode = "simple";
        this.default = "";
        this.small = this.medium = this.large = this.xlarge = "";
        this.delay = 1;
    }
}
export function CuiResizeComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "resize",
        create: (element, utils, prefix, attribute) => {
            return new CuiResizeHandler(element, utils, attribute);
        },
    });
}
export class CuiResizeHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiResizeHandler", element, attribute, new CuiResizeArgs(), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._lastValue = "";
        this._currentValue = "";
        this._isIntersecting = false;
        this._currentAction = undefined;
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._resizeValueCalculator = getResizeCalculator(this.args.mode);
        this._task = new CuiTaskRunner(this.args.delay, false, this.updateAction.bind(this));
        const intersectionObserver = new CuiIntersectionObserver(document.documentElement, [0, 0.1]);
        intersectionObserver.setCallback(this.onIntersection.bind(this));
        this.extend(cuiObserverExtension({
            type: "intersection",
            element: element,
            observer: intersectionObserver,
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.RESIZE,
            performer: callbackPerformer(this.resize.bind(this)),
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    handleUpdate() {
        this._resizeValueCalculator = getResizeCalculator(this.args.mode);
        this._isIntersecting = isInViewport(this.element);
        this._task.setTimeout(this.args.delay);
        this.setNewValue(calcWindowSize(window.innerWidth));
        this.updateElement();
    }
    resize(data) {
        this.setNewValue(data.current);
        this.updateElement();
    }
    onIntersection(entries) {
        if (entries.length > 0) {
            this._isIntersecting = entries[0].isIntersecting;
        }
        this.updateElement();
    }
    setNewValue(size) {
        let newValue = this._resizeValueCalculator.get(this.args, size);
        if (newValue !== this._currentValue) {
            this._currentValue = newValue;
        }
    }
    updateElement() {
        if (this.cannotUpdate()) {
            //this.logInfo("Not intersecting")
            return;
        }
        if (!this._currentValue || this._lastValue === this._currentValue) {
            //this.logWarning("Not eligible to set value: " + this._currentValue)
            return;
        }
        this._lastValue = this._currentValue;
        this._task.start();
    }
    /**
     * Checks whether element can be updated
     * @returns
     */
    cannotUpdate() {
        return !this._isIntersecting && this.args.mode === "smart";
    }
    /**
     * Used for task to update action on the element after receiving resize
     */
    updateAction() {
        //@ts-ignore already checked
        let newAction = CuiActionsFactory.get(this._currentValue);
        this._interactions.mutate(() => {
            if (this._currentAction) {
                this._currentAction.remove(this.element);
            }
            newAction.add(this.element);
            this._currentAction = newAction;
        });
    }
}
