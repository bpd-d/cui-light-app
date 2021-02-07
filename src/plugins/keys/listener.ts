import { ICuiEventListener } from "../../core/models/interfaces";
import { is } from "../../core/utils/functions";

export class CuiKeyPressListener implements ICuiEventListener<KeyboardEvent> {
    #callback: ((t: KeyboardEvent) => void) | undefined;
    #keys: string[];
    #inProgress: boolean;
    #singleEmit: boolean;
    #isAttached: boolean;

    #onKeyDownBound: (ev: KeyboardEvent) => void;
    #onKeyUpBound: (ev: KeyboardEvent) => void;

    constructor(singleEmit: boolean, keys?: string[]) {
        this.#inProgress = false;
        this.#singleEmit = true;
        this.#isAttached = false;
        this.#callback = undefined;
        this.#keys = keys ?? [];

        this.#onKeyDownBound = this.onKeyDown.bind(this);
        this.#onKeyUpBound = this.onKeyUp.bind(this);
    }

    setCallback(callback: (t: KeyboardEvent) => void): void {
        this.#callback = callback;
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }

    attach(): void {
        document.addEventListener('keydown', this.#onKeyDownBound)
        if (this.#singleEmit) {
            document.addEventListener('keyup', this.#onKeyUpBound)
        }
        this.#isAttached = true;
    }

    detach(): void {
        document.removeEventListener('keydown', this.#onKeyDownBound)
        if (this.#singleEmit) {
            document.addEventListener('keyup', this.#onKeyUpBound)
        }
        this.#isAttached = false;
    }

    isAttached(): boolean {
        return this.#isAttached;
    }

    onKeyDown(ev: KeyboardEvent) {
        if (this.#inProgress) {
            return;
        }
        this.#inProgress = true;
        try {
            if ((!is(this.#keys) || this.#keys.includes(ev.code)) && this.#callback) {
                this.#callback(ev);
            }

        } catch (e) {
            console.error(e)
        } finally {
            if (!this.#singleEmit)
                this.#inProgress = false;
        }
    }

    onKeyUp(ev: KeyboardEvent) {
        this.#inProgress = false;
    }
}