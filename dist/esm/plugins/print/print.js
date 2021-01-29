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
var _listener, _utils;
import { getSystemPrintMode } from "../../core/utils/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";
export class CuiAutoPrintModePlugin {
    constructor(autoPrintInit) {
        this.description = 'Auto print mode';
        this.name = 'auto-print';
        _listener.set(this, void 0);
        _utils.set(this, void 0);
        this.description = "CuiAutoPrintModePlugin";
        this.setup = autoPrintInit;
        __classPrivateFieldSet(this, _listener, undefined);
        __classPrivateFieldSet(this, _utils, undefined);
    }
    init(utils) {
        __classPrivateFieldSet(this, _utils, utils);
        if (this.setup.autoPrint && getSystemPrintMode()) {
            __classPrivateFieldGet(this, _utils).setPrintMode(true);
        }
        __classPrivateFieldSet(this, _listener, new CuiMediaQueryListener('print'));
        __classPrivateFieldGet(this, _listener).setCallback(this.onChange.bind(this));
        __classPrivateFieldGet(this, _listener).attach();
    }
    destroy() {
        if (__classPrivateFieldGet(this, _listener))
            __classPrivateFieldGet(this, _listener).detach();
    }
    onChange(ev) {
        var _a, _b;
        if (!__classPrivateFieldGet(this, _utils)) {
            return;
        }
        this.setup = __classPrivateFieldGet(this, _utils).setup.plugins[this.description];
        let autoPrint = (_b = (_a = this.setup) === null || _a === void 0 ? void 0 : _a.autoPrint) !== null && _b !== void 0 ? _b : false;
        if (autoPrint) {
            if (ev.matches) {
                __classPrivateFieldGet(this, _utils).setPrintMode(true);
            }
            else {
                __classPrivateFieldGet(this, _utils).setPrintMode(false);
            }
        }
    }
}
_listener = new WeakMap(), _utils = new WeakMap();
