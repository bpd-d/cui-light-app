export class CuiClickPerformer {
    constructor() {
        this._preventDefault = false;
        this._stopPropagation = false;
        this._callback = undefined;
    }
    setCallback(callback) {
        this._callback = callback;
    }
    perform(arg) {
        if (!this._callback) {
            return;
        }
        this._callback(arg);
        if (this._preventDefault) {
            arg.preventDefault();
        }
        if (this._stopPropagation) {
            arg.stopPropagation();
        }
    }
    preventDefault(flag) {
        this._preventDefault = flag;
    }
    stopPropagation(flag) {
        this._stopPropagation = flag;
    }
}
export function clickPerformer(callback) {
    let _prevent = false;
    let _stopPropagation = false;
    return {
        perform: (ev) => {
            callback(ev);
            if (_prevent)
                ev.preventDefault();
            if (_stopPropagation)
                ev.stopPropagation();
        },
        stopPropagation: flag => _stopPropagation = flag,
        preventDefault: flag => _prevent = flag,
    };
}
