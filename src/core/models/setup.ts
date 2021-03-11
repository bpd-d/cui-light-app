import { ParallaxAnimations } from "../animation/interfaces";
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

export class CuiSetup implements CuiSetupCommon {
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
    parallaxAnimations: ParallaxAnimations;

    constructor() {
        this.autoLightMode = false;
        this.scrollThreshold = 20;
        this.resizeThreshold = 20;
        this.prefix = "cui";
        this.plugins = {};
        this.root = document.body;
        this.parallaxAnimations = {};
    }

    fromInit(init: CuiSetupInit): CuiSetup {
        this.prefix = init.prefix ?? "cui";
        this.logLevel = init.logLevel;
        this.cacheSize = init.cacheSize;
        this.autoLightMode = init.autoLightMode;
        this.animationTime = init.animationTime;
        this.animationTimeShort = init.animationTimeShort;
        this.animationTimeLong = init.animationTimeLong;
        this.scrollThreshold = init.scrollThreshold;
        this.resizeThreshold = init.resizeThreshold;
        this.root = init.root;
        this.parallaxAnimations = init.parallaxAnimations;

        return this;
    }
}


export class CuiSetupInit implements CuiSetupCommon {
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
    parallaxAnimations: ParallaxAnimations;
    root: HTMLElement;
    constructor() {
        this.prefix = 'cui';
        this.app = '$cui';
        this.logLevel = 'warning';
        this.interaction = 'async';
        this.animationTime = 300;
        this.animationTimeShort = 150;
        this.animationTimeLong = 500;
        this.cacheSize = 500;
        this.autoLightMode = false;
        this.scrollThreshold = 20;
        this.resizeThreshold = 20;
        this.root = document.body;
        this.busSetup = undefined;
        this.development = undefined;
        this.parallaxAnimations = {};
    }
}