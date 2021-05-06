import { ICuiHandlerExtension } from "./interfaces";
export declare class CuiExtensionsHandler<T> {
    #private;
    constructor();
    add(module: ICuiHandlerExtension<T>): void;
    remove(type: string): void;
    init(args: T): Promise<boolean>;
    update(args: T): Promise<boolean>;
    destroy(): Promise<boolean>;
}
