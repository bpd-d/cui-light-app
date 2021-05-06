import { ICuiEventBusFacade } from "src/core/handlers/extensions/facades";
import { ICuiHandlerExtension } from "../../../core/handlers/extensions/interfaces";
export declare class CuiSwitchExtension implements ICuiHandlerExtension<any> {
    type: string;
    description: string;
    _busFacade: ICuiEventBusFacade;
    private _callback;
    private _switchEventId;
    constructor(busFacade: ICuiEventBusFacade, callback: (value: any) => void);
    init(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
    onSwitch(value: any): void;
}
