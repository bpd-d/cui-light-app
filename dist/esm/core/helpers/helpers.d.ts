import { IUIInteractionProvider } from "../models/interfaces";
import { ICuiComponentAction } from "../utils/actions";
export declare class CuiActionsHelper {
    #private;
    constructor(interactions: IUIInteractionProvider);
    performAction(target: Element, action: ICuiComponentAction, timeout: number, callback?: () => void): Promise<boolean>;
    performActions(target: Element, actions: ICuiComponentAction[], timeout: number, callback?: () => void): Promise<boolean>;
    performSwitchAction(inTarget: Element, outTarget: Element | null, inAction: ICuiComponentAction[], outAction: ICuiComponentAction[], onFinish: () => void, timeout: number): Promise<boolean>;
}
