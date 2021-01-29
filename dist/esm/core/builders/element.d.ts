export interface ElementBuilderAttribute {
    [name: string]: string;
}
export declare class ElementBuilder {
    #private;
    constructor(tag: string);
    setId(id: string): ElementBuilder;
    setClasses(...classList: string[]): ElementBuilder;
    setAttributes(attributes: ElementBuilderAttribute): ElementBuilder;
    build(innerHTML?: string): HTMLElement;
}
