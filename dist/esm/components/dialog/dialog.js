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
var _defTimeout, _prefix, _prefix_1, _prefix_2, _bodyClass, _scrollY, _windowClickEventId;
import { replacePrefix, isStringTrue, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiInteractableHandler } from "../../core/handlers/base";
const DIALOG_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const DIALOG_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-dialog-open';
const CONTAINER = '.{prefix}-dialog-container';
export class CuiDialogArgs {
    constructor(prefix, defTimeout) {
        _defTimeout.set(this, void 0);
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _defTimeout, defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300);
        __classPrivateFieldSet(this, _prefix, prefix);
        this.escClose = false;
        this.outClose = false;
        this.timeout = __classPrivateFieldGet(this, _defTimeout);
        this.openAct = "";
        this.closeAct = "";
        this.keyClose = "";
    }
    parse(args) {
        this.escClose = isStringTrue(args.escClose);
        this.outClose = isStringTrue(args.outClose);
        this.keyClose = args.keyClose;
        this.timeout = getIntOrDefault(args.timeout, __classPrivateFieldGet(this, _defTimeout));
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(DIALOG_OPEN_ANIMATION_CLASS, __classPrivateFieldGet(this, _prefix)));
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(DIALOG_CLOSE_ANIMATION_CLASS, __classPrivateFieldGet(this, _prefix)));
    }
}
_defTimeout = new WeakMap(), _prefix = new WeakMap();
export class CuiDialogComponent {
    constructor(prefix) {
        _prefix_1.set(this, void 0);
        __classPrivateFieldSet(this, _prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix_1)}-dialog`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiDialogHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
export class CuiDialogHandler extends CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiDialogHandler", element, attribute, new CuiDialogArgs(prefix, utils.setup.animationTimeLong), utils);
        _prefix_2.set(this, void 0);
        _bodyClass.set(this, void 0);
        _scrollY.set(this, void 0);
        _windowClickEventId.set(this, void 0);
        __classPrivateFieldSet(this, _bodyClass, replacePrefix(bodyClass, prefix));
        __classPrivateFieldSet(this, _prefix_2, prefix);
        __classPrivateFieldSet(this, _scrollY, 0);
        __classPrivateFieldSet(this, _windowClickEventId, null);
    }
    onInit() {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
    }
    onUpdate() {
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
        document.body.style.top = `-${__classPrivateFieldGet(this, _scrollY)}px`;
    }
    onAfterClose() {
        document.body.style.top = '';
        window.scrollTo(0, (__classPrivateFieldGet(this, _scrollY) || 0) * -1);
        __classPrivateFieldSet(this, _scrollY, 0);
        this.helper.removeClass(__classPrivateFieldGet(this, _bodyClass), document.body);
        this.detachEvent(EVENTS.WINDOW_CLICK, __classPrivateFieldGet(this, _windowClickEventId));
    }
    onBeforeClose() {
        return true;
    }
    isAnyActive() {
        return this.helper.hasClass(__classPrivateFieldGet(this, _bodyClass), document.body);
    }
    onWindowClick(ev) {
        let container = this.element.querySelector(replacePrefix(CONTAINER, __classPrivateFieldGet(this, _prefix_2)));
        if (container && !container.contains(ev.target)) {
            this.close('out').then(() => {
                this._log.debug("Closed by click outside");
            });
        }
    }
}
_prefix_2 = new WeakMap(), _bodyClass = new WeakMap(), _scrollY = new WeakMap(), _windowClickEventId = new WeakMap();
