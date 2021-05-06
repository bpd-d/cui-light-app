import { IUIInteractionProvider } from "../models/interfaces";
import { ICuiComponentAction } from "../utils/actions";
export interface ICuiActionHelper {
    performAction(target: Element, action: ICuiComponentAction, timeout: number, callback?: () => void): Promise<boolean>;
}
export interface ICuiSwitchActionHelper {
    performSwitchAction(inTarget: Element, outTarget: Element | null, inAction: ICuiComponentAction[], outAction: ICuiComponentAction[], onFinish: () => void, timeout: number): Promise<boolean>;
}
export interface ICuiActionsHelper {
    performActions(target: Element, actions: ICuiComponentAction[], timeout: number, callback?: () => void): Promise<boolean>;
}
export declare function getActionsHelper(interactions: IUIInteractionProvider): ICuiActionsHelper;
export declare class CuiActionsHelper implements ICuiActionHelper, ICuiSwitchActionHelper, ICuiActionsHelper {
    private _interactions;
    constructor(interactions: IUIInteractionProvider);
    performAction(target: Element, action: ICuiComponentAction, timeout: number, callback?: () => void): Promise<boolean>;
    performActions(target: Element, actions: ICuiComponentAction[], timeout: number, callback?: () => void): Promise<boolean>;
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
    performSwitchAction(inTarget: Element, outTarget: Element | null, inAction: ICuiComponentAction[], outAction: ICuiComponentAction[], onFinish: () => void, timeout: number): Promise<boolean>;
}
