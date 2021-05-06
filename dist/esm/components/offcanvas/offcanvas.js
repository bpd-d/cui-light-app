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
var _prefix_1;
import { CuiHandlerBase, } from "../../core/handlers/base";
import { AriaAttributes } from "../../core/utils/aria";
import { replacePrefix, getName } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { getEventBusFacade, CuiStyleHelper, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { getAdvancedCuiWindowClickPerformer } from "../extensions/window/performer";
import { eventExtension } from "../extensions/event/event";
import { EVENTS } from "../../core/utils/statics";
import { CuiComponentBaseHook } from "../base";
import { closeActionsPerformer, openActionsPerformer } from "../extensions/performers";
import { getCuiKeyActionPerformer } from "../extensions/keys/performer";
import { getActionsHelper } from "../../core/helpers/helpers";
import { getCuiKeysComboParser } from "../../core/utils/parsers/keys";
import { getKeyCloseCombos, getScrollFreezeHelper } from "../extensions/helpers/helpers";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { CuiActionsListFactory } from "../../core/utils/actions";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-right-in";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-right-out";
const OFFCANVAS_LEFT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-left-in";
const OFFCANVAS_LEFT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-left-out";
const OFFCANVAS_BODY = "{prefix}-off-canvas-open";
const OFFCANVAS_CONTAINER_CLS = '.{prefix}-off-canvas-container';
export class CuiOffCanvasArgs extends CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super();
        _prefix_1.set(this, void 0);
        __classPrivateFieldSet(this, _prefix_1, prefix);
        this.escClose = false;
        this.position = 'right';
        this.openAct = this.getDefaultOpenClass();
        this.closeAct = this.getDefaultCloseClass();
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.outClose = false;
        this.keyClose = "";
    }
    getDefaultOpenClass() {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_IN : OFFCANVAS_LEFT_ANIM_DEFAULT_IN, __classPrivateFieldGet(this, _prefix_1));
    }
    getDefaultCloseClass() {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT : OFFCANVAS_LEFT_ANIM_DEFAULT_OUT, __classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
export function CuiOffCanvasComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "off-canvas",
        create: (element, utils, prefix, attribute) => {
            return new CuiOffCanvasHandler(element, utils, attribute, prefix);
        }
    });
}
export class CuiOffCanvasHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiOffCanvasHandler", element, attribute, new CuiOffCanvasArgs(prefix, utils.setup.animationTime), utils);
        this._prefix = prefix;
        const container = element.querySelector(replacePrefix(OFFCANVAS_CONTAINER_CLS, prefix));
        this._bodyClass = replacePrefix(OFFCANVAS_BODY, prefix);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        const actionsHelper = getActionsHelper(utils.interactions);
        this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(this.closeOutside.bind(this), container !== null && container !== void 0 ? container : undefined);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);
        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("WindowClick plugin is not available, outClose will not work");
        }
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
        this._openActionPerformer = openActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onBefore: this.onBeforeOpen.bind(this),
            onAfter: this.onAfterOpen.bind(this),
        }, {
            element: element,
            active: this.activeAction
        });
        this._closeActionPerformer = closeActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onAfter: this.onAfterClose.bind(this),
        }, {
            element: element,
            active: this.activeAction
        });
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.WINDOW_CLICK,
            performer: this._windowClickPerformer
        }));
        this.extend(new CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this._interactions.mutate(() => {
                this.setPositionLeft();
                AriaAttributes.setAria(this.element, 'aria-modal', "");
            });
            this.updateSetup();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateSetup();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    updateSetup() {
        this._openActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.openAct)
        });
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.closeAct)
        });
        this._keysPerformer.setKeyCombos(getKeyCloseCombos(this._keyComboParser, this.args.escClose, this.args.keyClose));
        this._windowClickPerformer.setEnabled(this.args.outClose);
    }
    closeOutside() {
        this._closeActionPerformer.perform(null);
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        this._freezeHelper.getScroll();
        return true;
    }
    onAfterOpen() {
        this._freezeHelper.freeze();
        this.asyncClasses.setClasses(document.body, this._bodyClass);
    }
    onAfterClose() {
        this._freezeHelper.release();
        this.asyncClasses.removeClasses(document.body, this._bodyClass);
    }
    onBeforeClose() {
        return true;
    }
    isAnyActive() {
        return this.classes.hasClass(this._bodyClass, document.body);
    }
    setPositionLeft() {
        let cls = getName(this._prefix, 'left');
        if (this.args.position === 'left' && !this.classes.hasClass(cls, this.element)) {
            this.classes.setClass(cls, this.element);
        }
        else if (this.args.position == 'right' && this.classes.hasClass(cls, this.element)) {
            this.classes.removeClass(cls, this.element);
        }
    }
}
