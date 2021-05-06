import { ICuiEventBusFacade } from "src/core/handlers/extensions/facades";
import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
import { KeyDownEvent } from "../../../core/models/events";
import { ICuiExtensionPerformer } from "../interfaces";
export declare class ICuiKeysExtensionOptions {
    allowRepeatedEvent?: boolean;
    onlyWhenInViewport?: boolean;
}
export declare class CuiKeysHandlerExtension implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    private _performer;
    private _eventId;
    private _options;
    private _busFacade;
    private _element;
    constructor(element: HTMLElement, busFacade: ICuiEventBusFacade, performer: ICuiExtensionPerformer<KeyDownEvent>, options?: ICuiKeysExtensionOptions);
    init(args: any): Promise<boolean>;
    update(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    onKeyDown(ev: KeyDownEvent): void;
}
