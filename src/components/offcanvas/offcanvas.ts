
import { CuiHandlerBase, } from "../../core/handlers/base";
import { AriaAttributes } from "../../core/utils/aria";
import { ICuiKeysCombo } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { replacePrefix, getName } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { getEventBusFacade, CuiStyleHelper, getCuiHandlerInteractions, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { getAdvancedCuiWindowClickPerformer, ICuiWindowClickPerformer } from "../extensions/window/performer";
import { eventExtension } from "../extensions/event/event";
import { EVENTS } from "../../core/utils/statics";
import { CuiComponentBaseHook } from "../base";
import { closeActionsPerformer, ICuiActionExtensionPerformer, openActionsPerformer } from "../extensions/performers";
import { ICuiParser } from "../../core/utils/parsers/interfaces";
import { ICuiScrollFreezeHelper } from "../extensions/helpers/interfaces";
import { getCuiKeyActionPerformer, ICuiKeyActionPerformer } from "../extensions/keys/performer";
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
    escClose: boolean;
    outClose: boolean;
    openAct: string;
    closeAct: string;
    keyClose: string;
    position: 'left' | 'right';
    timeout: number;

    #prefix: string;
    constructor(prefix: string, timeout?: number) {
        super();
        this.#prefix = prefix;

        this.escClose = false;
        this.position = 'right';
        this.openAct = this.getDefaultOpenClass();
        this.closeAct = this.getDefaultCloseClass();
        this.timeout = timeout ?? 300;
        this.outClose = false;
        this.keyClose = "";
    }

    getDefaultOpenClass(): string {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_IN : OFFCANVAS_LEFT_ANIM_DEFAULT_IN, this.#prefix);
    }

    getDefaultCloseClass(): string {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT : OFFCANVAS_LEFT_ANIM_DEFAULT_OUT, this.#prefix);
    }
}

export function CuiOffCanvasComponent(prefix?: string) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "off-canvas",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiOffCanvasHandler(element, utils, attribute, prefix);
        }
    })
}

export class CuiOffCanvasHandler extends CuiHandlerBase<CuiOffCanvasArgs>  {

    private _prefix: string;
    private _bodyClass: string;
    private _interactions: ICuiInteractionsFacade;
    private _busFacade: ICuiEventBusFacade;
    private _openActionPerformer: ICuiActionExtensionPerformer<any>;
    private _closeActionPerformer: ICuiActionExtensionPerformer<any>;
    private _keysPerformer: ICuiKeyActionPerformer;
    private _freezeHelper: ICuiScrollFreezeHelper;
    private _keyComboParser: ICuiParser<string, ICuiKeysCombo>;
    private _windowClickPerformer: ICuiWindowClickPerformer;


    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string) {
        super("CuiOffCanvasHandler", element, attribute, new CuiOffCanvasArgs(prefix, utils.setup.animationTime), utils);
        this._prefix = prefix;
        const container = element.querySelector(replacePrefix(OFFCANVAS_CONTAINER_CLS, prefix));
        this._bodyClass = replacePrefix(OFFCANVAS_BODY, prefix);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.closeOutside.bind(this));
        this._freezeHelper = getScrollFreezeHelper(new CuiStyleHelper());
        this._keyComboParser = getCuiKeysComboParser();
        const actionsHelper = getActionsHelper(utils.interactions);
        this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(this.closeOutside.bind(this), container ?? undefined);
        this._interactions = getCuiHandlerInteractions(utils.interactions, this);

        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("WindowClick plugin is not available, outClose will not work")
        }
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work")
        }

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
            this.setPositionLeft();
            AriaAttributes.setAria(this.element, 'aria-modal', "");
        })
        this.updateSetup()
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


    isAnyActive(): boolean {
        return this.classes.hasClass(this._bodyClass, document.body);
    }

    setPositionLeft() {
        let cls = getName(this._prefix, 'left');
        if (this.args.position === 'left' && !this.classes.hasClass(cls, this.element)) {
            this.classes.setClass(cls, this.element)
        } else if (this.args.position == 'right' && this.classes.hasClass(cls, this.element)) {
            this.classes.removeClass(cls, this.element)
        }
    }
}