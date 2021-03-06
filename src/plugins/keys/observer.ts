import { ICuiEventBus } from "src/core/bus/interfaces";
import { KeyDownEvent } from "src/core/models/events";
import { EVENTS } from "../../core/utils/statics";
import { CuiKeyPressListener } from "./listener";


export interface ICuiKeysObserver {
    connect(): void;
    disconnect(): void;
}
export class CuiKeysObserver {
    #listener: CuiKeyPressListener;
    #bus: ICuiEventBus
    constructor(bus: ICuiEventBus) {
        this.#bus = bus;
        this.#listener = new CuiKeyPressListener(true);
        this.#listener.setCallback(this.onKeyDown.bind(this))
    }
    connect(): void {
        this.#listener.attach();
    }
    disconnect(): void {
        this.#listener.detach();
    }

    onKeyDown(ev: KeyboardEvent) {
        this.#bus.emit<KeyDownEvent>(EVENTS.KEYDOWN, null, {
            timestamp: Date.now(),
            name: EVENTS.KEYDOWN,
            source: "CuiKeysObserver",
            event: ev
        })
    }

}