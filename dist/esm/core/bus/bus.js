var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _isOn, _statistics;
import { is, are, generateRandomString, enumerateObject } from "../utils/functions";
import { ArgumentError } from "../models/errors";
import { CuiEventEmitHandlerFactory } from "./handlers";
import { CuiCallbackExecutor } from "./executors";
import { CuiDevtoolFactory } from "../development/factory";
export class CuiEventBus {
    constructor(emitHandler, name) {
        this._events = {};
        this._eventHandler = emitHandler;
        this._name = name !== null && name !== void 0 ? name : "CuiEventBus";
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
    on(name, callback, cui) {
        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument");
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = this._name + "-" + generateRandomString();
        if (!this._events[name]) {
            this._events[name] = {};
        }
        if (this.isAttached(this._events[name], id, cui)) {
            return null;
        }
        this._log.debug(`Attaching new event: [${name}] for: [${id}]`);
        this._events[name][id] = { callback: callback, $cuid: this.getCuid(cui) };
        return id;
    }
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name, id) {
        if (!are(name, id)) {
            throw new ArgumentError("Missing argument");
        }
        let ev = this._events[name];
        this._log.debug(`Detaching item: [${id}] from [${name}]`);
        if (this.isAttached(ev, id)) {
            delete ev[id];
        }
    }
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name) {
        if (is(name) && this._events[name]) {
            delete this._events[name];
        }
        else {
            this._log.error(`Event name is missing or incorrect`, "detachAll");
        }
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, cuid, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(event)) {
                throw new ArgumentError("Event name is incorrect");
            }
            let callbacks = this._events[event];
            if (is(callbacks)) {
                this._log.debug(`Emit: [${event}]`);
                yield this._eventHandler.handle(callbacks, cuid, args);
            }
            return true;
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name, id, cui) {
        let ev = this._events[name];
        return this.isAttached(ev, id, cui);
    }
    /**
     * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
     * @param {string} event - event name
     * @param {string} cuid - cuid of the component
     */
    detachByCuid(event, cuid) {
        if (!are(event, cuid)) {
            return;
        }
        let ev = this._events[event];
        if (!is(ev)) {
            return;
        }
        enumerateObject(Object.assign({}, ev), (evId, evValue) => {
            if (evValue.$cuid === cuid) {
                delete ev[evId];
            }
        });
    }
    isAttached(ev, id, cui) {
        if (is(cui)) {
            // @ts-ignore
            return is(ev) && is(id) && is(ev[id]) && ev[id].$cuid == cui.$cuid;
        }
        return is(ev) && is(id) && is(ev[id]);
    }
    getCuid(cui) {
        // @ts-ignore
        return is(cui) ? cui.$cuid : null;
    }
}
export class CuiEventExtBus {
    constructor(setup) {
        this._log = CuiDevtoolFactory.get("CuiEventBus");
        this._buses = [];
        this._events = {};
        this._last = 0;
        if (is(setup)) {
            this._log.debug("Initiating buses");
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority;
            });
            sorted.forEach((item, index) => {
                this._buses.push(this.initBusInstance(item.name, item.handler));
                this._events = Object.assign(Object.assign({}, this._events), this.mapEvents(item.eventsDef, index));
                this._log.debug(`Bus ${item.name} has been initialized with number: ${index}`);
            });
            this._buses.push(this.initBusInstance("DefaultEventBus", 'tasked'));
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
    on(name, callback, cui) {
        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument");
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
    detach(name, id, cui) {
        if (!are(name, id)) {
            throw new ArgumentError("Missing argument");
        }
        this.get(name).detach(name, id, cui);
    }
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name) {
        this.get(name).detachAll(name);
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, cuid, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(event)) {
                throw new ArgumentError("Event name is incorrect");
            }
            return this.get(event).emit(event, cuid, args);
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name, id, cui) {
        return this.get(name).isSubscribing(name, id, cui);
    }
    /**
    * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
    * @param {string} event - event name
    * @param {string} cuid - cuid of the component
    */
    detachByCuid(event, cuid) {
        if (!are(event, cuid)) {
            return;
        }
        this.get(event).detachByCuid(event, cuid);
    }
    /**
     * Creates and initializes event bus instance
     * @param busName Event bus name for logger
     * @param handlerName handler name to create proper handler instance
     */
    initBusInstance(busName, handlerName) {
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
    mapEvents(events, index) {
        return events.reduce((result, current) => {
            if (!result[current]) {
                return Object.assign(Object.assign({}, result), { [current]: index });
            }
            return result;
        }, {});
    }
    /**
     * Retrives porper event bus based on event name
     * @param event
     */
    get(event) {
        let idx = this._events[event];
        return this._buses[idx !== null && idx !== void 0 ? idx : this._last];
    }
}
export class CuiEventBusFactory {
    static get(setup) {
        //@ts-ignore - setup is underfined check is perfromed
        return is(setup) ? new CuiEventExtBus(setup) : new CuiEventBus(CuiEventEmitHandlerFactory.get('tasked', new CuiCallbackExecutor()));
    }
}
export class CuiBusExtStatisticsHandler {
    constructor(gather, queueCount) {
        _isOn.set(this, void 0);
        _statistics.set(this, void 0);
        __classPrivateFieldSet(this, _isOn, gather);
        __classPrivateFieldSet(this, _statistics, {
            queueCount: queueCount,
            events: {}
        });
    }
    addEvent(event, queueNumber, emitCount) {
        __classPrivateFieldGet(this, _statistics).events[event] = {
            name: event,
            queueNumber: queueNumber,
            emits: emitCount !== null && emitCount !== void 0 ? emitCount : 0
        };
    }
    addQueue() {
        __classPrivateFieldGet(this, _statistics).queueCount += 1;
    }
    addEmit(event, queueNumber) {
        if (!__classPrivateFieldGet(this, _isOn)) {
            return;
        }
        if (__classPrivateFieldGet(this, _statistics).events[event]) {
            __classPrivateFieldGet(this, _statistics).events[event].emits += 1;
        }
        else {
            this.addEvent(event, queueNumber !== null && queueNumber !== void 0 ? queueNumber : -1, 1);
        }
    }
    getStatistics() {
        return __classPrivateFieldGet(this, _statistics);
    }
}
_isOn = new WeakMap(), _statistics = new WeakMap();
