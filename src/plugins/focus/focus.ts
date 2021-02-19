import { ICuiPlugin, IUIInteractionProvider } from "src/core/models/interfaces";
import { CuiUtils } from "src/core/models/utils";

const DEFAULT_FOCUS_VISIBLE = "focus-visible";
const DEFAULT_FOCUS_PRECISE = "focus-precise";

type FocusInputType = "keyboard" | "mouse" | "touch" | "none";

export interface ICuiLightFocusPluginSetup {
    keybordClass?: string;
    mouseClass?: string;
    touchClass?: string;
}

export class CuiLightFocusPlugin implements ICuiPlugin {
    description: string;
    name: string;
    setup: ICuiLightFocusPluginSetup;
    #interactions: IUIInteractionProvider | undefined;
    #inputType: FocusInputType;
    #onMouseListener: any;
    #onTouchListener: any;
    #onKeyDownListener: any;
    #currentCls: string | undefined;
    constructor(setup: ICuiLightFocusPluginSetup) {
        this.setup = {
            keybordClass: DEFAULT_FOCUS_VISIBLE,
            mouseClass: DEFAULT_FOCUS_PRECISE,
            touchClass: DEFAULT_FOCUS_PRECISE,
            ...setup
        }

        this.description = "CuiLightFocusPlugin";
        this.name = "focus-plugin";
        this.#interactions = undefined;

        this.#onKeyDownListener = this.onKeyDownEvent.bind(this);
        this.#onMouseListener = this.onMouseEvent.bind(this);
        this.#onTouchListener = this.onTouchEvent.bind(this);

        this.#inputType = 'none';
        this.#currentCls = undefined;

    }

    init(utils: CuiUtils): void {
        this.#interactions = utils.interactions;
        document.body.addEventListener('touchstart', this.#onTouchListener);
        document.body.addEventListener('mousedown', this.#onMouseListener);
        window.addEventListener('keydown', this.#onKeyDownListener);

    }

    private onMouseEvent(ev: MouseEvent) {
        if (this.#inputType === 'mouse') {
            return;
        }
        this.update('mouse');
    }

    private onKeyDownEvent(ev: KeyboardEvent) {
        if (this.#inputType === 'keyboard') {
            return;
        }
        this.update('keyboard');
    }

    private onTouchEvent(ev: TouchEvent) {
        if (this.#inputType === 'touch') {
            return;
        }
        this.update('touch');
    }

    private update(type: FocusInputType) {
        let cls = this.getClass(type);
        this.setClasses(cls, this.#currentCls, () => {
            this.#currentCls = cls
            this.#inputType = type;
        })
    }

    private getClass(type: FocusInputType): string | undefined {
        switch (type) {
            case "keyboard":
                return this.setup.keybordClass;
            case "mouse":
                return this.setup.mouseClass;
            case "touch":
                return this.setup.touchClass;
            default:
                return undefined;
        }
    }
    private setClasses(cls: string | undefined, prevCls: string | undefined, callback: () => void) {
        if (!this.#interactions || cls === prevCls) {
            return;
        }

        this.#interactions.fetch(() => {
            let hasCls = cls && document.body.classList.contains(cls);
            let hasPrevCls = prevCls && document.body.classList.contains(prevCls);
            // @ts-ignore interactions is set
            this.#interactions.mutate(() => {
                if (!hasCls)
                    // @ts-ignore cls is set
                    document.body.classList.add(cls);
                if (hasPrevCls) {
                    // @ts-ignore prevCls is set
                    document.body.classList.remove(prevCls);
                }
                callback();
            }, null)

        }, null)
    }

    destroy(): void {
        document.body.removeEventListener('touchstart', this.#onTouchListener);
        document.body.removeEventListener('mousedown', this.#onMouseListener);
        window.removeEventListener('keydown', this.#onKeyDownListener);
    }

}