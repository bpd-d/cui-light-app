import { ICuiPropertyAnimator, AnimationProperty, AnimatorPropertyValue, ComplexAnimatorProperty, ICuiAnimationEngine, ICuiAnimationSetup, ICuiTimingFunction, ICuiSlideEngine } from "./interfaces";
export declare type PropsTypes = AnimatorPropertyValue | ComplexAnimatorProperty;
export declare class CuiTimeAnimationEngine implements ICuiAnimationEngine {
    private _lock;
    private _animationStart;
    private _currentTimestamp;
    private _timingFunction;
    constructor(calculator: ICuiTimingFunction);
    animate(element: HTMLElement, animators: ICuiPropertyAnimator<PropsTypes>[], setup: ICuiAnimationSetup): Promise<boolean>;
    update(progress: number, element: HTMLElement, animators: ICuiPropertyAnimator<PropsTypes>[]): void;
    private finish;
    private setValues;
    private performAsync;
}
export declare class CuiSwipeAnimationEngine implements ICuiSlideEngine {
    private _element;
    private _animators;
    private _animationEngine;
    constructor(animationEngine: ICuiAnimationEngine, shouldCleanOnFinish?: boolean);
    move(progress: number): void;
    setElement(element: HTMLElement): void;
    setProps(props: AnimationProperty<PropsTypes>): void;
    /**
     * Perform single update on animators in RAF
     * @param progress - progress value to be set to animators 0..1
     */
    updateAsync(progress: number): void;
    /**
     * Finish swipe animation using animation engine
     * @param progress - initial progress value 0..1
     * @param timeout - time for animation to perform
     * @param revert - whether animation should return back to 0 or progress to the end
     */
    finish(setup: ICuiAnimationSetup): Promise<boolean>;
}
