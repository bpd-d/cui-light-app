var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prefix, _dragHandler, _triggers, _targets, _currentTarget, _currentIdx, _preview, _movingCls, _detector, _currentBefore, _animation, _previewCls;
import { ElementBuilder } from "../../core/builders/element";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiSimpleDragOverDetector } from "../../core/handlers/drag/detectors";
import { CuiDragHandler } from "../../core/handlers/drag/drag";
import { CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { replacePrefix, is, are, joinWithScopeSelector } from "../../core/utils/functions";
import { EVENTS, CLASSES } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
const SORTABLE_IS_MOVING = "{prefix}-moving";
const DEFAULT_SELECTOR = " > *";
const SORTABLE_PREVIEW_CLS = "{prefix}-sortable-preview";
export class CuiSortableArgs extends CuiAutoParseArgs {
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
export class CuiSortableComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : "cui");
        this.attribute = __classPrivateFieldGet(this, _prefix) + "-sortable";
    }
    getStyle() {
        return null;
    }
    get(element, sutils) {
        return new CuiSortableHandler(element, this.attribute, sutils, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiSortableHandler extends CuiHandlerBase {
    constructor(element, attribute, utils, prefix) {
        super("CuiSortableHandler", element, attribute, new CuiSortableArgs(), utils);
        _dragHandler.set(this, void 0);
        _triggers.set(this, void 0);
        _targets.set(this, void 0);
        _currentTarget.set(this, void 0);
        _currentIdx.set(this, void 0);
        _preview.set(this, void 0);
        _movingCls.set(this, void 0);
        _detector.set(this, void 0);
        _currentBefore.set(this, void 0);
        _animation.set(this, void 0);
        _previewCls.set(this, void 0);
        __classPrivateFieldSet(this, _targets, []);
        __classPrivateFieldSet(this, _triggers, []);
        __classPrivateFieldSet(this, _currentIdx, -1);
        __classPrivateFieldSet(this, _currentTarget, null);
        __classPrivateFieldSet(this, _currentBefore, null);
        __classPrivateFieldSet(this, _preview, null);
        __classPrivateFieldSet(this, _dragHandler, new CuiDragHandler(element));
        __classPrivateFieldGet(this, _dragHandler).onDragStart(this.onDragStart.bind(this));
        __classPrivateFieldGet(this, _dragHandler).onDragOver(this.onDragOver.bind(this));
        __classPrivateFieldGet(this, _dragHandler).onDragEnd(this.onDragEnd.bind(this));
        __classPrivateFieldSet(this, _movingCls, replacePrefix(SORTABLE_IS_MOVING, prefix));
        __classPrivateFieldSet(this, _previewCls, replacePrefix(SORTABLE_PREVIEW_CLS, prefix));
        __classPrivateFieldSet(this, _detector, new CuiSimpleDragOverDetector());
        __classPrivateFieldSet(this, _animation, new CuiSwipeAnimationEngine());
        __classPrivateFieldGet(this, _animation).setOnFinish(() => {
            let item = __classPrivateFieldGet(this, _currentTarget);
            let idx = __classPrivateFieldGet(this, _currentIdx);
            this.stopMovementPrep();
            this.utils.bus.emit(EVENTS.MOVE_LOCK, null, false);
            this.emitEvent(EVENTS.SORTED, {
                item: item,
                index: idx,
                timestamp: new Date()
            });
        });
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _dragHandler).attach();
            this.getTargetsAndTrggers();
            __classPrivateFieldGet(this, _detector).setThreshold(this.args.threshold);
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs && (this.args.target !== this.prevArgs.target ||
                this.args.trigger !== this.prevArgs.trigger)) {
                this.getTargetsAndTrggers();
            }
            __classPrivateFieldGet(this, _dragHandler).setLongPressTimeout(this.args.timeout);
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _dragHandler).detach();
            return true;
        });
    }
    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    getTargetsAndTrggers() {
        try {
            __classPrivateFieldSet(this, _targets, [...this.element.querySelectorAll(this.args.target)]);
            __classPrivateFieldSet(this, _triggers, [...this.element.querySelectorAll(this.args.trigger)]);
            if (__classPrivateFieldGet(this, _triggers).length !== __classPrivateFieldGet(this, _targets).length) {
                throw new Error(`Triggers (count ${__classPrivateFieldGet(this, _triggers).length}) and targets (count ${__classPrivateFieldGet(this, _targets).length}) selector are not correct`);
            }
            __classPrivateFieldGet(this, _detector).setElements(__classPrivateFieldGet(this, _targets));
        }
        catch (e) {
            this._log.error("Incorrect trigger or target selector");
            this._log.exception(e, "getTargetsAndTrggers");
            __classPrivateFieldSet(this, _targets, []);
            __classPrivateFieldSet(this, _triggers, []);
        }
    }
    onDragStart(data) {
        __classPrivateFieldSet(this, _currentIdx, this.getPressedElementIdx(data.target));
        __classPrivateFieldSet(this, _currentTarget, __classPrivateFieldGet(this, _currentIdx) > -1 ? __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)] : null);
        if (!is(__classPrivateFieldGet(this, _currentTarget))) {
            return false;
        }
        this.utils.bus.emit(EVENTS.MOVE_LOCK, null, true);
        this.startMovementPrep(data);
        this.emitEvent(EVENTS.SORT_START, {
            item: __classPrivateFieldGet(this, _currentTarget),
            index: __classPrivateFieldGet(this, _currentIdx),
            timestamp: new Date()
        });
        return true;
    }
    onDragOver(data) {
        this.move(data);
        data.event.preventDefault();
    }
    onDragEnd(data) {
        if (!is(__classPrivateFieldGet(this, _preview))) {
            return;
        }
        //@ts-ignore preview
        __classPrivateFieldGet(this, _animation).setElement(__classPrivateFieldGet(this, _preview));
        __classPrivateFieldGet(this, _animation).setProps(this.getFinishAnimation());
        __classPrivateFieldGet(this, _animation).finish(0, 100, false);
    }
    getPressedElementIdx(target) {
        return __classPrivateFieldGet(this, _triggers).findIndex((trigger) => {
            return trigger.contains(target);
        });
    }
    startMovementPrep(data) {
        this.mutate(() => {
            this.createPreview();
            if (is(__classPrivateFieldGet(this, _currentTarget)))
                //@ts-ignore currentTarget
                this.helper.setClass(__classPrivateFieldGet(this, _movingCls), __classPrivateFieldGet(this, _currentTarget));
            this.helper.setClass("cui-locked", this.element);
            this.helper.setClass(CLASSES.swipingOn, document.body);
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    stopMovementPrep() {
        this.mutate(() => {
            if (is(__classPrivateFieldGet(this, _currentTarget)))
                //@ts-ignore currentTarget
                this.helper.removeClass(__classPrivateFieldGet(this, _movingCls), __classPrivateFieldGet(this, _currentTarget));
            this.helper.removeClass(CLASSES.swipingOn, document.body);
            this.helper.removeClass("cui-locked", this.element);
            this.removePreview();
            __classPrivateFieldSet(this, _currentTarget, null);
            __classPrivateFieldSet(this, _currentBefore, null);
            this.getTargetsAndTrggers();
        });
    }
    move(data) {
        this.mutate(() => {
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    createPreview() {
        if (!is(__classPrivateFieldGet(this, _currentTarget))) {
            this.logError("Cannot create preview - current target does not exist", "createPreview");
            return;
        }
        __classPrivateFieldSet(this, _preview, new ElementBuilder("div").setClasses(__classPrivateFieldGet(this, _previewCls)).build());
        //@ts-ignore currentTarget
        __classPrivateFieldGet(this, _preview).style.width = `${__classPrivateFieldGet(this, _currentTarget).offsetWidth}px`;
        //@ts-ignore currentTarget
        __classPrivateFieldGet(this, _preview).style.height = `${__classPrivateFieldGet(this, _currentTarget).offsetHeight}px`;
        document.body.appendChild(__classPrivateFieldGet(this, _preview));
    }
    removePreview() {
        if (is(__classPrivateFieldGet(this, _preview))) {
            //@ts-ignore currentTarget
            __classPrivateFieldGet(this, _preview).remove();
            __classPrivateFieldSet(this, _preview, null);
        }
    }
    setPreviewPosition(data) {
        if (!is(__classPrivateFieldGet(this, _preview))) {
            return;
        }
        //@ts-ignore preview
        __classPrivateFieldGet(this, _preview).style.top = `${data.y}px`;
        //@ts-ignore preview
        __classPrivateFieldGet(this, _preview).style.left = `${data.x}px`;
    }
    setCurrentPosition(data) {
        if (!__classPrivateFieldGet(this, _currentTarget)) {
            return;
        }
        let [idx, detected] = __classPrivateFieldGet(this, _detector).detect(data.x, data.y);
        if ((idx !== __classPrivateFieldGet(this, _currentIdx)) && detected && __classPrivateFieldGet(this, _currentBefore) !== detected) {
            let el = detected;
            this.insertElement(__classPrivateFieldGet(this, _currentTarget), el);
            __classPrivateFieldSet(this, _currentBefore, el);
            this.getTargetsAndTrggers();
            __classPrivateFieldSet(this, _currentIdx, idx);
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
        if (!are(__classPrivateFieldGet(this, _currentTarget), __classPrivateFieldGet(this, _preview))) {
            return {
                opacity: {
                    from: 1,
                    to: 0,
                }
            };
        }
        //@ts-ignore currentTarget
        const box = __classPrivateFieldGet(this, _currentTarget).getBoundingClientRect();
        return {
            opacity: {
                from: 1,
                to: 0,
            },
            top: {
                //@ts-ignore preview
                from: __classPrivateFieldGet(this, _preview).offsetTop,
                //@ts-ignore preview
                to: box.top > 0 ? box.top : __classPrivateFieldGet(this, _preview).offsetTop,
                unit: "px"
            },
            left: {
                //@ts-ignore preview
                from: __classPrivateFieldGet(this, _preview).offsetLeft,
                //@ts-ignore preview
                to: box.left > 0 ? box.left : __classPrivateFieldGet(this, _preview).offsetLeft,
                unit: "px"
            }
        };
    }
}
_dragHandler = new WeakMap(), _triggers = new WeakMap(), _targets = new WeakMap(), _currentTarget = new WeakMap(), _currentIdx = new WeakMap(), _preview = new WeakMap(), _movingCls = new WeakMap(), _detector = new WeakMap(), _currentBefore = new WeakMap(), _animation = new WeakMap(), _previewCls = new WeakMap();
