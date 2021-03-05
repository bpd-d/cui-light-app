import { ICuiComponent, ICuiComponentHandler, ICuiParsable, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiChildMutation, CuiMutableHandler } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiSwitchArgs extends CuiAutoParseArgs implements ICuiParsable {
    targets: string;
    in: string;
    out: string;
    timeout: number;
    links: string;
    switch: string;
    autoTimeout: number;
    height: 'auto' | string;
    loop: boolean;
    constructor(prefix: string, timeout?: number);
}
export declare class CuiSwitchComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSwitchHandler extends CuiMutableHandler<CuiSwitchArgs> implements ICuiSwitchable {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onMutation(record: CuiChildMutation): void;
    switch(index: any): Promise<boolean>;
    private onPushSwitch;
    private getActiveIndex;
    private getElementHeight;
    /**
     * Gets attributes value and prepares properties
     */
    private parseArguments;
    /**
     * Query target elements
     */
    private getTargets;
    private getSwitches;
    private setLinkActive;
    /**
     * Sets propers active state on attached switches
     * @param index
     */
    private setSwitchesActive;
    /**
     * Emits push event to attached switch to set proper index
     * @param id - cuid of element
     * @param index - index to be set on element
     */
    private emitLinkSwitch;
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    private startTask;
}
