import { FastDom, SyncInteractions } from "../utils/interactions";
export class CuiInteractionsFactory {
    /**
     * Gets new instance of component focused logger
     * @param type - Interactions type
     */
    static get(type, errorReport) {
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
