import { CuiScrollEvent } from "src/core/listeners/scroll";
export interface ICuiOffsetPerformerSetup {
    callback: (ev: CuiScrollEvent) => void;
    threshold: number;
}
export declare function getOffsetPerformer(setup: ICuiOffsetPerformerSetup): import("../extensions/interfaces").ICuiExtensionPerformer<CuiScrollEvent>;
