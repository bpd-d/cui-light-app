import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiExtensionPerformer } from "../interfaces";
export declare class CuiComponentMutationExtension implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    private _isObserving;
    private _observer;
    private _element;
    private _disabled;
    private _options;
    private _performer;
    constructor(element: Element, performer: ICuiExtensionPerformer<MutationRecord[]>, options?: MutationObserverInit);
    init(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    observe(): void;
    unobserve(): void;
    disable(flag: boolean): void;
    private onMutation;
}
