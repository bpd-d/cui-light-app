import { ICuiKeysCombo } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { replacePrefix } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { getActionsHelper } from "../../core/helpers/helpers";
import { getEventBusFacade, CuiStyleHelper, ICuiEventBusFacade } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { EVENTS } from "../../core/utils/statics";
import { closeActionsPerformer, ICuiActionExtensionPerformer, openActionsPerformer } from "../extensions/performers";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { getCuiKeyActionPerformer, ICuiKeyActionPerformer } from "../extensions/keys/performer";
import { ICuiScrollFreezeHelper } from "../extensions/helpers/interfaces";
import { getKeyCloseCombos, getScrollFreezeHelper } from "../extensions/helpers/helpers";
import { CuiComponentBaseHook } from "../base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { ICuiParser } from "../../core/utils/parsers/interfaces";
import { getCuiKeysComboParser } from "../../core/utils/parsers/keys";

const COVER_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const COVER_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-cover-open';

export interface CuiDialogEvent {
    timestamp: number;
}

export class CuiCoverArgs extends CuiAutoParseArgs {
    escClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;

    constructor(prefix: string, defTimeout?: number) {
        super();
        this.escClose = false;
        this.timeout = defTimeout ?? 300;
        this.openAct = replacePrefix(COVER_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(COVER_CLOSE_ANIMATION_CLASS, prefix);
        this.keyClose = "";
    }

}

export function CuiCoverComponent(prefix?: string) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "cover",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiCoverHandler(element, utils, attribute, prefix);
        }
    })
}

export class CuiCoverHandler extends CuiHandlerBase<CuiCoverArgs> {

    private _bodyClass: string;
    private _busFacade: ICuiEventBusFacade;
    private _openActionPerformer: ICuiActionExtensionPerformer<any>;
    private _closeActionPerformer: ICuiActionExtensionPerformer<any>;
    private _keysPerformer: ICuiKeyActionPerformer;
    private _freezeHelper: ICuiScrollFreezeHelper;
    private _keyComboParser: ICuiParser<string, ICuiKeysCombo>;

    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string) {
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
        })

        this._closeActionPerformer = closeActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onAfter: this.onAfterClose.bind(this),
        }, {
            active: this.activeAction,
            element: element
        })
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer
        }))
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer
        }))
        // this.extend(eventExtension(this._busFacade, {
        //     eventName: EVENTS.WINDOW_CLICK,
        //     performer: callbackPerformer(this.closeOutside.bind(this))
        // }))
        this.extend(new CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer))
    }

    async onHandle(): Promise<boolean> {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
        this.updateSetup();
        return true;
    }

    async onRefresh(): Promise<boolean> {
        this.updateSetup();
        return true;
    }

    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true
    }

    private updateSetup() {
        this._openActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.openAct)
        })
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.closeAct)
        })
        this._keysPerformer.setKeyCombos(getKeyCloseCombos(this._keyComboParser, this.args.escClose, this.args.keyClose))
    }

    private closeOutside() {
        this._closeActionPerformer.perform(null);
    }

    onBeforeOpen(): boolean {
        if (this.isAnyActive()) {
            return false;
        }

        this._freezeHelper.getScroll();

        return true;
    }

    onAfterOpen(): void {
        this.classes.setClass(this._bodyClass, document.body)
        this._freezeHelper.freeze();
        this.classes.setClass(this.activeClassName, this.element)
        AriaAttributes.setAria(this.element, 'aria-hidden', "false");
        AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
    }

    onAfterClose(): void {
        this._freezeHelper.release();
        this.classes.removeClass(this._bodyClass, document.body);
        AriaAttributes.setAria(this.element, 'aria-hidden', "true");
        AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
    }

    private isAnyActive(): boolean {
        return this.classes.hasClass(this._bodyClass, document.body);
    }
}

