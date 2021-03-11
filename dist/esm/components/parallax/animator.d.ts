import { PropsTypes } from "../../core/animation/engine";
import { AnimationProperty } from "../../core/animation/interfaces";
export declare class ParallaxAnimatorsHandler {
    #private;
    name: string;
    constructor(name: string, setup: AnimationProperty<PropsTypes>);
    perform(element: HTMLElement, progress: number): void;
}
