import { ICuiEventBusQueueSetup } from "../bus/interfaces";
import { CuiLogLevel, CuiInteractionsType } from "../utils/types";
import { ICuiDevelopmentTool } from "./interfaces";
interface CuiSetupCommon {
    prefix?: string;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    scrollThreshold?: number;
    resizeThreshold?: number;
}
export declare class CuiSetup implements CuiSetupCommon {
    prefix: string;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    scrollThreshold: number;
    resizeThreshold: number;
    plugins: any;
    constructor();
    fromInit(init: CuiSetupInit): CuiSetup;
}
export declare class CuiSetupInit implements CuiSetupCommon {
    prefix: string;
    app: string;
    interaction: CuiInteractionsType;
    logLevel: CuiLogLevel;
    cacheSize: number;
    autoLightMode?: boolean;
    animationTime: number;
    animationTimeShort: number;
    animationTimeLong: number;
    scrollThreshold: number;
    resizeThreshold: number;
    busSetup?: ICuiEventBusQueueSetup[];
    development: ICuiDevelopmentTool | undefined;
    root: HTMLElement;
    constructor();
}
export {};
