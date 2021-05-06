import { ICuiPlugin } from "../../core/models/interfaces";
export interface AutoPrintPluginSetup {
    autoPrint: boolean;
}
export declare function CuiAutoPrintModePluginFn(autoPrintInit: AutoPrintPluginSetup): ICuiPlugin;
