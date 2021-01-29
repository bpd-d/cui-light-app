import { ICuiCallbackExecutor } from "../models/interfaces";
export declare class CuiCallbackExecutor implements ICuiCallbackExecutor {
    execute(callback: any, args: any[]): Promise<void>;
}
