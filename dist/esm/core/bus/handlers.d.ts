import { ICuiDevelopmentTool } from "../development/interfaces";
import { CuiQueueAdapterType, ICuiQueue, ICuiQueueAdapter } from "../queue/interfaces";
import { ICuiCallbackExecutor, ICuiEventEmitHandler, CuiEventReceiver } from "./interfaces";
export interface EmitHandlerData {
    events: CuiEventReceiver;
    cuid: string | null;
    args?: any;
}
export declare class EmitHandler implements ICuiEventEmitHandler {
    queue: ICuiQueue<EmitHandlerData>;
    log: ICuiDevelopmentTool;
    constructor(name: string, adapter: ICuiQueueAdapter<EmitHandlerData>);
    handle(events: CuiEventReceiver, cuid: string, args?: any): Promise<boolean>;
}
export declare class SimpleEventEmitHandlerAdapter implements ICuiQueueAdapter<EmitHandlerData> {
    type?: CuiQueueAdapterType;
    private _executor;
    constructor(executor: ICuiCallbackExecutor);
    onFlush(items: EmitHandlerData[]): Promise<boolean>;
}
export declare class TaskedEventEmitHandlerAdapter implements ICuiQueueAdapter<EmitHandlerData> {
    type?: CuiQueueAdapterType;
    private _executor;
    constructor(executor: ICuiCallbackExecutor);
    onFlush(items: EmitHandlerData[]): Promise<boolean>;
}
export declare class CuiEventEmitHandlerFactory {
    static get(name: string, executor: ICuiCallbackExecutor): ICuiEventEmitHandler;
}
