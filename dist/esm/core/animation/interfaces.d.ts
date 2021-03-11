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
    right: AnimationProperty<PropsTypes>;
}
export interface CuiAnimationsDefinition {
    [id: string]: AnimationDefinition;
}
