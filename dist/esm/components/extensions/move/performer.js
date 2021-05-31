var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function moveExtensionPerformer(setup) {
    return getBaseMovePerformer({
        onStart: (ev) => __awaiter(this, void 0, void 0, function* () {
            if (setup.onDown) {
                setup.onDown(ev);
            }
            return true;
        }),
        onMove: setup.onMove,
        onEnd: setup.onUp,
    });
}
export function getDragMovePerformer(setup) {
    let dragStartTimeout = 100;
    let timeoutId = null;
    function cancelTimeout() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }
    function call(ev, callback) {
        cancelTimeout();
        if (callback) {
            callback(ev);
        }
    }
    return Object.assign(Object.assign({}, getBaseMovePerformer({
        onStart: (ev) => __awaiter(this, void 0, void 0, function* () {
            cancelTimeout();
            console.log("sssss");
            return new Promise((resolve) => {
                timeoutId = setTimeout(() => {
                    timeoutId = null;
                    console.log("start");
                    setup.onStart(ev).then((status) => {
                        resolve(status);
                    });
                    //resolve(setup.onStart(ev));
                }, dragStartTimeout);
            });
        }),
        onMove: (ev) => call(ev, setup.onMove),
        onEnd: (ev) => call(ev, setup.onEnd),
    })), { setTimeout: (value) => {
            dragStartTimeout = value;
        } });
}
function getBaseMovePerformer(setup) {
    let _isTracking = false;
    let _isEnabled = true;
    let _waiting = false;
    return {
        perform: (ev) => {
            if (!_isEnabled) {
                _isTracking = false;
                return;
            }
            switch (ev.type) {
                case "down":
                    console.log("down");
                    if (_isTracking) {
                        return;
                    }
                    _waiting = true;
                    setup.onStart(ev).then((status) => {
                        _waiting = false;
                        if (status)
                            _isTracking = true;
                    });
                    break;
                case "move":
                    if (!_isTracking)
                        return;
                    if (setup.onMove) {
                        setup.onMove(ev);
                    }
                    break;
                case "up":
                    if (!_isTracking && !_waiting)
                        return;
                    if (setup.onEnd) {
                        setup.onEnd(ev);
                    }
                    _isTracking = false;
                    break;
            }
        },
        setEnabled: (flag) => {
            _isEnabled = flag;
        },
    };
}
