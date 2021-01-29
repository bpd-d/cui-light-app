import { CuiColor } from "../../core/models/colors";
import { CuiUtils } from "../../core/models/utils";
import { CuiBaseColorsSetter, CuiThemeColorsSetter } from "./colors";
export declare class CuiPropertiesHandler {
    #private;
    constructor(utils: CuiUtils);
    /**
     * Sets main font size
     * @param {number} value numeric value
     * @param {string} unit optional - size unit, px if not provided
     */
    setBaseFontSize(value: number, unit?: string): void;
    /**
     * Sets base animation time
     * @param {number} value - time value
     * @param {string} unit  - optional - ms is passed when no provided
     */
    setAnimationTime(value: number, unit?: string): void;
    /**
    * Sets long animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeLong(value: number, unit?: string): void;
    /**
    * Sets short animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeShort(value: number, unit?: string): void;
    /**
    * Sets main line size
    * @param {number} value numeric value
    * @param {string} unit optional - size unit, px if not provided
    */
    setBaseLineHeight(value: number, unit?: string): void;
    /**
     * Sets base margin value
     * @param {number} value - margin value
     * @param {string} unit - optional - margin unit (px default)
     */
    setBaseMargin(value: number, unit?: string): void;
    /**
    * Sets base padding value
    * @param {number} value - padding value
    * @param {string} unit - optional - padding unit (px default)
    */
    setBasePadding(value: number, unit?: string): void;
    /**
    * Sets base border radius
    * @param {number} value - border value
    * @param {string} unit - optional - border unit (px default)
    */
    setBaseBorderRadius(value: number, unit?: string): void;
    /**
   * Sets component space
   * @param {number} value - space value
   * @param {string} unit - optional - space unit (px default)
   */
    setComponentSpace(value: number, unit?: string): void;
    /**
     * Sets new accordion chevron icon
     * @param value A SVG formatted to be replaced default value
     */
    setAccordionIcon(value: string): void;
    /**
    * Sets a scrollbar width
    * @param value A SVG formatted to be replaced default value
    */
    setScrollbarWidth(value: number, unit?: string): void;
    /**
     * Sets app viewport light background color
     * @param color color to be set
     */
    setAppBackgroundColor(color: CuiColor): void;
    /**
    * Sets app viewport dark background color
    * @param color color to be set
    */
    setDarkAppBackgroundColor(color: CuiColor): void;
    getBaseColorsSetter(): CuiBaseColorsSetter;
    getDarkBaseColorsSetter(): CuiBaseColorsSetter;
    getAccentThemeColorsSetter(): CuiThemeColorsSetter;
    getSecondaryThemeColorsSetter(): CuiThemeColorsSetter;
    getErrorThemeColorsSetter(): CuiThemeColorsSetter;
    getWarningThemeColorsSetter(): CuiThemeColorsSetter;
    getSuccessThemeColorsSetter(): CuiThemeColorsSetter;
    /**
     * Sets property in interactive way
     * @param {string} name property name - value of {prefix} is replaced by current prefix
     * @param {string} value - property value
     */
    setCSSVariable(name: string, value: string): void;
    /**
     * Sets unit type CSS variable property
     * @param name Variable name
     * @param value numeric value
     * @param unit unit - optional - px is default value
     */
    private setBaseUnitValue;
}
