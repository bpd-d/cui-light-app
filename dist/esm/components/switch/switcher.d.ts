import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "src/core/models/arguments";
export declare class CuiSwitcherArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    index: string;
    prevent: boolean;
    stopPropagation: boolean;
    targets: string;
    isList: boolean;
    constructor();
}
export declare class CuiSwitcherComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSwitcherHandler extends CuiHandlerBase<CuiSwitcherArgs> {
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    /**
     * Sets current switcher target value
     *
     */
    getTargetCuid(): string | null;
    onClickEvent(ev: MouseEvent): void;
    handleItemClick(ev: MouseEvent, targetCuid: string): void;
    handleListClick(ev: MouseEvent, targetCuid: string): void;
}
