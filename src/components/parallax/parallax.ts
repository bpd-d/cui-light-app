import { CuiChildMutation, CuiMutableHandler } from "../../core/handlers/base";
import { CuiIntersectionResult } from "../../core/intersection/interfaces";
import { CuiIntersectionListener } from "../../core/intersection/intersection";
import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiAutoParseArgs } from "../..//core/utils/arguments";
import { getChildSelectorFromScoped, getIntOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { ParallaxAnimatorsHandler } from "./animator";

const PARALLAX_ATTRIBUTE_ANIMATTION = 'data-parallax-animation';
const PARALLAX_ATTRIBUTE_START = 'data-parallax-start-ratio';
const PARALLAX_ATTRIBUTE_STOP = 'data-parallax-stop-ratio';

interface TargetSetupItem {
    element: HTMLElement;
    animator?: ParallaxAnimatorsHandler;
    start: number;
    stop: number;
}

export class CuiParallaxArgs extends CuiAutoParseArgs {
    root: boolean;
    targets: string;
    startRatio: number;
    stopRatio: number;
    animation: string;
    constructor() {
        super({
            props: {
                "targets": { corrector: joinWithScopeSelector }
            }
        });
        this.root = false;
        this.targets = joinWithScopeSelector("> *");
        this.startRatio = 0;
        this.stopRatio = 1;
        this.animation = "";

    }
}

export class CuiParallaxComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-parallax`;
    }
    getStyle(): string {
        return "";
    }
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler {
        return new CuiParallaxHandler(element, sutils, this.attribute)
    }

}

export class CuiParallaxHandler extends CuiMutableHandler<CuiParallaxArgs> {

    #scrollListener: CuiIntersectionListener | undefined;
    #defaultAnimator: ParallaxAnimatorsHandler | undefined;
    #targetSetup: TargetSetupItem[];
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiParallaxHandler", element, attribute, new CuiParallaxArgs(), utils);
        this.#scrollListener = undefined;
        this.#defaultAnimator = undefined;
        this.#targetSetup = [];
    }


    onInit(): void {
        this.#defaultAnimator = new ParallaxAnimatorsHandler(this.args.animation, this.utils.setup.parallaxAnimations[this.args.animation])
        this.setMutationSelector(getChildSelectorFromScoped(this.args.targets))
        this.#targetSetup = this.getTargets();
        this.#scrollListener = new CuiIntersectionListener(this.getParent(), { threshold: this.utils.setup.scrollThreshold });
        this.#scrollListener.setCallback(this.onIntersection.bind(this));
        this.#scrollListener.setChildren(this.#targetSetup.map(item => item.element));
        this.#scrollListener.attach();
    }

    onUpdate(): void {
        if (!this.prevArgs || !this.#scrollListener) {
            return;
        }
        if (this.prevArgs.targets !== this.args.targets) {
            this.clean();
            this.setMutationSelector(getChildSelectorFromScoped(this.args.targets))
            this.#targetSetup = this.getTargets();
            this.#scrollListener.setChildren(this.#targetSetup.map(item => item.element));
        }
        if (this.prevArgs.root !== this.args.root) {
            this.#scrollListener.setParent(this.getParent());
        }
    }
    onDestroy(): void {
        this.clean();
        if (this.#scrollListener) {
            this.#scrollListener.detach();
        }
    }

    onIntersection(ev: CuiIntersectionResult) {
        this.mutate(() => {
            ev.items.forEach((item, index) => {
                if (index >= this.#targetSetup.length) {
                    return;
                }
                const setup = this.#targetSetup[index];
                if (setup.animator)
                    setup.animator.perform(item.element, calculateRatio(setup.start, setup.stop, item.verticalRatio))
            })
        })

    }

    onMutation(record: CuiChildMutation): void {
        if (!this.#scrollListener) {
            return;
        }
        this.#targetSetup = this.getTargets();
        this.#scrollListener.setChildren(this.#targetSetup.map(item => item.element));
    }

    private getTargets(): TargetSetupItem[] {
        const targetSetup: TargetSetupItem[] = []
        this.element.querySelectorAll(this.args.targets).forEach(target => {
            targetSetup.push({
                element: target as HTMLElement,
                animator: this.getTargetAnimator(target) ?? this.#defaultAnimator,
                start: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_START), this.args.startRatio),
                stop: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_STOP), this.args.stopRatio),
            })
        })
        return targetSetup;
    }

    private getParent(): Window | HTMLElement {
        return this.args.root ? window : this.element;
    }

    private getTargetAnimator(target: Element): ParallaxAnimatorsHandler | undefined {
        if (!target.hasAttribute(PARALLAX_ATTRIBUTE_ANIMATTION)) {
            return undefined;
        }
        const name = target.getAttribute(PARALLAX_ATTRIBUTE_ANIMATTION);
        //@ts-ignore name was checked already
        let setup = this.utils.setup.parallaxAnimations[name];
        if (!setup) {
            return undefined;
        }
        //@ts-ignore name was checked already
        return new ParallaxAnimatorsHandler(name, setup);
    }

    private clean() {
        this.#targetSetup.forEach(setup => {
            this.utils.interactions.mutate(cleanStyle, null, setup.element);

        })
    }
}

function cleanStyle(target: HTMLElement) {
    if (target && target.style) {
        target.removeAttribute('style')
    }
}

function calculateRatio(startRatio: number, stopRatio: number, current: number): number {
    let spread = stopRatio - startRatio;
    let start = current - startRatio;
    if (start < 0) {
        start = 0;

    }
    let curr = start / spread;
    return Math.min(curr, 1);
}