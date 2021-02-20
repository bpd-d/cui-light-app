import { ICuiCallbackExecutor } from "./interfaces";


export class CuiCallbackExecutor implements ICuiCallbackExecutor {
    async execute(callback: any, args: any[]): Promise<boolean> {
        args = args ?? [];
        try {
            callback(...args)
            return true;
        } catch (e) {

        }

        return false;
    }
}