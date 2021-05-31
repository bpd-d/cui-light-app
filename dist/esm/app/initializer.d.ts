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
export default function CuiInitializer(setup: CuiInitData): Promise<CuiInitResult>;
