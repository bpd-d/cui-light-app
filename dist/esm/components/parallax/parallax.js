var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../..//core/utils/arguments";
import { getIntOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { CuiStyleHelper, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { ParallaxAnimatorsHandler } from "./animator";
import { CuiComponentBaseHook } from "../base";
import { getCuiIntersectionPerformer } from "../extensions/scroll/performers";
import { ATTRIBUTES } from "../../core/utils/statics";
import { getCuiScrollExtension } from "../extensions/scroll/scroll";
import { CuiComponentMutationExtension } from "../extensions/mutations/mutations";
import { getCuiMutationPerformer } from "../extensions/mutations/performer";
const PARALLAX_ATTRIBUTE_ANIMATTION = 'data-parallax-animation';
const PARALLAX_ATTRIBUTE_START = 'data-parallax-start-ratio';
const PARALLAX_ATTRIBUTE_STOP = 'data-parallax-stop-ratio';
export class CuiParallaxArgs extends CuiAutoParseArgs {
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
export function CuiParallaxComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: 'parallax',
        create: (element, utils, prefix, attribute) => {
            return new CuiParallaxHandler(element, utils, attribute);
        }
    });
}
export class CuiParallaxHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiParallaxHandler", element, attribute, new CuiParallaxArgs(), utils);
        this._defaultAnimator = undefined;
        this._targetSetup = [];
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        const root = element.hasAttribute(ATTRIBUTES.root) ? window : element;
        this._styles = new CuiStyleHelper();
        this._intersectionPerformer = getCuiIntersectionPerformer({
            element: root,
            callback: this.onIntersection.bind(this)
        });
        this._mutationPerformer = getCuiMutationPerformer(this.onMutation.bind(this));
        this.extend(getCuiScrollExtension({
            element: root,
            performer: this._intersectionPerformer,
            threshold: 5
        }));
        this.extend(new CuiComponentMutationExtension(element, this._mutationPerformer));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateArguments();
            this._intersectionPerformer.callInitialEvent();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs && this.prevArgs.targets !== this.args.targets) {
                this.clean();
                this.updateArguments();
            }
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clean();
            return true;
        });
    }
    updateArguments() {
        this._mutationPerformer.setSelector(this.args.targets);
        this._defaultAnimator = new ParallaxAnimatorsHandler(this.args.animation, this.core.setup.parallaxAnimations[this.args.animation]);
        this._targetSetup = this.getTargets();
        this._intersectionPerformer.setChildren(this._targetSetup.map(item => item.element));
    }
    onIntersection(ev) {
        this._interactions.mutate(() => {
            ev.items.forEach((item, index) => {
                if (index >= this._targetSetup.length) {
                    return;
                }
                const setup = this._targetSetup[index];
                if (setup.animator)
                    setup.animator.perform(item.element, calculateRatio(setup.start, setup.stop, item.verticalRatio));
            });
        });
    }
    onMutation(record) {
        this._targetSetup = this.getTargets();
        this._intersectionPerformer.setChildren(this._targetSetup.map(item => item.element));
    }
    getTargets() {
        const targetSetup = [];
        this.element.querySelectorAll(this.args.targets).forEach(target => {
            var _a;
            targetSetup.push({
                element: target,
                animator: (_a = this.getTargetAnimator(target)) !== null && _a !== void 0 ? _a : this._defaultAnimator,
                start: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_START), this.args.startRatio),
                stop: getIntOrDefault(target.getAttribute(PARALLAX_ATTRIBUTE_STOP), this.args.stopRatio),
            });
        });
        return targetSetup;
    }
    getTargetAnimator(target) {
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
    clean() {
        this._targetSetup.forEach(setup => {
            this.core.interactions.mutate(this._styles.clean, null, setup.element);
        });
    }
}
function calculateRatio(startRatio, stopRatio, current) {
    let spread = stopRatio - startRatio;
    let start = current - startRatio;
    if (start < 0) {
        start = 0;
    }
    let curr = start / spread;
    return Math.min(curr, 1);
}
