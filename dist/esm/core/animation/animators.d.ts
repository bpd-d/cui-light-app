import { ICuiPropertyAnimator, AnimatorPropertyValue, ComplexAnimatorProperty, ColorAnimatorProperty } from "./interfaces";
/**
 * Changes the opacity of the element from 0 to 1
 */
export declare class OpacityAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    prop: AnimatorPropertyValue;
    constructor();
    setProperty(prop: AnimatorPropertyValue): void;
    perform(element: any, progress: number, factor: number): void;
}
/**
 * Changes any style property of the element
 */
export declare class PropertyAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    property: string;
    prop: AnimatorPropertyValue;
    constructor(property: string);
    setProperty(prop: AnimatorPropertyValue): void;
    perform(element: any, progress: number, factor: number): void;
}
/**
 * Changes transform property of the element. Supports mulitple properties at the time
 */
export declare class TransformAnimator implements ICuiPropertyAnimator<ComplexAnimatorProperty> {
    prop: ComplexAnimatorProperty | undefined;
    constructor();
    setProperty(prop: ComplexAnimatorProperty): void;
    build(progress: number): string;
    buildSingle(name: string, value: number, unit?: string): string;
    perform(element: any, progress: number): void;
}
export declare class ColorAnimator implements ICuiPropertyAnimator<ColorAnimatorProperty> {
    #private;
    id: string;
    constructor(id: string);
    perform(element: any, progress: number, factor: number): void;
    setProperty(prop: ColorAnimatorProperty): void;
}
export declare class FilterAnimator implements ICuiPropertyAnimator<ComplexAnimatorProperty> {
    property: ComplexAnimatorProperty;
    constructor();
    perform(element: any, progress: number, factor: number): void;
    setProperty(prop: ComplexAnimatorProperty): void;
}
export declare class PositionAnimator implements ICuiPropertyAnimator<ComplexAnimatorProperty> {
    #private;
    constructor(id?: string);
    perform(element: any, progress: number, factor: number): void;
    setProperty(prop: ComplexAnimatorProperty): void;
}
