import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase } from "../../core/handlers/base";
export declare class CuiDummyComponent implements ICuiComponent {
    attribute: string;
    constructor();
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiDummyHandler extends CuiComponentBase implements ICuiComponentHandler {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    handle(args: any): void;
    refresh(args: any): void;
    destroy(): void;
}
