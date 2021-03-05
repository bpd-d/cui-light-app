import { ICuiEventBus } from "src/core/bus/interfaces";
import { GlobalClickEvent } from "src/core/models/events";
import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { EVENTS } from "../../core/utils/statics";

export class CuiWindowClickPlugin implements ICuiPlugin {
    description: string;
    name: string = 'click-plugin';
    setup: any;
    #bus: ICuiEventBus | undefined;
    #boundClick: (ev: MouseEvent) => void;

    constructor() {
        this.description = "CuiWindowClickPlugin";
        this.#bus = undefined;
        this.#boundClick = this.onWindowClick.bind(this);
    }

    init(utils: CuiUtils): void {
        this.#bus = utils.bus;
        window.addEventListener('click', this.#boundClick)
    }

    destroy(): void {
        window.removeEventListener('click', this.#boundClick);
    }

    onWindowClick(ev: MouseEvent) {
        if (this.#bus)
            this.#bus.emit<GlobalClickEvent>(EVENTS.WINDOW_CLICK, null, {
                ev: ev,
                source: "CuiWindowClickPlugin",
                timestamp: Date.now(),
                name: EVENTS.WINDOW_CLICK
            })
    }
}