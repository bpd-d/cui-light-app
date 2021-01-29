var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _interactions;
import { is } from "../utils/functions";
export class CuiDocumentStyleAppender {
    constructor(interactions) {
        _interactions.set(this, void 0);
        __classPrivateFieldSet(this, _interactions, interactions);
    }
    append(style) {
        if (is(style)) {
            const head = document.head || document.getElementsByTagName('head')[0];
            const node = document.createElement('style');
            const text = document.createTextNode(style);
            node.type = 'text/css';
            node.appendChild(text);
            head.appendChild(node);
        }
        return true;
    }
}
_interactions = new WeakMap();
