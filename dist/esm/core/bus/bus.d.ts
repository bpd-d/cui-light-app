import { CuiElement } from "../models/interfaces";
import { CuiBusCallback, CuiBusExtStatistics, ICuiEventBus, ICuiEventBusQueueSetup, ICuiEventEmitHandler } from "./interfaces";
export declare class CuiEventBus implements ICuiEventBus {
    private _events;
    private _log;
    private _eventHandler;
    private _name;
    constructor(emitHandler: ICuiEventEmitHandler, name?: string);
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to
     */
    on<T>(name: string, callback: CuiBusCallback<T>, cui?: CuiElement): string | null;
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name: string, id: string): void;
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void;
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit<T>(event: string, cuid: string | null, args?: T): Promise<boolean>;
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name: string, id: string, cui?: CuiElement): boolean;
    /**
     * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
     * @param {string} event - event name
     * @param {string} cuid - cuid of the component
     */
    detachByCuid(event: string, cuid: string): void;
    private isAttached;
    private getCuid;
}
export declare class CuiEventExtBus implements ICuiEventBus {
    private _events;
    private _log;
    private _buses;
    private _last;
    constructor(setup: ICuiEventBusQueueSetup[]);
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to
     */
    on<T>(name: string, callback: CuiBusCallback<T>, cui?: CuiElement): string | null;
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name: string, id: string, cui?: CuiElement): void;
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void;
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit<T>(event: string, cuid: string | null, args?: T): Promise<boolean>;
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name: string, id: string, cui?: CuiElement): boolean;
    /**
    * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
    * @param {string} event - event name
    * @param {string} cuid - cuid of the component
    */
    detachByCuid(event: string, cuid: string): void;
    /**
     * Creates and initializes event bus instance
     * @param busName Event bus name for logger
     * @param handlerName handler name to create proper handler instance
     */
    private initBusInstance;
    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    private mapEvents;
    /**
     * Retrives porper event bus based on event name
     * @param event
     */
    private get;
}
export declare class CuiEventBusFactory {
    static get(setup?: ICuiEventBusQueueSetup[]): ICuiEventBus;
}
export declare class CuiBusExtStatisticsHandler {
    #private;
    constructor(gather: boolean, queueCount: number);
    addEvent(event: string, queueNumber: number, emitCount?: number): void;
    addQueue(): void;
    addEmit(event: string, queueNumber?: number): void;
    getStatistics(): CuiBusExtStatistics;
}
