var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SWIPE_ANIMATIONS_DEFINITIONS } from "../../core/animation/definitions";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiTimeAnimationEngine, CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { AriaAttributes } from "../../core/utils/aria";
import { replacePrefix } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getEventBusFacade, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { closeActionsPerformer, sliderPerformer } from "../extensions/performers";
import { getActionsHelper } from "../../core/helpers/helpers";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getLinearTimingFunction } from "../../core/animation/calculators";
//const BANNER_OPEN_ANIMATION: string = ".{prefix}-animation-fade-in";
const BANNER_CLOSE_ANIMATION = ".{prefix}-animation-fade-out";
export class CuiBannerArgs extends CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super();
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.swipe = false;
        this.closeAct = replacePrefix(BANNER_CLOSE_ANIMATION, prefix);
    }
}
export function CuiBannerComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "banner",
        create: (element, utils, prefix, attribute) => {
            return new CuiBannerHandler(element, utils, attribute, prefix);
        }
    });
}
export class CuiBannerHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiBannerHandler", element, attribute, new CuiBannerArgs(prefix, utils.setup.animationTime), utils);
        this._swipeEngine = new CuiSwipeAnimationEngine(new CuiTimeAnimationEngine(getLinearTimingFunction()));
        this._swipeEngine.setElement(this.element);
        this._swipeAnimation = SWIPE_ANIMATIONS_DEFINITIONS["fade"];
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._busFacade = getEventBusFacade(this.getId(), utils.bus, element);
        this._movePerformer = sliderPerformer(this.asyncClasses, {
            start: () => { return true; },
            progress: this.onMove.bind(this),
            end: this.onUp.bind(this),
            element: element
        });
        this._closeActionPerformer = closeActionsPerformer(getActionsHelper(utils.interactions), this._busFacade, {
            isActive: this.isActive.bind(this),
            onFinish: () => {
                this._movePerformer.setEnabled(false);
            }
        }, {
            element: element,
            active: this.activeAction
        });
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer,
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.GLOBAL_MOVE,
            performer: this._movePerformer
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this._interactions.mutate(() => {
                if (!this.classes.hasClass(this.activeClassName, this.element))
                    this.classes.setClass(this.activeClassName, this.element);
                AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
                AriaAttributes.setAria(this.element, 'aria-hidden', 'false');
            });
            this.updateSetup();
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
    updateSetup() {
        this._movePerformer.setEnabled(this.args.swipe);
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.closeAct)
        });
    }
    onMove(data) {
        this._swipeEngine.setProps(data.ratio > 0 ? this._swipeAnimation.current.right : this._swipeAnimation.current.left);
        this._interactions.mutate(() => {
            this._swipeEngine.move(Math.abs(data.ratio));
        });
    }
    onUp(data) {
        let absRatio = Math.abs(data.ratio);
        let back = absRatio <= 0.4;
        // Lock component until animation is finished
        const minVelo = 1 / this.args.timeout;
        const v = data.velocity > minVelo ? data.velocity : minVelo;
        this._swipeEngine.finish({ progress: absRatio, acceleration: data.acceleration, velocity: v, timeout: this.args.timeout, revert: back }).then(status => {
            if (!status || back) {
                return;
            }
            this.asyncClasses.removeClasses(this.element, this.activeClassName);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
            AriaAttributes.setAria(this.element, 'aria-hidden', 'true');
            this._movePerformer.setEnabled(false);
        });
    }
}
