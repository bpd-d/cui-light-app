import { is, enumerateObject, are } from "../utils/functions";

export interface ElementBuilderAttribute {
    [name: string]: string;
}
export class ElementBuilder {
    #id: string | undefined;
    #classes: string[];
    #attributes: ElementBuilderAttribute | undefined;
    #tag: string;
    #text: string | undefined;
    #children: Element[];
    #rawChildren: ElementBuilder[];
    #callback: ((ev: any) => void) | undefined;
    #evName: string | undefined;
    constructor(tag: string) {
        this.#tag = tag;
        this.#classes = [];
        this.#attributes = undefined;
        this.#id = undefined;
        this.#text = undefined;
        this.#children = [];
        this.#rawChildren = [];
        this.#evName = undefined;
        this.#callback = undefined;
    }

    setId(id: string): ElementBuilder {
        this.#id = id;
        return this;
    }

    setClasses(...classList: string[]): ElementBuilder {
        this.#classes = classList;
        return this;
    }

    setAttributes(attributes: ElementBuilderAttribute): ElementBuilder {
        this.#attributes = attributes;
        return this;
    }

    setTextContent(text: string) {
        this.#text = text;
        return this;
    }

    setChildren(...elements: Element[]) {
        this.#children = [...elements];
        return this;
    }

    setRawChildren(...elements: ElementBuilder[]) {
        this.#rawChildren = [...elements];
        return this;
    }

    onEvent(name: string, callback: (ev: any) => void) {
        this.#evName = name;
        this.#callback = callback;
        return this;
    }

    build(innerHTML?: string): HTMLElement {
        let element = document.createElement(this.#tag);
        if (is(this.#id)) {
            // @ts-ignore id is checked
            element.id = this.#id;
        }
        if (is(this.#classes)) {
            element.classList.add(...this.#classes);
        }
        if (is(this.#attributes)) {
            // @ts-ignore attributes are checked
            enumerateObject(this.#attributes, (attr: string, value: string) => {
                element.setAttribute(attr, value);
            })
        }
        if (is(innerHTML)) {
            // @ts-ignore innerHTML checked already
            element.innerHTML = innerHTML;
        } else if (is(this.#text)) {
            // @ts-ignore text checked already
            element.textContent = this.#text;
        }
        this.#rawChildren.forEach(raw => { element.appendChild(raw.build()) });
        this.#children.forEach(child => element.appendChild(child));

        if (are(this.#evName, this.#callback)) {
            // @ts-ignore
            element.addEventListener(this.#evName, (ev) => {
                // @ts-ignore
                this.#callback(ev);
            })
        }
        return element;
    }
}