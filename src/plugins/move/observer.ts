import { ICuiEventBus } from "src/core/bus/interfaces";
import { ICuiMoveEvent } from "src/core/models/events";
import { CuiMoveEventListener, ICuiMoveData } from "../../core/listeners/move";
import { EVENTS } from "../../core/utils/statics";

const DEFAULT_GESTURE_TRESHOLD = 0.3;
type GlobalMoveGesture = 'up' | 'down' | 'left' | 'right' | 'none'

export class CuiMoveObserver {
    #bus: ICuiEventBus;
    #moveListener: CuiMoveEventListener;
    #isLocked: boolean;
    #eventId: string | null;
    #firstEvent: ICuiMoveData | undefined;
    #wasFirstEventSend: boolean;
    #gesturesEnabled: boolean;
    constructor(bus: ICuiEventBus, gestures: boolean) {
        this.#bus = bus;
        this.#moveListener = new CuiMoveEventListener();
        this.#moveListener.setCallback(this.onMove.bind(this));
        this.#firstEvent = undefined;
        this.#isLocked = false;
        this.#eventId = null;
        this.#wasFirstEventSend = false;
        this.#gesturesEnabled = gestures;
    }

    attach() {
        if (!this.#moveListener.isAttached()) {
            this.#moveListener.attach();
            this.#eventId = this.#bus.on(EVENTS.MOVE_LOCK, this.onMoveLock.bind(this))
        }
    }

    detach() {
        if (this.#moveListener.isAttached()) {
            this.#moveListener.detach();
            this.#eventId != null && this.#bus.detach(EVENTS.MOVE_LOCK, this.#eventId);
        }

    }

    isAttached() {
        return this.#moveListener.isAttached();
    }

    private onMove(data: ICuiMoveData) {
        if (this.#isLocked) {
            return;
        }
        switch (data.type) {
            case "down":
                this.#firstEvent = data;
                this.#wasFirstEventSend = false
                break;
            case "move":
                if (this.#firstEvent && !this.#wasFirstEventSend) {
                    this.pushMoveEvent(this.#firstEvent)
                    this.#wasFirstEventSend = true;
                }
                this.pushMoveEvent(data)
                break;
            case "up":
                this.pushMoveEvent(data)
                if (this.#firstEvent) {
                    if (this.#gesturesEnabled) {
                        const { diffX, diffY } = this.getGestureDiff(this.#firstEvent, data);
                        const gesture = this.calculateGesture(diffX, diffY);
                        this.pushGestureEvent(gesture, diffX, diffY);
                    }
                    this.#firstEvent = undefined;
                }
                break;
        }

    }

    private pushMoveEvent(data: ICuiMoveData) {
        this.#bus.emit<ICuiMoveEvent>(EVENTS.GLOBAL_MOVE, null, {
            ...data,
            source: "CuiMoveObserver",
            timestamp: Date.now(),
            name: EVENTS.GLOBAL_MOVE
        });
    }

    private onMoveLock(flag: boolean) {
        this.#isLocked = flag;
    }

    private getGestureDiff(firstEvent: ICuiMoveData, lastEvent: ICuiMoveData) {
        return {
            diffX: lastEvent.x - firstEvent.x,
            diffY: lastEvent.y - firstEvent.y
        }
    }

    private calculateGesture(diffX: number, diffY: number): GlobalMoveGesture {
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

    private pushGestureEvent(type: GlobalMoveGesture, diffX: number, diffY: number) {
        const eventName = this.getGestureEventName(type);
        if (!eventName) {
            return;
        }
        this.#bus.emit(eventName, null, {
            timespstamp: Date.now(),
            changeX: diffX,
            changeY: diffY,
            name: eventName,
            source: "CuiMoveObserver"
        })

    }

    private getGestureEventName(type: GlobalMoveGesture): string | null {
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