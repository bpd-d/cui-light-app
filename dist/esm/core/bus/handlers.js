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
var _executor, _executor_1;
import { CuiDevtoolFactory } from "../development/factory";
import { CuiQueue } from "../queue/queue";
import { is } from "../utils/functions";
export class EmitHandler {
    constructor(name, adapter) {
        this.log = CuiDevtoolFactory.get(name);
        this.queue = new CuiQueue(adapter);
        this.queue.onError((e) => {
            this.log.error(e, "Flush");
        });
    }
    handle(events, cuid, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(events)) {
                this.log.warning("No events provided");
                return false;
            }
            this.queue.add({
                events: events,
                cuid: cuid,
                args: args
            });
            return true;
        });
    }
}
export class SimpleEventEmitHandlerAdapter {
    constructor(executor) {
        _executor.set(this, void 0);
        this.type = 'single';
        __classPrivateFieldSet(this, _executor, executor);
    }
    onFlush(items) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const task of items) {
                for (let id in task.events) {
                    let event = task.events[id];
                    if (idMatches(task.cuid, event.$cuid))
                        yield __classPrivateFieldGet(this, _executor).execute(event.callback, task.args);
                }
            }
            return true;
        });
    }
}
_executor = new WeakMap();
export class TaskedEventEmitHandlerAdapter {
    constructor(executor) {
        _executor_1.set(this, void 0);
        this.type = 'single';
        __classPrivateFieldSet(this, _executor_1, executor);
    }
    onFlush(items) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const task of items) {
                let promises = [];
                for (let id in task.events) {
                    let event = task.events[id];
                    if (idMatches(task.cuid, event.$cuid))
                        promises.push(__classPrivateFieldGet(this, _executor_1).execute(event.callback, task.args));
                }
                yield Promise.all(promises);
            }
            return true;
        });
    }
}
_executor_1 = new WeakMap();
export class CuiEventEmitHandlerFactory {
    static get(name, executor) {
        switch (name) {
            case "tasked":
                return new EmitHandler("TaskedEventEmitHandler", new TaskedEventEmitHandlerAdapter(executor));
            default:
                return new EmitHandler("SimpleEventEmitHandler", new SimpleEventEmitHandlerAdapter(executor));
        }
    }
}
function idMatches(emitId, handleId) {
    return !is(emitId) || (is(emitId) && emitId == handleId);
}
