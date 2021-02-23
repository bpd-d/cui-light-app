import { ICuiMoveData } from "../listeners/move";
import { ICuiComponentAction } from "../utils/actions";
import { CuiHTMLElement } from "./interfaces";

export interface EventBase {
    name: string;
    timestamp: number;
    source: CuiHTMLElement | string;
}

export interface ICuiMoveEvent extends EventBase, ICuiMoveData { }

export interface ICuiKeyDownEvent extends EventBase {
    ev: KeyboardEvent;
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