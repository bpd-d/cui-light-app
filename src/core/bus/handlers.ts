import { CuiDevtoolFactory } from "../development/factory";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { CuiQueueAdapterType, ICuiQueue, ICuiQueueAdapter } from "../queue/interfaces";
import { CuiQueue } from "../queue/queue";
import { is } from "../utils/functions";
import { ICuiCallbackExecutor, ICuiEventEmitHandler, CuiEventReceiver } from "./interfaces";

export interface EmitHandlerData {
    events: CuiEventReceiver;
    cuid: string | null;
    args?: any;
}

export class EmitHandler implements ICuiEventEmitHandler {
    queue: ICuiQueue<EmitHandlerData>;
    log: ICuiDevelopmentTool;
    constructor(name: string, adapter: ICuiQueueAdapter<EmitHandlerData>) {
        this.log = CuiDevtoolFactory.get(name);
        this.queue = new CuiQueue<EmitHandlerData>(adapter);
        this.queue.onError((e: unknown) => {
            this.log.error(e as any, "Flush");
        })
    }

    async handle(events: CuiEventReceiver, cuid: string, args?: any): Promise<boolean> {
        if (!is(events)) {
            this.log.warning("No events provided")
            return false;
        }
        this.queue.add({
            events: events,
            cuid: cuid,
            args: args
        })
        return true;
    }
}

export class SimpleEventEmitHandlerAdapter implements ICuiQueueAdapter<EmitHandlerData> {
    type?: CuiQueueAdapterType;
    private _executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        this.type = 'single';
        this._executor = executor;
    }

    async onFlush(items: EmitHandlerData[]): Promise<boolean> {
        for (const task of items) {
            for (let id in task.events) {
                let event = task.events[id]
                if (idMatches(task.cuid, event.$cuid))
                    await this._executor.execute(event.callback, task.args)
            }
        }
        return true;
    }
}

export class TaskedEventEmitHandlerAdapter implements ICuiQueueAdapter<EmitHandlerData> {
    type?: CuiQueueAdapterType;
    private _executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        this.type = 'single';
        this._executor = executor;
    }

    async onFlush(items: EmitHandlerData[]): Promise<boolean> {
        for (const task of items) {
            let promises: Promise<boolean>[] = []
            for (let id in task.events) {
                let event = task.events[id]
                if (idMatches(task.cuid, event.$cuid))
                    promises.push(this._executor.execute(event.callback, task.args))
            }
            await Promise.all(promises);
        }
        return true;
    }
}

export class CuiEventEmitHandlerFactory {
    static get(name: string, executor: ICuiCallbackExecutor): ICuiEventEmitHandler {
        switch (name) {
            case "tasked":
                return new EmitHandler("TaskedEventEmitHandler", new TaskedEventEmitHandlerAdapter(executor));
            default:
                return new EmitHandler("SimpleEventEmitHandler", new SimpleEventEmitHandlerAdapter(executor));
        }
    }
}

function idMatches(emitId: string | null | undefined, handleId: string | null | undefined) {
    return !is(emitId) || (is(emitId) && emitId == handleId);
}