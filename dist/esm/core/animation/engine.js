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
var _engine, _timeout, _onError, _onFinishCallback, _animators, _lock, _animStartStamp, _element, _cleanOnFinish, _errorOccured, _onError_1, _element_1, _animators_1, _animationEngine, _onError_2;
import { is } from "../utils/functions";
import { OpacityAnimator, TransformAnimator, PropertyAnimator, ColorAnimator, FilterAnimator } from "./animators";
export class CuiAnimation {
    constructor(element) {
        _engine.set(this, void 0);
        _timeout.set(this, void 0);
        _onError.set(this, void 0);
        __classPrivateFieldSet(this, _engine, new CuiAnimationEngine(true));
        __classPrivateFieldSet(this, _onError, undefined);
        __classPrivateFieldSet(this, _timeout, 0);
        if (element) {
            __classPrivateFieldGet(this, _engine).setElement(element);
        }
    }
    setElement(element) {
        __classPrivateFieldGet(this, _engine).setElement(element);
    }
    setTimeout(timeout) {
        __classPrivateFieldSet(this, _timeout, timeout);
    }
    onError(callback) {
        __classPrivateFieldSet(this, _onError, callback);
        __classPrivateFieldGet(this, _engine).setOnError(callback);
    }
    onFinish(callback) {
        __classPrivateFieldGet(this, _engine).onFinish(callback);
    }
    perform(props, timeout, factor) {
        if (!is(props)) {
            this.reportError(new Error("Animation property cannot be empty"));
            return;
        }
        let animators = [];
        try {
            for (let prop in props) {
                let animator = AnimatorFactory.get(prop);
                if (!animator)
                    return;
                animator.setProperty(props[prop]);
                animators.push(animator);
                __classPrivateFieldGet(this, _engine).setAnimators(animators);
                __classPrivateFieldGet(this, _engine).animate(timeout !== null && timeout !== void 0 ? timeout : __classPrivateFieldGet(this, _timeout));
            }
        }
        catch (e) {
            this.reportError(e);
            return;
        }
    }
    reportError(e) {
        if (__classPrivateFieldGet(this, _onError)) {
            __classPrivateFieldGet(this, _onError).call(this, e);
        }
        else {
            console.error(e);
        }
    }
}
_engine = new WeakMap(), _timeout = new WeakMap(), _onError = new WeakMap();
export class AnimatorFactory {
    static get(id) {
        if (!is(id)) {
            return undefined;
        }
        if (id.includes('color')) {
            return new ColorAnimator(id);
        }
        switch (id) {
            case "opacity":
                return new OpacityAnimator();
            case "transform":
                return new TransformAnimator();
            case "filter":
                return new FilterAnimator();
            default:
                return new PropertyAnimator(id);
        }
    }
}
export class CuiAnimationEngine {
    constructor(cleanOnFinish) {
        _onFinishCallback.set(this, void 0);
        _animators.set(this, void 0);
        _lock.set(this, void 0);
        // Needed in animation perform - set on first animation exec, cleaned on end
        _animStartStamp.set(this, void 0);
        _element.set(this, void 0);
        _cleanOnFinish.set(this, void 0);
        _errorOccured.set(this, void 0);
        _onError_1.set(this, void 0);
        __classPrivateFieldSet(this, _animators, []);
        __classPrivateFieldSet(this, _element, undefined);
        __classPrivateFieldSet(this, _animStartStamp, undefined);
        __classPrivateFieldSet(this, _cleanOnFinish, cleanOnFinish !== null && cleanOnFinish !== void 0 ? cleanOnFinish : false);
        __classPrivateFieldSet(this, _lock, false);
        __classPrivateFieldSet(this, _onFinishCallback, undefined);
        __classPrivateFieldSet(this, _errorOccured, false);
        __classPrivateFieldSet(this, _onError_1, undefined);
    }
    onFinish(callback) {
        __classPrivateFieldSet(this, _onFinishCallback, callback);
    }
    setAnimators(animators) {
        __classPrivateFieldSet(this, _animators, animators);
    }
    setProps(props) {
        if (!is(props)) {
            return;
        }
        __classPrivateFieldSet(this, _animators, []);
        try {
            for (let prop in props) {
                let animator = AnimatorFactory.get(prop);
                if (!animator)
                    return;
                animator.setProperty(props[prop]);
                __classPrivateFieldGet(this, _animators).push(animator);
            }
        }
        catch (e) {
            this.reportError(e);
        }
    }
    setElement(element) {
        __classPrivateFieldSet(this, _element, element);
    }
    setOnError(callback) {
        __classPrivateFieldSet(this, _onError_1, callback);
    }
    animate(timeout, progress, revert) {
        if (__classPrivateFieldGet(this, _lock)) {
            return;
        }
        if (!__classPrivateFieldGet(this, _element) || __classPrivateFieldGet(this, _animators).length === 0) {
            this.reportError(new Error("Animation cannot be performed: element or animators are not set"));
            return;
        }
        let animationProgress = progress !== null && progress !== void 0 ? progress : 0;
        let shouldCalcRevert = revert ? revert : false;
        __classPrivateFieldSet(this, _lock, true);
        requestAnimationFrame(this.animateAsync.bind(this, timeout, animationProgress, shouldCalcRevert));
    }
    isLocked() {
        return __classPrivateFieldGet(this, _lock);
    }
    animateAsync(timeout, initialProgress, revert, timestamp) {
        if (!__classPrivateFieldGet(this, _animStartStamp)) {
            __classPrivateFieldSet(this, _animStartStamp, timestamp);
        }
        let pr = timestamp - __classPrivateFieldGet(this, _animStartStamp);
        let animationProgress = pr / timeout;
        let currProgress = 0;
        if (initialProgress === 0) {
            currProgress = animationProgress;
        }
        else {
            currProgress = revert ? initialProgress - (animationProgress * initialProgress) : initialProgress + (animationProgress * initialProgress);
        }
        this.callUpdate(revert ? Math.max(currProgress, 0) : Math.min(currProgress, 1), 1);
        if (pr < timeout && !__classPrivateFieldGet(this, _errorOccured)) {
            requestAnimationFrame(this.animateAsync.bind(this, timeout, initialProgress, revert));
        }
        else {
            this.endAnimation(revert);
        }
    }
    endAnimation(reverted) {
        if (__classPrivateFieldGet(this, _cleanOnFinish) && __classPrivateFieldGet(this, _element)) {
            __classPrivateFieldGet(this, _element).removeAttribute("style");
        }
        if (__classPrivateFieldGet(this, _onFinishCallback)) {
            __classPrivateFieldGet(this, _onFinishCallback).call(this, __classPrivateFieldGet(this, _element), reverted, __classPrivateFieldGet(this, _errorOccured));
        }
        __classPrivateFieldSet(this, _errorOccured, false);
        __classPrivateFieldSet(this, _animStartStamp, undefined);
        __classPrivateFieldSet(this, _lock, false);
    }
    callUpdate(progress, factor) {
        try {
            __classPrivateFieldGet(this, _animators).forEach(animator => animator.perform(__classPrivateFieldGet(this, _element), progress, factor));
        }
        catch (e) {
            this.reportError(e);
            __classPrivateFieldSet(this, _errorOccured, true);
        }
    }
    reportError(e) {
        if (__classPrivateFieldGet(this, _onError_1)) {
            __classPrivateFieldGet(this, _onError_1).call(this, e);
        }
        else {
            console.error("An error occured in CuiAnimtionEngine");
            console.error(e);
        }
    }
}
_onFinishCallback = new WeakMap(), _animators = new WeakMap(), _lock = new WeakMap(), _animStartStamp = new WeakMap(), _element = new WeakMap(), _cleanOnFinish = new WeakMap(), _errorOccured = new WeakMap(), _onError_1 = new WeakMap();
export class CuiSwipeAnimationEngine {
    constructor(shouldCleanOnFinish) {
        _element_1.set(this, void 0);
        _animators_1.set(this, void 0);
        _animationEngine.set(this, void 0);
        _onError_2.set(this, void 0);
        __classPrivateFieldSet(this, _element_1, undefined);
        __classPrivateFieldSet(this, _animators_1, []);
        __classPrivateFieldSet(this, _animationEngine, new CuiAnimationEngine(shouldCleanOnFinish));
        __classPrivateFieldSet(this, _onError_2, undefined);
    }
    setElement(element) {
        __classPrivateFieldSet(this, _element_1, element);
    }
    setOnFinish(callback) {
        __classPrivateFieldGet(this, _animationEngine).onFinish(callback);
    }
    setOnError(callback) {
        __classPrivateFieldSet(this, _onError_2, callback);
        __classPrivateFieldGet(this, _animationEngine).setOnError(callback);
    }
    setProps(props) {
        if (!is(props)) {
            return;
        }
        __classPrivateFieldSet(this, _animators_1, []);
        try {
            for (let prop in props) {
                let animator = AnimatorFactory.get(prop);
                if (!animator)
                    return;
                animator.setProperty(props[prop]);
                __classPrivateFieldGet(this, _animators_1).push(animator);
            }
        }
        catch (e) {
            this.reportError(e);
        }
    }
    /**
     * Perform single update on animators
     * @param progress - progress value to be set to animators 0..1
     */
    update(progress) {
        if (!__classPrivateFieldGet(this, _element_1) || __classPrivateFieldGet(this, _animators_1).length === 0) {
            return;
        }
        __classPrivateFieldGet(this, _animators_1).forEach(animator => animator.perform(__classPrivateFieldGet(this, _element_1), Math.min(progress, 1), 1));
    }
    /**
     * Perform single update on animators in RAF
     * @param progress - progress value to be set to animators 0..1
     */
    updateAsync(progress) {
        requestAnimationFrame(this.update.bind(this, progress));
    }
    /**
     * Finish swipe animation using animation engine
     * @param progress - initial progress value 0..1
     * @param timeout - time for animation to perform
     * @param revert - whether animation should return back to 0 or progress to the end
     */
    finish(progress, timeout, revert) {
        if (__classPrivateFieldGet(this, _element_1))
            __classPrivateFieldGet(this, _animationEngine).setElement(__classPrivateFieldGet(this, _element_1));
        __classPrivateFieldGet(this, _animationEngine).setAnimators(__classPrivateFieldGet(this, _animators_1));
        __classPrivateFieldGet(this, _animationEngine).animate(timeout, progress, revert);
    }
    reportError(e) {
        if (__classPrivateFieldGet(this, _onError_2)) {
            __classPrivateFieldGet(this, _onError_2).call(this, e);
        }
        else {
            console.log(e);
        }
    }
}
_element_1 = new WeakMap(), _animators_1 = new WeakMap(), _animationEngine = new WeakMap(), _onError_2 = new WeakMap();
