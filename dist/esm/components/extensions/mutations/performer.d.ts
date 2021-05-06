import { ICuiExtensionPerformer } from "../interfaces";
export interface ICuiMutationPerformer extends ICuiExtensionPerformer<MutationRecord[]> {
    setSelector(selector: string): void;
}
export declare function getCuiMutationPerformer(callback: (record: MutationRecord[]) => void): ICuiMutationPerformer;
