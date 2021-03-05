import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiSimpleDragOverDetector } from "../../core/handlers/drag/detectors";
import { CuiDragHandler } from "../../core/handlers/drag/drag";
import { ICuiElementDetector } from "../../core/handlers/drag/interfaces";
import { CuiSwipeAnimationEngine, PropsTypes } from "../../core/animation/engine";
import { AnimationProperty } from "../../core/animation/interfaces";
import { ICuiMoveData } from "../../core/listeners/move";
import { ICuiParsable, ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { replacePrefix, is, are, joinWithScopeSelector } from "../../core/utils/functions";
import { SCOPE_SELECTOR, EVENTS, CLASSES } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

const SORTABLE_IS_MOVING = "{prefix}-moving";
const DEFAULT_SELECTOR = " > *";
const SORTABLE_PREVIEW_CLS = "{prefix}-sortable-preview";

export class CuiSortableArgs extends CuiAutoParseArgs implements ICuiParsable {
    target: string;
    trigger: string;
    timeout: number;
    threshold: number;

    constructor() {
        super({
            props: {
                "target": { corrector: joinWithScopeSelector },
                "trigger": { corrector: joinWithScopeSelector }
            }
        });

        this.target = joinWithScopeSelector(DEFAULT_SELECTOR);
        this.trigger = joinWithScopeSelector(DEFAULT_SELECTOR);
        this.timeout = 150;
        this.threshold = 5;
    }
}

export class CuiSortableComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? "cui";
        this.attribute = this.#prefix + "-sortable";
    }
    getStyle(): string | null {
        return null;
    }
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler {
        return new CuiSortableHandler(element, this.attribute, sutils, this.#prefix);
    }
}

export class CuiSortableHandler extends CuiHandlerBase<CuiSortableArgs> {
    #dragHandler: CuiDragHandler;
    #triggers: Element[];
    #targets: Element[];
    #currentTarget: HTMLElement | null;
    #currentIdx: number;
    #preview: HTMLElement | null;
    #movingCls: string;
    #detector: ICuiElementDetector;
    #currentBefore: HTMLElement | null;
    #animation: CuiSwipeAnimationEngine;

    #previewCls: string;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string) {
        super("CuiSortableHandler", element, attribute, new CuiSortableArgs(), utils);
        this.#targets = [];
        this.#triggers = [];
        this.#currentIdx = -1;
        this.#currentTarget = null;
        this.#currentBefore = null;
        this.#preview = null;

        this.#dragHandler = new CuiDragHandler(element);
        this.#dragHandler.onDragStart(this.onDragStart.bind(this));
        this.#dragHandler.onDragOver(this.onDragOver.bind(this));
        this.#dragHandler.onDragEnd(this.onDragEnd.bind(this));
        this.#movingCls = replacePrefix(SORTABLE_IS_MOVING, prefix);
        this.#previewCls = replacePrefix(SORTABLE_PREVIEW_CLS, prefix);
        this.#detector = new CuiSimpleDragOverDetector();
        this.#animation = new CuiSwipeAnimationEngine();
        this.#animation.setOnFinish(() => {
            let item = this.#currentTarget;
            let idx = this.#currentIdx;
            this.stopMovementPrep();

