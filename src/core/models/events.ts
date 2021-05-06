import { ICuiMoveData } from "../listeners/move";
import { ICuiComponentAction } from "../utils/actions";
import { CuiWindowSize } from "../utils/types";
import { CuiHTMLElement } from "./interfaces";

export interface EventBase {
    name?: string;
    timestamp?: number;
    source?: CuiHTMLElement | string;
}

export interface ICuiMoveEvent extends EventBase, ICuiMoveData { }

export interface ICuiKeyDownEvent extends EventBase {
    event: KeyboardEvent;
}

export interface ICuiGestureEvent extends EventBase {
    changeX: number;
    changeY: number;
}

export interface CuiTargetChangeEvent extends EventBase {
    top: number;
    left: number;
    target: Element;
}

export interface CuiToggleEvent extends EventBase {
    action: ICuiComponentAction;
    target: Element;
}

export interface CuiScrollByEvent extends EventBase {
    to: number;
    by: number;
    target: Element;
    parent: Element;
}

export interface CuiResizeData extends EventBase {
    current: CuiWindowSize;
    previous: CuiWindowSize;
    width: number;
    height: number;
}

export interface CuiScrollspyScrollEvent extends EventBase {
    top: number;
    left: number;
    scrolling: boolean;
    initial: boolean;
}

export interface KeyDownEvent extends EventBase {
    event: KeyboardEvent;
}

export interface GlobalClickEvent extends EventBase {
    ev: MouseEvent;
}

export interface CuiAccordionEvent extends EventBase {
    index: number;
    previous: number | null;
    currentTarget: Element;
    previousTarget: Element | null;
}

export interface CuiSpinnerEvent extends EventBase {
    paused: boolean;
}

export interface SortEvent extends EventBase {
    index: number;
    target: HTMLElement | null;
}

export interface IntersectionHandlerEvent extends EventBase {
    entry: IntersectionObserverEntry;
    offset: number;
}

export interface InteractiveEvent<T> extends EventBase {
    state: T;
}

export interface InteractionEvent<T> extends EventBase, InteractiveEvent<T> {
    event: MouseEvent | null;
}

