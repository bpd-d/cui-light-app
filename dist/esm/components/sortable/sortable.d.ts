import { CuiHandler } from "../../core/handlers/base";
import { ICuiParsable, ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiSortableArgs implements ICuiParsable {
    target: string;
    trigger: string;
    timeout: number;
    threshold: number;
    constructor();
    parse(val: any): void;
}
export declare class CuiSortableComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSortableHandler extends CuiHandler<CuiSortableArgs> {
    #private;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    private getTargetsAndTrggers;
    private onDragStart;
    private onDragOver;
    private onDragEnd;
    private getPressedElementIdx;
    private startMovementPrep;
    private stopMovementPrep;
    private move;
    private createPreview;
    private removePreview;
    private setPreviewPosition;
    private setCurrentPosition;
    private insertElement;
    private getFinishAnimation;
}
