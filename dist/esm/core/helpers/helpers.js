var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CLASSES } from "../utils/statics";
import { is } from "../utils/functions";
export function getActionsHelper(interactions) {
    return {
        performActions: (target, actions, timeout, callback) => {
            function onFinish(resolve) {
                interactions.mutate(() => {
                    actions.forEach(x => x.remove(target));
                    target.classList.remove(CLASSES.animProgress);
                    if (callback)
                        callback();
                    resolve(true);
                }, null);
            }
            return new Promise((resolve) => {
                interactions.mutate(() => {
                    actions.forEach(x => x.add(target));
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        onFinish(resolve);
                    }, timeout);
                }, null);
            });
        }
    };
}
export class CuiActionsHelper {
    constructor(interactions) {
        this._interactions = interactions;
    }
    performAction(target, action, timeout, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this._interactions.mutate(() => {
                    action.add(target);
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        this._interactions.mutate(() => {
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
                this._interactions.mutate(() => {
                    actions.forEach(x => x.add(target));
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        this._interactions.mutate(() => {
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
    /**
     * Performs switch operation on two targets, by toggling in and out actions on in and out target.
     * Note: this runs in async
     * @param inTarget incoming target element
     * @param outTarget outgoing target element
     * @param inAction action for incoming target
     * @param outAction action for outgoing target
     * @param onFinish callback to be executed when perform is finished
     * @param timeout timeout for perfrom
     * @returns Promise when resolves after all acctions and callback are performed
     */
    performSwitchAction(inTarget, outTarget, inAction, outAction, onFinish, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this._interactions.mutate(() => {
                    inAction.forEach(x => x.add(inTarget));
                    inTarget.classList.add(CLASSES.animProgress);
                    if (is(outTarget)) {
                        //@ts-ignore
                        outAction.forEach(x => x.add(outTarget));
                        //@ts-ignore
                        outTarget.classList.add(CLASSES.animProgress);
                    }
                    setTimeout(() => {
                        this._interactions.mutate(() => {
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
