import { CuiDevtoolFactory } from "../development/factory";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { CuiEventReceiver } from "../models/interfaces";
import { is } from "../utils/functions";
import { ICuiCallbackExecutor, ICuiEventEmitHandler } from "./interfaces";

interface EmitHandlerData {
    events: CuiEventReceiver;
    cuid: string | null;
    args: any[];
}

class EmitHandlerBase {
    isBusy: boolean;
    queue: EmitHandlerData[];
    constructor() {
        this.queue = [];
        this.isBusy = false;
    }
    idMatches(emitId: string | null | undefined, handleId: string | null | undefined) {
        return !is(emitId) || (is(emitId) && emitId == handleId);
    }
}

export class SimpleEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #log: ICuiDevelopmentTool;
    #executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        super();
        this.#executor = executor;
        this.#log = CuiDevtoolFactory.get("SimpleEventEmitHandler");
    }

    async handle(events: CuiEventReceiver, cuid: string, args: any[]): Promise<boolean> {
        if (!is(events)) {
            this.#log.warning("No events provided")
            return false;
        }
        this.queue.push({
            events: events,
            cuid: cuid,
            args: args
        })
        if (!this.isBusy) {
            if (!this.isBusy) {
                this.isBusy = true;
                if (this.queue.length > 0) {
                    await this.perform();
                }
                this.isBusy = false;
            }
        }
        return true;
    }

    private async perform() {
        let task = this.queue.shift();
        if (!task) {
            return;
        }
        for (let id in task.events) {
            let event = task.events[id]
            try {
                if (this.idMatches(task.cuid, event.$cuid))
                    await this.#executor.execute(event.callback, task.args)
            }
            catch (e) {
                this.#log.error(e)
            }
        }
    }
}

export class TaskedEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        super();
        this.#executor = executor;
    }

    async handle(events: CuiEventReceiver, cuid: string | null, args: any[]): Promise<boolean> {
        if (!is(events)) {
            return false;
        }
        this.queue.push({
            events: events,
            cuid: cuid,
            args: args
        })
        if (!this.isBusy) {
            this.isBusy = true;
            await this.perform();
            if (this.queue.length > 0) {
                await this.perform();
            }

            this.isBusy = false;
        }
        return true;
    }

    private async perform(): Promise<boolean[]> {
        let task = this.queue.shift();
        let promises: Promise<boolean>[] = []
        if (!task) {
            return Promise.all(promises);
        }
        for (let id in task.events) {
            let event = task.events[id]
            if (this.idMatches(task.cuid, event.$cuid))
                promises.push(this.#executor.execute(event.callback, task.args))
        }
        return Promise.all(promises)
    }
}


export class CuiEventEmitHandlerFactory {
    static get(name: string, executor: ICuiCallbackExecutor): ICuiEventEmitHandler {
        switch (name) {
            case "tasked":
                return new TaskedEventEmitHandler(executor);
            default:
                return new SimpleEventEmitHandler(executor);
        }
    }
}