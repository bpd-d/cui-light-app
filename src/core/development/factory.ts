import { STATICS } from "../utils/statics";
import { CuiConsoleDevelopementTool } from "./console";
import { ICuiDevelopmentTool, ICuiDevelopmentToolFactory } from "./interfaces";

export class CuiConsoleDevToolFactory implements ICuiDevelopmentToolFactory {
    get(name: string): ICuiDevelopmentTool {
        return new CuiConsoleDevelopementTool(name);
    }

}

export class CuiDevtoolFactory {
    static get(name: string): ICuiDevelopmentTool {
        if (!STATICS.devTool) {
            STATICS.devTool = new CuiConsoleDevToolFactory();
        }
        return STATICS.devTool.get(name);
    }
}