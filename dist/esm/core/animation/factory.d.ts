import { CuiTimeAnimationEngine } from "./engine";
import { ICuiPropertyAnimator, AnimatorPropertyValue, ComplexAnimatorProperty, ColorAnimatorProperty, ICuiTimingFunction } from "./interfaces";
export declare class AnimatorFactory {
    static get(id: string): ICuiPropertyAnimator<AnimatorPropertyValue | ComplexAnimatorProperty | ColorAnimatorProperty> | undefined;
}
export declare class CuiTimeAnimationEngines {
    static get(timingFunction: ICuiTimingFunction): CuiTimeAnimationEngine;
}