            this.utils.bus.emit(EVENTS.MOVE_LOCK, null, false);
            this.emitEvent(EVENTS.SORTED, {
                item: item,
                index: idx,
                timestamp: new Date()
            })
        })
    }

    async onHandle(): Promise<boolean> {
        this.#dragHandler.attach();
        this.getTargetsAndTrggers();
        this.#detector.setThreshold(this.args.threshold)
        return true;
    }
    async onRefresh(): Promise<boolean> {
        if (this.prevArgs && (this.args.target !== this.prevArgs.target ||
            this.args.trigger !== this.prevArgs.trigger)) {
            this.getTargetsAndTrggers();
        }
        this.#dragHandler.setLongPressTimeout(this.args.timeout);
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.#dragHandler.detach();
        return true;
    }

    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    private getTargetsAndTrggers() {
        try {
            this.#targets = [...this.element.querySelectorAll(this.args.target)];
            this.#triggers = [...this.element.querySelectorAll(this.args.trigger)];
            if (this.#triggers.length !== this.#targets.length) {
                throw new Error(`Triggers (count ${this.#triggers.length}) and targets (count ${this.#targets.length}) selector are not correct`)
            }
            this.#detector.setElements(this.#targets);
        } catch (e) {
            this._log.error("Incorrect trigger or target selector")
            this._log.exception(e, "getTargetsAndTrggers");
            this.#targets = [];
            this.#triggers = [];
        }
    }

    private onDragStart(data: ICuiMoveData): boolean {
        this.#currentIdx = this.getPressedElementIdx(data.target as Node);
        this.#currentTarget = this.#currentIdx > -1 ? this.#targets[this.#currentIdx] as HTMLElement : null;
        if (!is(this.#currentTarget)) {
            return false;
        }
        this.utils.bus.emit(EVENTS.MOVE_LOCK, null, true);
        this.startMovementPrep(data);
        this.emitEvent(EVENTS.SORT_START, {
            item: this.#currentTarget,
            index: this.#currentIdx,
            timestamp: new Date()
        })
        return true;
    }

    private onDragOver(data: ICuiMoveData): void {
        this.move(data);
        data.event.preventDefault();
    }

    private onDragEnd(data: ICuiMoveData): void {
        if (!is(this.#preview)) {
            return;
        }
        //@ts-ignore preview
        this.#animation.setElement(this.#preview);
        this.#animation.setProps(this.getFinishAnimation());
        this.#animation.finish(0, 100, false);
    }

    private getPressedElementIdx(target: Node) {
        return this.#triggers.findIndex((trigger: Element) => {
            return trigger.contains(target)
        });
    }

    private startMovementPrep(data: ICuiMoveData) {
        this.mutate(() => {
            this.createPreview();
            if (is(this.#currentTarget))
                //@ts-ignore currentTarget
                this.helper.setClass(this.#movingCls, this.#currentTarget);
            this.helper.setClass("cui-locked", this.element);
            this.helper.setClass(CLASSES.swipingOn, document.body);
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        })
    }

    private stopMovementPrep() {
        this.mutate(() => {
            if (is(this.#currentTarget))
                //@ts-ignore currentTarget
                this.helper.removeClass(this.#movingCls, this.#currentTarget);
            this.helper.removeClass(CLASSES.swipingOn, document.body);
            this.helper.removeClass("cui-locked", this.element);
            this.removePreview();
            this.#currentTarget = null;
            this.#currentBefore = null;
            this.getTargetsAndTrggers();
        })
    }

    private move(data: ICuiMoveData) {
        this.mutate(() => {
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        })
    }

    private createPreview() {
        if (!is(this.#currentTarget)) {
            this.logError("Cannot create preview - current target does not exist", "createPreview")
            return;
        }

        this.#preview = new ElementBuilder("div").setClasses(this.#previewCls).build();
        //@ts-ignore currentTarget
        this.#preview.style.width = `${this.#currentTarget.offsetWidth}px`;
        //@ts-ignore currentTarget
        this.#preview.style.height = `${this.#currentTarget.offsetHeight}px`;
        document.body.appendChild(this.#preview);
    }

    private removePreview() {
        if (is(this.#preview)) {
            //@ts-ignore currentTarget
            this.#preview.remove();
            this.#preview = null;
        }
    }

    private setPreviewPosition(data: ICuiMoveData) {
        if (!is(this.#preview)) {
            return;
        }
        //@ts-ignore preview
        this.#preview.style.top = `${data.y}px`;
        //@ts-ignore preview
        this.#preview.style.left = `${data.x}px`;
    }

    private setCurrentPosition(data: ICuiMoveData) {
        if (!this.#currentTarget) {
            return;
        }
        let [idx, detected] = this.#detector.detect(data.x, data.y);
        if ((idx !== this.#currentIdx) && detected && this.#currentBefore !== detected) {
            let el = detected;
            this.insertElement(this.#currentTarget, el);
            this.#currentBefore = el as HTMLElement;
            this.getTargetsAndTrggers();
            this.#currentIdx = idx;
        }
    }

    private insertElement(source: Element, destination: Element) {
        if (is(destination)) {
            this.element.insertBefore(source, destination);
        } else {
            this.element.appendChild(source);
        }
    }

    private getFinishAnimation(): AnimationProperty<PropsTypes> {
        if (!are(this.#currentTarget, this.#preview)) {
            return {
                opacity: {
                    from: 1,
                    to: 0,
                }
            }
        }
        //@ts-ignore currentTarget
        const box = this.#currentTarget.getBoundingClientRect();
        return {
            opacity: {
                from: 1,
                to: 0,
            },
            top: {
                //@ts-ignore preview
                from: this.#preview.offsetTop,
                //@ts-ignore preview
                to: box.top > 0 ? box.top : this.#preview.offsetTop,
                unit: "px"
            },
            left: {
                //@ts-ignore preview
                from: this.#preview.offsetLeft,
                //@ts-ignore preview
                to: box.left > 0 ? box.left : this.#preview.offsetLeft,
                unit: "px"
            }
        }
    }
}