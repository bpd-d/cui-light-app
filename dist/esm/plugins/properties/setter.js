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
var _utils;
import { are, is } from "../../core/utils/functions";
export class PropertySetter {
    constructor(utils) {
        _utils.set(this, void 0);
        __classPrivateFieldSet(this, _utils, utils);
    }
    setProperty(property, value) {
        if (!are(property, value)) {
            return;
        }
        __classPrivateFieldGet(this, _utils).interactions.mutate(() => {
            __classPrivateFieldGet(this, _utils).setProperty(property, value);
        }, null);
    }
    setProperties(set) {
        if (!is(set)) {
            return;
        }
        __classPrivateFieldGet(this, _utils).interactions.mutate(() => {
            for (let property in set) {
                if (is(set[property]))
                    __classPrivateFieldGet(this, _utils).setProperty(property, set[property]);
            }
        }, null);
    }
}
_utils = new WeakMap();
