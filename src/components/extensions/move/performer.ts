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

export function moveExtensionPerformer(setup: ICuiMovePerformerSetup): ICuiMoveExtensionPerformer {
    return getBaseMovePerformer({
        onStart: async (ev: ICuiMoveData) => {
            if (setup.onDown) {
                setup.onDown(ev)
            }
            return true;
        },
        onMove: setup.onMove,
        onEnd: setup.onUp
    })
}

export function getDragMovePerformer(setup: ICuiBasePerformerSetup): ICuiDragExtensionPerformer {
    let dragStartTimeout = 100;
    let timeoutId: any | null = null;
    function cancelTimeout() {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null;
        }
    }

    function call(ev: ICuiMoveData, callback?: (ev: ICuiMoveData) => void) {
        cancelTimeout();
        if (callback) {
            callback(ev);
        }
    }

    return {
        ...getBaseMovePerformer({
            onStart: async (ev: ICuiMoveData) => {
                cancelTimeout();
                return new Promise((resolve) => {
                    timeoutId = setTimeout(() => {
                        resolve(setup.onStart(ev));
                    }, dragStartTimeout)
                })
            },
            onMove: ev => call(ev, setup.onMove),
            onEnd: ev => call(ev, setup.onEnd)
        }),
        setTimeout: (value: number) => {
            dragStartTimeout = value;
        }
    }
}

function getBaseMovePerformer(setup: ICuiBasePerformerSetup): ICuiMoveExtensionPerformer {
    let _isTracking = false;
    let _isEnabled = true;
    return {
        perform: (ev: ICuiMoveData) => {
            if (!_isEnabled) {
                _isTracking = false;
                return;
            }
            switch (ev.type) {
                case 'down':
                    if (_isTracking) {
                        return;
                    }
                    setup.onStart(ev).then((status: boolean) => {
                        if (status)
                            _isTracking = true;
                    })
                    break;
                case "move":
                    if (!_isTracking) return;
                    if (setup.onMove) {
                        setup.onMove(ev);
                    }
                    break;
                case "up":
                    if (!_isTracking) return;
                    if (setup.onEnd) {
                        setup.onEnd(ev);
                    }
                    _isTracking = false;
                    break;
            }
        },
        setEnabled: (flag: boolean) => {
            _isEnabled = flag;
        }
    }
}