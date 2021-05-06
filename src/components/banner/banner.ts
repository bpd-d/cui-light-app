import { AnimationDefinition, SWIPE_ANIMATIONS_DEFINITIONS } from "../../core/animation/definitions";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiTimeAnimationEngine, CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { AriaAttributes } from "../../core/utils/aria";
import { replacePrefix } from "../../core/utils/functions";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { ICuiMoveExtensionPerformer } from "../extensions/move/performer";
import { getEventBusFacade, getCuiHandlerInteractions, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { closeActionsPerformer, ICuiActionExtensionPerformer, ICuiSliderProgress, sliderPerformer } from "../extensions/performers";
import { getActionsHelper } from "../../core/helpers/helpers";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getLinearTimingFunction } from "../../core/animation/calculators";
import { ICuiSlideEngine } from "src/core/animation/interfaces";

//const BANNER_OPEN_ANIMATION: string = ".{prefix}-animation-fade-in";
const BANNER_CLOSE_ANIMATION: string = ".{prefix}-animation-fade-out";

export class CuiBannerArgs extends CuiAutoParseArgs {
    timeout: number;
    closeAct: string;
    swipe: boolean;

    constructor(prefix: string, timeout?: number) {
        super();

        this.timeout = timeout ?? 300;
        this.swipe = false;
        this.closeAct = replacePrefix(BANNER_CLOSE_ANIMATION, prefix);
    }
}

export function CuiBannerComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "banner",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiBannerHandler(element, utils, attribute, prefix);
        }
    })
}

export class CuiBannerHandler extends CuiHandlerBase<CuiBannerArgs> {

    private _swipeEngine: ICuiSlideEngine;
    private _swipeAnimation: AnimationDefinition;
    private _movePerformer: ICuiMoveExtensionPerformer;
    private _busFacade: ICuiEventBusFacade;
    private _closeActionPerformer: ICuiActionExtensionPerformer<any>;
    private _interactions: ICuiInteractionsFacade;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string) {
        super("CuiBannerHandler", element, attribute, new CuiBannerArgs(prefix, utils.setup.animationTime), utils);
        this._swipeEngine = new CuiSwipeAnimationEngine(new CuiTimeAnimationEngine(getLinearTimingFunction()));
        this._swipeEngine.setElement(this.element)
        this._swipeAnimation = SWIPE_ANIMATIONS_DEFINITIONS["fade"];
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._busFacade = getEventBusFacade(this.getId(), utils.bus, element);
        this._movePerformer = sliderPerformer(this.asyncClasses, {
            start: () => { return true },
            progress: this.onMove.bind(this),
            end: this.onUp.bind(this),
            element: element
        })

        this._closeActionPerformer = closeActionsPerformer(getActionsHelper(utils.interactions), this._busFacade, {
            isActive: this.isActive.bind(this),
            onFinish: () => {
                this._movePerformer.setEnabled(false);
            }
        }, {
            element: element,
            active: this.activeAction
        })

        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer,
        }))

        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.GLOBAL_MOVE,
            performer: this._movePerformer
        }))

    }

    async onHandle(): Promise<boolean> {
        this._interactions.mutate(() => {
            if (!this.classes.hasClass(this.activeClassName, this.element))
                this.classes.setClass(this.activeClassName, this.element)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
            AriaAttributes.setAria(this.element, 'aria-hidden', 'false');
        })
        this.updateSetup();
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

    private updateSetup() {
        this._movePerformer.setEnabled(this.args.swipe);
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.closeAct)
        })
    }

    private onMove(data: ICuiSliderProgress) {
        this._swipeEngine.setProps(data.ratio > 0 ? this._swipeAnimation.current.right : this._swipeAnimation.current.left);
        this._interactions.mutate(() => {
            this._swipeEngine.move(Math.abs(data.ratio));
        })
    }

    private onUp(data: ICuiSliderProgress) {
        let absRatio = Math.abs(data.ratio);
        let back = absRatio <= 0.4;
        // Lock component until animation is finished
        const minVelo = 1 / this.args.timeout;
        const v = data.velocity > minVelo ? data.velocity : minVelo;

        this._swipeEngine.finish({ progress: absRatio, acceleration: data.acceleration, velocity: v, timeout: this.args.timeout, revert: back }).then(status => {
            if (!status || back) {
                return
            }
            this.asyncClasses.removeClasses(this.element, this.activeClassName)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
            AriaAttributes.setAria(this.element, 'aria-hidden', 'true');
            this._movePerformer.setEnabled(false);
        });
    }
}