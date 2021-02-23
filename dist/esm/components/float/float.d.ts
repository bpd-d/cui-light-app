import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../core/handlers/base";
import { ICuiMoveData } from "../../core/listeners/move";
export declare class CuiFloatArgs implements CuiInteractableArgs, ICuiParsable {
    #private;
    escClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;
    constructor(prefix: string, defTimeout?: number);
    parse(args: any): void;
}
export declare class CuiFloatComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiFloatHandler extends CuiInteractableHandler<CuiFloatArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onBeforeOpen(): boolean;
    onAfterOpen(): void;
    onAfterClose(): void;
    onBeforeClose(): boolean;
    onMove(ev: ICuiMoveData): void;
    onMouseDown(ev: ICuiMoveData): void;
    onMouseMove(ev: ICuiMoveData): void;
    onMouseUp(ev: ICuiMoveData): void;
    peform(ev: ICuiMoveData, callback: (element: HTMLElement, x: number, y: number, diffX: number, diffY: number) => void): void;
    resize(element: HTMLElement, x: number, y: number, diffX: number, diffY: number): void;
    move(element: HTMLElement, x: number, y: number, diffX: number, diffY: number): void;
    fitsWindow(top: number, left: number, width: number, height: number): boolean;
}
