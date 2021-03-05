import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiToggleArgs extends CuiAutoParseArgs {
    target: string;
    action: string;
    constructor();
}
export declare class CuiToggleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiToggleHandler extends CuiHandlerBase<CuiToggleArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    toggle(): void;
    onClick(ev: MouseEvent): void;
    getTarget(): Element;
}
