export function getCuiWindowClickPerformer(callback) {
    let _isEnabled = false;
    return {
        perform: (arg) => {
            if (!_isEnabled) {
                return;
            }
            callback(arg);
        },
        setEnabled: (flag) => {
            _isEnabled = flag;
        }
    };
}
export function getAdvancedCuiWindowClickPerformer(callback, target) {
    function nodeCallback(arg) {
        if (!target || !target.contains(arg.ev.target)) {
            callback(arg);
        }
    }
    return getCuiWindowClickPerformer(nodeCallback);
}
