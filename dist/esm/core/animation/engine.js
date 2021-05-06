var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getRangeValue, is } from "../utils/functions";
import { CuiRAF } from "../utils/statics";
import { AnimatorFactory } from "./factory";
export class CuiTimeAnimationEngine {
    constructor(calculator) {
        this._lock = false;
        this._animationStart = null;
        this._currentTimestamp = null;
        this._timingFunction = calculator;
    }
    animate(element, animators, setup) {
        return new Promise((resolve, reject) => {
            if (this._lock) {
                resolve(false);
                return;
            }
            this._lock = true;
            this._animationStart = setup.progress * setup.timeout + 0.0001;
            //@ts-ignore
            CuiRAF(this.performAsync.bind(this, element, animators, setup, resolve, reject));
        });
    }
    update(progress, element, animators) {
        const progressValue = this._timingFunction.calculateProgress(progress);
        this.setValues(progressValue, element, animators);
    }
    finish(element, resolve) {
        this._animationStart = null;
        this._currentTimestamp = null;
        this._lock = false;
        resolve(true);
    }
    setValues(progress, element, animators) {
        animators.forEach(animator => animator.perform(element, progress, 1));
    }
    performAsync(element, animators, setup, resolve, reject, timestamp) {
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
        }
        catch (e) {
            reject(e);
        }
        if (timingprogress > 0 && timingprogress < 1) {
            this._currentTimestamp = timestamp;
            //@ts-ignore
            CuiRAF(this.performAsync.bind(this, element, animators, setup, resolve, reject));
            return;
        }
        this.finish(element, resolve);
    }
}
export class CuiSwipeAnimationEngine {
    constructor(animationEngine, shouldCleanOnFinish) {
        this._element = undefined;
        this._animators = [];
        this._animationEngine = animationEngine;
    }
    move(progress) {
        if (!this._element || this._animators.length === 0) {
            return;
        }
        this._animationEngine.update(progress, this._element, this._animators);
    }
    setElement(element) {
        this._element = element;
    }
    setProps(props) {
        if (!is(props)) {
            return;
        }
        this._animators = [];
        for (let prop in props) {
            let animator = AnimatorFactory.get(prop);
            if (!animator)
                return;
            animator.setProperty(props[prop]);
            this._animators.push(animator);
        }
    }
    /**
     * Perform single update on animators in RAF
     * @param progress - progress value to be set to animators 0..1
     */
    updateAsync(progress) {
        CuiRAF(this.move.bind(this, progress));
    }
    /**
     * Finish swipe animation using animation engine
     * @param progress - initial progress value 0..1
     * @param timeout - time for animation to perform
     * @param revert - whether animation should return back to 0 or progress to the end
     */
    finish(setup) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._element || this._animators.length === 0) {
                return false;
            }
            return this._animationEngine.animate(this._element, this._animators, setup);
        });
    }
}
