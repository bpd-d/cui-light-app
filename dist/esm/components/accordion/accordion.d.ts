import { ICuiComponent, ICuiComponentHandler, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
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
export declare class CuiAccordionComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiAccordionHandler extends CuiHandlerBase<CuiAccordionArgs> implements ICuiSwitchable {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    switch(index: number): Promise<boolean>;
    private openCloseTarget;
    private onSwitch;
    private closeAllExcept;
    private onElementClick;
    private queryItems;
}
