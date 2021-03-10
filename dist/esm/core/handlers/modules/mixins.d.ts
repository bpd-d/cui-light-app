import { EventBase } from "src/core/models/events";
import { CuiHTMLElement } from "src/core/models/interfaces";
import { CuiHandlerModuleProps } from "./interfaces";
export declare class ModuleHandlerProps {
    props: CuiHandlerModuleProps;
    constructor(props: CuiHandlerModuleProps);
}
/**
 * Mixins
 */
export declare class CuiHandlerBusMixin extends ModuleHandlerProps {
    emittedEvents: string[];
    constructor(props: CuiHandlerModuleProps);
    /**
      * Emits event using passed data and cuid of the element
      * NOTE: Don't use it to emit global events
      * @param event Event name
      * @param data Data to emit
      */
    emit<T extends EventBase>(event: string, data: T, source?: CuiHTMLElement): void;
    on<T>(event: string, callback: (t: T) => void): string | null;
    detach(event: string, id: string | null): void;
}
/**
 * Mixin class
 */
export declare class CuiHandlerInteractionMixin extends ModuleHandlerProps {
    constructor(props: CuiHandlerModuleProps);
    mutate(callback: any, ...args: any[]): void;
    fetch(callback: any, ...args: any[]): void;
}
