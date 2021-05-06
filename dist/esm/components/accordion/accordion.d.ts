import { ICuiComponent, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "../../core/models/arguments";
export declare class CuiAccordionArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    single: boolean;
    selector: string;
    items: string;
    timeout: number;
    animation: boolean;
    prevent: boolean;
    stopPropagation: boolean;
    constructor(prefix: string, timeout?: number);
}
export declare function CuiAccordionComponent(prefix?: string): ICuiComponent;
export declare class CuiAccordionHandler extends CuiHandlerBase<CuiAccordionArgs> implements ICuiSwitchable {
    private _currentIndex;
    private _busFacade;
    private _interactions;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    switch(index: any): Promise<boolean>;
    /**
     * Toggles target and closes not needed is setup allows for that
     * @param index - current index to remain opened
     * @param target - target to toggle
     * @param targets - all targets
     */
    private updateTargets;
    /**
     * Sets or remove active class on target
     * @param target target to toggle
     * @returns Whethet target was opened or not
     */
    private toggleTarget;
    /**
     * Closes all targets except the one that should remain opened
     * @param currentIndex index of current target - to remain opened
     * @param targets - list of targets to operate on
     */
    private closeAllExcept;
    /**
     * Handles element click
     * @param ev
     */
    private onElementClick;
    /**
     * Finds match
     * @param target
     * @returns index of matching element or -1
     */
    private findMatchingTrigger;
    private queryItems;
    private getOpenedIndex;
}
