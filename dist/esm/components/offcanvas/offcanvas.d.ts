import { CuiInteractableArgs, CuiInteractableHandler } from "../../core/handlers/base";
import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { GlobalClickEvent } from "src/core/models/events";
export declare class CuiOffCanvasArgs extends CuiAutoParseArgs implements ICuiParsable, CuiInteractableArgs {
    #private;
    escClose: boolean;
    outClose: boolean;
    openAct: string;
    closeAct: string;
    keyClose: string;
    position: 'left' | 'right';
    timeout: number;
    constructor(prefix: string, timeout?: number);
    getDefaultOpenClass(): string;
    getDefaultCloseClass(): string;
}
export declare class CuiOffCanvasComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiOffCanvasHandler extends CuiInteractableHandler<CuiOffCanvasArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onBeforeOpen(): boolean;
    onAfterOpen(): void;
    onAfterClose(): void;
    onBeforeClose(): boolean;
    onWindowClick(ev: GlobalClickEvent): void;
    isAnyActive(): boolean;
    setPositionLeft(): void;
}
