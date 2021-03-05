import { CuiElement } from "../models/interfaces";

export interface CuiBusExtStatisticsItem {
    name: string;
    emits: number;
    queueNumber: number;
}

export interface CuiBusExtStatistics {
    queueCount: number;
    events: { [name: string]: CuiBusExtStatisticsItem }
}


export interface ICuiEventBusQueueSetup {
    name: string;
    handler: "tasked" | string;
    eventsDef: string[];
    priority: number;
}

export interface ICuiEventEmitHandler {
    handle(receiver: CuiEventReceiver, cuid: string | null, args?: any): Promise<boolean>;
}

export interface ICuiCallbackExecutor {
    execute(callback: any, args?: any): Promise<boolean>;
}

export interface CuiBusCallback<T> {
    (t: T): void;
}

export interface ICuiEventBus {
    on<T>(name: string, callback: CuiBusCallback<T>, cui?: CuiElement): string | null;
    //detach(name: string, ctx: CuiContext, cui?: CuiElement): void;
    detach(name: string, id: string, cui?: CuiElement): void;
    detachAll(name: string, cui?: CuiElement): void;
    emit<T>(event: string, cuid: string | null, args?: T): Promise<boolean>;
    isSubscribing(name: string, id: string, cui?: CuiElement): boolean;
    detachByCuid(event: string, cuid: string): void;
}

export interface CuiEventObj {
    callback: any;
    $cuid: string | null;
}

export interface CuiEventReceiver {
    [id: string]: CuiEventObj;
}