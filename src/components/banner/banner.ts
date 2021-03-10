import { AnimationDefinition, SWIPE_ANIMATIONS_DEFINITIONS } from "../../core/animation/definitions";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../core/handlers/base";
import { CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { ICuiMoveData } from "../../core/listeners/move";
import { AriaAttributes } from "../../core/utils/aria";
import { replacePrefix } from "../../core/utils/functions";
import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { EVENTS, CLASSES } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

const BANNER_OPEN_ANIMATION: string = ".{prefix}-animation-fade-in";
const BANNER_CLOSE_ANIMATION: string = ".{prefix}-animation-fade-out";

export class CuiBannerArgs extends CuiAutoParseArgs implements CuiInteractableArgs {
    timeout: number;
    openAct: string;
    closeAct: string;
    // Not in use
    escClose: boolean;
    keyClose: string;

    swipe: boolean;

    constructor(prefix: string, timeout?: number) {
        super();
        this.escClose = false;
        this.keyClose = "";
        this.timeout = timeout ?? 300;
        this.swipe = false;
        this.openAct = replacePrefix(BANNER_OPEN_ANIMATION, prefix);
        this.closeAct = replacePrefix(BANNER_CLOSE_ANIMATION, prefix);
    }
}


export class CuiBanerComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;

    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-banner`;

    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiBannerHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiBannerHandler extends CuiInteractableHandler<CuiBannerArgs> {
    #swipeEngine: CuiSwipeAnimationEngine;
    #isTracking: boolean;
    #startX: number;
    #ratio: number;
    #swipeAnimation: AnimationDefinition;
    #moveEventId: string | null;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiBannerHandler", element, attribute, new CuiBannerArgs(prefix, utils.setup.animationTime), utils);
        this.#swipeEngine = new CuiSwipeAnimationEngine(true);
        this.#swipeEngine.setOnFinish(this.onSwipeFinish.bind(this));
        this.#swipeEngine.setElement(this.element)
        this.#startX = -1;
        this.#ratio = 0;
        this.#swipeAnimation = SWIPE_ANIMATIONS_DEFINITIONS["fade"];
        this.#moveEventId = null;
        this.#isTracking = false;
    }

    onInit(): void {
    }

    onUpdate(): void {

    }

    onDestroy(): void {
        this.detachEvent(EVENTS.GLOBAL_MOVE, this.#moveEventId);
    }

    onBeforeOpen(): boolean {
        return true;
    }

    onAfterOpen(): void {
        if (this.args.swipe) {
            this.#moveEventId = this.onEvent(EVENTS.GLOBAL_MOVE, this.onMove.bind(this));
        }
    }
    onAfterClose(): void {
        this.detachEvent(EVENTS.GLOBAL_MOVE, this.#moveEventId);
    }

    onBeforeClose(): boolean {
        return true;
    }

    onMove(data: ICuiMoveData) {
        if (this.isLocked) {
            return;
        }
        let current = this.element as HTMLElement;
        switch (data.type) {
            case "down":
                if (this.#isTracking || !current.contains((data.target as Node))) {
                    return;
                }
                this.#isTracking = true;
                this.#startX = data.x;
                this.helper.setClassesAs(document.body, CLASSES.swipingOn);
                data.event.preventDefault();
                break;
            case "up":
                if (!this.#isTracking && this.#ratio == 0) {
                    break;
                }

                let absRatio = Math.abs(this.#ratio);
                let timeout = absRatio * this.args.timeout;
                let back = absRatio <= 0.4;
                // Lock component until animation is finished
                this.isLocked = true;
                this.#swipeEngine.finish(absRatio, timeout, back);
                this.helper.removeClassesAs(document.body, CLASSES.swipingOn);
                this.#isTracking = false;
                break;
            case "move":
                if (this.#isTracking) {
                    let newRatio = (data.x - this.#startX) / current.offsetWidth;
                    if (this.#ratio >= 0 && newRatio <= 0 || this.#ratio <= 0 && newRatio > 0) {
                        this.#swipeEngine.setProps(newRatio > 0 ? this.#swipeAnimation.current.right : this.#swipeAnimation.current.left);
                    }
                    this.#ratio = newRatio;
                    this.mutate(() => {
                        this.#swipeEngine.update(Math.abs(this.#ratio));
                    })
                    data.event.preventDefault();
                }
                break;
            default:
                break;
        }
    }

    onSwipeFinish(element: Element | undefined, reverted: boolean, error: boolean) {
        this.isLocked = false;
        if (!reverted) {
            this.helper.removeClass(this.activeClassName, this.element)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        }
        this.#ratio = 0;
        this.#startX = 0;

    }
}