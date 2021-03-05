import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { replacePrefix } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";

const COVER_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const COVER_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-cover-open';

export interface CuiDialogEvent {
    timestamp: number;
}

export class CuiCoverArgs extends CuiAutoParseArgs implements CuiInteractableArgs {
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

export class CuiCoverComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-cover`;
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiCoverHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiCoverHandler extends CuiInteractableHandler<CuiCoverArgs> {

    #bodyClass: string;
    #scrollY: number;

    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiDialogHandler", element, attribute, new CuiCoverArgs(prefix, utils.setup.animationTimeLong), utils);
        this.#bodyClass = replacePrefix(bodyClass, prefix);
        this.#scrollY = 0;

        if (!utils.isPlugin("click-plugin")) {
            this.logWarning("WindowClick plugin is not available, outClose will not work")
        }
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work")
        }
    }

    onInit(): void {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
    }
    onUpdate(): void {

    }

    onDestroy(): void {

    }

    onBeforeOpen(): boolean {
        if (this.isAnyActive()) {
            return false;
        }
        this.#scrollY = window.pageYOffset;
        return true;
    }

    onAfterOpen(): void {
        this.helper.setClass(this.#bodyClass, document.body)
        document.body.style.top = `-${this.#scrollY}px`;
        AriaAttributes.setAria(this.element, 'aria-hidden', "false");
    }

    onAfterClose(): void {
        document.body.style.top = '';
        window.scrollTo(0, (this.#scrollY || 0) * -1);
        this.#scrollY = 0;
        this.helper.removeClass(this.#bodyClass, document.body);
        AriaAttributes.setAria(this.element, 'aria-hidden', "true");
    }

    onBeforeClose(): boolean {
        return true;
    }

    private isAnyActive(): boolean {
        return this.helper.hasClass(this.#bodyClass, document.body);
    }
}