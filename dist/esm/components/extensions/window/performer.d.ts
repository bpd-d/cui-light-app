import { GlobalClickEvent } from "src/core/models/events";
import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiWindowClickPerformer extends ICuiExtensionPerformer<GlobalClickEvent> {
    setEnabled(flag: boolean): void;
}
export declare function getCuiWindowClickPerformer(callback: (arg: GlobalClickEvent) => void): ICuiWindowClickPerformer;
export declare function getAdvancedCuiWindowClickPerformer(callback: (arg: GlobalClickEvent) => void, target?: Node): ICuiWindowClickPerformer;
