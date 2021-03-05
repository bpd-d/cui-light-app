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
var _prefix, _prefix_1, _prefix_2, _bodyClass, _scrollY, _windowClickEventId;
import { CuiInteractableHandler } from "../../core/handlers/base";
import { AriaAttributes } from "../../core/utils/aria";
import { replacePrefix, getName } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-right-in";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-right-out";
const OFFCANVAS_LEFT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-left-in";
const OFFCANVAS_LEFT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-left-out";
const OFFCANVAS_BODY = "{prefix}-off-canvas-open";
const OFFCANVAS_CONTAINER_CLS = '.{prefix}-off-canvas-container';
export class CuiOffCanvasArgs extends CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super();
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix);
        this.escClose = false;
        this.position = 'right';
        this.openAct = this.getDefaultOpenClass();
        this.closeAct = this.getDefaultCloseClass();
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.outClose = false;
        this.keyClose = "";
    }
    getDefaultOpenClass() {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_IN : OFFCANVAS_LEFT_ANIM_DEFAULT_IN, __classPrivateFieldGet(this, _prefix));
    }
    getDefaultCloseClass() {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT : OFFCANVAS_LEFT_ANIM_DEFAULT_OUT, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiOffCanvasComponent {
    constructor(prefix) {
        _prefix_1.set(this, void 0);
        __classPrivateFieldSet(this, _prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix_1)}-off-canvas`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiOffCanvasHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
export class CuiOffCanvasHandler extends CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiOffCanvasHandler", element, attribute, new CuiOffCanvasArgs(prefix, utils.setup.animationTime), utils);
        _prefix_2.set(this, void 0);
        _bodyClass.set(this, void 0);
        _scrollY.set(this, void 0);
        _windowClickEventId.set(this, void 0);
        __classPrivateFieldSet(this, _prefix_2, prefix);
        __classPrivateFieldSet(this, _bodyClass, replacePrefix(OFFCANVAS_BODY, prefix));
        __classPrivateFieldSet(this, _windowClickEventId, null);
        __classPrivateFieldSet(this, _scrollY, 0);
        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("WindowClick plugin is not available, outClose will not work");
        }
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
    }
    onInit() {
        this.mutate(() => {
            this.setPositionLeft();
            AriaAttributes.setAria(this.element, 'aria-modal', "");
        });
    }
    onUpdate() {
        this.setPositionLeft();
    }
    onDestroy() {
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        __classPrivateFieldSet(this, _scrollY, window.pageYOffset);
        return true;
    }
    onAfterOpen() {
        if (this.args.outClose) {
            __classPrivateFieldSet(this, _windowClickEventId, this.onEvent(EVENTS.WINDOW_CLICK, this.onWindowClick.bind(this)));
        }
        this.helper.setClass(__classPrivateFieldGet(this, _bodyClass), document.body);
        document.body.style.top = `-${scrollY}px`;
    }
    onAfterClose() {
        this.detachEvent(EVENTS.WINDOW_CLICK, __classPrivateFieldGet(this, _windowClickEventId));
        this.helper.removeClass(__classPrivateFieldGet(this, _bodyClass), document.body);
        document.body.style.top = '';
        window.scrollTo(0, __classPrivateFieldGet(this, _scrollY) * -1);
    }
    onBeforeClose() {
        return true;
    }
    onWindowClick(ev) {
        const container = this.element.querySelector(replacePrefix(OFFCANVAS_CONTAINER_CLS, __classPrivateFieldGet(this, _prefix_2)));
        if (container && !container.contains(ev.ev.target)) {
            this.close();
        }
    }
    isAnyActive() {
        return this.helper.hasClass(__classPrivateFieldGet(this, _bodyClass), document.body);
    }
    setPositionLeft() {
        let cls = getName(__classPrivateFieldGet(this, _prefix_2), 'left');
        if (this.args.position === 'left' && !this.helper.hasClass(cls, this.element)) {
            this.helper.setClass(cls, this.element);
        }
        else if (this.args.position == 'right' && this.helper.hasClass(cls, this.element)) {
            this.helper.removeClass(cls, this.element);
        }
    }
}
_prefix_2 = new WeakMap(), _bodyClass = new WeakMap(), _scrollY = new WeakMap(), _windowClickEventId = new WeakMap();
