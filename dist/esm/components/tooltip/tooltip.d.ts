import { CuiHandler } from "../../core/handlers/base";
import { CuiHoverEvent } from "../../core/listeners/hover";
import { ICuiParsable, ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiTooltipArgs implements ICuiParsable {
    #private;
    content: string;
    width: number;
    pos: string;
    margin: number;
    action: string;
    timeout: number;
    constructor(prefix: string);
    parse(val: any): void;
}
export declare class CuiTooltipComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string | null;
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler;
}
export declare class CuiTooltipHandler extends CuiHandler<CuiTooltipArgs> {
    #private;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string);
    onInit(): void;
    onUpdate(): void;
    onDestroy(): void;
    onHover(ev: CuiHoverEvent): void;
    private createTooltip;
    private removeTooltip;
    private getDataFromArgs;
    private toggleActions;
}
