import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../core/handlers/base";
export interface CuiDialogEvent {
    timestamp: number;
}
export declare class CuiCoverArgs implements ICuiParsable, CuiInteractableArgs {
    #private;
    escClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;
    constructor(prefix: string, defTimeout?: number);
    parse(args: any): void;
}
export declare class CuiCoverComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiCoverHandler extends CuiInteractableHandler<CuiCoverArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onBeforeOpen(): boolean;
    onAfterOpen(): void;
    onAfterClose(): void;
    onBeforeClose(): boolean;
    private isAnyActive;
}
