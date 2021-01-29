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
var _interactions;
import { CLASSES } from "../utils/statics";
import { is } from "../utils/functions";
export class CuiActionsHelper {
    constructor(interactions) {
        _interactions.set(this, void 0);
        __classPrivateFieldSet(this, _interactions, interactions);
    }
    performAction(target, action, timeout, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                __classPrivateFieldGet(this, _interactions).mutate(() => {
                    action.add(target);
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _interactions).mutate(() => {
                            action.remove(target);
                            target.classList.remove(CLASSES.animProgress);
                            if (callback)
                                callback();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
    performActions(target, actions, timeout, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                __classPrivateFieldGet(this, _interactions).mutate(() => {
                    actions.forEach(x => x.add(target));
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _interactions).mutate(() => {
                            actions.forEach(x => x.remove(target));
                            target.classList.remove(CLASSES.animProgress);
                            if (callback)
                                callback();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
    performSwitchAction(inTarget, outTarget, inAction, outAction, onFinish, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                __classPrivateFieldGet(this, _interactions).mutate(() => {
                    inAction.forEach(x => x.add(inTarget));
                    inTarget.classList.add(CLASSES.animProgress);
                    if (is(outTarget)) {
                        //@ts-ignore
                        outAction.forEach(x => x.add(outTarget));
                        //@ts-ignore
                        outTarget.classList.add(CLASSES.animProgress);
                    }
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _interactions).mutate(() => {
                            inAction.forEach(x => x.remove(inTarget));
                            inTarget.classList.remove(CLASSES.animProgress);
                            if (is(outTarget)) {
                                //@ts-ignore
                                outAction.forEach(x => x.remove(outTarget));
                                //@ts-ignore
                                outTarget.classList.remove(CLASSES.animProgress);
                            }
                            onFinish();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
}
_interactions = new WeakMap();
