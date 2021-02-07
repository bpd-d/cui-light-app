import { CuiContext } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiAlertOptions, CuiAlertType } from "./models";
export interface ICuiAlertHandler {
    show(root: Element): void;
}
declare abstract class CuiAlertHandlerBase implements ICuiAlertHandler, CuiContext {
    #private;
    closeStr: string;
    iconStr: string;
    content: string;
    title: string;
    prefix: string;
    reverse: boolean;
    constructor(setup: CuiUtils, id: string, data: CuiAlertOptions);
    getId(): string;
    show(root: Element): void;
    updateElement(element: HTMLElement): void;
    onClose(arg: any): void;
    abstract createElement(): HTMLElement;
}
export declare class CuiAlertHandler extends CuiAlertHandlerBase {
    #private;
    constructor(setup: CuiUtils, id: string, data: CuiAlertOptions);
    createElement(): HTMLElement;
}
export declare class CuiInfoAlertUpHandler extends CuiAlertHandlerBase {
    #private;
    constructor(setup: CuiUtils, id: string, data: CuiAlertOptions);
    createElement(): HTMLElement;
}
export declare class CuiYesNoPopUpHandler extends CuiAlertHandlerBase {
    #private;
    constructor(setup: CuiUtils, id: string, data: CuiAlertOptions);
    createElement(): HTMLElement;
}
export declare class CuiAlertFactory {
    static get(id: string, type: CuiAlertType, data: CuiAlertOptions, utils: CuiUtils): ICuiAlertHandler | undefined;
}
export {};
