import { CuiClickableArgs } from "../../../core/models/arguments";
import { ICuiHandlerModule } from "src/core/handlers/modules/interfaces";

export class CuiClickModule<T extends CuiClickableArgs> implements ICuiHandlerModule<T> {
    type: string;
    description: string;

    #onClick: ((ev: MouseEvent) => void) | undefined;
    element: HTMLElement;
    args: T;

    constructor(element: HTMLElement, args: T, click?: (ev: MouseEvent) => void | undefined) {
        this.type = 'click';
        this.description = "";


        this.#onClick = click;
        this.element = element;
        this.onElementClick = this.onElementClick.bind(this);
        this.args = args;

    }

    async init(args: T): Promise<boolean> {
        this.args = args;
        this.element.addEventListener('click', this.onElementClick)
        return true;
    }
    async update?(args: T): Promise<boolean> {
        this.args = args;
        return true;
    }
    async destroy(): Promise<boolean> {
        this.element.removeEventListener('click', this.onElementClick)
        return true;
    }

    onClick(callback: (ev: MouseEvent) => void) {
        this.#onClick = callback;
    }

    onElementClick(ev: MouseEvent) {
        if (!this.#onClick) {
            return;
        }
        this.#onClick(ev);
        if (this.args.prevent) {
            ev.preventDefault();
        }
        if (this.args.stopPropagation) {
            ev.stopPropagation();
        }
    }
}
