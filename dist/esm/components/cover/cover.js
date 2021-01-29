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
var _defTimeout, _prefix, _prefix_1, _bodyClass, _scrollY;
import { replacePrefix, isStringTrue, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiInteractableHandler } from "../../core/handlers/base";
const COVER_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const COVER_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-cover-open';
export class CuiCoverArgs {
    constructor(prefix, defTimeout) {
        _defTimeout.set(this, void 0);
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _defTimeout, defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300);
        __classPrivateFieldSet(this, _prefix, prefix);
        this.escClose = false;
        this.timeout = __classPrivateFieldGet(this, _defTimeout);
        this.openAct = "";
        this.closeAct = "";
        this.keyClose = "";
    }
    parse(args) {
        this.escClose = isStringTrue(args.escClose);
        this.keyClose = args.keyClose;
        this.timeout = getIntOrDefault(args.timeout, __classPrivateFieldGet(this, _defTimeout));
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(COVER_OPEN_ANIMATION_CLASS, __classPrivateFieldGet(this, _prefix)));
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(COVER_CLOSE_ANIMATION_CLASS, __classPrivateFieldGet(this, _prefix)));
    }
}
_defTimeout = new WeakMap(), _prefix = new WeakMap();
export class CuiCoverComponent {
    constructor(prefix) {
        _prefix_1.set(this, void 0);
        __classPrivateFieldSet(this, _prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix_1)}-cover`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiCoverHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
export class CuiCoverHandler extends CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiDialogHandler", element, attribute, new CuiCoverArgs(prefix, utils.setup.animationTimeLong), utils);
        _bodyClass.set(this, void 0);
        _scrollY.set(this, void 0);
        __classPrivateFieldSet(this, _bodyClass, replacePrefix(bodyClass, prefix));
        __classPrivateFieldSet(this, _scrollY, 0);
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
        this.helper.setClass(__classPrivateFieldGet(this, _bodyClass), document.body);
        document.body.style.top = `-${__classPrivateFieldGet(this, _scrollY)}px`;
        AriaAttributes.setAria(this.element, 'aria-hidden', "false");
    }
    onAfterClose() {
        document.body.style.top = '';
        window.scrollTo(0, (__classPrivateFieldGet(this, _scrollY) || 0) * -1);
        __classPrivateFieldSet(this, _scrollY, 0);
        this.helper.removeClass(__classPrivateFieldGet(this, _bodyClass), document.body);
        AriaAttributes.setAria(this.element, 'aria-hidden', "true");
    }
    onBeforeClose() {
        return true;
    }
    isAnyActive() {
        return this.helper.hasClass(__classPrivateFieldGet(this, _bodyClass), document.body);
    }
}
_bodyClass = new WeakMap(), _scrollY = new WeakMap();
