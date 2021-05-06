import { ICuiComponent, ICuiKeysCombo } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { replacePrefix } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { getEventBusFacade, CuiStyleHelper, getCuiHandlerInteractions, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { closeActionsPerformer, ICuiActionExtensionPerformer, openActionsPerformer } from "../extensions/performers";
import { ICuiParser } from "../../core/utils/parsers/interfaces";
import { ICuiScrollFreezeHelper } from "../extensions/helpers/interfaces";
import { getCuiKeyActionPerformer, ICuiKeyActionPerformer } from "../extensions/keys/performer";
import { getActionsHelper } from "../../core/helpers/helpers";
import { getCuiKeysComboParser } from "../../core/utils/parsers/keys";
import { getKeyCloseCombos, getScrollFreezeHelper } from "../extensions/helpers/helpers";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getAdvancedCuiWindowClickPerformer, ICuiWindowClickPerformer } from "../extensions/window/performer";

const DIALOG_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const DIALOG_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-dialog-open';
const CONTAINER = '.{prefix}-dialog-container';

export interface CuiDialogEvent {
    timestamp: number;
}

export class CuiDialogArgs extends CuiAutoParseArgs {
    escClose: boolean;
    outClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;

    constructor(prefix: string, defTimeout?: number) {
        super();

        this.escClose = false;
        this.outClose = false;
        this.timeout = defTimeout ?? 300;
        this.openAct = replacePrefix(DIALOG_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(DIALOG_CLOSE_ANIMATION_CLASS, prefix);
        this.keyClose = "";
    }
}


export function CuiDialogComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "dialog",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiDialogHandler(element, utils, attribute, prefix);
        }
    })
}

export class CuiDialogHandler extends CuiHandlerBase<CuiDialogArgs> {

    private _bodyClass: string;
    private _busFacade: ICuiEventBusFacade;
    private _interactions: ICuiInteractionsFacade;
    private _openActionPerformer: ICuiActionExtensionPerformer<any>;
    private _closeActionPerformer: ICuiActionExtensionPerformer<any>;
    private _keysPerformer: ICuiKeyActionPerformer;
    private _freezeHelper: ICuiScrollFreezeHelper;
    private _keyComboParser: ICuiParser<string, ICuiKeysCombo>;
    private _windowClickPerformer: ICuiWindowClickPerformer;

    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string) {
        super("CuiDialogHandler", element, attribute, new CuiDialogArgs(prefix, utils.setup.animationTimeLong), utils);
        this._bodyClass = replacePrefix(bodyClass, prefix);
        const container = element.querySelector(replacePrefix(CONTAINER, prefix));
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work")
        }
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const actionsHelper = getActionsHelper(utils.interactions);
        this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(this.closeOutside.bind(this), container ?? undefined);
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
            element: element,
            active: this.activeAction
        })
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer
        }))
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer
        }))
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.WINDOW_CLICK,
            performer: this._windowClickPerformer
        }))
        this.extend(new CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer))
    }

    async onHandle(): Promise<boolean> {
        this._interactions.mutate(() => {
            AriaAttributes.setAria(this.element, 'aria-modal', "");
        })

        this.updateSetup();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        this.updateSetup();
        return true;
    }

    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
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
        this._windowClickPerformer.setEnabled(this.args.outClose);
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
        this._freezeHelper.freeze();
        this.asyncClasses.setClasses(document.body, this._bodyClass)
    }

    onAfterClose(): void {
        this._freezeHelper.release();
        this.asyncClasses.removeClasses(document.body, this._bodyClass);
    }

    onBeforeClose(): boolean {
        return true;
    }

    private isAnyActive(): boolean {
        return this.classes.hasClass(this._bodyClass, document.body);
    }

}