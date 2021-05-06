import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiSimpleDragOverDetector } from "../../core/handlers/drag/detectors";
import { ICuiElementDetector } from "../../core/handlers/drag/interfaces";
import { CuiSwipeAnimationEngine, PropsTypes } from "../../core/animation/engine";
import { AnimationProperty } from "../../core/animation/interfaces";
import { ICuiMoveData } from "../../core/listeners/move";
import { ICuiParsable, ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { replacePrefix, is, are, joinWithScopeSelector } from "../../core/utils/functions";
import { EVENTS, CLASSES } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { SortEvent } from "../../core/models/events";
import { CuiComponentBaseHook } from "../base";
import { getCuiHandlerInteractions, getEventBusFacade, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { moveExtension } from "../extensions/move/move";
import { getEaseTimingFunction } from "../../core/animation/calculators";
import { CuiTimeAnimationEngines } from "../../core/animation/factory";
import { getDragMovePerformer, ICuiDragExtensionPerformer } from "../extensions/move/performer";

const SORTABLE_IS_MOVING = "{prefix}-moving";
const DEFAULT_SELECTOR = " > *";
const SORTABLE_PREVIEW_CLS = "{prefix}-sortable-preview";
const SORTABLE_LOCKED = "{prefix}-locked";

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

export function CuiSortableComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "sortable",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiSortableHandler(element, attribute, utils, prefix)
        }
    })
}

export class CuiSortableHandler extends CuiHandlerBase<CuiSortableArgs> {
    private _triggers: Element[];
    private _targets: Element[];
    private _currentTarget: HTMLElement | null;
    private _currentIdx: number;
    private _preview: HTMLElement | null;

    private _detector: ICuiElementDetector;
    private _currentBefore: HTMLElement | null;
    private _animation: CuiSwipeAnimationEngine;

    private _previewCls: string;
    private _movingCls: string;
    private _lockedCls: string;

    private _busFacade: ICuiEventBusFacade;
    private _interactions: ICuiInteractionsFacade;
    private _dragPerformer: ICuiDragExtensionPerformer;

    constructor(element: HTMLElement, attribute: string, utils: CuiCore, prefix: string) {
        super("CuiSortableHandler", element, attribute, new CuiSortableArgs(), utils);
        this._targets = [];
        this._triggers = [];
        this._currentIdx = -1;
        this._currentTarget = null;
        this._currentBefore = null;
        this._preview = null;

        this._movingCls = replacePrefix(SORTABLE_IS_MOVING, prefix);
        this._previewCls = replacePrefix(SORTABLE_PREVIEW_CLS, prefix);
        this._lockedCls = replacePrefix(SORTABLE_LOCKED, prefix);

        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._dragPerformer = getDragMovePerformer({
            onStart: this.onDragStart.bind(this),
            onMove: this.onDragOver.bind(this),
            onEnd: this.onDragEnd.bind(this)
        })

        this._detector = new CuiSimpleDragOverDetector();
        this._animation = new CuiSwipeAnimationEngine(CuiTimeAnimationEngines.get(getEaseTimingFunction()));
        this.extend(moveExtension({
            target: element,
            performer: this._dragPerformer
        }))
    }

