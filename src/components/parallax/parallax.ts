import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiIntersectionResult } from "../../core/intersection/interfaces";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiAutoParseArgs } from "../..//core/utils/arguments";
import { getIntOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { CuiStyleHelper, getCuiHandlerInteractions, ICuiInteractionsFacade, ICuiStyleHelper } from "../../core/handlers/extensions/facades";
import { ParallaxAnimatorsHandler } from "./animator";
import { CuiComponentBaseHook } from "../base";
import { getCuiIntersectionPerformer, ICuiIntersectionPerformer } from "../extensions/scroll/performers";
import { ATTRIBUTES } from "../../core/utils/statics";
import { getCuiScrollExtension } from "../extensions/scroll/scroll";
import { CuiComponentMutationExtension } from "../extensions/mutations/mutations";
import { getCuiMutationPerformer, ICuiMutationPerformer } from "../extensions/mutations/performer";

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
        this.targets = joinWithScopeSelector("> *");
        this.startRatio = 0;
        this.stopRatio = 1;
        this.animation = "";

    }
}

export function CuiParallaxComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: 'parallax',
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiParallaxHandler(element, utils, attribute);
        }
    })
}

export class CuiParallaxHandler extends CuiHandlerBase<CuiParallaxArgs> {



    private _defaultAnimator: ParallaxAnimatorsHandler | undefined;
    private _targetSetup: TargetSetupItem[];
    private _interactions: ICuiInteractionsFacade;
    private _intersectionPerformer: ICuiIntersectionPerformer;
    private _mutationPerformer: ICuiMutationPerformer;
    private _styles: ICuiStyleHelper;

    constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
        super("CuiParallaxHandler", element, attribute, new CuiParallaxArgs(), utils);
        this._defaultAnimator = undefined;
        this._targetSetup = [];
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const root = element.hasAttribute(ATTRIBUTES.root) ? window : element;
        this._styles = new CuiStyleHelper();

        this._intersectionPerformer = getCuiIntersectionPerformer({
            element: root,
            callback: this.onIntersection.bind(this)
        })

        this._mutationPerformer = getCuiMutationPerformer(this.onMutation.bind(this));

        this.extend(getCuiScrollExtension({
            element: root,
            performer: this._intersectionPerformer,
            threshold: 5
        }))

        this.extend(new CuiComponentMutationExtension(
            element,
            this._mutationPerformer
        ))
    }


    async onHandle(): Promise<boolean> {
        this.updateArguments();
        this._intersectionPerformer.callInitialEvent();
        return true;
    }
    async onRefresh(): Promise<boolean> {
        if (this.prevArgs && this.prevArgs.targets !== this.args.targets) {
            this.clean();
            this.updateArguments()
        }
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.clean();
        return true;
    }

    private updateArguments() {
        this._mutationPerformer.setSelector(this.args.targets);
        this._defaultAnimator = new ParallaxAnimatorsHandler(this.args.animation, this.core.setup.parallaxAnimations[this.args.animation])
        this._targetSetup = this.getTargets();
        this._intersectionPerformer.setChildren(this._targetSetup.map(item => item.element));
    }

    onIntersection(ev: CuiIntersectionResult) {
        this._interactions.mutate(() => {
            ev.items.forEach((item, index) => {
                if (index >= this._targetSetup.length) {
                    return;
                }
                const setup = this._targetSetup[index];
                if (setup.animator)
                    setup.animator.perform(item.element, calculateRatio(setup.start, setup.stop, item.verticalRatio))
            })
        })

    }

    onMutation(record: MutationRecord[]): void {
        this._targetSetup = this.getTargets();
        this._intersectionPerformer.setChildren(this._targetSetup.map(item => item.element));
    }

    private getTargets(): TargetSetupItem[] {
        const targetSetup: TargetSetupItem[] = []
        this.element.querySelectorAll(this.args.targets).forEach(target => {
            targetSetup.push({
                element: target as HTMLElement,
                animator: this.getTargetAnimator(target) ?? this._defaultAnimator,
                start: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_START), this.args.startRatio),
                stop: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_STOP), this.args.stopRatio),
            })
        })
        return targetSetup;
    }

    private getTargetAnimator(target: Element): ParallaxAnimatorsHandler | undefined {
        if (!target.hasAttribute(PARALLAX_ATTRIBUTE_ANIMATTION)) {
            return undefined;
        }
        const name = target.getAttribute(PARALLAX_ATTRIBUTE_ANIMATTION);
        //@ts-ignore name was checked already
        let setup = this.core.setup.parallaxAnimations[name];
        if (!setup) {
            return undefined;
        }
        //@ts-ignore name was checked already
        return new ParallaxAnimatorsHandler(name, setup);
    }

    private clean() {
        this._targetSetup.forEach(setup => {
            this.core.interactions.mutate(this._styles.clean, null, setup.element);

        })
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