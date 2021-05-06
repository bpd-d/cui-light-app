import { getRangeValue, is } from "../utils/functions";
import { CuiRAF } from "../utils/statics";
import { AnimatorFactory } from "./factory";
import { ICuiPropertyAnimator, AnimationProperty, AnimatorPropertyValue, ComplexAnimatorProperty, ICuiAnimationEngine, ICuiAnimationSetup, ICuiTimingFunction, ICuiSlideEngine } from "./interfaces";

export type PropsTypes = AnimatorPropertyValue | ComplexAnimatorProperty;

export class CuiTimeAnimationEngine implements ICuiAnimationEngine {
    private _lock: boolean = false;
    private _animationStart: number | null = null;
    private _currentTimestamp: number | null = null;
    private _timingFunction: ICuiTimingFunction;
    constructor(calculator: ICuiTimingFunction) {
        this._timingFunction = calculator;
    }

    animate(element: HTMLElement, animators: ICuiPropertyAnimator<PropsTypes>[], setup: ICuiAnimationSetup): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this._lock) {
                resolve(false);
                return;
            }
            this._lock = true;
            this._animationStart = setup.progress * setup.timeout + 0.0001;
            //@ts-ignore
            CuiRAF(this.performAsync.bind(this, element, animators, setup, resolve, reject))
        })
    }

    update(progress: number, element: HTMLElement, animators: ICuiPropertyAnimator<PropsTypes>[]) {
        const progressValue = this._timingFunction.calculateProgress(progress);
        this.setValues(progressValue, element, animators)
    }

    private finish(element: HTMLElement, resolve: any) {
        this._animationStart = null;
        this._currentTimestamp = null;
        this._lock = false;
        resolve(true);
    }

    private setValues(progress: number, element: HTMLElement, animators: ICuiPropertyAnimator<PropsTypes>[]) {
        animators.forEach(animator => animator.perform(element, progress, 1));
    }

    private performAsync(element: HTMLElement, animators: ICuiPropertyAnimator<PropsTypes>[], setup: ICuiAnimationSetup, resolve: any, reject: any, timestamp: number) {
        if (this._animationStart === null) {
            this.finish(element, resolve);
            return;
        }
        if (!this._currentTimestamp) {
            this._currentTimestamp = timestamp;
        }
        const diff = timestamp - this._currentTimestamp;
        this._animationStart = setup.revert ? this._animationStart - diff : this._animationStart + diff;
        const timingprogress = this._animationStart / setup.timeout;
        const progressValue = this._timingFunction.calculateProgress(timingprogress);
        // Adjust progress value in case if calculator did not do it
        const progress = getRangeValue(progressValue, 0, 1);
        try {
            this.setValues(progress, element, animators);
        } catch (e) {
            reject(e);
        }
        if (timingprogress > 0 && timingprogress < 1) {
            this._currentTimestamp = timestamp;
            //@ts-ignore
            CuiRAF(this.performAsync.bind(this, element, animators, setup, resolve, reject))
            return;
        }
        this.finish(element, resolve);
    }
}

export class CuiSwipeAnimationEngine implements ICuiSlideEngine {

    private _element: HTMLElement | undefined;
    private _animators: ICuiPropertyAnimator<PropsTypes>[];
    private _animationEngine: ICuiAnimationEngine;

    constructor(animationEngine: ICuiAnimationEngine, shouldCleanOnFinish?: boolean) {
        this._element = undefined;
        this._animators = [];
        this._animationEngine = animationEngine;
    }

    move(progress: number): void {
        if (!this._element || this._animators.length === 0) {
            return;
        }
        this._animationEngine.update(progress, this._element as HTMLElement, this._animators);
    }

    setElement(element: HTMLElement) {
        this._element = element;
    }

    setProps(props: AnimationProperty<PropsTypes>) {
        if (!is(props)) {
            return;
        }
        this._animators = [];
        for (let prop in props) {
            let animator = AnimatorFactory.get(prop);
            if (!animator) return;
            animator.setProperty(props[prop]);
            this._animators.push(animator);
        }
    }

    /**
     * Perform single update on animators in RAF
     * @param progress - progress value to be set to animators 0..1
     */
    updateAsync(progress: number) {
        CuiRAF(this.move.bind(this, progress));
    }

    /**
     * Finish swipe animation using animation engine
     * @param progress - initial progress value 0..1
     * @param timeout - time for animation to perform
     * @param revert - whether animation should return back to 0 or progress to the end
     */
    async finish(setup: ICuiAnimationSetup): Promise<boolean> {
        if (!this._element || this._animators.length === 0) {
            return false;
        }
        return this._animationEngine.animate(this._element, this._animators, setup);
    }
}