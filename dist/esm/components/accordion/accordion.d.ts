import { ICuiComponent, ICuiComponentHandler, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiChildMutation, CuiMutableHandler } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
/**
 *
 */
export interface CuiAccordionEvent {
    index: number;
    previous: number;
    currentTarget: Element;
    previousTarget: Element;
    timestamp: number;
}
interface CuiAccordionTarget {
    element: Element;
    listener?: any;
}
export declare class CuiAccordionArgs extends CuiAutoParseArgs {
    single: boolean;
    selector: string;
    items: string;
    timeout: number;
    animation: boolean;
    constructor(prefix: string, timeout?: number);
}
export declare class CuiAccordionComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiAccordionHandler extends CuiMutableHandler<CuiAccordionArgs> implements ICuiSwitchable {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onMutation(mutations: CuiChildMutation): void;
    switch(index: number): Promise<boolean>;
    onSwitch(index: any): void;
    initTargets(): void;
    closeAllExcept(current: number): void;
    setListener(target: CuiAccordionTarget, index: number): void;
    removeListener(target: CuiAccordionTarget): void;
    queryItems(): Element[];
}
export {};
