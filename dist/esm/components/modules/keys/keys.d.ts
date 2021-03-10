import { CuiHandlerModuleProps, ICuiHandlerModule } from "src/core/handlers/modules/interfaces";
import { CuiHandlerBusMixin } from "src/core/handlers/modules/mixins";
import { CuiKeyCloseArgs } from "src/core/models/arguments";
import { KeyDownEvent } from "src/core/models/events";
declare const CuiKeysHandlerModule_base: import("../../../core/utils/types").Constructor<CuiHandlerBusMixin>;
export declare class CuiKeysHandlerModule extends CuiKeysHandlerModule_base implements ICuiHandlerModule<CuiKeyCloseArgs> {
    #private;
    props: CuiHandlerModuleProps;
    type: string;
    description: string;
    args: CuiKeyCloseArgs;
    constructor(props: CuiHandlerModuleProps, args: CuiKeyCloseArgs, onKey: (ev: KeyDownEvent) => void);
    init(args: CuiKeyCloseArgs): Promise<boolean>;
    update(args: CuiKeyCloseArgs): Promise<boolean>;
    destroy(): Promise<boolean>;
    onKeyDown(ev: KeyDownEvent): void;
}
export {};
