import { IUIInteractionProvider } from "../models/interfaces";
import { CuiInteractionsType } from "../utils/types";
export declare class CuiInteractionsFactory {
    /**
     * Gets new instance of component focused logger
     * @param type - Interactions type
     */
    static get(type: CuiInteractionsType, errorReport?: (e: Error) => void): IUIInteractionProvider;
}
