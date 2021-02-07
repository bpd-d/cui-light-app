import { is } from "../utils/functions";
export class CuiDocumentStyleAppender {
    constructor(interactions) {
    }
    append(style) {
        if (is(style)) {
            const head = document.head || document.getElementsByTagName('head')[0];
            const node = document.createElement('style');
            const text = document.createTextNode(style);
            // node.type = 'text/css';
            node.appendChild(text);
            head.appendChild(node);
        }
        return true;
    }
}
