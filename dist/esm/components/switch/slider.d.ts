import { ICuiComponent, ICuiComponentHandler, ICuiParsable, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiChildMutation, CuiMutableHandler } from "../../core/handlers/base";
import { ICuiMoveData } from "../../core/listeners/move";
export declare class CuiSliderArgs implements ICuiParsable {
    #private;
    targets: string;
    timeout: number;
    links: string;
    autoTimeout: number;
    height: 'auto' | string;
    animation: string;
    loop: boolean;
    constructor(prefix: string, timeout?: number);
    parse(args: any): void;
}
export declare class CuiSliderComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSliderHandler extends CuiMutableHandler<CuiSliderArgs> implements ICuiSwitchable {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onMutation(record: CuiChildMutation): void;
    /**
     * Move listener callback
     * @param data move listener data
     */
    onMove(data: ICuiMoveData): void;
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
    getElementHeight(current: Element): string;
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
