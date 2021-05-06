import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickableArgs } from "src/core/models/arguments";
import { ICuiClickPerfromerHook } from "../extensions/click/performer";
export declare class CuiSwitcherArgs extends CuiAutoParseArgs implements CuiClickableArgs {
    target: string;
    index: string;
    prevent: boolean;
    stopPropagation: boolean;
    targets: string;
    isList: boolean;
    constructor();
}
export declare function CuiSwitcherComponent(prefix?: string): ICuiComponent;
export declare class CuiSwitcherHandler extends CuiHandlerBase<CuiSwitcherArgs> {
    _perfromer: ICuiClickPerfromerHook;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private handleArguments;
    /**
     * Sets current switcher target value
     *
     */
    getTargetCuid(): string | null;
    onClickEvent(ev: MouseEvent): void;
    handleItemClick(ev: MouseEvent, targetCuid: string): void;
    handleListClick(ev: MouseEvent, targetCuid: string): void;
}
