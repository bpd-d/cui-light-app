import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export declare class CuiToggleArgs {
    target: string;
    action: string;
    constructor();
    parse(args: any): void;
}
export declare class CuiToggleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiToggleHandler extends CuiHandler<CuiToggleArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    toggle(): void;
    onClick(ev: MouseEvent): void;
    getTarget(): Element;
}
