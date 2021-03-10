export class ModuleHandlerProps {
    constructor(props) {
        this.props = props;
    }
}
/**
 * Mixins
 */
export class CuiHandlerBusMixin extends ModuleHandlerProps {
    constructor(props) {
        super(props);
        this.emittedEvents = [];
    }
    /**
      * Emits event using passed data and cuid of the element
      * NOTE: Don't use it to emit global events
      * @param event Event name
      * @param data Data to emit
      */
    emit(event, data, source) {
        if (!this.emittedEvents.includes(event))
            this.emittedEvents.push(event);
        this.props.utils.bus.emit(event, this.props.cuid, Object.assign(Object.assign({}, data), { name: event, timestamp: Date.now(), source: source !== null && source !== void 0 ? source : this.props.element }));
    }
    on(event, callback) {
        return this.props.utils.bus.on(event, callback, this.props.element);
    }
    detach(event, id) {
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
    constructor(props) {
        super(props);
    }
    mutate(callback, ...args) {
        this.props.utils.interactions.mutate(callback, this, ...args);
    }
    fetch(callback, ...args) {
        this.props.utils.interactions.fetch(callback, this, ...args);
    }
}
