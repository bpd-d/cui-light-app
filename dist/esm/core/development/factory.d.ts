import { ICuiDevelopmentTool, ICuiDevelopmentToolFactory } from "./interfaces";
export declare class CuiConsoleDevToolFactory implements ICuiDevelopmentToolFactory {
    get(name: string): ICuiDevelopmentTool;
}
export declare class CuiDevtoolFactory {
    static get(name: string): ICuiDevelopmentTool;
}
