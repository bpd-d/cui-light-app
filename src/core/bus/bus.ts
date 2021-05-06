import { CuiElement } from "../models/interfaces";
import { is, are, generateRandomString, enumerateObject } from "../utils/functions";
import { ArgumentError } from "../models/errors";
import { CuiEventEmitHandlerFactory } from "./handlers";
import { CuiCallbackExecutor } from "./executors";
import { CuiBusCallback, CuiBusExtStatistics, CuiEventObj, CuiEventReceiver, ICuiEventBus, ICuiEventBusQueueSetup, ICuiEventEmitHandler } from "./interfaces";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { CuiDevtoolFactory } from "../development/factory";

interface ICuiBusMapping {
    [name: string]: number;
}

export class CuiEventBus implements ICuiEventBus {
    private _events: { [event: string]: CuiEventReceiver }
    private _log: ICuiDevelopmentTool;
    private _eventHandler: ICuiEventEmitHandler;
    private _name: string;
    constructor(emitHandler: ICuiEventEmitHandler, name?: string) {
        this._events = {};
        this._eventHandler = emitHandler;
        this._name = name ?? "CuiEventBus"
        this._log = CuiDevtoolFactory.get(this._name);
    }

    /**
     * Attaches event to event bus
     * 
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to 
     */
    on<T>(name: string, callback: CuiBusCallback<T>, cui?: CuiElement): string | null {
        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument")
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = this._name + "-" + generateRandomString();


        if (!this._events[name]) {
            this._events[name] = {}
        }
        if (this.isAttached(this._events[name], id, cui)) {
            return null;
        }
        this._log.debug(`Attaching new event: [${name}] for: [${id}]`)

        this._events[name][id] = { callback: callback, $cuid: this.getCuid(cui) }
        return id;
    }

    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name: string, id: string): void {
        if (!are(name, id)) {
            throw new ArgumentError("Missing argument")
        }
        let ev = this._events[name]
        this._log.debug(`Detaching item: [${id}] from [${name}]`)
        if (this.isAttached(ev, id)) {
            delete ev[id];
        }
    }

    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void {
        if (is(name) && this._events[name]) {
            delete this._events[name]
        } else {
            this._log.error(`Event name is missing or incorrect`, "detachAll")
        }
    }

    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    async emit<T>(event: string, cuid: string | null, args?: T): Promise<boolean> {
        if (!is(event)) {
            throw new ArgumentError("Event name is incorrect");
        }

        let callbacks = this._events[event];
        if (is(callbacks)) {
            this._log.debug(`Emit: [${event}]`)
            await this._eventHandler.handle(callbacks, cuid, args)
        }
        return true;
    }

    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name: string, id: string, cui?: CuiElement) {
        let ev = this._events[name]
        return this.isAttached(ev, id, cui)
    }

    /**
     * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
     * @param {string} event - event name
     * @param {string} cuid - cuid of the component
     */
    detachByCuid(event: string, cuid: string): void {
        if (!are(event, cuid)) {
            return;
        }
        let ev = this._events[event];
        if (!is(ev)) {
            return;
        }
        enumerateObject({ ...ev }, (evId: string, evValue: CuiEventObj) => {
            if (evValue.$cuid === cuid) {
                delete ev[evId]
            }
        })
    }

    private isAttached(ev: CuiEventReceiver, id: string, cui?: CuiElement): boolean {
        if (is(cui)) {
            // @ts-ignore
            return is(ev) && is(id) && is(ev[id]) && ev[id].$cuid == cui.$cuid;
        }
        return is(ev) && is(id) && is(ev[id]);
    }

    private getCuid(cui?: CuiElement) {
        // @ts-ignore
        return is(cui) ? cui.$cuid : null;
    }


}


