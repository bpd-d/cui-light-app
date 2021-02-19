import { ICuiPlugin } from "src/core/models/interfaces";
import { CuiUtils } from "src/core/models/utils";
export interface ICuiLightFocusPluginSetup {
    keybordClass?: string;
    mouseClass?: string;
    touchClass?: string;
}
export declare class CuiLightFocusPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: ICuiLightFocusPluginSetup;
    constructor(setup: ICuiLightFocusPluginSetup);
    init(utils: CuiUtils): void;
    private onMouseEvent;
    private onKeyDownEvent;
    private onTouchEvent;
    private update;
    private getClass;
    private setClasses;
    destroy(): void;
}
