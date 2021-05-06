import { ICuiComponent, ICuiParsable, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
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
    keyChange: boolean;
    constructor(prefix: string, timeout?: number);
}
export declare function CuiSwitchComponent(prefix?: string): ICuiComponent;
export declare class CuiSwitchHandler extends CuiHandlerBase<CuiSwitchArgs> implements ICuiSwitchable {
    private _targets;
    private _task;
    private _asyncStyles;
    private _switchPerformer;
    private _busFacade;
    private _actionsHelper;
    private _mutationPerformer;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    handleUpdate(): void;
    onMutation(record: MutationRecord[]): void;
    switch(index: any): Promise<boolean>;
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
    private setTargetHeight;
}
