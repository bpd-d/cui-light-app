import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export declare class CuiSpinnerArgs extends CuiAutoParseArgs implements ICuiParsable {
    spinner: string;
    scale: number;
    constructor();
}
export declare class CuiSpinnerComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSpinnerHandler extends CuiHandlerBase<CuiSpinnerArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onHandle(): Promise<boolean>;
    onRefresh(): Promise<boolean>;
    onRemove(): Promise<boolean>;
    private addSpinner;
    private add;
    private removeIfAnyExisists;
    private onPause;
}
