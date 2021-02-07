import { is } from "../utils/functions";
import { IUIInteractionProvider } from "../models/interfaces";

export interface ICuiDocumentStyleAppender {
    append(style: string): boolean;
}

export class CuiDocumentStyleAppender implements ICuiDocumentStyleAppender {
    constructor(interactions: IUIInteractionProvider) {
    }

    append(style: string): boolean {
        if (is(style)) {
            const head = document.head || document.getElementsByTagName('head')[0]
            const node = document.createElement('style');
            const text = document.createTextNode(style);
            // node.type = 'text/css';
            node.appendChild(text);
            head.appendChild(node);
        }
        return true;
    }

}