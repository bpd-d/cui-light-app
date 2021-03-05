import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiOpenArgs extends CuiAutoParseArgs {
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    constructor(timeout?: number);
}
export declare class CuiOpenComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiOpenHandler extends CuiHandlerBase<CuiOpenArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private onClick;
    private onOpen;
    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    private run;
    private setActiveClass;
    private setActiveClassAsync;
    private activateTarget;
    private emitOpen;
    private getTarget;
}
