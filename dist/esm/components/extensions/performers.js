import { AriaAttributes } from "../../core/utils/aria";
import { is } from "../../core/utils/functions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { moveExtensionPerformer } from "../extensions/move/performer";
export function callbackPerformer(callback, setup) {
    return {
        perform: (val) => {
            if (setup && setup.ignoreEmpty === true && !is(val)) {
                return;
            }
            callback(val);
        }
    };
}
export function getActionsPerformer(helper, callbacks, setup) {
    let _setup = setup !== null && setup !== void 0 ? setup : {};
    let localLock = false;
    function onAfter() {
        if (callbacks.onAfter)
            callbacks.onAfter();
        localLock = false;
    }
    return {
        perform: (arg) => {
            var _a, _b;
            if (!_setup || !_setup.element || (callbacks.onBefore && !callbacks.onBefore(arg)) || localLock) {
                return;
            }
            localLock = true;
            let performResult = false;
            helper.performActions(_setup.element, (_a = _setup.actions) !== null && _a !== void 0 ? _a : [], (_b = _setup.timeout) !== null && _b !== void 0 ? _b : 0, onAfter).then((result) => {
                performResult = result;
            }).finally(() => {
                if (performResult && callbacks.onFinish) {
                    callbacks.onFinish(arg);
                }
            });
        },
        updateSetup: (setup) => {
            _setup = Object.assign(Object.assign({}, _setup), setup);
        }
    };
}
export function openActionsPerformer(helper, bus, callbacks, setup) {
    const newCallbacks = Object.assign(Object.assign({}, callbacks), { onBefore: (arg) => {
            if (callbacks.isActive()) {
                return false;
            }
            return !callbacks.onBefore || callbacks.onBefore(arg);
        }, onAfter: () => {
            if (setup.element) {
                if (setup.active)
                    setup.active.add(setup.element);
                AriaAttributes.setAria(setup.element, 'aria-hidden', "false");
            }
            if (callbacks.onAfter) {
                callbacks.onAfter();
                return false;
            }
        }, onFinish: (arg) => {
            bus.emit(EVENTS.OPENED, {
                state: arg,
            });
            if (callbacks.onFinish)
                callbacks.onFinish(arg);
        } });
    return getActionsPerformer(helper, newCallbacks, setup);
}
export function closeActionsPerformer(helper, bus, callbacks, setup) {
    const newCallbacks = Object.assign(Object.assign({}, callbacks), { onBefore: (arg) => {
            if (!callbacks.isActive()) {
                return false;
            }
            return !callbacks.onBefore || callbacks.onBefore(arg);
        }, onAfter: () => {
            if (setup.element) {
                if (setup.active)
                    setup.active.remove(setup.element);
                AriaAttributes.setAria(setup.element, 'aria-hidden', "true");
            }
            if (callbacks.onAfter) {
                callbacks.onAfter();
                return false;
            }
        }, onFinish: (arg) => {
            bus.emit(EVENTS.CLOSED, {
                state: arg,
            });
            if (callbacks.onFinish)
                callbacks.onFinish(arg);
        } });
    return getActionsPerformer(helper, newCallbacks, setup);
}
export function sliderPerformer(classeHelper, setup) {
    var _a;
    let startX = 0;
    let swipeRatio = 0;
    const threshold = (_a = setup.moveThreshold) !== null && _a !== void 0 ? _a : 0.01;
    const preventDefault = setup.prevent === true;
    let canMove = false;
    let velocity = 0;
    let lastTime = 0;
    function passesThreshold(ratio) {
        return ratio >= threshold;
    }
    function canPerformMove(ratio) {
        return canMove && passesThreshold(Math.abs(ratio - swipeRatio));
    }
    function preventEventDefault(ev) {
        if (preventDefault && ev.event.cancelable) {
            ev.event.preventDefault();
        }
    }
    function calculateVelocity(distance, time) {
        return Math.abs(distance / time);
    }
    function calculateAcceleration(prev, current, time) {
        return Math.abs((current - prev) / time);
    }
    return moveExtensionPerformer({
        onDown: (ev) => {
            if (!setup.element.contains(ev.target)) {
                return;
            }
            if (!setup.start()) {
                canMove = false;
                return;
            }
            canMove = true;
            startX = ev.x;
            lastTime = performance.now();
            classeHelper.setClasses(document.body, CLASSES.swipingOn);
            preventEventDefault(ev);
        },
        onMove: (ev) => {
            const distance = (ev.x - startX);
            const ratio = distance / setup.element.offsetWidth;
            if (!canPerformMove(ratio)) {
                return;
            }
            const dt = performance.now() - lastTime;
            const newVelo = calculateVelocity((swipeRatio - ratio), dt);
            const acceleration = calculateAcceleration(velocity, newVelo, dt);
            swipeRatio = setup.adjustRatio ? setup.adjustRatio(ratio) : ratio;
            setup.progress({ ratio: swipeRatio, velocity, acceleration });
            lastTime = performance.now();
            velocity = newVelo;
            preventEventDefault(ev);
        },
        onUp: (ev) => {
            if (!canMove)
                return;
            const distance = (ev.x - startX);
            const dt = performance.now() - lastTime;
            const newVelo = calculateVelocity(distance, dt);
            const acceleration = calculateAcceleration(velocity, newVelo, dt);
            setup.end({ ratio: swipeRatio, velocity, acceleration });
            startX = 0;
            swipeRatio = 0;
            velocity = 0;
            lastTime = 0;
            canMove = false;
            classeHelper.removeClasses(document.body, CLASSES.swipingOn);
            preventEventDefault(ev);
        }
    });
}
