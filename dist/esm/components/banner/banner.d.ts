import { CuiInteractableArgs, CuiInteractableHandler } from "../../core/handlers/base";
import { ICuiMoveData } from "../../core/listeners/move";
import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiBannerArgs extends CuiAutoParseArgs implements CuiInteractableArgs {
    timeout: number;
    openAct: string;
    closeAct: string;
    escClose: boolean;
    keyClose: string;
    swipe: boolean;
    constructor(prefix: string, timeout?: number);
}
export declare class CuiBanerComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiBannerHandler extends CuiInteractableHandler<CuiBannerArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onBeforeOpen(): boolean;
    onAfterOpen(): void;
    onAfterClose(): void;
    onBeforeClose(): boolean;
    onMove(data: ICuiMoveData): void;
    onSwipeFinish(element: Element | undefined, reverted: boolean, error: boolean): void;
}
