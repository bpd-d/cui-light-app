import { IUIInteractionProvider } from "../models/interfaces";
export interface ICuiDocumentStyleAppender {
    append(style: string): boolean;
}
export declare class CuiDocumentStyleAppender implements ICuiDocumentStyleAppender {
    constructor(interactions: IUIInteractionProvider);
    append(style: string): boolean;
}
