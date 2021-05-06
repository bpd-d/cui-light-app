import { IUIInteractionProvider } from "../models/interfaces";
import { ICuiComponentAction } from "../utils/actions";
import { CLASSES } from "../utils/statics";
import { is } from "../utils/functions";

export interface ICuiActionHelper {
    performAction(target: Element, action: ICuiComponentAction, timeout: number, callback?: () => void): Promise<boolean>;
}

export interface ICuiSwitchActionHelper {
    performSwitchAction(inTarget: Element, outTarget: Element | null, inAction: ICuiComponentAction[], outAction: ICuiComponentAction[], onFinish: () => void, timeout: number): Promise<boolean>
}

export interface ICuiActionsHelper {
    performActions(target: Element, actions: ICuiComponentAction[], timeout: number, callback?: () => void): Promise<boolean>;
}

export function getActionsHelper(interactions: IUIInteractionProvider): ICuiActionsHelper {
    return {
        performActions: (target: Element, actions: ICuiComponentAction[], timeout: number, callback?: () => void) => {
            function onFinish(resolve: (value: boolean | PromiseLike<boolean>) => void) {
                interactions.mutate(() => {
                    actions.forEach(x => x.remove(target));
                    target.classList.remove(CLASSES.animProgress);
                    if (callback)
                        callback();
                    resolve(true)
                }, null)
            }
            return new Promise((resolve) => {
                interactions.mutate(() => {
                    actions.forEach(x => x.add(target));
                    target.classList.add(CLASSES.animProgress);
                    setTimeout(() => {
                        onFinish(resolve)
                    }, timeout)
                }, null)
            })
        }
    }
}

export class CuiActionsHelper implements ICuiActionHelper, ICuiSwitchActionHelper, ICuiActionsHelper {
    private _interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this._interactions = interactions;
    }

    async performAction(target: Element, action: ICuiComponentAction, timeout: number, callback?: () => void): Promise<boolean> {
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
                        resolve(true)
                    }, null)
                }, timeout)
            }, null)
        })
    }

    async performActions(target: Element, actions: ICuiComponentAction[], timeout: number, callback?: () => void): Promise<boolean> {
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
                        resolve(true)
                    }, null)
                }, timeout)
            }, null)
        })
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
    async performSwitchAction(inTarget: Element, outTarget: Element | null, inAction: ICuiComponentAction[], outAction: ICuiComponentAction[], onFinish: () => void, timeout: number): Promise<boolean> {
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
                        resolve(true)
                    }, null)
                }, timeout)
            }, null)
        })
    }
}