export class CuiEventExtBus implements ICuiEventBus {
    private _events: { [event: string]: number };
    private _log: ICuiDevelopmentTool;
    private _buses: ICuiEventBus[];
    private _last: number;
    constructor(setup: ICuiEventBusQueueSetup[]) {
        this._log = CuiDevtoolFactory.get("CuiEventBus");
        this._buses = [];
        this._events = {};
        this._last = 0;
        if (is(setup)) {
            this._log.debug("Initiating buses")
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority
            })
            sorted.forEach((item, index) => {
                this._buses.push(this.initBusInstance(item.name, item.handler))
                this._events = {
                    ...this._events,
                    ...this.mapEvents(item.eventsDef, index),
                }
                this._log.debug(`Bus ${item.name} has been initialized with number: ${index}`)
            })

            this._buses.push(this.initBusInstance("DefaultEventBus", 'tasked'))
            this._last = this._buses.length - 1;
            this._log.debug(`Bus initialization finished`);
        }
    }

    /**
     * Attaches event to event bus
     * 
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to 
     */
    on<T>(name: string, callback: CuiBusCallback<T>, cui?: CuiElement): string | null {

        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument")
        }
        return this.get(name).on(name, callback, cui);
    }

    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name: string, id: string, cui?: CuiElement): void {
        if (!are(name, id)) {
            throw new ArgumentError("Missing argument")
        }
        this.get(name).detach(name, id, cui);
    }

    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void {
        this.get(name).detachAll(name);
    }

    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    async emit<T>(event: string, cuid: string | null, args?: T): Promise<boolean> {
        if (!is(event)) {
            throw new ArgumentError("Event name is incorrect");
        }
        return this.get(event).emit(event, cuid, args);
    }

    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name: string, id: string, cui?: CuiElement) {
        return this.get(name).isSubscribing(name, id, cui);
    }

    /**
    * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
    * @param {string} event - event name
    * @param {string} cuid - cuid of the component
    */
    detachByCuid(event: string, cuid: string): void {
        if (!are(event, cuid)) {
            return
        }
        this.get(event).detachByCuid(event, cuid);
    }


    /**
     * Creates and initializes event bus instance
     * @param busName Event bus name for logger
     * @param handlerName handler name to create proper handler instance
     */
    private initBusInstance(busName: string, handlerName: string): ICuiEventBus {
        if (!are(busName, handlerName)) {
            throw new ArgumentError("Bus name or handler name is incorrect");
        }
        let executor = new CuiCallbackExecutor();
        let handler = CuiEventEmitHandlerFactory.get(handlerName, executor);
        return new CuiEventBus(handler, busName);
    }

    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    private mapEvents(events: string[], index: number): ICuiBusMapping {
        return events.reduce((result: ICuiBusMapping, current: string) => {
            if (!result[current]) {
                return {
                    ...result,
                    [current]: index
                }
            }
            return result;
        }, {})
    }

    /**
     * Retrives porper event bus based on event name
     * @param event 
     */
    private get(event: string): ICuiEventBus {
        let idx = this._events[event];
        return this._buses[idx ?? this._last];
    }
}

export class CuiEventBusFactory {
    static get(setup?: ICuiEventBusQueueSetup[]): ICuiEventBus {
        //@ts-ignore - setup is underfined check is perfromed
        return is(setup) ? new CuiEventExtBus(setup) : new CuiEventBus(CuiEventEmitHandlerFactory.get('tasked', new CuiCallbackExecutor()));
    }
}

export class CuiBusExtStatisticsHandler {
    #isOn: boolean;
    #statistics: CuiBusExtStatistics;
    constructor(gather: boolean, queueCount: number) {
        this.#isOn = gather;
        this.#statistics = {
            queueCount: queueCount,
            events: {}
        }
    }

    addEvent(event: string, queueNumber: number, emitCount?: number) {
        this.#statistics.events[event] = {
            name: event,
            queueNumber: queueNumber,
            emits: emitCount ?? 0
        }
    }

    addQueue() {
        this.#statistics.queueCount += 1;
    }

    addEmit(event: string, queueNumber?: number) {
        if (!this.#isOn) {
            return;
        }

        if (this.#statistics.events[event]) {
            this.#statistics.events[event].emits += 1;
        } else {
            this.addEvent(event, queueNumber ?? -1, 1);
        }

    }

    getStatistics(): CuiBusExtStatistics {
        return this.#statistics;
    }

}