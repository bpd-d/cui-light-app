import { enumerateObject } from "../../core/utils/functions";
import { PropsTypes } from "../../core/animation/engine";
import { AnimationProperty } from "../../core/animation/interfaces";
import { AnimatorFactory } from "../../core/animation/factory";

export class ParallaxAnimatorsHandler {
    name: string;
    #animators: any[];
    constructor(name: string, setup: AnimationProperty<PropsTypes>) {
        this.name = name;
        this.#animators = [];
        enumerateObject(setup, (propName: string, prop: PropsTypes) => {
            let animator = AnimatorFactory.get(propName);
            if (!animator) {
                return;
            }
            animator.setProperty(prop);
            this.#animators.push(animator);
        })

    }

    perform(element: HTMLElement, progress: number) {
        if (this.#animators.length === 0) {
            return;
        }

        this.#animators.forEach(animator => animator.perform(element, progress, 1));
    }
}