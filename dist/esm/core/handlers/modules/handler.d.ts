import { ICuiHandlerModule } from "./interfaces";
export declare class CuiModulesHandler<T> {
    #private;
    constructor();
    add(module: ICuiHandlerModule<T>): void;
    remove(type: string): void;
    init(args: T): Promise<boolean>;
    update(args: T): Promise<boolean>;
    destroy(): Promise<boolean>;
}
