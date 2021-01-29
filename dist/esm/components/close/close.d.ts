import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export declare class CuiCloseArgs {
    #private;
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    constructor(timeout?: number);
    parse(args: any): void;
}
export declare class CuiCloseComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiCloseHandler extends CuiHandler<CuiCloseArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onClick(ev: MouseEvent): void;
    onClose(ev: MouseEvent): void;
    private run;
    private removeActiveClass;
    private removeActiveClassAsync;
    private onActionFinish;
    private getTarget;
    private emitClose;
}
