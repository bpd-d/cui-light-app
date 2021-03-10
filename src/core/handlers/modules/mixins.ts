import { EventBase } from "src/core/models/events";
import { CuiHTMLElement } from "src/core/models/interfaces";
import { CuiHandlerModuleProps } from "./interfaces";

export class ModuleHandlerProps {
    props: CuiHandlerModuleProps;
    constructor(props: CuiHandlerModuleProps) {
        this.props = props;
    }
}

/**
 * Mixins
 */
export class CuiHandlerBusMixin extends ModuleHandlerProps {
    emittedEvents: string[];

    constructor(props: CuiHandlerModuleProps) {
        super(props)
        this.emittedEvents = [];
    }

    /**
      * Emits event using passed data and cuid of the element
      * NOTE: Don't use it to emit global events
      * @param event Event name
      * @param data Data to emit
      */
    emit<T extends EventBase>(event: string, data: T, source?: CuiHTMLElement) {
        if (!this.emittedEvents.includes(event))
            this.emittedEvents.push(event);

        this.props.utils.bus.emit(event, this.props.cuid, {
            ...data,
            name: event,
            timestamp: Date.now(),
            source: source ?? this.props.element,
        })
    }

    on<T>(event: string, callback: (t: T) => void): string | null {
        return this.props.utils.bus.on(event, callback, this.props.element as any)
    }

    detach(event: string, id: string | null) {
        if (id != null) {
            this.props.utils.bus.detach(event, id);
            id = "";
        }
    }
}

/**
 * Mixin class
 */
export class CuiHandlerInteractionMixin extends ModuleHandlerProps {

    constructor(props: CuiHandlerModuleProps) {
        super(props);
    }

    mutate(callback: any, ...args: any[]): void {
        this.props.utils.interactions.mutate(callback, this, ...args)
    }

    fetch(callback: any, ...args: any[]): void {
        this.props.utils.interactions.fetch(callback, this, ...args)
    }
}