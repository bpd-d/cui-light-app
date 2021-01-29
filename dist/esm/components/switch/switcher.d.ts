import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export declare class CuiSwitcherArgs implements ICuiParsable {
    target: string;
    index: string;
    constructor();
    parse(args: any): void;
}
export declare class CuiSwitcherComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSwitcherHandler extends CuiHandler<CuiSwitcherArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    getTarget(): void;
    setEvents(): void;
    removeEvents(): void;
    onClickEvent(ev: MouseEvent): void;
    onListItemClick(index: number, ev: MouseEvent): void;
    onClick(index: any): void;
}
