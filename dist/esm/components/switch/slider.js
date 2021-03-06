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
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiTimeAnimationEngine, CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { SWIPE_ANIMATIONS_DEFINITIONS } from "../../core/animation/definitions";
import { calculateNextIndex, is, getChildrenHeight, isInRange, joinWithScopeSelector, getRangeValueOrDefault, all } from "../../core/utils/functions";
import { EVENTS, CLASSES } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { getEventBusFacade, CuiStyleHelper, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { getEaseTimingFunction } from "../..//core/animation/calculators";
import { eventExtension } from "../extensions/event/event";
import { getDefaultSwitchKeyCombo } from "../extensions/helpers/helpers";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { CuiSwitchExtension } from "../extensions/switch/switch";
import { getCuiKeyActionPerformer } from "../extensions/keys/performer";
import { CuiComponentBaseHook } from "../base";
import { sliderPerformer } from "../extensions/performers";
import { getCuiMutationPerformer } from "../extensions/mutations/performer";
import { CuiComponentMutationExtension } from "../extensions/mutations/mutations";
/**
 *
 *   targets: string - slider elements
 *   timeout: number - animation timeout
 *   links: string; - link to switcher (indicator, tab, etc)
 *   autoTimeout: number - if defined, slider will switch item automatically
 *   height: 'auto' | string - element height
 *   animation: string - animation name
 *   loop: boolean - allows to slide elements in loop
 */
const SWITCH_DEFAULT_TARGETS = " > li";
export class CuiSliderArgs extends CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super({
            props: {
                "targets": { corrector: joinWithScopeSelector },
                'swipeRatio': { corrector: (value) => getRangeValueOrDefault(value, 0.1, 0.9, 0.4) }
            }
        });
        this.targets = joinWithScopeSelector(SWITCH_DEFAULT_TARGETS);
        this.links = "";
        this.autoTimeout = -1;
        this.height = "";
        this.animation = "slide";
        this.loop = false;
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.swipeRatio = 0.3;
        this.keyChange = false;
    }
}
export function CuiSliderComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "slider",
        create: (element, utils, prefix, attribute) => {
            return new CuiSliderHandler(element, utils, attribute);
        }
    });
}
export class CuiSliderHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiSliderHandler", element, attribute, new CuiSliderArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this._targets = [];
        this._currentIdx = -1;
        this._nextIdx = -1;
        this._links = [];
        this._current = undefined;
        this._nextElement = null;
        this._currSlider = new CuiSwipeAnimationEngine(new CuiTimeAnimationEngine(getEaseTimingFunction()));
        this._nextSlider = new CuiSwipeAnimationEngine(new CuiTimeAnimationEngine(getEaseTimingFunction()));
        this._targetsCount = 0;
        this._task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this._animationDef = SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation];
        this._keysPerformer = getCuiKeyActionPerformer(this.switch.bind(this));
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, this.element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this._styles = new CuiStyleHelper();
        this._mutationPerformer = getCuiMutationPerformer(this.onMutation.bind(this));
        this._movePerformer = sliderPerformer(this.asyncClasses, {
            element: element,
            prevent: true,
            start: this.onDown.bind(this),
            progress: this.onMove.bind(this),
            end: this.onUp.bind(this),
            adjustRatio: this.adjustMoveRatio.bind(this)
        });
        this.extend(new CuiSwitchExtension(this._busFacade, this.switch.bind(this)));
        this.extend(new CuiKeysHandlerExtension(this.element, this._busFacade, this._keysPerformer));
        this.extend(eventExtension(this._busFacade, {
            type: "global-move",
            eventName: EVENTS.GLOBAL_MOVE,
            performer: this._movePerformer
        }));
        this.extend(new CuiComponentMutationExtension(element, this._mutationPerformer));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getTargets();
            this.getLinks();
            this.getActiveIndex();
            this.setLinkActive(-1, this._currentIdx);
            this.setElementHeight();
            this.handleUpdate();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setElementHeight();
            this.handleUpdate();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._task.stop();
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    onMutation(record) {
        this.getTargets();
        this.getLinks();
    }
    handleUpdate() {
        this._animationDef = SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation];
        this._mutationPerformer.setSelector(this.args.targets);
        this.setKeyCombo(this.args.keyChange);
        this.startTask();
    }
    setElementHeight() {
        this._interactions.mutate(() => {
            this._styles.setStyle('height', this.getElementHeight(this._targets[this._currentIdx]), this.element);
        });
    }
    onDown() {
        if (!this.lock()) {
            return false;
        }
        this._current = this._targets[this._currentIdx];
        this._currSlider.setElement(this._current);
        return true;
    }
    onMove(data) {
        if (!this._current) {
            return;
        }
        const direction = data.ratio > 0 ? "right" : "left";
        const absRatio = Math.abs(data.ratio);
        let nextIdx = calculateNextIndex(direction === 'left' ? "next" : "prev", this._currentIdx, this._targetsCount);
        if (nextIdx !== this._nextIdx) {
            this._nextElement && this.classes.removeClass(CLASSES.animProgress, this._nextElement);
            this._nextElement = this._targets[nextIdx];
            this._nextIdx = nextIdx;
            this._nextSlider.setElement(this._nextElement);
            this._nextSlider.setProps(this._animationDef.previous[direction]);
            this._currSlider.setProps(this._animationDef.current[direction]);
            this._interactions.mutate(() => {
                this._nextElement && this.classes.setClass(CLASSES.animProgress, this._nextElement);
            });
        }
        this._interactions.mutate(() => {
            this._currSlider.move(Math.abs(absRatio));
            this._nextSlider.move(Math.abs(absRatio));
        });
    }
    onUp(data) {
        let absRatio = Math.abs(data.ratio);
        const minVelo = 1 / this.args.timeout;
        const v = data.velocity > minVelo ? data.velocity : minVelo;
        let back = absRatio <= this.args.swipeRatio;
        //  const timeout = absRatio * this.args.timeout;
        Promise.all([
            this._currSlider.finish({ progress: absRatio, acceleration: data.acceleration, velocity: v, timeout: this.args.timeout, revert: back }),
            this._nextSlider.finish({ progress: absRatio, acceleration: data.acceleration, velocity: v, timeout: this.args.timeout, revert: back })
        ]).then((status) => {
            if (status)
                this.onAnimationFinish(this._current, back, false);
        }).catch((e) => {
            this.logError("An error", "onUp", e);
            this.onAnimationFinish(this._current, back, true);
        });
    }
    adjustMoveRatio(ratio) {
        if (this.args.loop) {
            return ratio;
        }
        if (this._currentIdx === 0 && ratio > 0) {
            return 0;
        }
        if (this._currentIdx === this._targetsCount - 1 && ratio < 0) {
            return 0;
        }
        return ratio;
    }
    /**
     * Api method to switch childrens
     * @param index - index to switch to
     */
    switch(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lock()) {
                return false;
            }
            this.onPushSwitch(index);
            return true;
        });
    }
    /**
     *
     * @param element element this animation was perfromed on
     * @param reverted - flag inidicating whether animation was performed to the end or reverted back to start
     * @param errorOccured - tells whether animation was finished with error
     */
    onAnimationFinish(element, reverted, errorOccured) {
        // If not go back or from push then switch, else was go back
        let next = this._targets[this._nextIdx];
        let current = this._targets[this._currentIdx];
        this._interactions.mutate(() => {
            this.classes.removeClass(CLASSES.animProgress, next);
            this._styles.clean(current);
            this._styles.clean(next);
            if (!reverted) {
                this.classes.setClass(this.activeClassName, next);
                this.classes.removeClass(this.activeClassName, current);
                this.setLinkActive(this._currentIdx, this._nextIdx);
                this._busFacade.emit(EVENTS.SWITCHED, {
                    timestamp: Date.now(),
                    index: this._nextIdx
                });
                this._currentIdx = this._nextIdx;
            }
            this.clearSlideData();
            this.unlock();
        });
        this.startTask();
    }
    onPushSwitch(index) {
        if (!is(index) ||
            !this._animationDef ||
            (!this.args.loop && this._currentIdx === 0 && index === 'prev') ||
            (!this.args.loop && this._currentIdx === this._targetsCount - 1 && index === 'next')) {
            this.unlock();
            return;
        }
        let nextIdx = calculateNextIndex(index, this._currentIdx, this._targetsCount);
        if (nextIdx == this._currentIdx || nextIdx < 0 || nextIdx >= this._targets.length) {
            this.log.warning(`Index ${index} is not within the suitable range`);
            return false;
        }
        this._nextIdx = nextIdx;
        let current = this._targets[this._currentIdx];
        let next = this._targets[this._nextIdx];
        this._currSlider.setElement(current);
        this._nextSlider.setElement(next);
        this._currSlider.setProps(index === 'prev' ? this._animationDef.current.left : this._animationDef.current.right);
        this._nextSlider.setProps(index === 'prev' ? this._animationDef.previous.left : this._animationDef.previous.right);
        this._interactions.mutate(() => {
            this.classes.setClass(CLASSES.animProgress, next);
        });
        Promise.all([
            this._currSlider.finish({ progress: 0, acceleration: 1, velocity: 0, timeout: this.args.timeout, revert: false }),
            this._nextSlider.finish({ progress: 0, acceleration: 1, velocity: 0, timeout: this.args.timeout, revert: false })
        ]).then((statuses) => {
            let status = all(statuses, (status) => status === true);
            if (status)
                this.onAnimationFinish(current, false, false);
        }).catch((e) => {
            this.logError("An error", "onUp", e);
            this.onAnimationFinish(current, false, true);
        });
    }
    getActiveIndex() {
        this._currentIdx = is(this._targets) ? this._targets.findIndex(target => this.classes.hasClass(this.activeClassName, target)) : -1;
    }
    clearSlideData() {
        this._nextIdx = -1;
        this._nextElement = null;
    }
    getElementHeight(current) {
        if (!is(this.args.height) || this.args.height === 'auto') {
            return getChildrenHeight(current) + "px";
        }
        else {
            return this.args.height;
        }
    }
    setKeyCombo(flag) {
        if (!flag) {
            this._keysPerformer.setKeyCombos([]);
            return;
        }
        this._keysPerformer.setKeyCombos([{
                key: 'next',
                value: getDefaultSwitchKeyCombo("ArrowRight")
            }, {
                key: "prev",
                value: getDefaultSwitchKeyCombo("ArrowLeft")
            }]);
    }
    /**
     * Queries targets
     */
    getTargets() {
        this._targets = [...this.element.querySelectorAll(this.args.targets)];
        this._targetsCount = this._targets.length;
    }
    /**
     * Get linked switcher elements
     */
    getLinks() {
        this._links = is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : [];
    }
    /**
     * Set active class on linked switcher if set
     * @param current - current index (to remove active from)
     * @param next - next index (to set action on)
     */
    setLinkActive(current, next) {
        if (!is(this._links)) {
            return;
        }
        this._interactions.mutate(() => {
            if (isInRange(current, 0, this._links.length - 1)) {
                this.classes.removeClass(this.activeClassName, this._links[current]);
            }
            if (isInRange(next, 0, this._links.length - 1)) {
                this.classes.setClass(this.activeClassName, this._links[next]);
            }
        });
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        this._task.stop();
        if (this.args.autoTimeout) {
            this._task.start();
        }
    }
}
