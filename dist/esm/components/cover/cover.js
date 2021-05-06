var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { replacePrefix } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { getActionsHelper } from "../../core/helpers/helpers";
import { getEventBusFacade, CuiStyleHelper } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { EVENTS } from "../../core/utils/statics";
import { closeActionsPerformer, openActionsPerformer } from "../extensions/performers";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { getCuiKeyActionPerformer } from "../extensions/keys/performer";
import { getKeyCloseCombos, getScrollFreezeHelper } from "../extensions/helpers/helpers";
import { CuiComponentBaseHook } from "../base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getCuiKeysComboParser } from "../../core/utils/parsers/keys";
const COVER_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const COVER_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-cover-open';
export class CuiCoverArgs extends CuiAutoParseArgs {
    constructor(prefix, defTimeout) {
        super();
        this.escClose = false;
        this.timeout = defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300;
        this.openAct = replacePrefix(COVER_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(COVER_CLOSE_ANIMATION_CLASS, prefix);
        this.keyClose = "";
    }
}
export function CuiCoverComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "cover",
        create: (element, utils, prefix, attribute) => {
            return new CuiCoverHandler(element, utils, attribute, prefix);
        }
    });
}
export class CuiCoverHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiCoverHandler", element, attribute, new CuiCoverArgs(prefix, utils.setup.animationTimeLong), utils);
        this._bodyClass = replacePrefix(bodyClass, prefix);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        const actionsHelper = getActionsHelper(utils.interactions);
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
            active: this.activeAction,
            element: element
        });
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer
        }));
        // this.extend(eventExtension(this._busFacade, {
        //     eventName: EVENTS.WINDOW_CLICK,
        //     performer: callbackPerformer(this.closeOutside.bind(this))
        // }))
        this.extend(new CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            AriaAttributes.setAria(this.element, 'aria-modal', "");
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
        this.classes.setClass(this._bodyClass, document.body);
        this._freezeHelper.freeze();
        this.classes.setClass(this.activeClassName, this.element);
        AriaAttributes.setAria(this.element, 'aria-hidden', "false");
        AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
    }
    onAfterClose() {
        this._freezeHelper.release();
        this.classes.removeClass(this._bodyClass, document.body);
        AriaAttributes.setAria(this.element, 'aria-hidden', "true");
        AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
    }
    isAnyActive() {
        return this.classes.hasClass(this._bodyClass, document.body);
    }
}
