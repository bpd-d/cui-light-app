import { ICuiEventEmitHandler, ICuiCallbackExecutor, CuiEventReceiver } from "../models/interfaces";
interface EmitHandlerData {
    events: CuiEventReceiver;
    cuid: string | null;
    args: any[];
}
declare class EmitHandlerBase {
    isBusy: boolean;
    queue: EmitHandlerData[];
    constructor();
    idMatches(emitId: string | null | undefined, handleId: string | null | undefined): boolean;
}
export declare class SimpleEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #private;
    constructor(executor: ICuiCallbackExecutor);
    handle(events: CuiEventReceiver, cuid: string, args: any[]): Promise<void>;
    private perform;
}
export declare class TaskedEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #private;
    constructor(executor: ICuiCallbackExecutor);
    handle(events: CuiEventReceiver, cuid: string | null, args: any[]): Promise<void>;
    private perform;
}
export declare class CuiEventEmitHandlerFactory {
    static get(name: string, executor: ICuiCallbackExecutor): ICuiEventEmitHandler;
}
export {};
