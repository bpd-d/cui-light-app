import { PropsTypes } from "./engine";

export interface ICuiPropertyAnimator<T> {
    perform(element: any, progress: number, factor: number): void;
    setProperty(prop: T): void;
}

export interface ParallaxAnimations {
    [name: string]: AnimationProperty<PropsTypes>;
}

export interface AnimationProperty<T> {
    [id: string]: T;
}

export interface AnimatorPropertyValue {
    from: number;
    to: number;
    unit?: string;
}

export interface ComplexAnimatorProperty {
    [name: string]: AnimatorPropertyValue;
}

export interface ColorProperty {
    red: number;
    blue: number;
    green: number;
    alpha: number;
}

export interface ColorAnimatorProperty {
    from: ColorProperty;
    to: ColorProperty;
}

export interface OnAnimationFinishCallback {
    (element: Element | undefined, reverted: boolean, error: boolean): void;
}

export interface AnimationDefinition {
    previous: DefinitionItem;
    current: DefinitionItem;
}

export interface DefinitionItem {
    left: AnimationProperty<PropsTypes>;
    right: AnimationProperty<PropsTypes>
}

export interface CuiAnimationsDefinition {
    [id: string]: AnimationDefinition;
}

export interface ICuiAnimationSetup {
    progress: number;
    velocity?: number;
    acceleration?: number;
    timeout: number;
    revert: boolean;
}

export interface ICuiAnimationPerform extends ICuiAnimationSetup {
    animationProgress: number;
}

export interface ICuiTimingFunction {
    calculateProgress(currentTimeProgress: number): number;
}

export interface ICuiLockable {
    isLocked(): boolean;
}

export interface ICuiAnimationEngine {
    animate(element: Element, animators: ICuiPropertyAnimator<PropsTypes>[], setup: ICuiAnimationSetup): Promise<boolean>;
    update(progress: number, element: HTMLElement, animators: ICuiPropertyAnimator<PropsTypes>[]): void;
}

export interface ICuiSlideEngine {
    setElement(element: Element): void;
    setProps(props: AnimationProperty<PropsTypes>): void;
    move(progress: number): void;
    finish(setup: ICuiAnimationSetup): Promise<boolean>;
}
