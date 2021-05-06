import { ICuiEventBusFacade } from "src/core/handlers/extensions/facades";
import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiExtensionPerformer } from "../interfaces";

export interface CuiEventExtensionSetup<T> {
    type?: string;
    eventName: string;
    performer: ICuiExtensionPerformer<T>;
}

export class CuiEventExtension<T> implements ICuiHandlerExtension<any> {
    type: string;
    description: string;

    private _eventId: string | null;
    private _setup: CuiEventExtensionSetup<T>;
    private _busFacade: ICuiEventBusFacade;
    constructor(busFacade: ICuiEventBusFacade, setup: CuiEventExtensionSetup<T>) {
        this.type = setup.type ?? setup.eventName;
        this.description = "";
        this._eventId = null;
        this._setup = setup;
        this._busFacade = busFacade;
    }

    async init(args: any): Promise<boolean> {
        this._eventId = this._busFacade.on<T>(this._setup.eventName, this.onEvent.bind(this));
        return true;
    }


    async destroy(): Promise<boolean> {
        this._busFacade.detach(this._setup.eventName, this._eventId);
        return true;
    }

    onEvent(arg: T) {
        this._setup.performer.perform(arg);
    }
}

export function eventExtension<T>(bus: ICuiEventBusFacade, setup: CuiEventExtensionSetup<T>): ICuiHandlerExtension<any> {
    let eventId: string | null = null;

    function onEvent(arg: T) {
        setup.performer.perform(arg);
    }
    return {
        type: setup.type ?? setup.eventName,
        description: "",
        init: async (arg: any) => {
            eventId = bus.on<T>(setup.eventName, onEvent);
            return true;
        },
        destroy: async () => {
            bus.detach(setup.eventName, eventId);
            return true;
        }
    }
}

