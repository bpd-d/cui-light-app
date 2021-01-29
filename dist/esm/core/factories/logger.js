import { CuiLogger } from "../utils/logger";
import { STATICS } from "../utils/statics";
/**
 *
 */
export class CuiLoggerFactory {
    /**
     * Gets new instance of component focused logger
     * @param name - component name
     */
    static get(name, logLevel) {
        return new CuiLogger(name, logLevel !== null && logLevel !== void 0 ? logLevel : STATICS.logLevel);
    }
}
