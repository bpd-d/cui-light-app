import { ICuiClassesAsyncHelper, ICuiEventBusFacade } from "../../core/handlers/extensions/facades";
import { ICuiMoveData } from "../../core/listeners/move";
import { ICuiActionsHelper } from "../../core/helpers/helpers";
import { InteractiveEvent } from "../../core/models/events";
import { ICuiComponentAction } from "../../core/utils/actions";
import { AriaAttributes } from "../../core/utils/aria";
import { is } from "../../core/utils/functions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { ICuiExtensionPerformer } from "./interfaces";
import { moveExtensionPerformer } from "../extensions/move/performer";

export interface ICuiActionPerformerSetup {
    timeout?: number;
    element?: Element,
    actions?: ICuiComponentAction[];
    active?: ICuiComponentAction;
}

export interface ICuiActionPerformerCallbacks<T> {
    onBefore?: (arg: T) => boolean;
    onAfter?: () => void;
    onFinish?: (arg: T) => void;
}

export interface ICuiInterActionPerformerCallbacks<T> extends ICuiActionPerformerCallbacks<T> {
    isActive: () => boolean;
}

export interface ICuiActionExtensionPerformer<T> extends ICuiExtensionPerformer<T> {
    updateSetup(setup: ICuiActionPerformerSetup): void;
}

export interface CuiCallbackPerfromerSetup {
    ignoreEmpty: boolean;
}



export function callbackPerformer<T>(callback: (arg: T) => void, setup?: CuiCallbackPerfromerSetup): ICuiExtensionPerformer<T> {
    return {
        perform: (val: T) => {
            if (setup && setup.ignoreEmpty === true && !is(val)) {
                return;
            }
            callback(val)
        }
    }
}

export function getActionsPerformer<T>(helper: ICuiActionsHelper, callbacks: ICuiActionPerformerCallbacks<T>, setup?: ICuiActionPerformerSetup): ICuiActionExtensionPerformer<T> {
    let _setup = setup ?? {};
    let localLock: boolean = false;

    function onAfter() {
        if (callbacks.onAfter)
            callbacks.onAfter();
        localLock = false;
    }

    return {
        perform: (arg: T) => {
            if (!_setup || !_setup.element || (callbacks.onBefore && !callbacks.onBefore(arg)) || localLock) {
                return;
            }
            localLock = true;
            let performResult = false;
            helper.performActions(_setup.element, _setup.actions ?? [], _setup.timeout ?? 0, onAfter).then((result: boolean) => {
                performResult = result
            }).finally(() => {
                if (performResult && callbacks.onFinish) {
                    callbacks.onFinish(arg);
                }
            })
        },

        updateSetup: (setup: ICuiActionPerformerSetup) => {
            _setup = {
                ..._setup,
                ...setup
            }
        }
    }
}

export function openActionsPerformer<T>(helper: ICuiActionsHelper, bus: ICuiEventBusFacade, callbacks: ICuiInterActionPerformerCallbacks<T>, setup: ICuiActionPerformerSetup): ICuiActionExtensionPerformer<T> {
    const newCallbacks: ICuiActionPerformerCallbacks<T> = {
        ...callbacks,
        onBefore: (arg: T) => {
            if (callbacks.isActive()) {
                return false;
            }
            return !callbacks.onBefore || callbacks.onBefore(arg);
        },
        onAfter: () => {
            if (setup.element) {
                if (setup.active)
                    setup.active.add(setup.element)
                AriaAttributes.setAria(setup.element, 'aria-hidden', "false");
            }

            if (callbacks.onAfter) {
                callbacks.onAfter();
                return false;
            }
        },
        onFinish: (arg: T) => {
            bus.emit<InteractiveEvent<T>>(EVENTS.OPENED, {
                state: arg,
            })
            if (callbacks.onFinish)
                callbacks.onFinish(arg)
        }
    }
    return getActionsPerformer(helper, newCallbacks, setup)
}

export function closeActionsPerformer<T>(helper: ICuiActionsHelper, bus: ICuiEventBusFacade, callbacks: ICuiInterActionPerformerCallbacks<T>, setup: ICuiActionPerformerSetup): ICuiActionExtensionPerformer<T> {
    const newCallbacks: ICuiInterActionPerformerCallbacks<T> = {
        ...callbacks,
        onBefore: (arg: T) => {
            if (!callbacks.isActive()) {
                return false;
            }
            return !callbacks.onBefore || callbacks.onBefore(arg);
        },
        onAfter: () => {
            if (setup.element) {
                if (setup.active)
                    setup.active.remove(setup.element)
                AriaAttributes.setAria(setup.element, 'aria-hidden', "true");
            }
            if (callbacks.onAfter) {
                callbacks.onAfter();
                return false;
            }
        },
        onFinish: (arg: T) => {
            bus.emit<InteractiveEvent<T>>(EVENTS.CLOSED, {
                state: arg,
            })
            if (callbacks.onFinish)
                callbacks.onFinish(arg)
        }
    }
    return getActionsPerformer(helper, newCallbacks, setup)
}

export interface ICuiSliderPerformerSetup {
    start: () => boolean;
    progress: (progress: ICuiSliderProgress) => void;
    end: (progress: ICuiSliderProgress) => void;
    adjustRatio?: (ratio: number) => number;
    element: HTMLElement;
    moveThreshold?: number;
    prevent?: boolean;
}

export interface ICuiSliderProgress {
    ratio: number;
    velocity: number;
    acceleration: number;
}

export function sliderPerformer(classeHelper: ICuiClassesAsyncHelper, setup: ICuiSliderPerformerSetup) {
    let startX = 0;
    let swipeRatio = 0;
    const threshold = setup.moveThreshold ?? 0.01;
    const preventDefault = setup.prevent === true;
    let canMove: boolean = false;
    let velocity: number = 0;
    let lastTime: number = 0;

    function passesThreshold(ratio: number) {
        return ratio >= threshold;
    }

    function canPerformMove(ratio: number) {
        return canMove && passesThreshold(Math.abs(ratio - swipeRatio))
    }

    function preventEventDefault(ev: ICuiMoveData) {
        if (preventDefault && ev.event.cancelable) {
            ev.event.preventDefault();
        }
    }

    function calculateVelocity(distance: number, time: number): number {
        return Math.abs(distance / time);
    }

    function calculateAcceleration(prev: number, current: number, time: number): number {
        return Math.abs((current - prev) / time);
    }

    return moveExtensionPerformer({
        onDown: (ev: ICuiMoveData) => {
            if (!setup.element.contains(ev.target as Node)) {
                return;
            }
            if (!setup.start()) {
                canMove = false;
                return
            }
            canMove = true;
            startX = ev.x;
            lastTime = performance.now();
            classeHelper.setClasses(document.body, CLASSES.swipingOn);
            preventEventDefault(ev);
        },

        onMove: (ev: ICuiMoveData) => {
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
            preventEventDefault(ev)

        },
        onUp: (ev: ICuiMoveData) => {
            if (!canMove) return;
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
    })
}