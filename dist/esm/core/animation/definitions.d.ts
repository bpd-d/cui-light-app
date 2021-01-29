import { PropsTypes } from "./engine";
import { AnimationProperty } from "./interfaces";
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
export declare const SWIPE_ANIMATIONS_DEFINITIONS: CuiAnimationsDefinition;