    async onHandle(): Promise<boolean> {
        this.getTargetsAndTrggers();
        this._detector.setThreshold(this.args.threshold);
        this._dragPerformer.setTimeout(this.args.timeout);
        return true;
    }
    async onRefresh(): Promise<boolean> {
        if (this.prevArgs && (this.args.target !== this.prevArgs.target ||
            this.args.trigger !== this.prevArgs.trigger)) {
            this.getTargetsAndTrggers();
        }
        this._dragPerformer.setTimeout(this.args.timeout);
        return true;
    }
    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
    }

    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    private getTargetsAndTrggers() {
        this._targets = [...this.element.querySelectorAll(this.args.target)];
        this._triggers = [...this.element.querySelectorAll(this.args.trigger)];
        if (this._triggers.length !== this._targets.length) {
            this.log.error("Incorrect trigger or target selector")
            this._targets = [];
            this._triggers = [];
        }
        this._detector.setElements(this._targets);
    }

    private async onDragStart(data: ICuiMoveData): Promise<boolean> {
        this._currentIdx = this.getPressedElementIdx(data.target as Node);
        this._currentTarget = this._currentIdx > -1 ? this._targets[this._currentIdx] as HTMLElement : null;
        if (!is(this._currentTarget)) {
            return false;
        }
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, true);
        this.startMovementPrep(data);
        this._busFacade.emit<SortEvent>(EVENTS.SORT_START, {
            target: this._currentTarget,
            index: this._currentIdx,
        })

        return true;
    }

    private onDragOver(data: ICuiMoveData): void {
        this.move(data);
        data.event.preventDefault();
    }

    private onDragEnd(data: ICuiMoveData): void {
        if (!is(this._preview)) {
            return;
        }
        //@ts-ignore preview
        this._animation.setElement(this._preview);
        this._animation.setProps(this.getFinishAnimation());
        this._animation.finish({ progress: 0, timeout: 100, revert: false }).then((status: boolean) => {
            if (status)
                this.onSortAnimationFinish();
        });
    }

    private getPressedElementIdx(target: Node) {
        return this._triggers.findIndex((trigger: Element) => {
            return trigger.contains(target)
        });
    }

    private startMovementPrep(data: ICuiMoveData) {
        this._interactions.mutate(() => {
            this.createPreview();
            if (is(this._currentTarget))
                //@ts-ignore currentTarget
                this.classes.setClass(this._movingCls, this._currentTarget);
            this.classes.setClass(this._lockedCls, this.element);
            this.classes.setClass(CLASSES.swipingOn, document.body);
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        })
    }

    private stopMovementPrep() {
        this._interactions.mutate(() => {
            if (is(this._currentTarget))
                //@ts-ignore currentTarget
                this.classes.removeClass(this._movingCls, this._currentTarget);
            this.classes.removeClass(CLASSES.swipingOn, document.body);
            this.classes.removeClass(this._lockedCls, this.element);
            this.removePreview();
            this._currentTarget = null;
            this._currentBefore = null;
            this.getTargetsAndTrggers();
        })
    }

    private move(data: ICuiMoveData) {
        this._interactions.mutate(() => {
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        })
    }

    private createPreview() {
        if (!is(this._currentTarget)) {
            this.logError("Cannot create preview - current target does not exist", "createPreview")
            return;
        }

        this._preview = new ElementBuilder("div").setClasses(this._previewCls).build();
        //@ts-ignore currentTarget
        this._preview.style.width = `${this._currentTarget.offsetWidth}px`;
        //@ts-ignore currentTarget
        this._preview.style.height = `${this._currentTarget.offsetHeight}px`;
        document.body.appendChild(this._preview);
    }

    private removePreview() {
        if (is(this._preview)) {
            //@ts-ignore currentTarget
            this._preview.remove();
            this._preview = null;
        }
    }

    private setPreviewPosition(data: ICuiMoveData) {
        if (!is(this._preview)) {
            return;
        }
        //@ts-ignore preview
        this._preview.style.top = `${data.y}px`;
        //@ts-ignore preview
        this._preview.style.left = `${data.x}px`;
    }

    private setCurrentPosition(data: ICuiMoveData) {
        if (!this._currentTarget) {
            return;
        }
        let [idx, detected] = this._detector.detect(data.x, data.y);
        if ((idx !== this._currentIdx) && detected && this._currentBefore !== detected) {
            let el = detected;
            this.insertElement(this._currentTarget, el);
            this._currentBefore = el as HTMLElement;
            this.getTargetsAndTrggers();
            this._currentIdx = idx;
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
        if (!are(this._currentTarget, this._preview)) {
            return {
                opacity: {
                    from: 1,
                    to: 0,
                }
            }
        }
        //@ts-ignore currentTarget
        const box = this._currentTarget.getBoundingClientRect();
        return {
            opacity: {
                from: 1,
                to: 0,
            },
            top: {
                //@ts-ignore preview
                from: this._preview.offsetTop,
                //@ts-ignore preview
                to: box.top > 0 ? box.top : this._preview.offsetTop,
                unit: "px"
            },
            left: {
                //@ts-ignore preview
                from: this._preview.offsetLeft,
                //@ts-ignore preview
                to: box.left > 0 ? box.left : this._preview.offsetLeft,
                unit: "px"
            }
        }
    }

    private onSortAnimationFinish() {
        this.stopMovementPrep();
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, false);
        this._busFacade.emit<SortEvent>(EVENTS.SORTED, {
            target: this._currentTarget,
            index: this._currentIdx,
        })
    }
}