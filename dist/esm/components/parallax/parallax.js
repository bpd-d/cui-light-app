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
var _scrollListener, _defaultAnimator, _targetSetup;
import { CuiMutableHandler } from "../../core/handlers/base";
import { CuiIntersectionListener } from "../../core/intersection/intersection";
import { CuiAutoParseArgs } from "../..//core/utils/arguments";
import { getChildSelectorFromScoped, getIntOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { ParallaxAnimatorsHandler } from "./animator";
const PARALLAX_ATTRIBUTE_ANIMATTION = 'data-parallax-animation';
const PARALLAX_ATTRIBUTE_START = 'data-parallax-start-ratio';
const PARALLAX_ATTRIBUTE_STOP = 'data-parallax-stop-ratio';
export class CuiParallaxArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                "targets": { corrector: joinWithScopeSelector }
            }
        });
        this.root = false;
        this.targets = joinWithScopeSelector("> *");
        this.startRatio = 0;
        this.stopRatio = 1;
        this.animation = "";
    }
}
export class CuiParallaxComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-parallax`;
    }
    getStyle() {
        return "";
    }
    get(element, sutils) {
        return new CuiParallaxHandler(element, sutils, this.attribute);
    }
}
export class CuiParallaxHandler extends CuiMutableHandler {
    constructor(element, utils, attribute) {
        super("CuiParallaxHandler", element, attribute, new CuiParallaxArgs(), utils);
        _scrollListener.set(this, void 0);
        _defaultAnimator.set(this, void 0);
        _targetSetup.set(this, void 0);
        __classPrivateFieldSet(this, _scrollListener, undefined);
        __classPrivateFieldSet(this, _defaultAnimator, undefined);
        __classPrivateFieldSet(this, _targetSetup, []);
    }
    onInit() {
        __classPrivateFieldSet(this, _defaultAnimator, new ParallaxAnimatorsHandler(this.args.animation, this.utils.setup.parallaxAnimations[this.args.animation]));
        this.setMutationSelector(getChildSelectorFromScoped(this.args.targets));
        __classPrivateFieldSet(this, _targetSetup, this.getTargets());
        __classPrivateFieldSet(this, _scrollListener, new CuiIntersectionListener(this.getParent(), { threshold: this.utils.setup.scrollThreshold }));
        __classPrivateFieldGet(this, _scrollListener).setCallback(this.onIntersection.bind(this));
        __classPrivateFieldGet(this, _scrollListener).setChildren(__classPrivateFieldGet(this, _targetSetup).map(item => item.element));
        __classPrivateFieldGet(this, _scrollListener).attach();
    }
    onUpdate() {
        if (!this.prevArgs || !__classPrivateFieldGet(this, _scrollListener)) {
            return;
        }
        if (this.prevArgs.targets !== this.args.targets) {
            this.clean();
            this.setMutationSelector(getChildSelectorFromScoped(this.args.targets));
            __classPrivateFieldSet(this, _targetSetup, this.getTargets());
            __classPrivateFieldGet(this, _scrollListener).setChildren(__classPrivateFieldGet(this, _targetSetup).map(item => item.element));
        }
        if (this.prevArgs.root !== this.args.root) {
            __classPrivateFieldGet(this, _scrollListener).setParent(this.getParent());
        }
    }
    onDestroy() {
        this.clean();
        if (__classPrivateFieldGet(this, _scrollListener)) {
            __classPrivateFieldGet(this, _scrollListener).detach();
        }
    }
    onIntersection(ev) {
        this.mutate(() => {
            ev.items.forEach((item, index) => {
                if (index >= __classPrivateFieldGet(this, _targetSetup).length) {
                    return;
                }
                const setup = __classPrivateFieldGet(this, _targetSetup)[index];
                if (setup.animator)
                    setup.animator.perform(item.element, calculateRatio(setup.start, setup.stop, item.verticalRatio));
            });
        });
    }
    onMutation(record) {
        if (!__classPrivateFieldGet(this, _scrollListener)) {
            return;
        }
        __classPrivateFieldSet(this, _targetSetup, this.getTargets());
        __classPrivateFieldGet(this, _scrollListener).setChildren(__classPrivateFieldGet(this, _targetSetup).map(item => item.element));
    }
    getTargets() {
        const targetSetup = [];
        this.element.querySelectorAll(this.args.targets).forEach(target => {
            var _a;
            targetSetup.push({
                element: target,
                animator: (_a = this.getTargetAnimator(target)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _defaultAnimator),
                start: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_START), this.args.startRatio),
                stop: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_STOP), this.args.stopRatio),
            });
        });
        return targetSetup;
    }
    getParent() {
        return this.args.root ? window : this.element;
    }
    getTargetAnimator(target) {
        if (!target.hasAttribute(PARALLAX_ATTRIBUTE_ANIMATTION)) {
            return undefined;
        }
        const name = target.getAttribute(PARALLAX_ATTRIBUTE_ANIMATTION);
        //@ts-ignore name was checked already
        let setup = this.utils.setup.parallaxAnimations[name];
        if (!setup) {
            return undefined;
        }
        //@ts-ignore name was checked already
        return new ParallaxAnimatorsHandler(name, setup);
    }
    clean() {
        __classPrivateFieldGet(this, _targetSetup).forEach(setup => {
            this.utils.interactions.mutate(cleanStyle, null, setup.element);
        });
    }
}
_scrollListener = new WeakMap(), _defaultAnimator = new WeakMap(), _targetSetup = new WeakMap();
function cleanStyle(target) {
    if (target && target.style) {
        target.removeAttribute('style');
    }
}
function calculateRatio(startRatio, stopRatio, current) {
    let spread = stopRatio - startRatio;
    let start = current - startRatio;
    if (start < 0) {
        start = 0;
    }
    let curr = start / spread;
    return Math.min(curr, 1);
}
