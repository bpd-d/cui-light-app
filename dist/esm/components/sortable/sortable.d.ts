import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiParsable, ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiSortableArgs extends CuiAutoParseArgs implements ICuiParsable {
    target: string;
    trigger: string;
    timeout: number;
    threshold: number;
    constructor();
}
export declare class CuiSortableComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSortableHandler extends CuiHandlerBase<CuiSortableArgs> {
    #private;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
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
    private onSortAnimationFinish;
}
