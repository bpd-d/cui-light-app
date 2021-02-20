import { CuiEventReceiver } from "../models/interfaces";

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
    handle(receiver: CuiEventReceiver, cuid: string | null, args: any[]): Promise<boolean>;
}

export interface ICuiCallbackExecutor {
    execute(callback: any, args: any[]): Promise<boolean>;
}