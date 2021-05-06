import { ICuiComponent, ICuiParsable, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiSliderArgs extends CuiAutoParseArgs implements ICuiParsable {
    targets: string;
    timeout: number;
    links: string;
    autoTimeout: number;
    height: 'auto' | string;
    animation: string;
    loop: boolean;
    swipeRatio: number;
    keyChange: boolean;
    constructor(prefix: string, timeout?: number);
}
export declare function CuiSliderComponent(prefix?: string): ICuiComponent;
export declare class CuiSliderHandler extends CuiHandlerBase<CuiSliderArgs> implements ICuiSwitchable {
    private _targets;
    private _currentIdx;
    private _links;
    private _task;
    private _current;
    private _nextIdx;
    private _nextElement;
    private _currSlider;
    private _nextSlider;
    private _animationDef;
    private _targetsCount;
    private _keysPerformer;
    private _movePerformer;
    private _busFacade;
    private _interactions;
    private _styles;
    private _mutationPerformer;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    onMutation(record: MutationRecord[]): void;
    private handleUpdate;
    private setElementHeight;
    private onDown;
    private onMove;
    private onUp;
    adjustMoveRatio(ratio: number): number;
    /**
     * Api method to switch childrens
     * @param index - index to switch to
     */
    switch(index: any): Promise<boolean>;
    /**
     *
     * @param element element this animation was perfromed on
     * @param reverted - flag inidicating whether animation was performed to the end or reverted back to start
     * @param errorOccured - tells whether animation was finished with error
     */
    onAnimationFinish(element: Element | undefined, reverted: boolean, errorOccured: boolean): void;
    onPushSwitch(index: string): false | undefined;
    getActiveIndex(): void;
    clearSlideData(): void;
    getElementHeight(current: Element): string;
    setKeyCombo(flag: boolean): void;
    /**
     * Queries targets
     */
    getTargets(): void;
    /**
     * Get linked switcher elements
     */
    getLinks(): void;
    /**
     * Set active class on linked switcher if set
     * @param current - current index (to remove active from)
     * @param next - next index (to set action on)
     */
    setLinkActive(current: number, next: number): void;
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask(): void;
}
