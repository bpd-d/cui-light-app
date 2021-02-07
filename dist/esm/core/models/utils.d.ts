import { IUIInteractionProvider, ICuiEventBus, ICuiManager, CuiCachable } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiLightMode } from "../utils/types";
import { ICuiDocumentStyleAppender } from "../styles/appender";
import { CuiInstanceColorHandler } from "../handlers/colors";
import { CuiDevelopmentToolManager } from "../managers/development";
export declare class CuiUtils {
    #private;
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    cache: ICuiManager<CuiCachable>;
    colors: CuiInstanceColorHandler;
    styleAppender: ICuiDocumentStyleAppender;
    development: CuiDevelopmentToolManager;
    constructor(initialSetup: CuiSetupInit, plugins?: string[]);
    setLightMode(mode: CuiLightMode): void;
    getLightMode(): CuiLightMode;
    setPrintMode(flag: boolean): void;
    isPrintMode(): boolean;
    setProperty(name: string, value: string): void;
    isPlugin(name: string): string | false | undefined;
    private onInteractionError;
}
