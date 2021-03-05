import { IUIInteractionProvider } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiLightMode } from "../utils/types";
import { ICuiDocumentStyleAppender } from "../styles/appender";
import { ICuiEventBus } from "../bus/interfaces";
export declare class CuiUtils {
    #private;
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    styleAppender: ICuiDocumentStyleAppender;
    constructor(initialSetup: CuiSetupInit, plugins?: string[]);
    setLightMode(mode: CuiLightMode): void;
    getLightMode(): CuiLightMode;
    setPrintMode(flag: boolean): void;
    isPrintMode(): boolean;
    setProperty(name: string, value: string): void;
    isPlugin(name: string): string | false | undefined;
    private onInteractionError;
}
