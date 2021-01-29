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
import { getSystemLightMode } from "../../core/utils/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";
export class CuiAutoLightModePlugin {
    constructor(autoLightInit) {
        this.description = 'Dark vs Light mode auto switcher';
        this.name = 'auto-light';
        _listener.set(this, void 0);
        _utils.set(this, void 0);
        this.description = "CuiAutoLightModePlugin";
        this.setup = autoLightInit;
        __classPrivateFieldSet(this, _utils, undefined);
        __classPrivateFieldSet(this, _listener, undefined);
    }
    init(utils) {
        __classPrivateFieldSet(this, _utils, utils);
        if (this.setup.autoLight && getSystemLightMode() === 'dark') {
            __classPrivateFieldGet(this, _utils).setLightMode('dark');
        }
        __classPrivateFieldSet(this, _listener, new CuiMediaQueryListener('(prefers-color-scheme: dark)'));
        __classPrivateFieldGet(this, _listener).setCallback(this.onChange.bind(this));
        __classPrivateFieldGet(this, _listener).attach();
    }
    destroy() {
        if (__classPrivateFieldGet(this, _listener))
            __classPrivateFieldGet(this, _listener).detach();
    }
    onChange(ev) {
        var _a;
        if (!__classPrivateFieldGet(this, _utils)) {
            return;
        }
        let autoLightSetup = __classPrivateFieldGet(this, _utils).setup.plugins[this.description];
        let autoLight = (_a = autoLightSetup === null || autoLightSetup === void 0 ? void 0 : autoLightSetup.autoLight) !== null && _a !== void 0 ? _a : false;
        if (autoLight) {
            if (ev.matches) {
                __classPrivateFieldGet(this, _utils).setLightMode('dark');
            }
            else {
                __classPrivateFieldGet(this, _utils).setLightMode('light');
            }
        }
    }
}
_listener = new WeakMap(), _utils = new WeakMap();
