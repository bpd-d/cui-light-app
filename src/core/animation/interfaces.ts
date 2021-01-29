import { PropsTypes } from "./engine";

export interface ICuiPropertyAnimator<T> {
    perform(element: any, progress: number, factor: number): void;
    setProperty(prop: T): void;
}

export interface AnimationProperty<T> {
    [id: string]: T;
}

export interface AnimatorPropertyValue {
    from: number;
    to: number;
    unit?: string;
}

export interface TransformAnimatorProperty {
    [name: string]: AnimatorPropertyValue;
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