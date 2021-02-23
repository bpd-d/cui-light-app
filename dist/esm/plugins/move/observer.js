var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _bus, _moveListener, _isLocked, _eventId, _firstEvent, _wasFirstEventSend, _gesturesEnabled;
import { CuiMoveEventListener } from "../../core/listeners/move";
import { EVENTS } from "../../core/utils/statics";
const DEFAULT_GESTURE_TRESHOLD = 0.3;
export class CuiMoveObserver {
    constructor(bus, gestures) {
        _bus.set(this, void 0);
        _moveListener.set(this, void 0);
        _isLocked.set(this, void 0);
        _eventId.set(this, void 0);
        _firstEvent.set(this, void 0);
        _wasFirstEventSend.set(this, void 0);
        _gesturesEnabled.set(this, void 0);
        __classPrivateFieldSet(this, _bus, bus);
        __classPrivateFieldSet(this, _moveListener, new CuiMoveEventListener());
        __classPrivateFieldGet(this, _moveListener).setCallback(this.onMove.bind(this));
        __classPrivateFieldSet(this, _firstEvent, undefined);
        __classPrivateFieldSet(this, _isLocked, false);
        __classPrivateFieldSet(this, _eventId, null);
        __classPrivateFieldSet(this, _wasFirstEventSend, false);
        __classPrivateFieldSet(this, _gesturesEnabled, gestures);
    }
    attach() {
        if (!__classPrivateFieldGet(this, _moveListener).isAttached()) {
            __classPrivateFieldGet(this, _moveListener).attach();
            __classPrivateFieldSet(this, _eventId, __classPrivateFieldGet(this, _bus).on(EVENTS.MOVE_LOCK, this.onMoveLock.bind(this)));
        }
    }
    detach() {
        if (__classPrivateFieldGet(this, _moveListener).isAttached()) {
            __classPrivateFieldGet(this, _moveListener).detach();
            __classPrivateFieldGet(this, _eventId) != null && __classPrivateFieldGet(this, _bus).detach(EVENTS.MOVE_LOCK, __classPrivateFieldGet(this, _eventId));
        }
    }
    isAttached() {
        return __classPrivateFieldGet(this, _moveListener).isAttached();
    }
    onMove(data) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        switch (data.type) {
            case "down":
                __classPrivateFieldSet(this, _firstEvent, data);
                __classPrivateFieldSet(this, _wasFirstEventSend, false);
                break;
            case "move":
                if (__classPrivateFieldGet(this, _firstEvent) && !__classPrivateFieldGet(this, _wasFirstEventSend)) {
                    this.pushMoveEvent(__classPrivateFieldGet(this, _firstEvent));
                    __classPrivateFieldSet(this, _wasFirstEventSend, true);
                }
                this.pushMoveEvent(data);
                break;
            case "up":
                this.pushMoveEvent(data);
                if (__classPrivateFieldGet(this, _firstEvent)) {
                    if (__classPrivateFieldGet(this, _gesturesEnabled)) {
                        const { diffX, diffY } = this.getGestureDiff(__classPrivateFieldGet(this, _firstEvent), data);
                        const gesture = this.calculateGesture(diffX, diffY);
                        this.pushGestureEvent(gesture, diffX, diffY);
                    }
                    __classPrivateFieldSet(this, _firstEvent, undefined);
                }
                break;
        }
    }
    pushMoveEvent(data) {
        __classPrivateFieldGet(this, _bus).emit(EVENTS.GLOBAL_MOVE, null, {
            data,
            source: "CuiMoveObserver",
            timestamp: Date.now(),
            name: EVENTS.GLOBAL_MOVE
        });
    }
    onMoveLock(flag) {
        __classPrivateFieldSet(this, _isLocked, flag);
    }
    getGestureDiff(firstEvent, lastEvent) {
        return {
            diffX: lastEvent.x - firstEvent.x,
            diffY: lastEvent.y - firstEvent.y
        };
    }
    calculateGesture(diffX, diffY) {
        const tresholdX = window.innerWidth * DEFAULT_GESTURE_TRESHOLD;
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);
        if (absDiffX > absDiffY && absDiffX > tresholdX) {
            return diffX > 0 ? "right" : "left";
        }
        const tresholdY = window.innerHeight * DEFAULT_GESTURE_TRESHOLD;
        if (absDiffY > tresholdY) {
            return diffY > 0 ? "down" : 'up';
        }
        return 'none';
    }
    pushGestureEvent(type, diffX, diffY) {
        const eventName = this.getGestureEventName(type);
        if (!eventName) {
            return;
        }
        __classPrivateFieldGet(this, _bus).emit(eventName, null, {
            timespstamp: Date.now(),
            changeX: diffX,
            changeY: diffY,
            name: eventName,
            source: "CuiMoveObserver"
        });
    }
    getGestureEventName(type) {
        switch (type) {
            case "up":
                return EVENTS.GESTURE_UP;
            case 'down':
                return EVENTS.GESTURE_DOWN;
            case "left":
                return EVENTS.GESTURE_LEFT;
            case "right":
                return EVENTS.GESTURE_RIGHT;
            default:
                return null;
        }
    }
}
_bus = new WeakMap(), _moveListener = new WeakMap(), _isLocked = new WeakMap(), _eventId = new WeakMap(), _firstEvent = new WeakMap(), _wasFirstEventSend = new WeakMap(), _gesturesEnabled = new WeakMap();
