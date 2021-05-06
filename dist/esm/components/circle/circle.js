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
import { is, getRangeValue } from "../../core/utils/functions";
import { ICONS, EVENTS } from "../../core/utils/statics";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { eventExtension } from "../extensions/event/event";
import { getEventBusFacade, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { callbackPerformer } from "../extensions/performers";
export class CuiCircleArgs extends CuiAutoParseArgs {
    constructor() {
        super();
        this.progress = 0;
    }
}
export function CuiCircleComponent(prefix) {
    ICONS['special_circle_progress'] = "<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"circle-progress\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-progress-path\" d=\"M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047\"></path></svg>";
    return CuiComponentBaseHook({
        name: 'circle-progress',
        prefix: prefix,
        create: (element, utils, prefix, attribute) => {
            return new CuiCircleHandler(element, utils, attribute);
        }
    });
}
export class CuiCircleHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiCircleHandler", element, attribute, new CuiCircleArgs(), utils);
        this._factor = this._full = 0;
        this._path = null;
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.PROGRESS_CHANGE,
            performer: callbackPerformer(this.onSetProgress.bind(this))
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            const iconSvg = new IconBuilder(ICONS['special_circle_progress']).build();
            if (!is(iconSvg)) {
                this.logError("SVG circle was not created", "onInit");
                return false;
            }
            const svg = this.element.querySelector('svg');
            if (is(svg)) {
                //@ts-ignore svg checked
                svg.remove();
            }
            //@ts-ignore iconSvg checked
            this.element.appendChild(iconSvg);
            this._path = this.element.querySelector('.circle-progress-path');
            this._full = this._path.getTotalLength();
            this._factor = this._full / 100;
            this._interactions.fetch(this.readStyle);
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this._interactions.fetch(this.readStyle);
            this._busFacade.emit(EVENTS.PROGRESS_CHANGED, {
                timestamp: Date.now(),
                progress: this.args.progress
            });
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onSetProgress(val) {
        if (is(val)) {
            this.element.setAttribute(this.attribute, val);
        }
    }
    updateStyle(value) {
        this._path.style.strokeDashoffset = value;
    }
    readStyle() {
        if (this.prevArgs && this.args.progress === this.prevArgs.progress) {
            return;
        }
        const progress = getRangeValue(this.args.progress, 0, 100);
        this._interactions.mutate(this.updateStyle, this._full - this._factor * progress);
    }
}
