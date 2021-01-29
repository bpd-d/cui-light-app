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
var _setter;
import { is } from "../../core/utils/functions";
import { CSS_VARIABLES } from "../../core/utils/statics";
import { CuiBaseColorsSetter, CuiThemeColorsSetter } from "./colors";
import { PropertySetter } from "./setter";
export class CuiPropertiesHandler {
    constructor(utils) {
        _setter.set(this, void 0);
        __classPrivateFieldSet(this, _setter, new PropertySetter(utils));
    }
    /**
     * Sets main font size
     * @param {number} value numeric value
     * @param {string} unit optional - size unit, px if not provided
     */
    setBaseFontSize(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.fontSize, value, unit);
    }
    /**
     * Sets base animation time
     * @param {number} value - time value
     * @param {string} unit  - optional - ms is passed when no provided
     */
    setAnimationTime(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.animationTime, value, unit !== null && unit !== void 0 ? unit : 'ms');
    }
    /**
    * Sets long animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeLong(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.setAnimationTimeLong, value, unit !== null && unit !== void 0 ? unit : 'ms');
    }
    /**
    * Sets short animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeShort(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.setAnimationTimeShort, value, unit !== null && unit !== void 0 ? unit : 'ms');
    }
    /**
    * Sets main line size
    * @param {number} value numeric value
    * @param {string} unit optional - size unit, px if not provided
    */
    setBaseLineHeight(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.lineHeight, value, unit);
    }
    /**
     * Sets base margin value
     * @param {number} value - margin value
     * @param {string} unit - optional - margin unit (px default)
     */
    setBaseMargin(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.margin, value, unit);
    }
    /**
    * Sets base padding value
    * @param {number} value - padding value
    * @param {string} unit - optional - padding unit (px default)
    */
    setBasePadding(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.padding, value, unit);
    }
    /**
    * Sets base border radius
    * @param {number} value - border value
    * @param {string} unit - optional - border unit (px default)
    */
    setBaseBorderRadius(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.borderRadius, value, unit);
    }
    /**
   * Sets component space
   * @param {number} value - space value
   * @param {string} unit - optional - space unit (px default)
   */
    setComponentSpace(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.componentSpace, value, unit);
    }
    /**
     * Sets new accordion chevron icon
     * @param value A SVG formatted to be replaced default value
     */
    setAccordionIcon(value) {
        if (!is(value)) {
            return;
        }
        this.setCSSVariable(CSS_VARIABLES.accordionIcon, value);
    }
    /**
    * Sets a scrollbar width
    * @param value A SVG formatted to be replaced default value
    */
    setScrollbarWidth(value, unit) {
        this.setBaseUnitValue(CSS_VARIABLES.scrollbarWidth, value, unit);
    }
    /**
     * Sets app viewport light background color
     * @param color color to be set
     */
    setAppBackgroundColor(color) {
        if (!is(color)) {
            return;
        }
        this.setCSSVariable(CSS_VARIABLES.colorLightAppBackground, color.toCssString());
    }
    /**
    * Sets app viewport dark background color
    * @param color color to be set
    */
    setDarkAppBackgroundColor(color) {
        if (!is(color)) {
            return;
        }
        this.setCSSVariable(CSS_VARIABLES.colorDarkAppBackground, color.toCssString());
    }
    getBaseColorsSetter() {
        return new CuiBaseColorsSetter("light", __classPrivateFieldGet(this, _setter));
    }
    getDarkBaseColorsSetter() {
        return new CuiBaseColorsSetter("dark", __classPrivateFieldGet(this, _setter));
    }
    getAccentThemeColorsSetter() {
        return new CuiThemeColorsSetter("accent", __classPrivateFieldGet(this, _setter));
    }
    getSecondaryThemeColorsSetter() {
        return new CuiThemeColorsSetter("secondary", __classPrivateFieldGet(this, _setter));
    }
    getErrorThemeColorsSetter() {
        return new CuiThemeColorsSetter("error", __classPrivateFieldGet(this, _setter));
    }
    getWarningThemeColorsSetter() {
        return new CuiThemeColorsSetter("warning", __classPrivateFieldGet(this, _setter));
    }
    getSuccessThemeColorsSetter() {
        return new CuiThemeColorsSetter("success", __classPrivateFieldGet(this, _setter));
    }
    /**
     * Sets property in interactive way
     * @param {string} name property name - value of {prefix} is replaced by current prefix
     * @param {string} value - property value
     */
    setCSSVariable(name, value) {
        __classPrivateFieldGet(this, _setter).setProperty(name, value);
    }
    /**
     * Sets unit type CSS variable property
     * @param name Variable name
     * @param value numeric value
     * @param unit unit - optional - px is default value
     */
    setBaseUnitValue(name, value, unit) {
        if (!is(value)) {
            return;
        }
        let strVal = `${value}${unit !== null && unit !== void 0 ? unit : "px"}`;
        this.setCSSVariable(name, strVal);
    }
}
_setter = new WeakMap();
