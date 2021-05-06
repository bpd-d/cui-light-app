export function getCuiMutationPerformer(callback) {
    let _selector = null;
    const _callback = callback;
    function matchesSelector(record) {
        if (record.addedNodes.length > 0) {
            return isAnyItemMatching([...record.addedNodes]);
        }
        if (record.removedNodes.length > 0) {
            return isAnyItemMatching([...record.removedNodes]);
        }
        return false;
    }
    function isAnyItemMatching(array) {
        //@ts-ignore
        return (array.find((node) => node.matches(_selector)) !== null);
    }
    function filterRecordsBySelector(record) {
        return record.reduce((result, record) => {
            if (_selector && record.type === 'childList') {
                if (matchesSelector(record)) {
                    result.push(record);
                }
            }
            else {
                result.push(record);
            }
            return result;
        }, []);
    }
    return {
        perform: (record) => {
            let out = record;
            if (_selector) {
                out = filterRecordsBySelector(record);
            }
            if (out.length > 0) {
                _callback(out);
            }
        },
        setSelector: (selector) => {
            _selector = selector;
        }
    };
}
