import { IUIInteractionProvider } from "../models/interfaces";
import { ICuiComponentAction } from "../utils/actions";
import { CLASSES } from "../utils/statics";
import { is } from "../utils/functions";

export class CuiActionsHelper {
    #interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this.#interactions = interactions;
    }

    async performAction(target: Element, action: ICuiComponentAction, timeout: number, callback?: () => void): Promise<boolean> {
        return new Promise((resolve) => {
            this.#interactions.mutate(() => {
                action.add(target);
                target.classList.add(CLASSES.animProgress);
                setTimeout(() => {
                    this.#interactions.mutate(() => {
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
            this.#interactions.mutate(() => {
                actions.forEach(x => x.add(target));
                target.classList.add(CLASSES.animProgress);
                setTimeout(() => {
                    this.#interactions.mutate(() => {
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

    async performSwitchAction(inTarget: Element, outTarget: Element | null, inAction: ICuiComponentAction[], outAction: ICuiComponentAction[], onFinish: () => void, timeout: number): Promise<boolean> {
        return new Promise((resolve) => {
            this.#interactions.mutate(() => {
                inAction.forEach(x => x.add(inTarget));
                inTarget.classList.add(CLASSES.animProgress);
                if (is(outTarget)) {
                    //@ts-ignore
                    outAction.forEach(x => x.add(outTarget));
                    //@ts-ignore
                    outTarget.classList.add(CLASSES.animProgress);
                }
                setTimeout(() => {
                    this.#interactions.mutate(() => {
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