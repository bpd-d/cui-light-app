import { ICuiMoveData } from "src/core/listeners/move";
import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiMovePerformerSetup {
    onDown?: (ev: ICuiMoveData) => void;
    onMove?: (ev: ICuiMoveData) => void;
    onUp?: (ev: ICuiMoveData) => void;
}
export interface ICuiDragPerformerSetup {
    onDown?: (ev: ICuiMoveData) => boolean;
    onMove?: (ev: ICuiMoveData) => void;
    onUp?: (ev: ICuiMoveData) => void;
}
export interface ICuiBasePerformerSetup {
    onStart: (ev: ICuiMoveData) => Promise<boolean>;
    onMove?: (ev: ICuiMoveData) => void;
    onEnd?: (ev: ICuiMoveData) => void;
}
export interface ICuiMoveExtensionPerformer extends ICuiExtensionPerformer<ICuiMoveData> {
    setEnabled(flag: boolean): void;
}
export interface ICuiDragExtensionPerformer extends ICuiMoveExtensionPerformer {
    setTimeout(value: number): void;
}
export declare function moveExtensionPerformer(setup: ICuiMovePerformerSetup): ICuiMoveExtensionPerformer;
export declare function getDragMovePerformer(setup: ICuiBasePerformerSetup): ICuiDragExtensionPerformer;
