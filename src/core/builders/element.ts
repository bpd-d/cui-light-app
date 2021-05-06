import { is, enumerateObject, are } from "../utils/functions";

export interface ElementBuilderAttribute {
    [name: string]: string;
}
export class ElementBuilder {
    private _id: string | undefined;
    private _classes: string[];
    private _attributes: ElementBuilderAttribute | undefined;
    private _tag: string;
    private _text: string | undefined;
    private _children: Element[];
    private _rawChildren: ElementBuilder[];
    private _callback: ((ev: any) => void) | undefined;
    private _evName: string | undefined;
    constructor(tag: string) {
        this._tag = tag;
        this._classes = [];
        this._attributes = undefined;
        this._id = undefined;
        this._text = undefined;
        this._children = [];
        this._rawChildren = [];
        this._evName = undefined;
        this._callback = undefined;
    }

    setId(id: string): ElementBuilder {
        this._id = id;
        return this;
    }

    setClasses(...classList: string[]): ElementBuilder {
        this._classes = classList;
        return this;
    }

    setAttributes(attributes: ElementBuilderAttribute): ElementBuilder {
        this._attributes = attributes;
        return this;
    }

    setTextContent(text: string) {
        this._text = text;
        return this;
    }

    setChildren(...elements: Element[]) {
        this._children = [...elements];
        return this;
    }

    setRawChildren(...elements: ElementBuilder[]) {
        this._rawChildren = [...elements];
        return this;
    }

    onEvent(name: string, callback: (ev: any) => void) {
        this._evName = name;
        this._callback = callback;
        return this;
    }

    build(innerHTML?: string): HTMLElement {
        let element = document.createElement(this._tag);
        if (is(this._id)) {
            // @ts-ignore id is checked
            element.id = this._id;
        }
        if (is(this._classes)) {
            element.classList.add(...this._classes);
        }
        if (is(this._attributes)) {
            // @ts-ignore attributes are checked
            enumerateObject(this._attributes, (attr: string, value: string) => {
                element.setAttribute(attr, value);
            })
        }
        if (is(innerHTML)) {
            // @ts-ignore innerHTML checked already
            element.innerHTML = innerHTML;
        } else if (is(this._text)) {
            // @ts-ignore text checked already
            element.textContent = this._text;
        }
        this._rawChildren.forEach(raw => { element.appendChild(raw.build()) });
        this._children.forEach(child => element.appendChild(child));

        if (are(this._evName, this._callback)) {
            // @ts-ignore
            element.addEventListener(this._evName, (ev) => {
                // @ts-ignore
                this._callback(ev);
            })
        }
        return element;
    }
}