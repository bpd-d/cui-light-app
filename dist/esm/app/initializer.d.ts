import { CuiSetupInit } from "../core/models/setup";
import { ICuiComponent, ICuiPlugin } from "../core/models/interfaces";
import { CuiAnimationsDefinition } from "../core/animation/definitions";
export interface CuiInitData {
    plugins?: ICuiPlugin[];
    components?: ICuiComponent[];
    setup?: CuiSetupInit;
    icons?: any;
    swipeAnimations?: CuiAnimationsDefinition;
}
export interface CuiInitResult {
    result: boolean;
    message?: string;
}
export declare class CuiInitializer {
    #private;
    constructor();
    init(setup: CuiInitData): Promise<CuiInitResult>;
}
