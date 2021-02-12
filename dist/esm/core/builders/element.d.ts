export interface ElementBuilderAttribute {
    [name: string]: string;
}
export declare class ElementBuilder {
    #private;
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
