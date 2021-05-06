import { is, enumerateObject, are } from "../utils/functions";
export class ElementBuilder {
    constructor(tag) {
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
    setId(id) {
        this._id = id;
        return this;
    }
    setClasses(...classList) {
        this._classes = classList;
        return this;
    }
    setAttributes(attributes) {
        this._attributes = attributes;
        return this;
    }
    setTextContent(text) {
        this._text = text;
        return this;
    }
    setChildren(...elements) {
        this._children = [...elements];
        return this;
    }
    setRawChildren(...elements) {
        this._rawChildren = [...elements];
        return this;
    }
    onEvent(name, callback) {
        this._evName = name;
        this._callback = callback;
        return this;
    }
    build(innerHTML) {
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
            enumerateObject(this._attributes, (attr, value) => {
                element.setAttribute(attr, value);
            });
        }
        if (is(innerHTML)) {
            // @ts-ignore innerHTML checked already
            element.innerHTML = innerHTML;
        }
        else if (is(this._text)) {
            // @ts-ignore text checked already
            element.textContent = this._text;
        }
        this._rawChildren.forEach(raw => { element.appendChild(raw.build()); });
        this._children.forEach(child => element.appendChild(child));
        if (are(this._evName, this._callback)) {
            // @ts-ignore
            element.addEventListener(this._evName, (ev) => {
                // @ts-ignore
                this._callback(ev);
            });
        }
        return element;
    }
}
