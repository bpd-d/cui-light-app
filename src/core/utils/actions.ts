import { is, are, splitColon } from "./functions";
import { CuiCore } from "../models/core";

export interface ICuiComponentAction {
    add(element: Element, core?: CuiCore): void;
    remove(element: Element, core?: CuiCore): void;
    toggle(element: Element, core?: CuiCore): void;
}

export class CuiClassAction implements ICuiComponentAction {
    #class: string;

    constructor(className: string) {
        this.#class = className;
    }

    add(element: Element, core?: CuiCore): void {
        if (are(element, this.#class) && !element.classList.contains(this.#class)) {
            element.classList.add(this.#class);
        }
    }

    remove(element: Element, core?: CuiCore): void {
        if (are(element, this.#class) && element.classList.contains(this.#class)) {
            element.classList.remove(this.#class);
        }
    }

    toggle(element: Element, core?: CuiCore): void {
        if (are(element, this.#class)) {
            if (element.classList.contains(this.#class)) {
                element.classList.remove(this.#class);
            } else {
                element.classList.add(this.#class);
            }
        }
    }
}

export class CuiInboundAction implements ICuiComponentAction {
    _name: string;

    constructor(name: string) {
        this._name = name;
    }
    add(element: Element, core?: CuiCore): void {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                core.setLightMode('dark')
                break;
            case 'light-mode':
                core.setLightMode('light')
                break;
        }
    }

    remove(element: Element, core?: CuiCore): void {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                core.setLightMode('light')
                break;
            case 'light-mode':
                core.setLightMode('dark')
                break;
        }
    }

    toggle(element: Element, core?: CuiCore): void {
        if (!core) {
            return;
        }
        switch (this._name) {
            case 'dark-mode':
                this.setDarkMode(core)
                break;
            case 'light-mode':
                this.setDarkMode(core)
                break;
        }
    }

    private setDarkMode(core: CuiCore) {
        if (core.getLightMode() === 'dark') {
            core.setLightMode('light')
        } else {
            core.setLightMode('dark')
        }
    }
}

export class AttributeAction implements ICuiComponentAction {
    private _attributeName: string;
    private _attributeValue: string;
    constructor(attribute: string) {
        [this._attributeName, this._attributeValue] = splitColon(attribute);// attribute.split(',')
    }

    add(element: Element, core?: CuiCore): void {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        element.setAttribute(this._attributeName, this._attributeValue)
    }

    remove(element: Element, core?: CuiCore): void {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        if (element.hasAttribute(this._attributeName)) {
            element.removeAttribute(this._attributeName)
        }

    }

    toggle(element: Element, core?: CuiCore): void {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        if (element.hasAttribute(this._attributeName)) {
            element.removeAttribute(this._attributeName)
        } else {
            element.setAttribute(this._attributeName, this._attributeValue)
        }
    }
}


export class StyleAction implements ICuiComponentAction {
    private _attributeName: string;
    private _attributeValue: string;
    constructor(attribute: string) {
        [this._attributeName, this._attributeValue] = splitColon(attribute);
    }

    add(element: Element, core?: CuiCore): void {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element as any;
        if (el.style && !el.style[this._attributeName]) {
            el.style[this._attributeName] = this._attributeValue;
        }

    }

    remove(element: Element, core?: CuiCore): void {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element as any;
        if (el.style && el.style[this._attributeName]) {
            el.style[this._attributeName] = "";
        }

    }

    toggle(element: Element, core?: CuiCore): void {
        if (!are(element, this._attributeName, this._attributeValue)) {
            return;
        }
        let el = element as any;
        if (!el.style) {
            return;
        }
        if (!el.style[this._attributeName]) {
            el.style[this._attributeName] = this._attributeValue;
        } else {
            delete el.style[this._attributeName];
        }
    }
}

export class DummyAction implements ICuiComponentAction {
    constructor() {
    }

    add(element: Element, utils?: CuiCore): void {

    }

    remove(element: Element, utils?: CuiCore): void {
    }

    toggle(element: Element, utils?: CuiCore): void {
    }
}

export class CuiActionsFactory {
    public static get(value: string): ICuiComponentAction {
        if (!is(value)) {
            return new DummyAction();
        }
        let indicator = value[0];
        switch (indicator) {
            case '.':
                return new CuiClassAction(value.substring(1));
            case '~':
                return new CuiInboundAction(value.substring(1));
            case "&":
                return new AttributeAction(value.substring(1));
            case "^":
                return new StyleAction(value.substring(1));
            default:
                return new CuiClassAction(value);
        }
    }
}

export class CuiActionsListFactory {
    public static get(value: string): ICuiComponentAction[] {
        if (!is(value)) {
            return [];
        }
        const split = value.split(',');
        return split.map(single => {
            return CuiActionsFactory.get(single.trim());
        })
    }
}