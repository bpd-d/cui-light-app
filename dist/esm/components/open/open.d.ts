import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export declare class CuiOpenArgs {
    #private;
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    constructor(timeout?: number);
    parse(args: any): void;
}
export declare class CuiOpenComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiOpenHandler extends CuiHandler<CuiOpenArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onClick(ev: MouseEvent): void;
    onOpen(ev: MouseEvent): void;
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
