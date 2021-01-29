import { ICuiComponent } from "../core/models/interfaces";
export interface ComponentsModuleAttributes {
    prefix?: string;
}
/**
 * Function that initializes and returns all components available in package
 * @param attributes - object holding data needed for components initialization
 */
export declare function GetComponents(attributes: ComponentsModuleAttributes): ICuiComponent[];
