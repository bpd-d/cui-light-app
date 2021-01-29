import { CuiInteractableArgs, CuiInteractableHandler } from "../../core/handlers/base";
import { ICuiMoveEvent } from "../../core/listeners/move";
import { ICuiParsable, ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiBannerArgs implements ICuiParsable, CuiInteractableArgs {
    #private;
    timeout: number;
    swipe: boolean;
    openAct: string;
    closeAct: string;
    escClose: boolean;
    keyClose: string;
    constructor(prefix: string, timeout: number | undefined);
    parse(args: any): void;
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
    onMove(data: ICuiMoveEvent): void;
    onSwipeFinish(element: Element | undefined, reverted: boolean, error: boolean): void;
}
