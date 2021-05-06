import { ICuiEventBusFacade } from "src/core/handlers/extensions/facades";
import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
import { KeyDownEvent } from "../../../core/models/events";
import { isInViewport } from "../../../core/utils/functions";
import { EVENTS } from "../../../core/utils/statics";
import { ICuiExtensionPerformer } from "../interfaces";

export class ICuiKeysExtensionOptions {
    allowRepeatedEvent?: boolean;
    onlyWhenInViewport?: boolean;
}

export class CuiKeysHandlerExtension implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    private _performer: ICuiExtensionPerformer<KeyDownEvent>;
    private _eventId: string | null;
    private _options: ICuiKeysExtensionOptions;
    private _busFacade: ICuiEventBusFacade;
    private _element: HTMLElement;

    constructor(element: HTMLElement, busFacade: ICuiEventBusFacade, performer: ICuiExtensionPerformer<KeyDownEvent>, options?: ICuiKeysExtensionOptions) {
        this.type = "keys";
        this.description = "";

        this._busFacade = busFacade;
        this._performer = performer;
        this._eventId = null;
        this._element = element;
        this._options = {
            allowRepeatedEvent: options?.allowRepeatedEvent ?? false,
            onlyWhenInViewport: options?.onlyWhenInViewport ?? true,
        }
    }

    async init(args: any): Promise<boolean> {
        this._eventId = this._busFacade.on<KeyDownEvent>(EVENTS.KEYDOWN, this.onKeyDown.bind(this));
        return true;
    }

    async update(args: any) {
        //  this.args = args;
        return true;
    }

    async destroy(): Promise<boolean> {
        if (this._eventId)
            this._busFacade.detach(EVENTS.KEYDOWN, this._eventId)
        this._eventId = null;
        return true;
    }

    onKeyDown(ev: KeyDownEvent) {
        if (!(this._options.onlyWhenInViewport && isInViewport(this._element)) || (this._options.allowRepeatedEvent && !ev.event.repeat)) {
            return;
        }
        this._performer.perform(ev);
    }

}