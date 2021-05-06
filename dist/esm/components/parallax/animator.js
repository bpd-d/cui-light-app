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
var _animators;
import { enumerateObject } from "../../core/utils/functions";
import { AnimatorFactory } from "../../core/animation/factory";
export class ParallaxAnimatorsHandler {
    constructor(name, setup) {
        _animators.set(this, void 0);
        this.name = name;
        __classPrivateFieldSet(this, _animators, []);
        enumerateObject(setup, (propName, prop) => {
            let animator = AnimatorFactory.get(propName);
            if (!animator) {
                return;
            }
            animator.setProperty(prop);
            __classPrivateFieldGet(this, _animators).push(animator);
        });
    }
    perform(element, progress) {
        if (__classPrivateFieldGet(this, _animators).length === 0) {
            return;
        }
        __classPrivateFieldGet(this, _animators).forEach(animator => animator.perform(element, progress, 1));
    }
}
_animators = new WeakMap();
