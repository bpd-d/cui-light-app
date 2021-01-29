var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prefix, _defTimeout, _targets, _currentIdx, _links, _task, _switchEventId, _isTracking, _startX, _swipeRatio, _nextIdx, _nextElement, _ratioThreshold, _currSlider, _nextSlider, _animationDef, _targetsCount, _moveEventId;
import { CuiMutableHandler } from "../../core/handlers/base";
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { SWIPE_ANIMATIONS_DEFINITIONS } from "../../core/animation/definitions";
import { getStringOrDefault, getIntOrDefault, boolStringOrDefault, calculateNextIndex, is, getChildrenHeight, isInRange } from "../../core/utils/functions";
import { SCOPE_SELECTOR, EVENTS, CLASSES } from "../../core/utils/statics";
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
const SWITCH_DEFAULT_TARGETS = "> li";
export class CuiSliderArgs {
    constructor(prefix, timeout) {
        _prefix.set(this, void 0);
        _defTimeout.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix);
        __classPrivateFieldSet(this, _defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        this.targets = SWITCH_DEFAULT_TARGETS;
        this.timeout = __classPrivateFieldGet(this, _defTimeout);
        this.links = "";
        this.autoTimeout = -1;
        this.height = "";
        this.animation = "";
        this.loop = false;
    }
    parse(args) {
        this.targets = SCOPE_SELECTOR + getStringOrDefault(args.targets, SWITCH_DEFAULT_TARGETS);
        this.timeout = getIntOrDefault(args.timeout, __classPrivateFieldGet(this, _defTimeout));
        this.links = args.links;
        this.autoTimeout = getIntOrDefault(args.autoTimeout, -1);
        this.height = getStringOrDefault(args.height, 'auto');
        this.animation = getStringOrDefault(args.animation, 'slide');
        this.loop = boolStringOrDefault(args.loop, false);
    }
}
_prefix = new WeakMap(), _defTimeout = new WeakMap();
export class CuiSliderComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-slider`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiSliderHandler(element, utils, this.attribute);
    }
}
export class CuiSliderHandler extends CuiMutableHandler {
    constructor(element, utils, attribute) {
        super("CuiSliderHandler", element, attribute, new CuiSliderArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        _targets.set(this, void 0);
        _currentIdx.set(this, void 0);
        _links.set(this, void 0);
        _task.set(this, void 0);
        _switchEventId.set(this, void 0);
        //  #moveListener: CuiMoveEventListener;
        _isTracking.set(this, void 0);
        _startX.set(this, void 0);
        _swipeRatio.set(this, void 0);
        _nextIdx.set(this, void 0);
        _nextElement.set(this, void 0);
        _ratioThreshold.set(this, void 0);
        _currSlider.set(this, void 0);
        _nextSlider.set(this, void 0);
        _animationDef.set(this, void 0);
        _targetsCount.set(this, void 0);
        _moveEventId.set(this, void 0);
        __classPrivateFieldSet(this, _targets, []);
        __classPrivateFieldSet(this, _currentIdx, -1);
        __classPrivateFieldSet(this, _nextIdx, -1);
        __classPrivateFieldSet(this, _links, []);
        __classPrivateFieldSet(this, _switchEventId, null);
        __classPrivateFieldSet(this, _moveEventId, null);
        __classPrivateFieldSet(this, _isTracking, false);
        __classPrivateFieldSet(this, _startX, -1);
        __classPrivateFieldSet(this, _swipeRatio, 0);
        __classPrivateFieldSet(this, _nextElement, null);
        __classPrivateFieldSet(this, _ratioThreshold, 0.4);
        __classPrivateFieldSet(this, _currSlider, new CuiSwipeAnimationEngine());
        __classPrivateFieldSet(this, _nextSlider, new CuiSwipeAnimationEngine());
        __classPrivateFieldGet(this, _currSlider).setOnFinish(this.onAnimationFinish.bind(this));
        __classPrivateFieldSet(this, _targetsCount, 0);
        __classPrivateFieldSet(this, _task, new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
        __classPrivateFieldSet(this, _animationDef, SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation]);
    }
    onInit() {
        __classPrivateFieldSet(this, _switchEventId, this.onEvent(EVENTS.SWITCH, this.onPushSwitch.bind(this)));
        __classPrivateFieldSet(this, _moveEventId, this.onEvent(EVENTS.GLOBAL_MOVE, this.onMove.bind(this)));
        this.getTargets();
        this.getLinks();
        this.getActiveIndex();
        this.setLinkActive(-1, __classPrivateFieldGet(this, _currentIdx));
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(__classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)]));
        });
        __classPrivateFieldSet(this, _task, new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
        __classPrivateFieldSet(this, _animationDef, SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation]);
        this.startTask();
    }
    onUpdate() {
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(__classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)]));
        });
        __classPrivateFieldSet(this, _animationDef, SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation]);
        this.startTask();
    }
    onDestroy() {
        __classPrivateFieldGet(this, _task).stop();
        this.detachEvent(EVENTS.SWITCH, __classPrivateFieldGet(this, _switchEventId));
        this.detachEvent(EVENTS.GLOBAL_MOVE, __classPrivateFieldGet(this, _moveEventId));
    }
    onMutation(record) {
    }
    /**
     * Move listener callback
     * @param data move listener data
     */
    onMove(data) {
        if (this.isLocked || !__classPrivateFieldGet(this, _animationDef)) {
            return;
        }
        let current = __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)];
        switch (data.type) {
            case "down":
                if (__classPrivateFieldGet(this, _isTracking) || !current.contains(data.target)) {
                    return;
                }
                __classPrivateFieldSet(this, _isTracking, true);
                __classPrivateFieldSet(this, _startX, data.x);
                __classPrivateFieldGet(this, _currSlider).setElement(current);
                this.helper.setClassesAs(document.body, CLASSES.swipingOn);
                if (data.event.cancelable)
                    data.event.preventDefault();
                break;
            case "up":
                if (!__classPrivateFieldGet(this, _isTracking)) {
                    break;
                }
                // Lock component until animation is finished
                this.isLocked = true;
                let absRatio = Math.abs(__classPrivateFieldGet(this, _swipeRatio));
                let timeout = absRatio * this.args.timeout;
                let back = absRatio <= __classPrivateFieldGet(this, _ratioThreshold);
                __classPrivateFieldGet(this, _currSlider).finish(absRatio, timeout, back);
                __classPrivateFieldGet(this, _nextSlider).finish(absRatio, timeout, back);
                this.helper.removeClassesAs(document.body, CLASSES.swipingOn);
                __classPrivateFieldSet(this, _isTracking, false);
                break;
            case "move":
                if (!__classPrivateFieldGet(this, _isTracking)) {
                    break;
                }
                let newRatio = (data.x - __classPrivateFieldGet(this, _startX)) / current.offsetWidth;
                if (Math.abs(newRatio - __classPrivateFieldGet(this, _swipeRatio)) < 0.02) {
                    break;
                }
                let nextIdx = calculateNextIndex(__classPrivateFieldGet(this, _swipeRatio) > 0 ? "next" : "prev", __classPrivateFieldGet(this, _currentIdx), __classPrivateFieldGet(this, _targetsCount));
                __classPrivateFieldSet(this, _swipeRatio, this.adjustMoveRatio(newRatio));
                if (nextIdx !== __classPrivateFieldGet(this, _nextIdx)) {
                    __classPrivateFieldGet(this, _nextElement) && this.helper.removeClass(CLASSES.animProgress, __classPrivateFieldGet(this, _nextElement));
                    __classPrivateFieldSet(this, _nextElement, __classPrivateFieldGet(this, _targets)[nextIdx]);
                    __classPrivateFieldSet(this, _nextIdx, nextIdx);
                    __classPrivateFieldGet(this, _nextSlider).setElement(__classPrivateFieldGet(this, _nextElement));
                    __classPrivateFieldGet(this, _nextSlider).setProps(__classPrivateFieldGet(this, _swipeRatio) > 0 ? __classPrivateFieldGet(this, _animationDef).previous.right : __classPrivateFieldGet(this, _animationDef).previous.left);
                    __classPrivateFieldGet(this, _currSlider).setProps(__classPrivateFieldGet(this, _swipeRatio) > 0 ? __classPrivateFieldGet(this, _animationDef).current.right : __classPrivateFieldGet(this, _animationDef).current.left);
                    this.mutate(() => {
                        __classPrivateFieldGet(this, _nextElement) && this.helper.setClass(CLASSES.animProgress, __classPrivateFieldGet(this, _nextElement));
                    });
                }
                this.mutate(() => {
                    __classPrivateFieldGet(this, _currSlider).update(Math.abs(__classPrivateFieldGet(this, _swipeRatio)));
                    __classPrivateFieldGet(this, _nextSlider).update(Math.abs(__classPrivateFieldGet(this, _swipeRatio)));
                });
                if (data.event.cancelable)
                    data.event.preventDefault();
                break;
            default:
                break;
        }
    }
    adjustMoveRatio(ratio) {
        if (this.args.loop) {
            return ratio;
        }
        if (__classPrivateFieldGet(this, _currentIdx) === __classPrivateFieldGet(this, _targetsCount) - 1 && ratio > 0) {
            return 0;
        }
        if (__classPrivateFieldGet(this, _currentIdx) === 0 && ratio < 0) {
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
            if (this.isLocked) {
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
        this.isLocked = false;
        // If not go back or from push then switch, else was go back
        let next = __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _nextIdx)];
        let current = __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)];
        if (!reverted) {
            if (__classPrivateFieldGet(this, _nextIdx) > -1) {
                this.mutate(() => {
                    this.helper.removeClass(CLASSES.animProgress, next);
                    this.helper.setClass(this.activeClassName, next);
                    this.helper.removeClass(this.activeClassName, current);
                    this.helper.removeAttribute("style", current);
                    this.helper.removeAttribute("style", next);
                    this.setLinkActive(__classPrivateFieldGet(this, _currentIdx), __classPrivateFieldGet(this, _nextIdx));
                    this.emitEvent(EVENTS.SWITCHED, {
                        timestamp: Date.now(),
                        index: __classPrivateFieldGet(this, _nextIdx)
                    });
                    __classPrivateFieldSet(this, _currentIdx, __classPrivateFieldGet(this, _nextIdx));
                    __classPrivateFieldSet(this, _nextIdx, -1);
                    __classPrivateFieldSet(this, _nextElement, null);
                    __classPrivateFieldSet(this, _startX, -1);
                    __classPrivateFieldSet(this, _swipeRatio, 0);
                });
            }
        }
        else {
            if (is(__classPrivateFieldGet(this, _nextElement))) {
                //@ts-ignore
                this.helper.removeClass(CLASSES.animProgress, __classPrivateFieldGet(this, _nextElement));
                //@ts-ignore
                this.helper.removeAttribute("style", __classPrivateFieldGet(this, _nextElement));
            }
            this.helper.removeAttribute("style", current);
            __classPrivateFieldSet(this, _nextIdx, -1);
            __classPrivateFieldSet(this, _nextElement, null);
            __classPrivateFieldSet(this, _startX, -1);
            __classPrivateFieldSet(this, _swipeRatio, 0);
        }
        this.startTask();
    }
    onPushSwitch(index) {
        if (!is(index) ||
            this.isLocked ||
            !__classPrivateFieldGet(this, _animationDef) ||
            (!this.args.loop && __classPrivateFieldGet(this, _currentIdx) === 0 && index === 'prev') ||
            (!this.args.loop && __classPrivateFieldGet(this, _currentIdx) === __classPrivateFieldGet(this, _targetsCount) - 1 && index === 'next')) {
            return;
        }
        this.isLocked = true;
        let nextIdx = calculateNextIndex(index, __classPrivateFieldGet(this, _currentIdx), __classPrivateFieldGet(this, _targetsCount));
        if (nextIdx == __classPrivateFieldGet(this, _currentIdx) || nextIdx < 0 || nextIdx >= __classPrivateFieldGet(this, _targets).length) {
            this._log.warning(`Index ${index} is not within the suitable range`);
            return false;
        }
        __classPrivateFieldSet(this, _nextIdx, nextIdx);
        let current = __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)];
        let next = __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _nextIdx)];
        __classPrivateFieldGet(this, _currSlider).setElement(current);
        __classPrivateFieldGet(this, _nextSlider).setElement(next);
        __classPrivateFieldGet(this, _currSlider).setProps(index === 'prev' ? __classPrivateFieldGet(this, _animationDef).current.left : __classPrivateFieldGet(this, _animationDef).current.right);
        __classPrivateFieldGet(this, _nextSlider).setProps(index === 'prev' ? __classPrivateFieldGet(this, _animationDef).previous.left : __classPrivateFieldGet(this, _animationDef).previous.right);
        this.mutate(() => {
            __classPrivateFieldGet(this, _currSlider).finish(0, this.args.timeout, false);
            __classPrivateFieldGet(this, _nextSlider).finish(0, this.args.timeout, false);
            this.helper.setClass(CLASSES.animProgress, next);
        });
    }
    getActiveIndex() {
        __classPrivateFieldSet(this, _currentIdx, is(__classPrivateFieldGet(this, _targets)) ? __classPrivateFieldGet(this, _targets).findIndex(target => this.helper.hasClass(this.activeClassName, target)) : -1);
    }
    getElementHeight(current) {
        if (!is(this.args.height) || this.args.height === 'auto') {
            return getChildrenHeight(current) + "px";
        }
        else {
            return this.args.height;
        }
    }
    /**
     * Queries targets
     */
    getTargets() {
        let t = this.element.querySelectorAll(this.args.targets);
        __classPrivateFieldSet(this, _targets, t.length > 0 ? [...t] : []);
        __classPrivateFieldSet(this, _targetsCount, __classPrivateFieldGet(this, _targets).length);
    }
    /**
     * Get linked switcher elements
     */
    getLinks() {
        __classPrivateFieldSet(this, _links, is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : []);
    }
    /**
     * Set active class on linked switcher if set
     * @param current - current index (to remove active from)
     * @param next - next index (to set action on)
     */
    setLinkActive(current, next) {
        if (!is(__classPrivateFieldGet(this, _links))) {
            return;
        }
        this.mutate(() => {
            if (isInRange(current, 0, __classPrivateFieldGet(this, _links).length - 1)) {
                this.helper.removeClass(this.activeClassName, __classPrivateFieldGet(this, _links)[current]);
            }
            if (isInRange(next, 0, __classPrivateFieldGet(this, _links).length - 1)) {
                this.helper.setClass(this.activeClassName, __classPrivateFieldGet(this, _links)[next]);
            }
        });
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        __classPrivateFieldGet(this, _task).stop();
        if (this.args.autoTimeout) {
            __classPrivateFieldGet(this, _task).start();
        }
    }
}
_targets = new WeakMap(), _currentIdx = new WeakMap(), _links = new WeakMap(), _task = new WeakMap(), _switchEventId = new WeakMap(), _isTracking = new WeakMap(), _startX = new WeakMap(), _swipeRatio = new WeakMap(), _nextIdx = new WeakMap(), _nextElement = new WeakMap(), _ratioThreshold = new WeakMap(), _currSlider = new WeakMap(), _nextSlider = new WeakMap(), _animationDef = new WeakMap(), _targetsCount = new WeakMap(), _moveEventId = new WeakMap();
