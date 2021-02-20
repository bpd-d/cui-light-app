import { ICuiComponentAction } from "../utils/actions";
import { CuiHTMLElement } from "./interfaces";

export interface EventBase {
    name: string;
    timestamp: number;
    source: CuiHTMLElement;
}

export interface CuiTargetChangeEvent extends EventBase {
    top: number;
    left: number;
    target: Element;
    timestamp: number;
}

export interface CuiToggleEvent extends EventBase {
    action: ICuiComponentAction;
    target: Element;
    timestamp: number;
}

export interface CuiScrollByEvent extends EventBase {
    to: number;
    by: number;
    target: Element;
    parent: Element;
    timestamp: number;
}