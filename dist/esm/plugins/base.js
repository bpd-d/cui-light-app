var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CuiPlugin {
    constructor(setup) {
        this._onDestroy = undefined;
        this._callback = setup.callback;
        this.name = setup.name;
        this.description = setup.description;
        this.setup = setup.setup;
        this._extensions = [];
    }
    init(utils) {
        if (this._callback) {
            [this._extensions, this._onDestroy] = this._callback(utils, this.setup);
        }
        this.forEachExtension((extension) => {
            return extension.init(utils);
        }).then((result) => {
        });
    }
    destroy() {
        this.forEachExtension((extension) => {
            return extension.finish();
        }).then((result) => {
        });
        if (this._onDestroy) {
            this._onDestroy();
        }
    }
    forEachExtension(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._extensions || this._extensions.length === 0) {
                return true;
            }
            const promises = [];
            this._extensions.forEach((extension) => {
                promises.push(callback(extension));
            });
            yield Promise.all(promises);
            return true;
        });
    }
}
export function getPluginEventExtension(setup) {
    let _utils = undefined;
    let _handleId = null;
    function getCui() {
        var _a;
        return { $cuid: (_a = setup.id) !== null && _a !== void 0 ? _a : setup.name };
    }
    return {
        init: (utils) => __awaiter(this, void 0, void 0, function* () {
            _utils = utils;
            if (_handleId) {
                return false;
            }
            _handleId = utils.bus.on(setup.name, setup.callback, getCui());
            return true;
        }),
        finish: () => __awaiter(this, void 0, void 0, function* () {
            if (!_utils || !_handleId) {
                return false;
            }
            _utils.bus.detach(setup.name, _handleId, getCui());
            _handleId = null;
            return true;
        })
    };
}
export function getPluginListenerExtension(setup) {
    return {
        init: (utils) => __awaiter(this, void 0, void 0, function* () {
            if (setup.listener.isAttached()) {
                return false;
            }
            setup.listener.attach();
            return true;
        }),
        finish: () => __awaiter(this, void 0, void 0, function* () {
            if (!setup.listener.isAttached()) {
                return false;
            }
            setup.listener.detach();
            return true;
        })
    };
}
