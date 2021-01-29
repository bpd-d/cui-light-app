export class AriaAttributes {
    static setLabel(element, label) {
        if (!element.hasAttribute('aria-label')) {
            element.setAttribute('aria-label', label);
        }
    }
    static setAria(element, attr, value) {
        if (!element.hasAttribute(attr)) {
            element.setAttribute(attr, value);
        }
    }
    static removeAria(element, attr) {
        if (element.hasAttribute(attr)) {
            element.removeAttribute(attr);
        }
    }
}
