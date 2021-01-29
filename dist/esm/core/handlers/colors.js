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
var _root, _interactions, _LIGHTEN_FACTOR, _DARKEN_FACTOR;
import { is, getRangeValue, are } from "../utils/functions";
import { CSS_APP_BACKGROUND_COLORS, CSS_COMPONENT_BACKGROUND_COLORS, CSS_COMPONENT_BORDER_COLORS, CSS_THEMES } from "../utils/statics";
export class CuiInstanceColorHandler {
    constructor(interactions) {
        _root.set(this, void 0);
        _interactions.set(this, void 0);
        _LIGHTEN_FACTOR.set(this, 15);
        _DARKEN_FACTOR.set(this, 15);
        __classPrivateFieldSet(this, _root, document.documentElement);
        __classPrivateFieldSet(this, _interactions, interactions);
    }
    setAppBackground(light, dark) {
        this.setPropertyIn(CSS_APP_BACKGROUND_COLORS.light, light.toCssString());
        this.setPropertyIn(CSS_APP_BACKGROUND_COLORS.dark, dark.toCssString());
    }
    setComponentBackground(light, dark) {
        this.setPropertyIn(CSS_COMPONENT_BACKGROUND_COLORS.light, light.toCssString());
        this.setPropertyIn(CSS_COMPONENT_BACKGROUND_COLORS.dark, dark.toCssString());
    }
    setBordersColors(light, dark) {
        this.setPropertyIn(CSS_COMPONENT_BORDER_COLORS.light, light.toCssString());
        this.setPropertyIn(CSS_COMPONENT_BORDER_COLORS.dark, dark.toCssString());
    }
    setColor(type, set) {
        var _a, _b;
        const colors = CSS_THEMES[type];
        const baseColor = set.base;
        if (!is(colors) || !is(baseColor)) {
            return;
        }
        const mutedColor = (_a = set.muted) !== null && _a !== void 0 ? _a : baseColor.clone().lighten(__classPrivateFieldGet(this, _LIGHTEN_FACTOR));
        const activeColor = (_b = set.active) !== null && _b !== void 0 ? _b : baseColor.clone().darken(__classPrivateFieldGet(this, _DARKEN_FACTOR));
        __classPrivateFieldGet(this, _interactions).mutate(() => {
            this.setProperty(colors.base, baseColor.toCssString());
            this.setProperty(colors.active, activeColor.toCssString());
            this.setProperty(colors.muted, mutedColor.toCssString());
        }, this);
    }
    setLightenFactor(factor) {
        __classPrivateFieldSet(this, _LIGHTEN_FACTOR, getRangeValue(factor, 0, 100));
    }
    setDarkenFactor(factor) {
        __classPrivateFieldSet(this, _DARKEN_FACTOR, getRangeValue(factor, 0, 100));
    }
    setProperty(propertyName, value) {
        __classPrivateFieldGet(this, _root).style.setProperty(propertyName, value);
    }
    setPropertyIn(propertyName, value) {
        if (!are(value, propertyName)) {
            return;
        }
        __classPrivateFieldGet(this, _interactions).mutate(this.setProperty, this, propertyName, value);
    }
}
_root = new WeakMap(), _interactions = new WeakMap(), _LIGHTEN_FACTOR = new WeakMap(), _DARKEN_FACTOR = new WeakMap();
