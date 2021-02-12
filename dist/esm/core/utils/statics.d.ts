import { CuiLogLevel } from "./types";
import { CuiColorPair } from "../models/colors";
export declare const CUID_ATTRIBUTE = "cuid";
export declare const CLASSES: {
    dark: string;
    animProgress: string;
    print: string;
    active: string;
    swipingOn: string;
    selectionOff: string;
};
export declare const ICONS: any;
export declare const COLORS: string[];
export declare const CSS_APP_BACKGROUND_COLORS: CuiColorPair;
export declare const CSS_COMPONENT_BACKGROUND_COLORS: CuiColorPair;
export declare const CSS_COMPONENT_BORDER_COLORS: CuiColorPair;
export declare const CSS_THEMES: {
    light: {
        base: string;
        muted: string;
        active: string;
    };
    dark: {
        base: string;
        muted: string;
        active: string;
    };
    accent: {
        base: string;
        muted: string;
        active: string;
    };
    secondary: {
        base: string;
        muted: string;
        active: string;
    };
    success: {
        base: string;
        muted: string;
        active: string;
    };
    warning: {
        base: string;
        muted: string;
        active: string;
    };
    error: {
        base: string;
        muted: string;
        active: string;
    };
};
export declare const SCOPE_SELECTOR = ":scope ";
export declare const CSS_VARIABLES: any;
export declare class STATICS {
    static logLevel: CuiLogLevel;
    static prefix: string;
}
export declare const EVENTS: {
    INSTANCE_INITIALIZED: string;
    INSTANCE_FINISHED: string;
    RESIZE: string;
    OPEN: string;
    OPENED: string;
    CLOSE: string;
    CLOSED: string;
    TOGGLE: string;
    TOGGLED: string;
    SWITCH: string;
    SWITCHED: string;
    ON_SCROLL: string;
    TARGET_CHANGE: string;
    INTERSECTION: string;
    KEYDOWN: string;
    SCROLLBY: string;
    WINDOW_CLICK: string;
    OFFSET: string;
    PROGRESS_CHANGE: string;
    PROGRESS_CHANGED: string;
    CHANGE: string;
    CHANGED: string;
    GLOBAL_MOVE: string;
    MOVE_LOCK: string;
    PAUSE: string;
    PAUSED: string;
    SORTED: string;
    SORT_START: string;
    TOAST: string;
    TOAST_SHOW: string;
    TOAST_HIDDEN: string;
    ALERT: string;
    GESTURE_DOWN: string;
    GESTURE_UP: string;
    GESTURE_LEFT: string;
    GESTURE_RIGHT: string;
    NOTIFY: string;
    NOTIFIED: string;
};
export declare const OBSERVABLE_SCROLL = "SCROLL";
export declare const OBSERVABLE_INTERSECTION = "INTERSECTION";
export declare const COMPONENTS_COUNTER: Generator<number, void, unknown>;
