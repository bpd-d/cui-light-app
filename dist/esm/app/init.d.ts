import { CuiInitData } from "./initializer";
export declare class CuiInit {
    private _isInitialized;
    constructor();
    init(data: CuiInitData): Promise<boolean>;
}
