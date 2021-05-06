import { ICuiClassesAsyncHelper, ICuiEventBusFacade } from "../../core/handlers/extensions/facades";
import { ICuiActionsHelper } from "../../core/helpers/helpers";
import { ICuiComponentAction } from "../../core/utils/actions";
import { ICuiExtensionPerformer } from "./interfaces";
export interface ICuiActionPerformerSetup {
    timeout?: number;
    element?: Element;
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
export declare function callbackPerformer<T>(callback: (arg: T) => void, setup?: CuiCallbackPerfromerSetup): ICuiExtensionPerformer<T>;
export declare function getActionsPerformer<T>(helper: ICuiActionsHelper, callbacks: ICuiActionPerformerCallbacks<T>, setup?: ICuiActionPerformerSetup): ICuiActionExtensionPerformer<T>;
export declare function openActionsPerformer<T>(helper: ICuiActionsHelper, bus: ICuiEventBusFacade, callbacks: ICuiInterActionPerformerCallbacks<T>, setup: ICuiActionPerformerSetup): ICuiActionExtensionPerformer<T>;
export declare function closeActionsPerformer<T>(helper: ICuiActionsHelper, bus: ICuiEventBusFacade, callbacks: ICuiInterActionPerformerCallbacks<T>, setup: ICuiActionPerformerSetup): ICuiActionExtensionPerformer<T>;
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
export declare function sliderPerformer(classeHelper: ICuiClassesAsyncHelper, setup: ICuiSliderPerformerSetup): import("./move/performer").ICuiMoveExtensionPerformer;
