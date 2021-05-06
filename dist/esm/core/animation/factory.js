import { is } from "../utils/functions";
import { ColorAnimator, FilterAnimator, OpacityAnimator, PropertyAnimator, TransformAnimator } from "./animators";
import { CuiTimeAnimationEngine } from "./engine";
export class AnimatorFactory {
    static get(id) {
        if (!is(id)) {
            return undefined;
        }
        if (id.includes('color')) {
            return new ColorAnimator(id);
        }
        switch (id) {
            case "opacity":
                return new OpacityAnimator();
            case "transform":
                return new TransformAnimator();
            case "filter":
                return new FilterAnimator();
            default:
                return new PropertyAnimator(id);
        }
    }
}
export class CuiTimeAnimationEngines {
    static get(timingFunction) {
        return new CuiTimeAnimationEngine(timingFunction);
    }
}
