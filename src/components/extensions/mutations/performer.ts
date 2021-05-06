import { ICuiExtensionPerformer } from "../interfaces";

export interface ICuiMutationPerformer extends ICuiExtensionPerformer<MutationRecord[]> {
    setSelector(selector: string): void;
}


export function getCuiMutationPerformer(callback: (record: MutationRecord[]) => void): ICuiMutationPerformer {
    let _selector: string | null = null;
    const _callback = callback;
    function matchesSelector(record: MutationRecord): boolean {
        if (record.addedNodes.length > 0) {
            return isAnyItemMatching([...record.addedNodes] as HTMLElement[]);
        }
        if (record.removedNodes.length > 0) {
            return isAnyItemMatching([...record.removedNodes] as HTMLElement[]);
        }
        return false;
    }

    function isAnyItemMatching(array: HTMLElement[]): boolean {
        //@ts-ignore
        return (array.find((node) => (<HTMLElement>node).matches(_selector)) !== null);
    }

    function filterRecordsBySelector(record: MutationRecord[]) {
        return record.reduce<MutationRecord[]>((result, record) => {
            if (_selector && record.type === 'childList') {
                if (matchesSelector(record)) {
                    result.push(record)
                }
            } else {
                result.push(record)
            }
            return result;
        }, [])
    }

    return {
        perform: (record: MutationRecord[]) => {
            let out = record;
            if (_selector) {
                out = filterRecordsBySelector(record);
            }
            if (out.length > 0) {
                _callback(out);
            }
        },
        setSelector: (selector: string) => {
            _selector = selector;
        }
    }
}