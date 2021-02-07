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
var _defTimeout, _prefix, _prefix_1, _isMoving, _isResizing, _prevX, _prevY, _prefix_2, _moveListener, _positionCalculator, _resizeCalculator, _resizeBtn, _moveBtn;
import { replacePrefix, isStringTrue, is, getIntOrDefault, getStringOrDefault } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiInteractableHandler } from "../../core/handlers/base";
import { CuiMoveEventListener } from "../../core/listeners/move";
import { BasePositionCalculator, BaseResizeCalculator } from "./helpers";
import { CLASSES, EVENTS } from "../../core/utils/statics";
const FLOAT_OPEN_ANIMATION_CLASS = '.{prefix}-float-default-in';
const FLOAT_CLOSE_ANIMATION_CLASS = '.{prefix}-float-default-out';
const MOVE = '.{prefix}-float-move';
const RESIZE = '.{prefix}-float-resize';
export class CuiFloatArgs {
    constructor(prefix, defTimeout) {
        _defTimeout.set(this, void 0);
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _defTimeout, defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300);
        __classPrivateFieldSet(this, _prefix, prefix);
        this.escClose = false;
        this.keyClose = "";
        this.openAct = "";
        this.closeAct = "";
        this.timeout = __classPrivateFieldGet(this, _defTimeout);
    }
    parse(args) {
        this.escClose = isStringTrue(args.escClose);
        this.keyClose = args.keyClose;
        this.timeout = getIntOrDefault(args.timeout, __classPrivateFieldGet(this, _defTimeout));
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(FLOAT_OPEN_ANIMATION_CLASS, __classPrivateFieldGet(this, _prefix)));
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(FLOAT_CLOSE_ANIMATION_CLASS, __classPrivateFieldGet(this, _prefix)));
    }
}
_defTimeout = new WeakMap(), _prefix = new WeakMap();
export class CuiFloatComponent {
    constructor(prefix) {
        _prefix_1.set(this, void 0);
        __classPrivateFieldSet(this, _prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix_1)}-float`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiFloatHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
export class CuiFloatHandler extends CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiFloatHandler", element, attribute, new CuiFloatArgs(prefix, utils.setup.animationTime), utils);
        _isMoving.set(this, void 0);
        _isResizing.set(this, void 0);
        _prevX.set(this, void 0);
        _prevY.set(this, void 0);
        _prefix_2.set(this, void 0);
        _moveListener.set(this, void 0);
        _positionCalculator.set(this, void 0);
        _resizeCalculator.set(this, void 0);
        _resizeBtn.set(this, void 0);
        _moveBtn.set(this, void 0);
        __classPrivateFieldSet(this, _isMoving, false);
        __classPrivateFieldSet(this, _isResizing, false);
        __classPrivateFieldSet(this, _prevX, 0);
        __classPrivateFieldSet(this, _prevY, 0);
        __classPrivateFieldSet(this, _moveListener, new CuiMoveEventListener());
        __classPrivateFieldGet(this, _moveListener).preventDefault(false);
        __classPrivateFieldSet(this, _positionCalculator, new BasePositionCalculator());
        __classPrivateFieldSet(this, _resizeCalculator, new BaseResizeCalculator(element));
        __classPrivateFieldSet(this, _prefix_2, prefix);
        this.move = this.move.bind(this);
        this.resize = this.resize.bind(this);
        __classPrivateFieldSet(this, _moveBtn, null);
        __classPrivateFieldSet(this, _resizeBtn, null);
        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("WindowClick plugin is not available, outClose will not work");
        }
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
    }
    onInit() {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
        __classPrivateFieldSet(this, _moveBtn, this.element.querySelector(replacePrefix(MOVE, __classPrivateFieldGet(this, _prefix_2))));
        __classPrivateFieldSet(this, _resizeBtn, this.element.querySelector(replacePrefix(RESIZE, __classPrivateFieldGet(this, _prefix_2))));
        __classPrivateFieldGet(this, _moveListener).setCallback(this.onMove.bind(this));
    }
    onUpdate() {
    }
    onDestroy() {
    }
    onBeforeOpen() {
        return true;
    }
    onAfterOpen() {
        __classPrivateFieldGet(this, _moveListener).attach();
    }
    onAfterClose() {
        __classPrivateFieldGet(this, _moveListener).detach();
    }
    onBeforeClose() {
        return true;
    }
    onMove(ev) {
        switch (ev.type) {
            case 'down':
                this.onMouseDown(ev);
                break;
            case 'up':
                this.onMouseUp(ev);
                break;
            case 'move':
                this.onMouseMove(ev);
                break;
        }
    }
    onMouseDown(ev) {
        if (ev.target === __classPrivateFieldGet(this, _moveBtn)) {
            __classPrivateFieldSet(this, _isMoving, true);
            ev.event.preventDefault();
        }
        else if (ev.target === __classPrivateFieldGet(this, _resizeBtn)) {
            __classPrivateFieldSet(this, _isResizing, true);
            ev.event.preventDefault();
            //this.helper.setClass("cui-float-resize-shadow")
        }
        __classPrivateFieldSet(this, _prevX, ev.x);
        __classPrivateFieldSet(this, _prevY, ev.y);
        this.helper.setClassesAs(document.body, CLASSES.swipingOn);
        // Lock global move handler
        this.utils.bus.emit(EVENTS.MOVE_LOCK, null, true);
    }
    onMouseMove(ev) {
        if (__classPrivateFieldGet(this, _isMoving)) {
            this.peform(ev, this.move);
        }
        else if (__classPrivateFieldGet(this, _isResizing)) {
            this.peform(ev, this.resize);
        }
    }
    onMouseUp(ev) {
        __classPrivateFieldSet(this, _isMoving, false);
        __classPrivateFieldSet(this, _isResizing, false);
        this.helper.removeClassesAs(document.body, CLASSES.swipingOn);
        // Unlock global handler
        this.utils.bus.emit(EVENTS.MOVE_LOCK, null, false);
    }
    peform(ev, callback) {
        this.mutate(() => {
            if (is(callback))
                callback(this.element, ev.x, ev.y, (ev.x - __classPrivateFieldGet(this, _prevX)), (ev.y - __classPrivateFieldGet(this, _prevY)));
            __classPrivateFieldSet(this, _prevX, ev.x);
            __classPrivateFieldSet(this, _prevY, ev.y);
        });
        ev.event.preventDefault();
    }
    resize(element, x, y, diffX, diffY) {
        let [newWidth, newHeight] = __classPrivateFieldGet(this, _resizeCalculator).calculate(x, y, diffX, diffY);
        if (this.fitsWindow(element.offsetTop, element.offsetLeft, newWidth, newHeight)) {
            this.mutate(() => {
                element.style.width = newWidth + "px";
                element.style.height = newHeight + "px";
            });
        }
    }
    move(element, x, y, diffX, diffY) {
        let [newX, newY] = __classPrivateFieldGet(this, _positionCalculator).calculate(x, y, diffX, diffY);
        if (this.fitsWindow(newY, newX, element.offsetWidth, element.offsetHeight)) {
            this.mutate(() => {
                element.style.left = newX + "px";
                element.style.top = newY + "px";
            });
        }
    }
    fitsWindow(top, left, width, height) {
        return (top + height < window.innerHeight - 10) &&
            (top > 10) && (left > 10) &&
            (left + width < window.innerWidth - 10);
    }
}
_isMoving = new WeakMap(), _isResizing = new WeakMap(), _prevX = new WeakMap(), _prevY = new WeakMap(), _prefix_2 = new WeakMap(), _moveListener = new WeakMap(), _positionCalculator = new WeakMap(), _resizeCalculator = new WeakMap(), _resizeBtn = new WeakMap(), _moveBtn = new WeakMap();
