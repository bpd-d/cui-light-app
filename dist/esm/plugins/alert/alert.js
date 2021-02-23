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
var _handleId, _utils, _log;
import { CuiDevtoolFactory } from "../../core/development/factory";
import { EVENTS } from "../../core/utils/statics";
import { CuiAlertFactory } from "./handler";
export class CuiAlertsPlugin {
    constructor() {
        _handleId.set(this, void 0);
        _utils.set(this, void 0);
        _log.set(this, void 0);
        this.name = "alert-plugin";
        this.description = "CuiAlertsPlugin";
        __classPrivateFieldSet(this, _handleId, null);
        __classPrivateFieldSet(this, _utils, undefined);
        //@ts-ignore
        __classPrivateFieldSet(this, _log, null);
    }
    init(utils) {
        __classPrivateFieldSet(this, _log, CuiDevtoolFactory.get("CuiAlertsPlugin"));
        __classPrivateFieldSet(this, _utils, utils);
        this.detach();
        __classPrivateFieldSet(this, _handleId, __classPrivateFieldGet(this, _utils).bus.on(EVENTS.ALERT, this.onAlert.bind(this), { $cuid: this.name }));
    }
    destroy() {
        this.detach();
    }
    detach() {
        if (__classPrivateFieldGet(this, _handleId) && __classPrivateFieldGet(this, _utils)) {
            __classPrivateFieldGet(this, _utils).bus.detach(EVENTS.ALERT, __classPrivateFieldGet(this, _handleId));
            __classPrivateFieldSet(this, _handleId, null);
        }
    }
    onAlert(event) {
        if (!__classPrivateFieldGet(this, _utils)) {
            __classPrivateFieldGet(this, _log).error("Utils are not set");
            return;
        }
        if (!this.validateEvent(event)) {
            __classPrivateFieldGet(this, _log).error("Event validation failed");
            return;
        }
        let popup = CuiAlertFactory.get(event.id, event.type, event.options, __classPrivateFieldGet(this, _utils));
        if (!popup) {
            __classPrivateFieldGet(this, _log).error("Possibly incorrect alert type");
            return;
        }
        popup.show(__classPrivateFieldGet(this, _utils).setup.root);
    }
    validateEvent(event) {
        if (!event || !event.id || !event.type || !event.options) {
            return false;
        }
        return true;
    }
}
_handleId = new WeakMap(), _utils = new WeakMap(), _log = new WeakMap();
