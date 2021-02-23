import { STATICS } from "../utils/statics";
import { CuiConsoleDevelopementTool } from "./console";
export class CuiConsoleDevToolFactory {
    get(name) {
        return new CuiConsoleDevelopementTool(name);
    }
}
export class CuiDevtoolFactory {
    static get(name) {
        if (!STATICS.devTool) {
            STATICS.devTool = new CuiConsoleDevToolFactory();
        }
        return STATICS.devTool.get(name);
    }
}
