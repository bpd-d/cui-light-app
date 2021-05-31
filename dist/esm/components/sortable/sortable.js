var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiSimpleDragOverDetector } from "../../core/handlers/drag/detectors";
import { CuiSwipeAnimationEngine, } from "../../core/animation/engine";
import { replacePrefix, is, are, joinWithScopeSelector, } from "../../core/utils/functions";
import { EVENTS, CLASSES } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getCuiHandlerInteractions, getEventBusFacade, } from "../../core/handlers/extensions/facades";
import { moveExtension } from "../extensions/move/move";
import { getEaseTimingFunction } from "../../core/animation/calculators";
import { CuiTimeAnimationEngines } from "../../core/animation/factory";
import { getDragMovePerformer, } from "../extensions/move/performer";
const SORTABLE_IS_MOVING = "{prefix}-moving";
const DEFAULT_SELECTOR = " > *";
const SORTABLE_PREVIEW_CLS = "{prefix}-sortable-preview";
const SORTABLE_LOCKED = "{prefix}-locked";
export class CuiSortableArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                target: { corrector: joinWithScopeSelector },
                trigger: { corrector: joinWithScopeSelector },
            },
        });
        this.target = joinWithScopeSelector(DEFAULT_SELECTOR);
        this.trigger = joinWithScopeSelector(DEFAULT_SELECTOR);
        this.timeout = 150;
        this.threshold = 5;
    }
}
export function CuiSortableComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "sortable",
        create: (element, utils, prefix, attribute) => {
            return new CuiSortableHandler(element, attribute, utils, prefix);
        },
    });
}
export class CuiSortableHandler extends CuiHandlerBase {
    constructor(element, attribute, utils, prefix) {
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
            onEnd: this.onDragEnd.bind(this),
        });
        this._detector = new CuiSimpleDragOverDetector();
        this._animation = new CuiSwipeAnimationEngine(CuiTimeAnimationEngines.get(getEaseTimingFunction()));
        this.extend(moveExtension({
            target: element,
            performer: this._dragPerformer,
        }));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getTargetsAndTrggers();
            this._detector.setThreshold(this.args.threshold);
            this._dragPerformer.setTimeout(this.args.timeout);
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs &&
                (this.args.target !== this.prevArgs.target ||
                    this.args.trigger !== this.prevArgs.trigger)) {
                this.getTargetsAndTrggers();
            }
            this._dragPerformer.setTimeout(this.args.timeout);
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    getTargetsAndTrggers() {
        this._targets = [...this.element.querySelectorAll(this.args.target)];
        this._triggers = [...this.element.querySelectorAll(this.args.trigger)];
        if (this._triggers.length !== this._targets.length) {
            this.log.error("Incorrect trigger or target selector");
            this._targets = [];
            this._triggers = [];
        }
        this._detector.setElements(this._targets);
    }
    onDragStart(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._currentIdx = this.getPressedElementIdx(data.target);
            this._currentTarget =
                this._currentIdx > -1
                    ? this._targets[this._currentIdx]
                    : null;
            if (!is(this._currentTarget)) {
                return false;
            }
            this.core.bus.emit(EVENTS.MOVE_LOCK, null, true);
            this.startMovementPrep(data);
            this._busFacade.emit(EVENTS.SORT_START, {
                target: this._currentTarget,
                index: this._currentIdx,
            });
            return true;
        });
    }
    onDragOver(data) {
        this.move(data);
        data.event.preventDefault();
    }
    onDragEnd(data) {
        if (!is(this._preview)) {
            return;
        }
        //@ts-ignore preview
        this._animation.setElement(this._preview);
        this._animation.setProps(this.getFinishAnimation());
        this._animation
            .finish({ progress: 0, timeout: 100, revert: false })
            .then((status) => {
            if (status)
                this.onSortAnimationFinish();
        });
    }
    getPressedElementIdx(target) {
        return this._triggers.findIndex((trigger) => {
            return trigger.contains(target);
        });
    }
    startMovementPrep(data) {
        this._interactions.mutate(() => {
            this.createPreview();
            if (is(this._currentTarget))
                //@ts-ignore currentTarget
                this.classes.setClass(this._movingCls, this._currentTarget);
            this.classes.setClass(this._lockedCls, this.element);
            this.classes.setClass(CLASSES.swipingOn, document.body);
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    stopMovementPrep() {
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
        });
    }
    move(data) {
        this._interactions.mutate(() => {
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    createPreview() {
        if (!is(this._currentTarget)) {
            this.logError("Cannot create preview - current target does not exist", "createPreview");
            return;
        }
        this._preview = new ElementBuilder("div")
            .setClasses(this._previewCls)
            .build();
        //@ts-ignore currentTarget
        this._preview.style.width = `${this._currentTarget.offsetWidth}px`;
        //@ts-ignore currentTarget
        this._preview.style.height = `${this._currentTarget.offsetHeight}px`;
        document.body.appendChild(this._preview);
    }
    removePreview() {
        if (is(this._preview)) {
            //@ts-ignore currentTarget
            this._preview.remove();
            this._preview = null;
        }
    }
    setPreviewPosition(data) {
        if (!is(this._preview)) {
            return;
        }
        //@ts-ignore preview
        this._preview.style.top = `${data.y}px`;
        //@ts-ignore preview
        this._preview.style.left = `${data.x}px`;
    }
    setCurrentPosition(data) {
        if (!this._currentTarget) {
            return;
        }
        let [idx, detected] = this._detector.detect(data.x, data.y);
        if (idx !== this._currentIdx &&
            detected &&
            this._currentBefore !== detected) {
            let el = detected;
            this.insertElement(this._currentTarget, el);
            this._currentBefore = el;
            this.getTargetsAndTrggers();
            this._currentIdx = idx;
        }
    }
    insertElement(source, destination) {
        if (is(destination)) {
            this.element.insertBefore(source, destination);
        }
        else {
            this.element.appendChild(source);
        }
    }
    getFinishAnimation() {
        if (!are(this._currentTarget, this._preview)) {
            return {
                opacity: {
                    from: 1,
                    to: 0,
                },
            };
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
                unit: "px",
            },
            left: {
                //@ts-ignore preview
                from: this._preview.offsetLeft,
                //@ts-ignore preview
                to: box.left > 0 ? box.left : this._preview.offsetLeft,
                unit: "px",
            },
        };
    }
    onSortAnimationFinish() {
        this.stopMovementPrep();
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, false);
        this._busFacade.emit(EVENTS.SORTED, {
            target: this._currentTarget,
            index: this._currentIdx,
        });
    }
}
