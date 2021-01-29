import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export declare class CuiIconArgs implements ICuiParsable {
    icon: string;
    scale: number;
    constructor();
    parse(val: any): void;
}
export declare class CuiIconComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiIconHandler extends CuiHandler<CuiIconArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    private addIcon;
    private insertBefore;
    private appendChild;
}
