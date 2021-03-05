import { ICuiParsable } from "../models/interfaces";
export interface ValueCorrectors {
    [name: string]: (value: any) => any;
}
export interface CuiArgProp {
    default?: any;
    type?: string;
    corrector?: (value: any) => any;
}
export interface CuiArgProps {
    [name: string]: CuiArgProp;
}
export interface CuiAutoParseOptions {
    main?: string;
    props?: CuiArgProps;
}
export declare class CuiAutoParseArgs implements ICuiParsable {
    #private;
    constructor(options?: CuiAutoParseOptions);
    parse(args: any): void;
    fillDefaultValues(): void;
}
