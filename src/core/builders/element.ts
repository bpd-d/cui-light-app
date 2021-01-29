import { is, enumerateObject } from "../utils/functions";

export interface ElementBuilderAttribute {
    [name: string]: string;
}
export class ElementBuilder {
    #id: string | undefined;
    #classes: string[];
    #attributes: ElementBuilderAttribute | undefined;
    #tag: string;
    constructor(tag: string) {
        this.#tag = tag;
        this.#classes = [];
        this.#attributes = undefined;
        this.#id = undefined;
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
        }
        return element;
    }
}