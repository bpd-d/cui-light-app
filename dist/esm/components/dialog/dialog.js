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
import { EVENTS } from "../../core/utils/statics";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getEventBusFacade, CuiStyleHelper, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { closeActionsPerformer, openActionsPerformer } from "../extensions/performers";
import { getCuiKeyActionPerformer } from "../extensions/keys/performer";
import { getActionsHelper } from "../../core/helpers/helpers";
import { getCuiKeysComboParser } from "../../core/utils/parsers/keys";
import { getKeyCloseCombos, getScrollFreezeHelper } from "../extensions/helpers/helpers";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getAdvancedCuiWindowClickPerformer } from "../extensions/window/performer";
const DIALOG_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const DIALOG_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-dialog-open';
const CONTAINER = '.{prefix}-dialog-container';
export class CuiDialogArgs extends CuiAutoParseArgs {
    constructor(prefix, defTimeout) {
        super();
        this.escClose = false;
        this.outClose = false;
        this.timeout = defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300;
        this.openAct = replacePrefix(DIALOG_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(DIALOG_CLOSE_ANIMATION_CLASS, prefix);
        this.keyClose = "";
    }
}
export function CuiDialogComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "dialog",
        create: (element, utils, prefix, attribute) => {
            return new CuiDialogHandler(element, utils, attribute, prefix);
        }
    });
}
export class CuiDialogHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiDialogHandler", element, attribute, new CuiDialogArgs(prefix, utils.setup.animationTimeLong), utils);
        this._bodyClass = replacePrefix(bodyClass, prefix);
        const container = element.querySelector(replacePrefix(CONTAINER, prefix));
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const actionsHelper = getActionsHelper(utils.interactions);
        this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(this.closeOutside.bind(this), container !== null && container !== void 0 ? container : undefined);
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
}
