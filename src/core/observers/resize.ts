import { CuiWindowSize } from "../utils/types";
import { calcWindowSize, calcWindowSize2 } from "../utils/functions";
import { ICuiEventBus } from "../models/interfaces";
import { EVENTS } from "../utils/statics";

export interface ICuiResizable {
    resize(data: CuiResizeData): Promise<boolean>;
}

export interface ICuiResizableObserver {
    observe(target: ICuiResizable): void;
    unobserve(target: ICuiResizable): void;
    connect(): void;
    disconnect(): void;
}

export interface CuiResizeData {
    current: CuiWindowSize;
    previous: CuiWindowSize;
    width: number;
    height: number;
    timestamp: number;
}

export class CuiResizeObserver implements ICuiResizableObserver {

    #items: ICuiResizable[];
    #promises: Promise<boolean>[];
    #prevYValue: number;
    #inProgress: boolean;
    #previousSize: CuiWindowSize;
    #threshold: number;
    #bus: ICuiEventBus;
    #listenerBoundCall: (ev: UIEvent) => void;
    constructor(bus: ICuiEventBus, threshold?: number) {
        this.#items = [];
        this.#promises = [];
        this.#prevYValue = window.innerWidth;
        this.#inProgress = false;
        this.#previousSize = calcWindowSize(window.innerWidth)
        this.#threshold = threshold ?? 0;
        this.#bus = bus;
        this.#listenerBoundCall = this.listener.bind(this);
    }

    observe(target: ICuiResizable): void {
        let idx = this.#items.findIndex(x => x === target)
        if (idx < 0) {
            this.#items.push(target);
        }
    }

    unobserve(target: ICuiResizable): void {
        let idx = this.#items.findIndex(x => x === target)
        if (idx >= 0) {
            this.#items.splice(idx, 1)
        }
    }
    connect(): void {
        window.addEventListener('resize', this.#listenerBoundCall)
    }

    disconnect(): void {
        window.removeEventListener('resize', this.#listenerBoundCall)
    }

    private pushUpdateToItems(resizeData: CuiResizeData) {
        if (this.#items.length < 1) {
            return;
        }
        this.#promises = [];
        this.#items.forEach(x => {
            this.#promises.push(x.resize(resizeData))
        })
        Promise.all(this.#promises)
        this.#promises = [];
    }

    private listener(ev: UIEvent) {
        if (this.#inProgress) {
            return;
        }
        this.#inProgress = true
        const diff = window.innerWidth - this.#prevYValue;

        if (Math.abs(diff) >= this.#threshold) {
            const currentSize = calcWindowSize2(window.innerWidth);
            if (currentSize !== this.#previousSize) {
                const resizeData: CuiResizeData = {
                    current: currentSize,
                    previous: this.#previousSize,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: Date.now()
                };
                this.#bus.emit(EVENTS.RESIZE, "", resizeData)
                this.pushUpdateToItems(resizeData);

                this.#previousSize = currentSize;
            }
        }
        this.#inProgress = false
    }


}