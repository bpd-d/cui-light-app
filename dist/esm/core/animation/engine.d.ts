import { ICuiPropertyAnimator, AnimationProperty, AnimatorPropertyValue, TransformAnimatorProperty, OnAnimationFinishCallback } from "./interfaces";
export declare type PropsTypes = AnimatorPropertyValue | TransformAnimatorProperty;
export declare class CuiAnimation {
    #private;
    constructor(element?: Element);
    setElement(element: Element): void;
    setTimeout(timeout: number): void;
    onError(callback: (e: Error) => void): void;
    onFinish(callback: OnAnimationFinishCallback): void;
    perform(props: AnimationProperty<PropsTypes>, timeout?: number, factor?: number): void;
    private reportError;
}
export declare class CuiAnimationEngine {
    #private;
    constructor(cleanOnFinish?: boolean);
    onFinish(callback: OnAnimationFinishCallback): void;
    setAnimators(animators: ICuiPropertyAnimator<PropsTypes>[]): void;
    setProps(props: AnimationProperty<PropsTypes>): void;
    setElement(element: Element): void;
    setOnError(callback: (e: Error) => void): void;
    animate(timeout: number, progress?: number, revert?: boolean): void;
    isLocked(): boolean;
    private animateAsync;
    private endAnimation;
    private callUpdate;
    private reportError;
}
export declare class CuiSwipeAnimationEngine {
    #private;
    constructor(shouldCleanOnFinish?: boolean);
    setElement(element: Element): void;
    setOnFinish(callback: OnAnimationFinishCallback): void;
    setOnError(callback: (e: Error) => void): void;
    setProps(props: AnimationProperty<PropsTypes>): void;
    /**
     * Perform single update on animators
     * @param progress - progress value to be set to animators 0..1
     */
    update(progress: number): void;
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
    finish(progress: number, timeout: number, revert: boolean): void;
    private reportError;
}
