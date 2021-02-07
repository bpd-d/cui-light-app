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
var _toastHandler, _eventId, _utils;
import { EVENTS } from "../../core/utils/statics";
import { CuiToastHandler } from "./handler";
export class CuiToastPlugin {
    constructor(setup) {
        this.name = 'toast-plugin';
        _toastHandler.set(this, void 0);
        _eventId.set(this, void 0);
        _utils.set(this, void 0);
        this.description = "CuiToastPlugin";
        this.setup = setup;
        __classPrivateFieldSet(this, _toastHandler, undefined);
        __classPrivateFieldSet(this, _eventId, null);
        __classPrivateFieldSet(this, _utils, undefined);
    }
    init(utils) {
        var _a;
        __classPrivateFieldSet(this, _utils, utils);
        if (!__classPrivateFieldGet(this, _toastHandler)) {
            __classPrivateFieldSet(this, _toastHandler, new CuiToastHandler(utils.interactions, utils.setup.prefix, (_a = utils.setup.animationTime) !== null && _a !== void 0 ? _a : 300));
        }
        __classPrivateFieldSet(this, _eventId, utils.bus.on(EVENTS.TOAST, this.onToastShow.bind(this), { $cuid: this.name }));
    }
    destroy() {
        if (__classPrivateFieldGet(this, _utils) && __classPrivateFieldGet(this, _eventId)) {
            __classPrivateFieldGet(this, _utils).bus.detach(EVENTS.TOAST, __classPrivateFieldGet(this, _eventId));
            __classPrivateFieldSet(this, _eventId, null);
        }
    }
    onToastShow(message) {
        if (!__classPrivateFieldGet(this, _toastHandler) || !__classPrivateFieldGet(this, _utils)) {
            return;
        }
        __classPrivateFieldGet(this, _utils).bus.emit(EVENTS.TOAST_SHOW, null, []);
        __classPrivateFieldGet(this, _toastHandler).show(message).then(() => {
            if (__classPrivateFieldGet(this, _utils))
                __classPrivateFieldGet(this, _utils).bus.emit(EVENTS.TOAST_HIDDEN, null, []);
        });
    }
}
_toastHandler = new WeakMap(), _eventId = new WeakMap(), _utils = new WeakMap();
