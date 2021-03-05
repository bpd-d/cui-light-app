import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiSwitcherArgs extends CuiAutoParseArgs implements ICuiParsable {
    target: string;
    index: string;
    constructor();
}
export declare class CuiSwitcherComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSwitcherHandler extends CuiHandlerBase<CuiSwitcherArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    getTarget(): void;
    setEvents(): void;
    removeEvents(): void;
    onClickEvent(ev: MouseEvent): void;
    onListItemClick(index: number, ev: MouseEvent): void;
    onClick(index: any): void;
}
