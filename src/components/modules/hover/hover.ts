import { ICuiHandlerModule } from "src/core/handlers/modules/interfaces";
import { CuiHoverEvent, CuiHoverListener } from "../../../core/listeners/hover";

export class CuiHoverModule implements ICuiHandlerModule<any> {
    type: string;
    description: string;
    #hoverListener: CuiHoverListener;
    #onHover: (ev: CuiHoverEvent) => void;

    constructor(element: HTMLElement, onHover: (ev: CuiHoverEvent) => void) {
        this.type = 'hover';
        this.description = "";
        this.#onHover = onHover;
        this.#hoverListener = new CuiHoverListener(element);
        this.#hoverListener.setCallback(this.onHover.bind(this));
    }

    async init(args: any): Promise<boolean> {
        this.#hoverListener.attach();
        return true;
    }

    async destroy(): Promise<boolean> {
        this.#hoverListener.detach();
        return true;
    }

    private onHover(ev: CuiHoverEvent) {
        this.#onHover(ev);
    }
}