import { ICuiHandlerExtension } from "src/core/handlers/extensions/interfaces";
import { ICuiExtensionPerformer } from "../interfaces";

export class CuiComponentMutationExtension implements ICuiHandlerExtension<any> {
    type: string = 'mutations';
    description: string = "";

    private _isObserving: boolean;
    private _observer: MutationObserver;
    private _element: Element;
    private _disabled: boolean;
    private _options: MutationObserverInit;
    private _performer: ICuiExtensionPerformer<MutationRecord[]>;
    constructor(element: Element, performer: ICuiExtensionPerformer<MutationRecord[]>, options?: MutationObserverInit) {
        this._element = element;
        this._performer = performer;
        this._disabled = true;
        this._isObserving = false;
        this._options = options ?? {
            childList: true,
            subtree: true,
        };
        this._observer = new MutationObserver(this.onMutation.bind(this));
    }

    async init(args: any): Promise<boolean> {
        this.observe();
        return true;
    }

    async destroy(): Promise<boolean> {
        this.unobserve();
        return true;
    }

    observe(): void {
        if (!this._isObserving && !this._disabled) {
            this._observer.observe(this._element, this._options);
            this._isObserving = true;
        }
    }

    unobserve(): void {
        if (this._isObserving) {
            this._observer.disconnect();
            this._isObserving = false;
        }
    }

    disable(flag: boolean): void {
        this._disabled = flag;
        if (this._disabled) {
            this.unobserve();
        }
    }

    private onMutation(record: MutationRecord[]) {
        this._performer.perform(record);
    }
}