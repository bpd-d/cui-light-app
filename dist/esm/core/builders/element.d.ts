export interface ElementBuilderAttribute {
    [name: string]: string;
}
export declare class ElementBuilder {
    private _id;
    private _classes;
    private _attributes;
    private _tag;
    private _text;
    private _children;
    private _rawChildren;
    private _callback;
    private _evName;
    constructor(tag: string);
    setId(id: string): ElementBuilder;
    setClasses(...classList: string[]): ElementBuilder;
    setAttributes(attributes: ElementBuilderAttribute): ElementBuilder;
    setTextContent(text: string): this;
    setChildren(...elements: Element[]): this;
    setRawChildren(...elements: ElementBuilder[]): this;
    onEvent(name: string, callback: (ev: any) => void): this;
    build(innerHTML?: string): HTMLElement;
}
