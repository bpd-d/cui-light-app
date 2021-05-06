import { CuiHandlerBase } from "../../core/handlers/base";
import { ICuiParsable, ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiSortableArgs extends CuiAutoParseArgs implements ICuiParsable {
    target: string;
    trigger: string;
    timeout: number;
    threshold: number;
    constructor();
}
export declare function CuiSortableComponent(prefix?: string): ICuiComponent;
export declare class CuiSortableHandler extends CuiHandlerBase<CuiSortableArgs> {
    private _triggers;
    private _targets;
    private _currentTarget;
    private _currentIdx;
    private _preview;
    private _detector;
    private _currentBefore;
    private _animation;
    private _previewCls;
    private _movingCls;
    private _lockedCls;
    private _busFacade;
    private _interactions;
    private _dragPerformer;
    constructor(element: HTMLElement, attribute: string, utils: CuiCore, prefix: string);
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
