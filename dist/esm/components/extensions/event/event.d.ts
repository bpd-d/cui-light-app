import { ICuiEventBusFacade } from "src/core/handlers/extensions/facades";
import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiExtensionPerformer } from "../interfaces";
export interface CuiEventExtensionSetup<T> {
    type?: string;
    eventName: string;
    performer: ICuiExtensionPerformer<T>;
}
export declare class CuiEventExtension<T> implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    private _eventId;
    private _setup;
    private _busFacade;
    constructor(busFacade: ICuiEventBusFacade, setup: CuiEventExtensionSetup<T>);
    init(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    onEvent(arg: T): void;
}
export declare function eventExtension<T>(bus: ICuiEventBusFacade, setup: CuiEventExtensionSetup<T>): ICuiHandlerExtension<any>;
