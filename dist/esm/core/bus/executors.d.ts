import { ICuiCallbackExecutor } from "./interfaces";
export declare class CuiCallbackExecutor implements ICuiCallbackExecutor {
    execute(callback: any, args?: any): Promise<boolean>;
}
