import { ICuiPropertyAnimator, AnimatorPropertyValue, TransformAnimatorProperty } from "./interfaces";
/**
 * Changes the opacity of the element from 0 to 1
 */
export declare class OpacityAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    length: number;
    from: number;
    to: number;
    rtl: boolean;
    constructor();
    setProperty(prop: AnimatorPropertyValue): void;
    perform(element: any, progress: number, factor: number): void;
}
/**
 * Changes any style property of the element
 */
export declare class PropertyAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    #private;
    length: number;
    from: number;
    to: number;
    rtl: boolean;
    property: string;
    constructor(property: string);
    setProperty(prop: AnimatorPropertyValue): void;
    perform(element: any, progress: number, factor: number): void;
    private createValue;
}
/**
 * Changes transform property of the element. Supports mulitple properties at the time
 */
export declare class TransformAnimator implements ICuiPropertyAnimator<TransformAnimatorProperty> {
    prop: TransformAnimatorProperty | undefined;
    constructor();
    setProperty(prop: TransformAnimatorProperty): void;
    build(progress: number): string;
    buildSingle(name: string, value: number, unit?: string): string;
    perform(element: any, progress: number): void;
}
