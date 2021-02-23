import { ICuiEventBusQueueSetup } from "../bus/interfaces";
import { ICuiDevelopmentToolFactory } from "../development/interfaces";
import { CuiLogLevel, CuiInteractionsType } from "../utils/types";
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
    root: HTMLElement;
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
    root: HTMLElement;
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
    development: ICuiDevelopmentToolFactory | undefined;
    root: HTMLElement;
    constructor();
}
export {};
