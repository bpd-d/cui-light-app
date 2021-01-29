import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../core/handlers/base";
export declare class CuiSpinnerArgs implements ICuiParsable {
    spinner: string;
    scale: number;
    constructor();
    parse(args: any): void;
}
export declare class CuiSpinnerComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiSpinnerHandler extends CuiHandler<CuiSpinnerArgs> {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    private addSpinner;
    private add;
    private removeIfAnyExisists;
    private onPause;
}
