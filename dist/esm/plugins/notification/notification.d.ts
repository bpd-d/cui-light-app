import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { ICuiNotificationPluginSetup } from "./interfaces";
export declare class CuiNotificationPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: any;
    constructor(setup: ICuiNotificationPluginSetup);
    init(utils: CuiUtils): void;
    destroy(): void;
    private onEvent;
    private setAutoClose;
    private addNotificationToTree;
    private onNotificationClose;
    private getOrCreateContainer;
    private createCache;
    act(element: HTMLElement, animationClass: string, timeout?: number): Promise<boolean>;
}
