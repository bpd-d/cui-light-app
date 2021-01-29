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
var _defTimeout, _prefix, _prefix_1, _swipeEngine, _isTracking, _startX, _ratio, _swipeAnimation, _moveEventId;
import { SWIPE_ANIMATIONS_DEFINITIONS } from "../../core/animation/definitions";
import { CuiInteractableHandler } from "../../core/handlers/base";
import { CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { AriaAttributes } from "../../core/utils/aria";
import { boolStringOrDefault, getIntOrDefault, getStringOrDefault, replacePrefix } from "../../core/utils/functions";
import { EVENTS, CLASSES } from "../../core/utils/statics";
const BANNER_OPEN_ANIMATION = ".{prefix}-animation-fade-in";
const BANNER_CLOSE_ANIMATION = ".{prefix}-animation-fade-out";
export class CuiBannerArgs {
    constructor(prefix, timeout) {
        _defTimeout.set(this, void 0);
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        __classPrivateFieldSet(this, _prefix, prefix);
        this.escClose = false;
        this.keyClose = "";
        this.timeout = __classPrivateFieldGet(this, _defTimeout);
        this.swipe = false;
        this.openAct = "";
        this.closeAct = "";
    }
    parse(args) {
        this.swipe = boolStringOrDefault(args.swipe, false);
        this.escClose = false;
        this.keyClose = "";
        this.timeout = getIntOrDefault(args.timeout, __classPrivateFieldGet(this, _defTimeout));
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(BANNER_OPEN_ANIMATION, __classPrivateFieldGet(this, _prefix)));
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(BANNER_CLOSE_ANIMATION, __classPrivateFieldGet(this, _prefix)));
    }
}
_defTimeout = new WeakMap(), _prefix = new WeakMap();
export class CuiBanerComponent {
    constructor(prefix) {
        _prefix_1.set(this, void 0);
        __classPrivateFieldSet(this, _prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix_1)}-banner`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiBannerHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
export class CuiBannerHandler extends CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiBannerHandler", element, attribute, new CuiBannerArgs(prefix, utils.setup.animationTime), utils);
        _swipeEngine.set(this, void 0);
        _isTracking.set(this, void 0);
        _startX.set(this, void 0);
        _ratio.set(this, void 0);
        _swipeAnimation.set(this, void 0);
        _moveEventId.set(this, void 0);
        __classPrivateFieldSet(this, _swipeEngine, new CuiSwipeAnimationEngine(true));
        __classPrivateFieldGet(this, _swipeEngine).setOnFinish(this.onSwipeFinish.bind(this));
        __classPrivateFieldGet(this, _swipeEngine).setElement(this.element);
        __classPrivateFieldSet(this, _startX, -1);
        __classPrivateFieldSet(this, _ratio, 0);
        __classPrivateFieldSet(this, _swipeAnimation, SWIPE_ANIMATIONS_DEFINITIONS["fade"]);
        __classPrivateFieldSet(this, _moveEventId, null);
        __classPrivateFieldSet(this, _isTracking, false);
    }
    onInit() {
        //   this.#moveEventId = this.onEvent(EVENTS.GLOBAL_MOVE, this.onMove.bind(this));
        if (!this.isActive()) {
            this.open();
        }
    }
    onUpdate() {
    }
    onDestroy() {
        this.detachEvent(EVENTS.GLOBAL_MOVE, __classPrivateFieldGet(this, _moveEventId));
    }
    onBeforeOpen() {
        return true;
    }
    onAfterOpen() {
        if (this.args.swipe) {
            __classPrivateFieldSet(this, _moveEventId, this.onEvent(EVENTS.GLOBAL_MOVE, this.onMove.bind(this)));
        }
    }
    onAfterClose() {
        this.detachEvent(EVENTS.GLOBAL_MOVE, __classPrivateFieldGet(this, _moveEventId));
    }
    onBeforeClose() {
        return true;
    }
    onMove(data) {
        if (this.isLocked) {
            return;
        }
        let current = this.element;
        switch (data.type) {
            case "down":
                if (__classPrivateFieldGet(this, _isTracking) || !current.contains(data.target)) {
                    return;
                }
                __classPrivateFieldSet(this, _isTracking, true);
                __classPrivateFieldSet(this, _startX, data.x);
                this.helper.setClassesAs(document.body, CLASSES.swipingOn);
                data.event.preventDefault();
                break;
            case "up":
                if (!__classPrivateFieldGet(this, _isTracking) && __classPrivateFieldGet(this, _ratio) == 0) {
                    break;
                }
                let absRatio = Math.abs(__classPrivateFieldGet(this, _ratio));
                let timeout = absRatio * this.args.timeout;
                let back = absRatio <= 0.4;
                // Lock component until animation is finished
                this.isLocked = true;
                __classPrivateFieldGet(this, _swipeEngine).finish(absRatio, timeout, back);
                this.helper.removeClassesAs(document.body, CLASSES.swipingOn);
                __classPrivateFieldSet(this, _isTracking, false);
                break;
            case "move":
                if (__classPrivateFieldGet(this, _isTracking)) {
                    let newRatio = (data.x - __classPrivateFieldGet(this, _startX)) / current.offsetWidth;
                    if (__classPrivateFieldGet(this, _ratio) >= 0 && newRatio <= 0 || __classPrivateFieldGet(this, _ratio) <= 0 && newRatio > 0) {
                        __classPrivateFieldGet(this, _swipeEngine).setProps(newRatio > 0 ? __classPrivateFieldGet(this, _swipeAnimation).current.right : __classPrivateFieldGet(this, _swipeAnimation).current.left);
                    }
                    __classPrivateFieldSet(this, _ratio, newRatio);
                    this.mutate(() => {
                        __classPrivateFieldGet(this, _swipeEngine).update(Math.abs(__classPrivateFieldGet(this, _ratio)));
                    });
                    data.event.preventDefault();
                }
                break;
            default:
                break;
        }
    }
    onSwipeFinish(element, reverted, error) {
        this.isLocked = false;
        if (!reverted) {
            this.helper.removeClass(this.activeClassName, this.element);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        }
        __classPrivateFieldSet(this, _ratio, 0);
        __classPrivateFieldSet(this, _startX, 0);
    }
}
_swipeEngine = new WeakMap(), _isTracking = new WeakMap(), _startX = new WeakMap(), _ratio = new WeakMap(), _swipeAnimation = new WeakMap(), _moveEventId = new WeakMap();
