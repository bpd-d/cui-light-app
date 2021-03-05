import { ICuiCallbackExecutor } from "./interfaces";


export class CuiCallbackExecutor implements ICuiCallbackExecutor {
    async execute(callback: any, args?: any): Promise<boolean> {
        try {
            callback(args)
            return true;
        } catch (e) {

        }

        return false;
    }
}