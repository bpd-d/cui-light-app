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
var _log, _executor, _executor_1;
import { is } from "../utils/functions";
import { CuiLoggerFactory } from "../factories/logger";
class EmitHandlerBase {
    constructor() {
        this.queue = [];
        this.isBusy = false;
    }
    idMatches(emitId, handleId) {
        return !is(emitId) || (is(emitId) && emitId == handleId);
    }
}
export class SimpleEventEmitHandler extends EmitHandlerBase {
    constructor(executor) {
        super();
        _log.set(this, void 0);
        _executor.set(this, void 0);
        __classPrivateFieldSet(this, _executor, executor);
        __classPrivateFieldSet(this, _log, CuiLoggerFactory.get("SimpleEventEmitHandler"));
    }
    handle(events, cuid, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(events)) {
                __classPrivateFieldGet(this, _log).warning("No events provided");
                return;
            }
            this.queue.push({
                events: events,
                cuid: cuid,
                args: args
            });
            if (!this.isBusy) {
                if (!this.isBusy) {
                    this.isBusy = true;
                    this.perform();
                    if (this.queue.length > 0) {
                        yield this.perform();
                    }
                    this.isBusy = false;
                }
            }
            return;
        });
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            let task = this.queue.shift();
            if (!task) {
                return;
            }
            for (let id in task.events) {
                let event = task.events[id];
                try {
                    if (this.idMatches(task.cuid, event.$cuid))
                        yield __classPrivateFieldGet(this, _executor).execute(event.callback, task.args);
                }
                catch (e) {
                    __classPrivateFieldGet(this, _log).error(e);
                }
            }
        });
    }
}
_log = new WeakMap(), _executor = new WeakMap();
export class TaskedEventEmitHandler extends EmitHandlerBase {
    constructor(executor) {
        super();
        _executor_1.set(this, void 0);
        __classPrivateFieldSet(this, _executor_1, executor);
    }
    handle(events, cuid, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(events)) {
                return;
            }
            this.queue.push({
                events: events,
                cuid: cuid,
                args: args
            });
            if (!this.isBusy) {
                this.isBusy = true;
                this.perform();
                if (this.queue.length > 0) {
                    this.perform();
                }
                this.isBusy = false;
            }
            return;
        });
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            let task = this.queue.shift();
            let promises = [];
            if (!task) {
                return Promise.all(promises);
            }
            for (let id in task.events) {
                let event = task.events[id];
                if (this.idMatches(task.cuid, event.$cuid))
                    promises.push(__classPrivateFieldGet(this, _executor_1).execute(event.callback, task.args));
            }
            return Promise.all(promises);
        });
    }
}
_executor_1 = new WeakMap();
export class CuiEventEmitHandlerFactory {
    static get(name, executor) {
        switch (name) {
            case "tasked":
                return new TaskedEventEmitHandler(executor);
            default:
                return new SimpleEventEmitHandler(executor);
        }
    }
}
