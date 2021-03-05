import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { calcWindowSize, is } from "../../core/utils/functions";
import { CuiIntersectionObserver } from "../../core/observers/intersection";
import { CuiWindowSize } from "../../core/utils/types";
import { CuiActionsFatory, ICuiComponentAction } from "../../core/utils/actions";
import { CuiResizeData } from "../../core/models/events";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

type CuiResizeComponentMode = "smart" | "simple";

export class CuiResizeArgs extends CuiAutoParseArgs {
    mode: CuiResizeComponentMode;
    default: string;
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    delay: number;
    constructor() {
        super();
        this.mode = "simple";
        this.default = "";
        this.small = this.medium = this.large = this.xlarge = '';
        this.delay = 0;
    }
}

export class CuiResizeComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;

    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-resize`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiResizeHandler(element, utils, this.attribute);
    }
}

export class CuiResizeHandler extends CuiHandlerBase<CuiResizeArgs> {
    #eventId: string | null;
    #intersectionObserver: CuiIntersectionObserver;
    #currentSize: CuiWindowSize;
    #currentValue: string | undefined;
    #lastValue: string;
    #currentAction: ICuiComponentAction | undefined;
    #isIntersecting: boolean;
    #timeoutToken: any | undefined;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiResizeHandler", element, attribute, new CuiResizeArgs(), utils);
        this.#eventId = null;
        this.#intersectionObserver = new CuiIntersectionObserver(document.documentElement, [0, 0.1])
        this.#intersectionObserver.setCallback(this.onIntersection.bind(this));
        this.#lastValue = "";
        this.#currentValue = "";
        this.#currentSize = "none";
        this.#isIntersecting = false;
        this.#timeoutToken = undefined;
        this.#currentAction = undefined;
    }

    async onHandle(): Promise<boolean> {
        this.#eventId = this.utils.bus.on(EVENTS.RESIZE, this.resize.bind(this));
        this.#intersectionObserver.connect();
        this.#intersectionObserver.observe(this.element);
        this.#currentSize = calcWindowSize(window.innerWidth);
        this.#isIntersecting = this.isInViewport(this.element);
        this.setNewValue();
        this.updateElement();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.setNewValue();
        this.updateElement();
        return true;
    }
    async onRemove(): Promise<boolean> {
        if (this.#eventId !== null) {
            this.utils.bus.detach(EVENTS.RESIZE, this.#eventId);
            this.#eventId = null
        }
        this.#intersectionObserver.unobserve(this.element);
        this.#intersectionObserver.disconnect();
        return true;
    }

    private resize(data: CuiResizeData) {
        this.#currentSize = data.current;
        this.setNewValue();
        this.updateElement();
    }

    private onIntersection(entries: IntersectionObserverEntry[]) {
        if (entries.length > 0) {
            this.#isIntersecting = entries[0].isIntersecting;
        }
        this.updateElement();
    }

    private setNewValue() {
        let newValue = this.isSmartMode() ? this.getSmartValue(this.#currentSize) : this.getValue(this.#currentSize, true);
        if (newValue && newValue !== this.#currentValue) {
            this.#currentValue = newValue;
        }
    }

    private getValue(size: CuiWindowSize, replace?: boolean): string | undefined {
        let value = undefined;
        switch (size) {
            case "xlarge":
                value = this.args.xlarge;
                break;
            case "large":
                value = this.args.large;
                break;
            case "medium":
                value = this.args.medium;
                break;
            case "small":
                value = this.args.small;
                break;
            default:
                value = this.args.default;
        }
        return (replace && !value) ? this.args.default : value;
    }

    private getSmartValue(size: CuiWindowSize) {
        let value = this.args.default;
        if (size === 'none') {
            return value;
        }
        value = this.args.small ?? value;
        if (size === 'small') {
            return value;
        }
        value = this.args.medium ?? value;
        if (size === 'medium') {
            return value;
        }
        value = this.args.large ?? value;
        if (size === 'large') {
            return value;
        }
        return this.args.xlarge ?? value;
    }

    private updateElement() {
        if (!this.#isIntersecting && this.isSmartMode()) {
            this.logInfo("Not intersecting")
            return;
        }
        if (!is(this.#currentValue)) {
            this.logWarning("Not eligible to set value: " + this.#currentValue)
            return;
        }
        if (this.#lastValue !== this.#currentValue) {
            this.run(() => {
                //@ts-ignore already checked
                let newAction = CuiActionsFatory.get(this.#currentValue);
                this.mutate(() => {
                    if (this.#currentAction) {
                        this.#currentAction.remove(this.element);
                    }
                    newAction.add(this.element);
                    //@ts-ignore already checked
                    this.#lastValue = this.#currentValue;
                    this.#currentAction = newAction;

                })
            })

        }
    }

    private isSmartMode() {
        return this.args.mode === 'smart';
    }

    private isInViewport(element: Element): boolean {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    private run(callback: () => void) {
        if (this.#timeoutToken) {
            clearTimeout(this.#timeoutToken);
            this.#timeoutToken = undefined;
        }
        this.#timeoutToken = setTimeout(() => {
            callback();
            this.#timeoutToken = undefined;
        }, this.args.delay);
    }
}