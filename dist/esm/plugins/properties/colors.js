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
var _set, _setter, _setter_1, _set_1;
import { CSS_VARIABLES } from "../../core/utils/statics";
const baseColorSets = {
    "light": {
        background: CSS_VARIABLES.colorLightBackground,
        base: CSS_VARIABLES.colorLightBase,
        active: CSS_VARIABLES.colorLightActive,
        muted: CSS_VARIABLES.colorLightMuted,
    },
    "dark": {
        background: CSS_VARIABLES.colorDarkBackground,
        base: CSS_VARIABLES.colorDarkBase,
        active: CSS_VARIABLES.colorDarkActive,
        muted: CSS_VARIABLES.colorDarkMuted,
    }
};
const themeColors = {
    'accent': {
        base: CSS_VARIABLES.colorAccent,
        muted: CSS_VARIABLES.colorAccentMuted,
        active: CSS_VARIABLES.colorAccentActive,
        shade: CSS_VARIABLES.colorAccentShade,
        shadeDark: CSS_VARIABLES.colorAccentShadeDark
    },
    'secondary': {
        base: CSS_VARIABLES.colorSecondary,
        muted: CSS_VARIABLES.colorSecondaryMuted,
        active: CSS_VARIABLES.colorSecondaryActive,
        shade: CSS_VARIABLES.colorSecondaryShade,
        shadeDark: CSS_VARIABLES.colorSecondaryShadeDark
    },
    'error': {
        base: CSS_VARIABLES.colorError,
        muted: CSS_VARIABLES.colorErrorMuted,
        active: CSS_VARIABLES.colorErrorActive,
        shade: CSS_VARIABLES.colorErrorShade,
        shadeDark: CSS_VARIABLES.colorErrorShadeDark
    },
    'warning': {
        base: CSS_VARIABLES.colorWarning,
        muted: CSS_VARIABLES.colorWarningMuted,
        active: CSS_VARIABLES.colorWarningActive,
        shade: CSS_VARIABLES.colorWarningShade,
        shadeDark: CSS_VARIABLES.colorWarningShadeDark
    },
    'success': {
        base: CSS_VARIABLES.colorSuccess,
        muted: CSS_VARIABLES.colorSuccessMuted,
        active: CSS_VARIABLES.colorSuccessActive,
        shade: CSS_VARIABLES.colorSuccessShade,
        shadeDark: CSS_VARIABLES.colorSuccessShadeDark
    }
};
export class CuiBaseColorsSetter {
    constructor(colorSet, setter) {
        _set.set(this, void 0);
        _setter.set(this, void 0);
        __classPrivateFieldSet(this, _set, baseColorSets[colorSet]);
        __classPrivateFieldSet(this, _setter, setter);
    }
    setBackgroundColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set).background, color);
    }
    setBaseColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set).base, color);
    }
    setActiveColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set).active, color);
    }
    setMutedColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set).muted, color);
    }
    setBaseColors(colors) {
        if (!__classPrivateFieldGet(this, _set)) {
            return;
        }
        let set = {};
        set[__classPrivateFieldGet(this, _set).background] = colors.background ? colors.background.toCssString() : "";
        set[__classPrivateFieldGet(this, _set).active] = colors.active ? colors.active.toCssString() : "";
        set[__classPrivateFieldGet(this, _set).muted] = colors.muted ? colors.muted.toCssString() : "";
        set[__classPrivateFieldGet(this, _set).base] = colors.base ? colors.base.toCssString() : "";
        __classPrivateFieldGet(this, _setter).setProperties(set);
    }
    setColor(color, value) {
        __classPrivateFieldGet(this, _setter).setProperty(color, value.toCssString());
    }
}
_set = new WeakMap(), _setter = new WeakMap();
export class CuiThemeColorsSetter {
    constructor(set, setter) {
        _setter_1.set(this, void 0);
        _set_1.set(this, void 0);
        __classPrivateFieldSet(this, _setter_1, setter);
        __classPrivateFieldSet(this, _set_1, themeColors[set]);
    }
    setBaseColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set_1).base, color);
    }
    setMutedColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set_1).muted, color);
    }
    setActiveColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set_1).active, color);
    }
    setShadeColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set_1).shade, color);
    }
    setShadeDarkColor(color) {
        this.setColor(__classPrivateFieldGet(this, _set_1).shadeDark, color);
    }
    setColors(colors) {
        if (!__classPrivateFieldGet(this, _set_1)) {
            return;
        }
        let set = {};
        set[__classPrivateFieldGet(this, _set_1).shade] = colors.shade ? colors.shade.toCssString() : "";
        set[__classPrivateFieldGet(this, _set_1).shadeDark] = colors.shadeDark ? colors.shadeDark.toCssString() : "";
        set[__classPrivateFieldGet(this, _set_1).active] = colors.active ? colors.active.toCssString() : "";
        set[__classPrivateFieldGet(this, _set_1).muted] = colors.muted ? colors.muted.toCssString() : "";
        set[__classPrivateFieldGet(this, _set_1).base] = colors.base ? colors.base.toCssString() : "";
        __classPrivateFieldGet(this, _setter_1).setProperties(set);
    }
    setAutoColors(base) {
        let set = {};
        set[__classPrivateFieldGet(this, _set_1).base] = base.toCssString();
        set[__classPrivateFieldGet(this, _set_1).shade] = base.lighten(30).toCssString();
        set[__classPrivateFieldGet(this, _set_1).shadeDark] = base.darken(30).toCssString();
        set[__classPrivateFieldGet(this, _set_1).active] = base.darken(10).toCssString();
        set[__classPrivateFieldGet(this, _set_1).muted] = base.lighten(10).toCssString();
        __classPrivateFieldGet(this, _setter_1).setProperties(set);
    }
    setColor(color, value) {
        __classPrivateFieldGet(this, _setter_1).setProperty(color, value.toCssString());
    }
}
_setter_1 = new WeakMap(), _set_1 = new WeakMap();
