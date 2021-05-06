import { IUIInteractionProvider } from "../models/interfaces";
import { CuiInteractionsType } from "../utils/types";
import { FastDom, SyncInteractions } from "../utils/interactions";

export class CuiInteractionsFactory {
    /**
     * Gets new instance interactions provider
     * @param type - Interactions type
     */
    public static get(type: CuiInteractionsType, errorReport?: (e: Error) => void): IUIInteractionProvider {
        const interactionType = type;
        switch (interactionType) {
            case 'async':
                const fastDom = new FastDom();
                if (errorReport)
                    fastDom.onError(errorReport);
                return fastDom;
            default:
                return new SyncInteractions();
        }
    }
}